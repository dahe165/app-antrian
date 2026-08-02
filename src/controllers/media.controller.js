const mediaService =
require("../services/media.service");

function getPlaylist(req,res){

    res.json(

        mediaService.getPlaylist()

    );

}

module.exports={

    getPlaylist

};