const counterService = require("../services/counter.service");

function getCounters(req, res) {

    try {

        res.json(counterService.getCounters());

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

function setStatus(req, res) {

    try {

        const id = Number(req.body.id);
        const status = req.body.status;

        counterService.setCounterStatus(id, status);

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

module.exports = {

    getCounters,

    setStatus

};