const reportService = require("../services/report.service");

function getDetail(req,res){

    try{

        const data = reportService.getDetail();

        res.json(data);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}

function getReport(req,res){

    try{

        const summary = reportService.getSummary();

        res.json(summary);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}

function getStatistics(req,res){

    try{

        const data = reportService.getStatistics();

        res.json(data);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}

module.exports={

    getReport,

    getDetail,

    getStatistics

};