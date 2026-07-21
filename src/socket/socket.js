let io = null;

/**
 * Inisialisasi Socket.IO
 */
function init(serverIo) {
    io = serverIo;
}

/**
 * Ambil instance Socket.IO
 */
function getIO() {

    if (!io) {
        throw new Error("Socket.IO belum diinisialisasi.");
    }

    return io;
}

module.exports = {
    init,
    getIO
};