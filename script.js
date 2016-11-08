//initialising the game variables
var canvas;
var canvasContext;
var framesPerSecond = 30;
var mouseX;
var mouseY;

//variables needed for the ball
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

//paddle variables
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

//brick variables
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_COLS = 10;
const BRICK_GAP = 2;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);


window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    setInterval(updateAll, 1000/framesPerSecond); //calls the update all function
    canvas.addEventListener('mousemove', updateMousePos); //when the mouse moves call updateMousePos()
    brickReset(); //makes the array of bricks
}

function ballReset(){  //resets the balls position when the player misses it
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function updateMousePos(evt){  //makes the paddle move with the mouse
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;  //mouses x position
    mouseY = evt.clientY - rect.top - root.scrollTop;  //mouses y position
    paddleX = mouseX - PADDLE_WIDTH/2;  //sets the paddles pos to the mouses pos minus the paddleWidth/2 for the center of the paddle
}

function updateAll(){  //draws and moves everything
    moveAll();
    drawAll();
}

function moveAll(){

    ballX += ballSpeedX;   //makes the ball move in the x direction
    ballY += ballSpeedY;  //makes the ball move in the y direction

    if (ballY > canvas.height){ //bottom
        ballReset();
    }
    if (ballY < 0) { //top
        ballSpeedY *= -1; //inverts the balls y direction
    }
    if (ballX > canvas.width){ //right side
        ballSpeedX *= -1; //inverts the balls x direction
    }
    if (ballX < 0) {  //left side
        ballSpeedX *= -1; //inverts the balls x direction
    }
    //initialising variables for collisions
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + PADDLE_WIDTH;
    if (ballY > paddleTopEdgeY && //the ball is below the top of the paddle
        ballY < paddleBottomEdgeY && //the ball is above the bottom of the paddle
        ballX > paddleLeftEdgeX && //the ball is to the right of the left side of the paddle
        ballX < paddleRightEdgeX) { //the ball is to the left of the right side of the paddle
        //in the if statement
        ballSpeedY *= -1; //inverts the balls y direction
        var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
        ballSpeedX = ballDistFromPaddleCenterX * 0.35; //the further the ball is from the center the greater its x speed will be
    }
}

function drawAll(){
    colorRect(0,0,canvas.width,canvas.height, 'black');  //draw background
    colorCircle(ballX,ballY, 10, 'white'); //draw ball
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
    drawBricks();
    var mouseBrickCol = Math.floor(mouseX / BRICK_W);
    var mouseBrickRow = Math.floor(mouseY / BRICK_H);
    var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickRow, mouseBrickCol);
    colorText(mouseBrickCol + ',' + mouseBrickRow + ':' + brickIndexUnderMouse, mouseX, mouseY, 'yellow'); //shows the mouses coordinates next to the mouse for debugging
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor ){ //a function that makes a rectangle
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

function colorCircle(centreX, centreY, radius, fillColor){   //a function that makes a circle
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centreX,centreY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText(text, cornerX, cornerY, fillColor){  //a function to draw text
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(text, cornerX, cornerY);
}

function brickReset(){  //a function that creates an array for the bricks
    for (var i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
        Math.random() > 0.5 ? brickGrid[i] = true : brickGrid[i] = false; //using a ternary operator to randomise brick placement
    }
}

function rowColToArrayIndex(row,col){
    return col + BRICK_COLS * row;
}

function drawBricks(){  //a function to draw all the bricks
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){  //loops through the rows
        for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {  //loops throught the columns
            var arrayIndex = rowColToArrayIndex(eachRow,eachCol);
            if(brickGrid[arrayIndex]){
                colorRect(BRICK_W*eachCol,BRICK_H*eachRow,BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP,'blue');
            }
        }
    }
}
