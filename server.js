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
app.use(express.json());
app.use("/api", queueRoutes);
// Folder public
app.use(express.static("public"));

// Socket.IO
io.on("connection", (client) => {

    console.log("🟢 Client terhubung:", client.id);

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