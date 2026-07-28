const queueService = require("../services/queue.service");
const socket = require("../socket/socket");
const queueLock = require("../core/queueLock");
/**
 * Membuat nomor antrean baru
 */
function createQueue(req, res) {

    try {

        const layanan = req.body?.layanan || "A";

        const nomor = queueService.createQueue(layanan);

        // Beri tahu semua Counter bahwa daftar antrean berubah
        socket.getIO().emit("queue-updated");

        res.status(201).json({
            success: true,
            nomor
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

/**
 * Mengambil semua antrean yang masih menunggu
 */
function getWaitingQueues(req, res) {

    try {

        const layanan = req.query.layanan || "A";

        const data = queueService.getWaitingQueues(layanan);

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

/**
 * Mengambil nomor yang sedang dipanggil
 */
function getCurrentQueue(req, res) {

    try {

        const counter = Number(req.query.counter || 1);

        // const data = queueService.getCurrentQueue(counter);
        const data = queueService.getActiveQueue(counter);

        res.json(data || null);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

function recallQueue(req, res) {

    try {

        const counter = Number(req.body.counter || 1);

        const queue = queueService.recallQueue(counter);

        if (!queue) {

            return res.json({
                success: false,
                message: "Tidak ada nomor yang sedang dilayani."
            });

        }

        queueLock.lock();

        socket.getIO().emit("announcement-status", {
            busy: true
        });

        console.log("🔄 RECALL:", queue);

        socket.getIO().emit("queue-called", queue);

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

function skipQueue(req, res) {

    try {

        const counter = Number(req.body.counter || 1);
        const layanan = req.body.layanan || "A";

        const current = queueService.getServingQueue(counter);

        if (!current) {

            return res.json({
                success:false,
                message:"Tidak ada antrean yang sedang dilayani."
            });

        }

        console.log("⏭ SKIP:", current.nomor);

        queueService.skipQueue(current.id);

        const next = queueService.callNextQueue(counter, layanan);

        if (!next) {

            socket.getIO().emit("queue-updated");

            return res.json({
                success:true
            });

        }

        queueLock.lock();

        socket.getIO().emit("announcement-status",{
            busy:true
        });

        socket.getIO().emit("queue-called",next);

        socket.getIO().emit("queue-updated");

        res.json({
            success:true
        });

    } catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

/**
 * Memanggil antrean berikutnya
 */
function callNextQueue(req, res) {

    console.log("🔥🔥🔥 CALL NEXT MASUK 🔥🔥🔥");
    console.log("Waktu Node sekarang:", new Date());

    try {

        const counter = Number(req.body.counter || 1);
        const layanan = req.body.layanan || "A";

        if (queueLock.isLocked()) {

           return res.json({
           success: false,
           message: "Masih ada pengumuman yang sedang berlangsung."
        });

        }
        
        const data = queueService.callNextQueue(counter, layanan);

        if (!data) {

            return res.status(404).json({
                success: false,
                message: "Tidak ada antrean menunggu."
            });

        }

        queueLock.lock();

        // Semua Counter tahu bahwa sedang ada pengumuman
        socket.getIO().emit("announcement-status", {
            busy: true
        });

        console.log("📢 Mengirim queue-called:", data);

        // Kirim event ke semua browser yang terhubung
        socket.getIO().emit("queue-called", data);
        socket.getIO().emit("queue-updated");
        res.json({
            success: true,
            data
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

function finishQueue(req, res) {

    try {

        const counter = Number(req.body.counter || 1);

        const current = queueService.getServingQueue(counter);

        console.log("CURRENT SERVING:", current);

        if (!current) {

            return res.json({
                success: false,
                message: "Tidak ada pelanggan yang sedang dilayani."
            });

        }

        console.log("AKAN FINISH ID:", current.id);

        queueService.finishQueue(current.id);

        socket.getIO().emit("queue-updated");

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

module.exports = {

    createQueue,

    getWaitingQueues,

    getCurrentQueue,

    callNextQueue,

    finishQueue,

    recallQueue,

    skipQueue

};