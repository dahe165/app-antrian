const db = require("../database/database");

function getDashboard(req, res) {

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

    res.json({

        waiting,

        calling,

        serving,

        finished,

        skipped,

        total

    });

}

function getCounters(req, res) {

    const counters = db.prepare(`
        SELECT
            c.id,
            c.name,
            c.status,

            q.nomor,
            q.status AS queue_status,
            q.called_at

        FROM counters c

        LEFT JOIN queues q
            ON q.counter = c.id
            AND q.status IN ('CALLING','SERVING')

        ORDER BY c.id
    `).all();

    res.json(counters);

}

function debugQueues(req, res) {

    const rows = db.prepare(`
        SELECT
            id,
            nomor,
            counter,
            status,
            called_at
        FROM queues
        ORDER BY id DESC
        LIMIT 10
    `).all();

    res.json(rows);

}

module.exports = {

    getDashboard,
    getCounters,
    debugQueues

};