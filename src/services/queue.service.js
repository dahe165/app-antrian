const db = require("../database/database");

/**
 * Membuat nomor antrean berikutnya
 */
function getNextQueueNumber(prefix = "A") {

    const row = db.prepare(`
        SELECT nomor
        FROM queues
        WHERE layanan = ?
        ORDER BY id DESC
        LIMIT 1
    `).get(prefix);

    if (!row) {
        return prefix + "001";
    }

    const number = parseInt(row.nomor.substring(1), 10) + 1;

    return prefix + number.toString().padStart(3, "0");
}

/**
 * Membuat antrean baru
 */
function createQueue(layanan = "A") {

    const nomor = getNextQueueNumber(layanan);

    db.prepare(`
        INSERT INTO queues
        (nomor, layanan, status)
        VALUES (?, ?, 'WAITING')
    `).run(nomor, layanan);

    return nomor;
}

/**
 * Mengambil semua antrean yang masih menunggu
 */
function getWaitingQueues(layanan = "A") {

    return db.prepare(`
        SELECT *
        FROM queues
        WHERE layanan = ?
        AND status = 'WAITING'
        ORDER BY id ASC
    `).all(layanan);

}

/**
 * Mengambil antrean yang sedang dipanggil
 */
function getCurrentQueue(counter = 1) {

    return db.prepare(`
        SELECT *
        FROM queues
        WHERE counter = ?
        AND status = 'CALLING'
        LIMIT 1
    `).get(counter);

}

/**
 * Memanggil antrean berikutnya
 */
function callNextQueue(counter = 1, layanan = "A") {

    // jika counter masih memanggil nomor sebelumnya
    const current = getCurrentQueue(counter);

    if (current) {

        db.prepare(`
            UPDATE queues
            SET status='SERVING'
            WHERE id=?
        `).run(current.id);

    }

    // ambil antrean berikutnya
    const next = db.prepare(`
        SELECT *
        FROM queues
        WHERE layanan=?
        AND status='WAITING'
        ORDER BY id ASC
        LIMIT 1
    `).get(layanan);

    if (!next) {

        return null;

    }

    db.prepare(`
        UPDATE queues
        SET
            status='CALLING',
            counter=?,
            called_at=CURRENT_TIMESTAMP
        WHERE id=?
    `).run(counter, next.id);

    return db.prepare(`
        SELECT *
        FROM queues
        WHERE id=?
    `).get(next.id);

}

/**
 * Selesaikan pelayanan
 */
function finishQueue(id) {

    db.prepare(`
        UPDATE queues
        SET
            status='FINISHED',
            finished_at=CURRENT_TIMESTAMP
        WHERE id=?
    `).run(id);

}

/**
 * Lewati antrean
 */
function skipQueue(id) {

    db.prepare(`
        UPDATE queues
        SET
            status='SKIPPED'
        WHERE id=?
    `).run(id);

}

module.exports = {

    createQueue,

    getWaitingQueues,

    getCurrentQueue,

    callNextQueue,

    finishQueue,

    skipQueue

};