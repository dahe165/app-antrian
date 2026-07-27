const db = require("../database/database");

function getCounters() {

    return db.prepare(`
        SELECT *
        FROM counters
        ORDER BY id
    `).all();

}

function setCounterStatus(id, status) {

    return db.prepare(`
        UPDATE counters
        SET status=?
        WHERE id=?
    `).run(status, id);

}

function getCounter(id) {

    return db.prepare(`
        SELECT *
        FROM counters
        WHERE id=?
    `).get(id);

}

module.exports = {

    getCounters,

    setCounterStatus,

    getCounter

};