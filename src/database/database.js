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

console.log("✅ Database siap digunakan");

module.exports = db;