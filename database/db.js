const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/queue.db", (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected");
    }

});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS queues (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nomor TEXT,

            layanan TEXT,

            status TEXT,

            counter INTEGER,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

});

module.exports = db;