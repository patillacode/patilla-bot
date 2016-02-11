fs = require('fs');
config = require('../config');

function getKittenImagePath(){
    var file_list = fs.readdirSync(config.images_path);
    var random_pos = Math.floor(Math.random() * file_list.length);
    return config.images_path+"/"+file_list[random_pos];
}

exports.getKittenImagePath = getKittenImagePath;