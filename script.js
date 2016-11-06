//initialising the game variables
var canvas;
var canvasContext;
var framesPerSecond = 30;

//variables needed for the ball
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

    window.onload = function(){
        setInterval(updateAll, 1000/framesPerSecond); //calls the update all function
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
    }

    function updateAll(){  //draws and moves everything
        moveAll();
        drawAll();
    }

    function moveAll(){

        ballX += ballSpeedX;   //makes the ball move in the x direction
        ballY += ballSpeedY;  //makes the ball move in the y direction

        if (ballY > canvas.height){
            ballSpeedY *= -1; //inverts the balls y direction
        }
        if (ballY < 0) {
            ballSpeedY *= -1; //inverts the balls y direction
        }

        if (ballX > canvas.width){
            ballSpeedX *= -1; //inverts the balls x direction
        }
        if (ballX < 0) {
            ballSpeedX *= -1; //inverts the balls x direction
        }
    }

    function drawAll(){
        colorRect(0,0,canvas.width,canvas.height, 'black');  //draw background
        colorCircle(ballX,ballY, 10, 'white'); //draw ball
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
