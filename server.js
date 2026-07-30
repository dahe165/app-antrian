const express = require("express");
require("./src/database/database");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const socket = require("./src/socket/socket");

socket.init(io);
const queueRoutes = require("./src/routes/queue.routes");
const queueLock = require("./src/core/queueLock");
const dashboardRoutes = require("./src/routes/dashboard.routes");
app.use(express.json());
app.use("/api", queueRoutes);
app.use("/api", dashboardRoutes);
// Folder public
app.use(express.static("public"));

// Socket.IO
io.on("connection", (client) => {

    console.log("🟢 Client terhubung:", client.id);

    // baru ditambahkan
    const queueService = require("./src/services/queue.service");
    
   // client.on("announcement-finished", () => {
    client.on("announcement-finished", (data) => {

        console.log("🟢 Server menerima announcement-finished");

        // baru tambahkan
        queueService.startServing(data.counter);

        queueLock.unlock();

        // Beritahu semua Counter bahwa sistem sudah siap lagi
        io.emit("announcement-status", {
            busy: false
        });

        // 🔥 Tambahkan ini
        io.emit("queue-updated");

    });

    client.on("disconnect", () => {

        console.log("🔴 Client keluar:", client.id);

    });

});

const PORT = 3000;

server.listen(PORT, () => {
    console.log("==================================");
    console.log(" PDAM Queue System");
    console.log("==================================");
    console.log(`Server berjalan di http://localhost:${PORT}`);
});