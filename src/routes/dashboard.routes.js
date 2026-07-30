const express = require("express");

const router = express.Router();

const dashboard =
require("../controllers/dashboard.controller");

router.get("/dashboard", dashboard.getDashboard);

router.get("/dashboard/counters", dashboard.getCounters);

router.get("/debug/queues", dashboard.debugQueues);

module.exports = router;