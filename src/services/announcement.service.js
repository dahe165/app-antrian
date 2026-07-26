let busy = false;

function isBusy() {
    return busy;
}

function start() {
    busy = true;
    console.log("🔴 Announcement BUSY");
}

function finish() {
    busy = false;
    console.log("🟢 Announcement READY");
}

module.exports = {
    isBusy,
    start,
    finish
};
announcement.start();

setTimeout(() => {
    announcement.finish();
}, 8000);

if (announcement.isBusy()) {
    return res.json({
        success: false,
        message: "Masih ada pengumuman berlangsung."
    });
}