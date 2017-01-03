/**
 * Created by Max on 03.01.17.
 */


var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var output = document.getElementById('output');
var display = document.getElementById('display');

var progress = document.getElementById('progress');
var background = document.getElementById("bg");
var sound = document.getElementById("sound");
var volume = document.getElementById("volume");

var bit1 = document.getElementById("bit1");
var bit2 = document.getElementById("bit2");
var bit3 = document.getElementById("bit3");
var bit4 = document.getElementById("bit4");
var bit5 = document.getElementById("bit5");
var bit6 = document.getElementById("bit6");
var bit7 = document.getElementById("bit7");
var bit8 = document.getElementById("bit8");
var bit9 = document.getElementById("bit9");
var bit10 = document.getElementById("bit10");
var bit11 = document.getElementById("bit11");
var bit12 = document.getElementById("bit12");
var bit13 = document.getElementById("bit13");
var bit14 = document.getElementById("bit14");
var bit15 = document.getElementById("bit15");
var bit16 = document.getElementById("bit16");

var posthumb;
var recwidth = $('#rec').width();


// Variable für den Progress Bar Kreis ///////////
var circle = new ProgressBar.Circle('#progress', {
    strokeWidth: 2,
    color: '#86C3B8',
    duration: 400,
    easing: 'easeInOut'
});



// Funktion die dauerhaft ausgeführt wird
var controllerTest = Leap.loop(function (frame) {


    if (HandIn && soundIn) {
        $.playSound("data/txting_press_b");
        soundIn = false;
        circle.animate(1);
        $("#display").css("opacity", "1");
    }
    else if (!HandIn && !soundIn) {
        $.playSound("data/txting_press_a");
        soundIn = true;
        circle.animate(0);
        $("#display").css("opacity", "0.1");
    }
    HandIn = false;
});


// Sobald die Hand über der Leap ist, wird die Funktion ausgeführt und wiederholt
Leap.loop({background: true}, {

    hand: function (hand) {
        //console.log("handincheck" + HandIn);
        HandIn = true;
        output.innerHTML = hand.pinchStrength.toPrecision(2);

        display.innerHTML = hand.pinchStrength.toPrecision(2);

        posthumb = hand.fingers[0].dipPosition[0];

        // Tap Funktion ///////////////////////////////////////
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            background.style.opacity = 1;
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            // toggle();
            pressed = true;
            background.style.opacity = 1;
        }

        // Show Volume ///////////////////////////////////////
        if (hand.pinchStrength > 0.80) {
            volume.style.opacity = 0.4;
        }
        if (hand.pinchStrength < 0.80) {
            volume.style.opacity = 0;
        }

        var range = Math.round(map(posthumb, -100, 120, 0, 100));

        if (range < 0) {
            bit1.style.opacity = 0;
        } else {
            bit1.style.opacity = 1;
        }

        if (range < 6.25) {
            bit2.style.opacity = 0;
        } else {
            bit2.style.opacity = 1;
        }

        if (range < 12.5) {
            bit3.style.opacity = 0;
        } else {
            bit3.style.opacity = 1;
        }

        if (range < 18.75) {
            bit4.style.opacity = 0;
        } else {
            bit4.style.opacity = 1;
        }

        if (range < 25) {
            bit5.style.opacity = 0;
        } else {
            bit5.style.opacity = 1;
        }

        if (range < 31.25) {
            bit6.style.opacity = 0;
        } else {
            bit6.style.opacity = 1;
        }

        if (range < 37.5) {
            bit7.style.opacity = 0;
        } else {
            bit7.style.opacity = 1;
        }

        if (range < 43.75) {
            bit8.style.opacity = 0;
        } else {
            bit8.style.opacity = 1;
        }

        if (range < 50) {
            bit9.style.opacity = 0;
        } else {
            bit9.style.opacity = 1;
        }

        if (range < 56.25) {
            bit10.style.opacity = 0;
        } else {
            bit10.style.opacity = 1;
        }

        if (range < 62.5) {
            bit11.style.opacity = 0;
        } else {
            bit11.style.opacity = 1;
        }

        if (range < 68.75) {
            bit12.style.opacity = 0;
        } else {
            bit12.style.opacity = 1;
        }

        if (range < 75) {
            bit13.style.opacity = 0;
        } else {
            bit13.style.opacity = 1;
        }

        if (range < 81.25) {
            bit14.style.opacity = 0;
        } else {
            bit14.style.opacity = 1;
        }

        if (range < 87.5) {
            bit15.style.opacity = 0;
        } else {
            bit15.style.opacity = 1;
        }

        if (range < 93.75) {
            bit16.style.opacity = 0;
        } else {
            bit16.style.opacity = 1;
        }

        fuck();
        
    }
});


function fuck() {
    if (pressed == true) {
        var color = Math.round(map(posthumb, -200, 200, 0, 100));

        var r = 70;
        var g = color;
        var b = 80;

//            background.style.backgroundColor = rgbToHex(r,g,b);

        //set Sound volume
        sound.volume = color/100;

        console.log(color);
//            background.style.opacity = posthumb.map(-50, 300, 0, 250);
//            $('#rec').width(Math.round(posthumb)*10);
    }
}


function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
