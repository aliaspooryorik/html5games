/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, jQuery  */

/*
 * Global variables.
 */
var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
};

var pingpong;
pingpong = {
    scoreA:0, // score for player A
    scoreB:0, // score for player B
    pressedKeys:[],
    ball:{
        speed:1,
        x:150,
        y:100,
        directionX:1,
        directionY:1,
        diameter: 20
    }
};

// element selectors
var $playground, $paddleA, $paddleB, $ball, $scoreA, $scoreB;

/*
 * Start functionality
 */

function moveBall() {
    "use strict";
    // reference useful variables
    var playgroundHeight = parseInt($playground.height(),10),
        playgroundWidth = parseInt($playground.width(),10),
        ball = pingpong.ball,
    // TODO: doesn't need to calculated here as X is fixed
        paddleAX = parseInt($paddleA.css("left"),10)+parseInt($paddleA.css("width"),10),
        paddleAYBottom = parseInt($paddleA.css("top"),10)+parseInt($paddleA.css("height"),10),
        paddleAYTop = parseInt($paddleA.css("top"),10),
    // TODO: doesn't need to calculated here as X is fixed
        paddleBX = parseInt($paddleB.css("left"),10),
        paddleBYBottom = parseInt($paddleB.css("top"),10)+parseInt($paddleB.css("height"),10),
        paddleBYTop = parseInt($paddleB.css("top"),10)

    // check playground boundary

    // check bottom edge
    if (ball.y + ball.diameter + ball.speed*ball.directionY > playgroundHeight){
        ball.directionY = -1;
    }
    // check top edge
    if (ball.y + ball.speed*ball.directionY < 0){
        ball.directionY = 1;
    }

    // check right edge
    if (ball.x +ball.speed*ball.directionX > playgroundWidth){
        // player B lost.
        pingpong.scoreA += 1;
        $scoreA.html(pingpong.scoreA);
        // reset the ball;
        ball.x = 250;
        ball.y = 100;
        $ball.css({
            "left": ball.x,
            "top" : ball.y
        });
        ball.directionX = -1;
    }
    // check left edge
    if (ball.x + ball.speed*ball.directionX < 0){
        // player A lost.
        pingpong.scoreB += 1;
        $scoreB.html(pingpong.scoreB);
        // reset the ball;
        ball.x = 150;
        ball.y = 100;
        $ball.css({
            "left": ball.x,
            "top" : ball.y
        });
        ball.directionX = 1;
    }
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // check left paddle
    if (ball.x + ball.speed*ball.directionX < paddleAX){
        if (ball.y + ball.speed*ball.directionY <= paddleAYBottom &&
            ball.y + ball.speed*ball.directionY >= paddleAYTop){
            ball.directionX = 1;
        }
    }

    // check right paddle
    if (ball.x + ball.diameter + ball.speed*ball.directionX >= paddleBX){
        if (ball.y + ball.speed*ball.directionY <= paddleBYBottom &&
            ball.y + ball.speed*ball.directionY >= paddleBYTop){
            ball.directionX = -1;
        }
    }

// actually move the ball with speed and direction
    $ball.css({
        "left" : ball.x,
        "top" : ball.y
    });
}

function movePaddles() {
    "use strict";

    var top, shift = 2;
    // use our custom timer to continuously check if a key is pressed.

    // Right paddle
    if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
        // move the paddle B up pixels
        top = parseInt($paddleB.css("top"),10);
        $paddleB.css("top",top-shift);
    }
    else if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
        // move the paddle B down 5 pixels
        top = parseInt($paddleB.css("top"),10);
        $paddleB.css("top",top+shift);
    }
    // Left paddle
    if (pingpong.pressedKeys[KEY.W]) { // w
        // move the paddle A up 5 pixels
        top = parseInt($paddleA.css("top"),10);
        $paddleA.css("top",top-shift);
    }
    else if (pingpong.pressedKeys[KEY.S]) { // s
        // move the paddle A down 5 pixels
        top = parseInt($paddleA.css("top"),10);
        $paddleA.css("top",top+shift);
    }
}


function gameloop() {
    "use strict";
    moveBall();
    movePaddles();
}


jQuery(function($){
    "use strict";
    // set global values
    $playground = $('#playground');
    $paddleA = $('#paddleA');
    $paddleB = $('#paddleB');
    $ball = $('#ball');
    $scoreA = $('#scoreA');
    $scoreB = $('#scoreB');

    var top;

    // give ball dimensions
    $ball.width(pingpong.ball.diameter).height(pingpong.ball.diameter);

    // set interval to call gameloop every 30 milliseconds
    pingpong.timer = setInterval(gameloop,30);

// listen to the key down event
    $(document).keydown(function(e){

        pingpong.pressedKeys[e.which] = true;

        switch(e.which){
            case KEY.UP: // arrow-up
// get the current paddle B's top value in Int type
                top = parseInt($paddleB.css("top"),10);
// move the paddle B up 5 pixels
                $paddleB.css("top",top-5);
                break;
            case KEY.DOWN: // arrow-down
                top = parseInt($paddleB.css("top"),10);
// move the paddle B down 5 pixels
                $paddleB.css("top",top+5);
                break;
            case KEY.W: // w
                top = parseInt($paddleA.css("top"),10);
// move the paddle A up 5 pixels
                $paddleA.css("top",top-5);
                break;
            case KEY.S: // s
                top = parseInt($paddleA.css("top"),10);
// move the paddle A drown 5 pixels
                $paddleA.css("top",top+5);

                break;
        }
    });

    $(document).keyup(function(e){
        pingpong.pressedKeys[e.which] = false;
    });
});
