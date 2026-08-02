const db = require("../database/database");

function getDetail() {

    return db.prepare(`
        SELECT
            id,
            nomor,
            counter,
            status,
            called_at,
            finished_at,

            CASE
    WHEN status='FINISHED'
    AND called_at IS NOT NULL
    AND finished_at IS NOT NULL
    THEN
        printf(
            '%02d:%02d',
            (
                strftime('%s', finished_at) -
                strftime('%s', called_at)
            ) / 60,
            (
                strftime('%s', finished_at) -
                strftime('%s', called_at)
            ) % 60
        )

    ELSE '-'

END AS duration

        FROM queues

        ORDER BY id DESC

    `).all();

}

function getStatistics() {

    // Summary yang sudah ada
    const summary = getSummary();

    // ===========================
    // Average Service Time
    // ===========================

    const avg = db.prepare(`
        SELECT
            AVG(
                strftime('%s', finished_at) -
                strftime('%s', called_at)
            ) avg_seconds

        FROM queues

        WHERE status='FINISHED'
    `).get();

    // ===========================
    // Best Counter
    // ===========================

    const bestCounter = db.prepare(`
        SELECT

            counter,

            COUNT(*) total

        FROM queues

        WHERE status='FINISHED'

        GROUP BY counter

        ORDER BY total DESC

        LIMIT 1
    `).get();

    // ===========================
    // Productivity
    // ===========================

    const productivity =
        summary.total === 0
        ? 0
        : Math.round(
            (summary.finished / summary.total) * 100
        );

    return {

        ...summary,

        avg_seconds: Math.round(avg.avg_seconds || 0),

        best_counter: bestCounter
            ? `Counter ${bestCounter.counter}`
            : "-",

        productivity

    };

}

/**
 * Ringkasan laporan
 */
function getSummary() {

    const waiting = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
        WHERE status='WAITING'
    `).get().total;

    const calling = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
        WHERE status='CALLING'
    `).get().total;

    const serving = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
        WHERE status='SERVING'
    `).get().total;

    const finished = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
        WHERE status='FINISHED'
    `).get().total;

    const skipped = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
        WHERE status='SKIPPED'
    `).get().total;

    const total = db.prepare(`
        SELECT COUNT(*) total
        FROM queues
    `).get().total;

    return {

        total,

        waiting,

        calling,

        serving,

        finished,

        skipped

    };

}

module.exports = {

    getSummary,

    getDetail,

    getStatistics

};