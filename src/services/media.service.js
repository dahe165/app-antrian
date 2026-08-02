const fs = require("fs");
const path = require("path");

const mediaFolder = path.join(
    __dirname,
    "../../public/media/"
);

function getPlaylist(){

    if(!fs.existsSync(mediaFolder)){

        return [];

    }

    const files = fs.readdirSync(mediaFolder);

    return files
        .filter(file=>{

            return /\.(mp4|webm|ogg|jpg|jpeg|png|webp)$/i.test(file);

        })
        .map(file=>{

            return{

                name:file,

                url:`/media/${file}`,

                type:file.match(/\.(mp4|webm|ogg)$/i)
                    ?"video"
                    :"image"

            };

        });

}

module.exports={

    getPlaylist

};