const db = require("../database/database");

function getTimeline() {

    return db.prepare(`
        SELECT
            nomor,
            status,
            counter
        FROM queues
        WHERE status IN (
            'WAITING',
            'CALLING',
            'SERVING',
            'FINISHED',
            'SKIPPED'
        )
        ORDER BY id DESC
        LIMIT 5
    `).all();

}

module.exports = {

    getTimeline

};