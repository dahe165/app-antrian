const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Pastikan folder data ada
const dataDir = path.join(__dirname, "../../data");

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Lokasi database
const dbPath = path.join(dataDir, "queue.db");

// Buka / buat database
const db = new Database(dbPath);

console.log("📁 Database:", dbPath);

// Aktifkan Foreign Key
db.pragma("foreign_keys = ON");

// Buat tabel queues

db.exec(`
CREATE TABLE IF NOT EXISTS queues (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nomor TEXT NOT NULL,

    layanan TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'WAITING',

    counter INTEGER,

    called_at DATETIME,

    finished_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS counters (

    id INTEGER PRIMARY KEY,

    name TEXT NOT NULL,

    nama TEXT,

    layanan TEXT,

    status TEXT NOT NULL DEFAULT 'OFFLINE'

);
`);

const count = db.prepare(`
SELECT COUNT(*) total
FROM counters
`).get();

if (count.total === 0) {

    const insert = db.prepare(`
        INSERT INTO counters
        (id,name,nama,layanan,status)
        VALUES (?,?,?,?,?)
    `);

    for (let i = 1; i <= 4; i++) {

        insert.run(
            i,
            `Counter ${i}`,
            `Nama Counter ${i}`,
            `Layanan ${i}`,
            "OFFLINE"
        );

    }

}

console.log("✅ Default Counter berhasil dibuat");

console.log("✅ Database siap digunakan");

// ================================
// MIGRASI COUNTERS
// ================================

const counterColumns = db
    .prepare(`PRAGMA table_info(counters)`)
    .all();

const hasNama = counterColumns.some(
    column => column.name === "nama"
);

const hasLayanan = counterColumns.some(
    column => column.name === "layanan"
);

if (!hasNama) {

    db.exec(`
        ALTER TABLE counters
        ADD COLUMN nama TEXT
    `);

    console.log("✅ Kolom nama berhasil ditambahkan");

}

if (!hasLayanan) {

    db.exec(`
        ALTER TABLE counters
        ADD COLUMN layanan TEXT
    `);

    console.log("✅ Kolom layanan berhasil ditambahkan");

}

db.prepare(`
    UPDATE counters
    SET nama = ?,
        layanan = ?
    WHERE id = ?
`).run("Customer Service", "A", 1);

db.prepare(`
    UPDATE counters
    SET nama = ?,
        layanan = ?
    WHERE id = ?
`).run("Customer Service", "A", 2);

db.prepare(`
    UPDATE counters
    SET nama = ?,
        layanan = ?
    WHERE id = ?
`).run("Customer Service", "A", 3);

db.prepare(`
    UPDATE counters
    SET nama = ?,
        layanan = ?
    WHERE id = ?
`).run("Loket Pembayaran", "B", 4);

module.exports = db;