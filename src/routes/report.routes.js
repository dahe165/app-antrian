const express = require("express");

const router = express.Router();

const reportController = require("../controllers/report.controller");

router.get("/report",reportController.getReport);

router.get("/report/detail", reportController.getDetail);

router.get("/report/statistics", reportController.getStatistics);

module.exports = router;