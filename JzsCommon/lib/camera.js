var utils = require('./utils');
console.log("jzs camera loaded");

exports.TakePicture = function() {
    var filename = './captured/' + utils.Timestamp() + '.jpg';
    console.log("Taking picture to: " + filename);
    var RaspiCam = require("raspicam"); //https://github.com/troyth/node-raspicam
    var cameraOptions = {
        'mode': 'photo',
        'output': filename,
        'rot': 180
    };
    var camera = new RaspiCam(cameraOptions);
    camera.start();
    console.log("Picture finished");
};