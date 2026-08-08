const db = require("../database/database");

// ================================
// GET ALL COUNTERS
// ================================

function getCounters() {

    const counters = db.prepare(`
        SELECT *
        FROM counters
        ORDER BY id
    `).all();

    return counters.map(counter => {

        return {

            id: counter.id,

            name: counter.nama || counter.name,

            layanan: counter.layanan || "-",

            status: counter.status

        };

    });
}

// ================================
// UPDATE COUNTER
// ================================

function updateCounter(id, nama, layanan) {

    return db.prepare(`
        UPDATE counters
        SET nama = ?,
            layanan = ?
        WHERE id = ?
    `).run(nama, layanan, id);

}

// ================================
// SET COUNTER STATUS
// ================================

function setCounterStatus(id, status) {

    return db.prepare(`
        UPDATE counters
        SET status=?
        WHERE id=?
    `).run(status, id);

}

// ================================
// GET SINGLE COUNTER
// ================================

function getCounter(id) {

    return db.prepare(`
        SELECT *
        FROM counters
        WHERE id=?
    `).get(id);

}


// ================================
// EXPORT
// ================================

module.exports = {

    getCounters,

    setCounterStatus,

    getCounter,

    updateCounter

};