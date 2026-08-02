const express = require("express");

const router = express.Router();

const displayController =
require("../controllers/display.controller");

router.get(
    "/timeline",
    displayController.getTimeline
);

module.exports = router;