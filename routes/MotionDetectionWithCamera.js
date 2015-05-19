var express = require('express');
var jzs = require('../JzsCommon');
var router = express.Router();
var _gpioPin = 14;
var _isMotionDetectedRecently = 0;
var Gpio, motioinSensor;

InitMotionDetector(MotionDetectedCallback, MotionNotDetectedCallback);

function exit() {
    motioinSensor.unexport();
    process.exit();
}

function InitMotionDetector(motionDetectedCallback, motionNotDetectedCallback)
{
    var onOff = jzs.utils.SafeRequire('onoff');
    if (onOff) {
        Gpio = onOff.Gpio;
        motioinSensor = new Gpio(_gpioPin, 'in', 'both');
        console.log("connected to GPIO pin: " + _gpioPin);

        motioinSensor.watch(function(err, _isMotionDetected) {
            if (err) exit();

            if (_isMotionDetected)
                motionDetectedCallback();
            else
                motionNotDetectedCallback();
        });
    }
}

//Detected!
function MotionDetectedCallback()
{
    console.log("Motion Detected!");
    _isMotionDetectedRecently = 1;
    TakePicture();
}

//No motion
function MotionNotDetectedCallback()
{
    _isMotionDetectedRecently = 0;
}

var takingPicture = false;
function TakePicture() {
    var filename = '../captured/' + jzs.utils.Timestamp + '.jpg';
    console.log("Taking picture to: " + filename);
    var RaspiCam = require("raspicam");
    var cameraOptions = {
        'mode': 'photo',
        'output': filename
    };
    var camera = new RaspiCam(cameraOptions);
    camera.start();
    console.log("Picture finished");
}

//Main GET
router.get('/', function(req, res, next) {
    res.send({ MotionSensed: _isMotionDetectedRecently });
    console.log("motion detected: " + _isMotionDetectedRecently);
});


//// button is attaced to pin 17, led to 18
//var pin = 11;
//var GPIO = require('onoff').Gpio,
//    led = new GPIO(pin, 'out');
//
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//    var onOffValue = req.params.onOffValue;
//
//    led.writeSync(onOffValue);
//    res.send('bulb ' + onOffValue + ', pin: ' + pin);
//});


//router.get('/', function(req, res, next) {
//    console.log(req);
//    //var onOffValue = req.params.OnOffValue;
//    var onOffValue = req.query.OnOffValue;
//    res.send('bulb ' + onOffValue + ', pin: test');
//});


//var pin = 14;
//var GPIO, motionSensor;
//GPIO = require('onoff').Gpio;
//led = new GPIO(pin, 'out');
//
//router.get('/', function(req, res, next) {
//    //console.log(req);
//    //var onOffValue = req.params.OnOffValue;
//
//    var onOffValue = parseInt(req.query.OnOffValue);
//    led.writeSync(onOffValue);
//    res.send('bulb ' + onOffValue + ', pin: ' + pin);
//});

module.exports = router;