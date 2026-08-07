const db = require("../database/database");
const activityBus = require("../socket/activityBus");

function getTimeline() {

    const activity = activityBus.getRecent(4);

    const waiting = db.prepare(`
        SELECT nomor
        FROM queues
        WHERE status='WAITING'
        ORDER BY id DESC
    `).all();

    return {
        activity,
        waiting
    };

}

module.exports = {
    getTimeline
};