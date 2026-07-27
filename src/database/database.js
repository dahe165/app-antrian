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
        (id,name,status)
        VALUES (?,?,?)
    `);

    for (let i = 1; i <= 4; i++) {

        insert.run(
            i,
            `Counter ${i}`,
            "OFFLINE"
        );

    }

}

console.log("✅ Default Counter berhasil dibuat");

console.log("✅ Database siap digunakan");

module.exports = db;