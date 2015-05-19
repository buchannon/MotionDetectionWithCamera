//var Gpio, motioinSensor;
//Gpio = require('onoff').Gpio;
//motioinSensor = new Gpio(14, 'in', 'both');
//
//function exit() {
//    //buzzer.unexport();
//    motioinSensor.unexport();
//    process.exit();
//}

function StartScanning() {
    console.log('Started Scanning');

    motioinSensor.watch(function(err, value) {
        if (err) exit();
        //buzzer.writeSync(value);
        console.log('MOTION DETECTED ( ) )#=======D');
        //if(value == 1)  require('./mailer').sendEmail();
    });
}

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Motion Detection With Pics' });
});

module.exports = router;
