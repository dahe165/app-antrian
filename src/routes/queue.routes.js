const express = require("express");
const router = express.Router();

const queueController = require("../controllers/queue.controller");

// Membuat nomor antrean
router.post("/ticket", queueController.createQueue);

// Daftar antrean yang menunggu
router.get("/waiting", queueController.getWaitingQueues);

// Nomor yang sedang dipanggil
router.get("/current", queueController.getCurrentQueue);

// Panggil nomor berikutnya
router.post("/call", queueController.callNextQueue);

// Selesaikan pelayanan
router.post("/finish", queueController.finishQueue);

router.post("/recall", queueController.recallQueue);

router.post("/skip", queueController.skipQueue);

module.exports = router;