$(function() {
    MainPageLoop();
});

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', '/sounds/barking-dog.mp3');
//audioElement.setAttribute('autoplay', 'autoplay');
var makingNoise = false;

function MakeNoise() {
    makingNoise = true;
    console.log("Starting noise");
    audioElement.play();
}

function StopNoise() {
    makingNoise = false;
    console.log("Stopping noise");
    audioElement.pause();
}

function StopAll() {
    StopNoise();
    _motionSensorWorking = false;
}

var StartSensing = function() {
    //checkMotionSensor();
    _motionSensorWorking = true;
};

var _motionSensorWorking = false;
var _timeOut = 500;
function MainPageLoop() {
    if (_motionSensorWorking)
    {
        DoMotionSensor(_timeOut);
    }
    setTimeout(MainPageLoop, _timeOut); //1000ms = 1s
}

function DoMotionSensor(pollTimeJs)
{
    $.get("/MotionDetection").done(function (data) {
        if (data && data.MotionSensed) {
            if (!makingNoise)
                MakeNoise();
        }
        else
        {
            if (makingNoise)
                StopNoise();
        }
    });
}

//var checkingMotionSensor = function(onOff) {
//    onOff = typeof onOff !== 'undefined' ? onOff : false;
//    alert(onOff);
//    var _onOff = onOff;
//    return function() { return {checking: _onOff } }
//};
//
//
//while(checkingMotionSensor().checking)
//{
//    DoMotionSensor(500);
//}
//
//function DoMotionSensor(pollTimeJs)
//{
//    $.get("/MotionDetection").done(function (data) {
//        if (data && data.MotionSensed) {
//            MakeNoise();
//        }
//        else {
//            setTimeout(DoMotionSensor, pollTimeJs);
//        }
//    });
//}
//
//var motionSensorActive = function(){
//    var _motionSensorActive = false;
//    return function() {
//        $.get("/MotionDetection").done(function (data) {
//            if (data && data.MotionSensed) {
//                MakeNoise();
//            }
//            else {
//                setTimeout(checkMotionSensor, 500); //1000ms = 1s
//            }
//        });
//    };
//
//    while(motionSensorActive) {
//        $.get("/MotionDetection").done(function (data) {
//            if (data && data.MotionSensed) {
//                MakeNoise();
//            }
//            else {
//                setTimeout(checkMotionSensor, 500); //1000ms = 1s
//            }
//        });
//    }
//};

//var BlinkOff = function() {
//    //$.get( "/ServerBlinkOn", { name: "John", time: "2pm" } )
//    $.get("/Bulb", { OnOffValue: "0"}).done(function( data ) {
//        //alert( data );
//    });
//};