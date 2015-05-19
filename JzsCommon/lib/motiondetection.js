var utils = require('./utils');
console.log("jzs motion detection loaded");

var Gpio, motionSensor;
exports.InitMotionDetector = function(gpioPin, motionDetectedCallback, motionNotDetectedCallback) {
    var onOff = utils.SafeRequire('onoff');
    if (onOff) {
        Gpio = onOff.Gpio;
        motionSensor = new Gpio(gpioPin, 'in', 'both');
        console.log("connected to GPIO pin: " + gpioPin);

        motionSensor.watch(function(err, _isMotionDetected) {
            if (err) exit();

            if (_isMotionDetected)
                motionDetectedCallback();
            else
                motionNotDetectedCallback();
        });
    }
};