fs = require('fs');
config = require('./config');

function getKittenImagePath(){
    file_list = fs.readdirSync(config.images_path);
    return config.images_path+"/kitten_"+Math.floor(Math.random() * file_list.length)+".jpg";
}

exports.getKittenImagePath = getKittenImagePath;