const socket = require("../socket/socket");

function emitQueueUpdated() {

    socket.getIO().emit("queue-updated");

}

function emitQueueCalled(queue) {

    socket.getIO().emit("queue-called", queue);

}

function emitAnnouncementStatus(busy) {

    socket.getIO().emit("announcement-status", {
        busy
    });

}

module.exports = {

    emitQueueUpdated,

    emitQueueCalled,

    emitAnnouncementStatus

};