const displayService = require("../services/display.service");

function getTimeline(req, res) {

    try {

        const data = displayService.getTimeline();

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}



module.exports = {

    getTimeline

};