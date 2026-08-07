const socket = require("./socket");

const history=[];

function log(type, nomor, counter, message){

    const item = {

    time: new Date().toLocaleTimeString("id-ID"),

    type,

    nomor,

    counter,

    message

};

    history.unshift(item);

    if(history.length>20){

        history.pop();

    }

    socket
        .getIO()
        .emit(
            "activity-log",
            item
        );

}

function getRecent(limit=4){

    return history.slice(0,limit);

}

module.exports={

    log,

    getRecent

};