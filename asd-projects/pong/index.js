/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PLAYER_WIDTH = $(".paddle").width();
  const PLAYER_HEIGHT = $(".paddle").height();
  const BASE_BALL_SPEED = 3;
  
  const KEY = {
    UP: 38, // right player 
    DOWN: 40,

    W: 87, // left player
    S: 83, 

    SPACE: 32,
    ENTER: 13,
  }
  
  // Game variables
  let gameActive = false;
  let gameOver = false; 
  let leftScore = 0;
  let rightScore = 0;
  
  // Game Item Objects
  function GameItem (id, x, y, speedX, speedY){
    var gameItem = {};
    gameItem.id = id;
    gameItem.x = x;
    gameItem.y = y;
    gameItem.speedX = speedX;
    gameItem.speedY = speedY;
    gameItem.width = $(id).width();
    gameItem.height = $(id).height(); 
    return gameItem; 
  }

  startMenu();

  let paddleLeft = GameItem("#paddleLeft", 5, 0, 0, 0);
  let paddleRight = GameItem("#paddleRight", BOARD_WIDTH - PLAYER_WIDTH - 5, BOARD_HEIGHT - PLAYER_HEIGHT, 0, 0);
  let ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED), (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED));

  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  updateScoreDisplay();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startMenu () {
    $("#paddleRight").hide();
    $("#paddleLeft").hide();
    $("#ball").hide();
    $("#score1").hide();
    $("#score2").hide();
    $("#divider").hide();
    $(".score-left").hide();
    $(".score-right").hide();
  };

  function initGame() {
    $(".welcome").hide();
    $("#ball").show();
    $("#paddleLeft").show();
    $("#paddleRight").show();
    $("#score1").show();
    $("#score2").show();
    $("#divider").show();
    $(".score-left").show();
    $(".score-right").show();
    gameActive = true; 
    gameOver = false; 
    resetBall();
    leftScore = 0;
    rightScore = 0;
    updateScoreDisplay();
  }

  function endGameWinner(direction) {
    gameActive = false; 
    
    $("#paddleRight").hide();
    $("#paddleLeft").hide();
    $("#ball").hide();
    $("#score1").hide();
    $("#score2").hide();
    $("#divider").hide();
    $(".score-left").hide();
    $(".score-right").hide();
    $(".welcome").show().text("The " + direction + " side has won the game!").css("height", "67%");
    $("#start").show().text("Please press Space to play again!").css("top", "380px");
  }

  function newFrame() {
    if (!gameActive) {
      return;
    } 
    moveObject(ball);
    moveObject(paddleLeft);
    moveObject(paddleRight);
    wallCollision(ball);
    wallCollision(paddleLeft);
    wallCollision(paddleRight);
    doCollide(paddleRight, ball);
    doCollide(paddleLeft, ball);
  }
  
  function handleKeyDown(event) {
    if (event.which === KEY.SPACE && !gameActive || event.which === KEY.SPACE && gameOver === true) {
      initGame();
    }
    if (event.which === KEY.UP) {
        paddleRight.speedY = -10;
    } else if (event.which === KEY.DOWN) {
        paddleRight.speedY = 10;
    }
    if (event.which === KEY.W) {
        paddleLeft.speedY = -10;
    } else if (event.which === KEY.S) {
        paddleLeft.speedY = 10;
    }
  }

  function handleKeyUp (event){
    if (event.which === KEY.W || event.which === KEY.S) {
      paddleLeft.speedY = 0;
    }

    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddleRight.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function doCollide (obj1, obj2) {
  if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {
    
    if (obj2 === ball) {  
      // Randomize Y speed
      obj2.speedY = Math.random() * 11; 
      // Speed up the X speed 
      obj2.speedX *= -1.1; 
    }
    return true; 
  } else {
    return false;
  }
}

  function wallCollision (obj) {
    if (obj === paddleLeft || obj === paddleRight) {
      if (obj.y < 10) {
        obj.y = 5; 
      } else if (obj.y > BOARD_HEIGHT - obj.height - 10) {
        obj.y = BOARD_HEIGHT - obj.height - 5; 
      }
    }

    if (obj === ball) {
      if (obj.x < 0) {
        // Ball went off left side - right player scores
        rightScore++;
        updateScoreDisplay();
        if (rightScore >= 10) {
          endGameWinner("RIGHT");
          gameOver = true;
        } else {
          resetBall();
        }
      } else if (obj.x > BOARD_WIDTH - obj.width) {
        // Ball went off right side - left player scores
        leftScore++;
        updateScoreDisplay();
        if (leftScore >= 10) {
          endGameWinner("LEFT");
          gameOver = true;
        } else {
          resetBall();
        }
      }
      
      if (obj.y < 0) {
        obj.speedY = -obj.speedY;
      } else if (obj.y > BOARD_HEIGHT - obj.height) {
        obj.speedY = -obj.speedY;
      }
    }
  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  
  function updateScoreDisplay() {
    $("#leftScore").text(leftScore);
    $("#rightScore").text(rightScore);
  }
  
  function resetBall() {
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED);
    ball.speedY = (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED);
    $(ball.id).css("left", ball.x);
    $(ball.id).css("top", ball.y);
  }
  
  function endGame() {
    clearInterval(interval);
    $(document).off();
  }
}