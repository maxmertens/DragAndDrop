/**
 * Created by Max on 03.01.17.
 */


var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var temp;

var farbe;
var color;

var output = document.getElementById('output');
var display = document.getElementById('display');

var background = document.getElementById("bg");


var posthumb;
var recwidth = $('#rec').width();


// Variable für den Progress Bar Kreis ///////////
var circle = new ProgressBar.Circle('#progress', {
    strokeWidth: 2,
    color: "#123456",
    duration: 400,
    easing: 'easeInOut',
    id: "kreis"
});



// Funktion die dauerhaft ausgeführt wird
var controllerTest = Leap.loop(function (frame) {

    farbe = Math.round(map(posthumb, -150, 150, 12, 200));


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

        fuck();

        display.innerHTML = temp + "C";

        posthumb = hand.fingers[0].dipPosition[0];

        // Tap Funktion ///////////////////////////////////////
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            pressed = true;
        }

        fuck();
        
    }
});


function fuck() {
    if (pressed == true) {

        temp = Math.round(map(posthumb, -150, 150, 12, 40));

        var r = farbe;
        var g = 0;
        var b = Math.round(200-farbe);

        color = "rgb("+r+", "+g+", "+b+")";

        console.log(color);

        $("path").css("stroke", color);
    }
}


function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
