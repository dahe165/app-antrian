const express=require("express");

const router=express.Router();

const controller=
require("../controllers/media.controller");

router.get(
    "/playlist",
    controller.getPlaylist
);

module.exports=router;