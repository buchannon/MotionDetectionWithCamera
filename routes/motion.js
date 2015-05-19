var express = require('express');
var jzs = require('../JzsCommon');
var router = express.Router();
var _gpioPin = 14;
var _isMotionDetectedRecently = 0;

jzs.motiondetector.InitMotionDetector(_gpioPin, MotionDetectedCallback, MotionNotDetectedCallback);

//Detected!
function MotionDetectedCallback()
{
    console.log("Motion Detected!");
    _isMotionDetectedRecently = 1;
    jzs.camera.TakePicture();
}

//No motion
function MotionNotDetectedCallback()
{
    _isMotionDetectedRecently = 0;
}

//Main GET
router.get('/', function(req, res, next) {
    res.send({ MotionSensed: _isMotionDetectedRecently });
    console.log("motion detected: " + _isMotionDetectedRecently);
});

module.exports = router;