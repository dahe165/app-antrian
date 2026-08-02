const socket = require("./socket");

function log(type, message) {

    socket.getIO().emit("activity-log", {

        time: new Date().toLocaleTimeString("id-ID"),

        type,

        message

    });

}

module.exports = {

    log

};