const db = require("../database/database");

const counterConfig = require("../config/services");

function getCounters() {

    const counters = db.prepare(`
        SELECT *
        FROM counters
        ORDER BY id
    `).all();

    return counters.map(counter => {

        const config = counterConfig.counters[counter.id];

        return {

            id: counter.id,

            name: config?.nama || counter.name,

            layanan: config?.layanan || "-",

            status: counter.status

        };

    });

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