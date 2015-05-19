$(function() {
    MainPageLoop();
});

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', '/sounds/lux-laugh.mp3');
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
    $.get("/motion").done(function (data) {
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
