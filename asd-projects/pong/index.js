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
  const MAX_BALL_SPEED = 1000;
  
  const KEY = {
    UP: 38, // right player 
    DOWN: 40,

    W: 87, // left player
    S: 83, 

    SPACE: 32,
    ENTER: 13,
  }
  
  // Game variables
  let gameActive = true;
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

  let paddleLeft = GameItem("#paddleLeft", 5, 0, 0, 0);
  let paddleRight = GameItem("#paddleRight", BOARD_WIDTH - PLAYER_WIDTH - 5, BOARD_HEIGHT - PLAYER_HEIGHT, 0, 0);
  let ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED), (Math.random() > 0.5 ? -BASE_BALL_SPEED : BASE_BALL_SPEED));
  ball.spin = 0; // Angular spin (controls curve direction)
  ball.spinDecay = 0.98; // Spin slows down over time
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  updateScoreDisplay();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function newFrame() {
    if (!gameActive) return;
    
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
    if (event.which === KEY.UP) {
        paddleRight.speedY = -5;
    } else if (event.which === KEY.DOWN) {
        paddleRight.speedY = 5;
    }
    if (event.which === KEY.W) {
        paddleLeft.speedY = -5;
    } else if (event.which === KEY.S) {
        paddleLeft.speedY = 5;
    }
    
    // Restart on SPACE when game is over
    if (event.which === KEY.SPACE && !gameActive) {
      event.preventDefault();
      restartGame();
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
      let currentSpeed = Math.sqrt(obj2.speedX ** 2 + obj2.speedY ** 2);
      if (currentSpeed < MAX_BALL_SPEED) {
        let speedMultiplier = 1.05;
        obj2.speedX *= speedMultiplier;
        obj2.speedY *= speedMultiplier;
      }
      
      // Randomize Y speed
      obj2.speedY = (Math.random() * 12) - 6;
      
      // Apply random spin for curving effect
      obj2.spin = (Math.random() * 8) - 4; // Random spin between -4 and 4
      
      obj2.speedX = -obj2.speedX;
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
        if (rightScore >= 7) {
          endGameWithWinner("right");
        } else {
          resetBall();
        }
      } else if (obj.x > BOARD_WIDTH - obj.width) {
        // Ball went off right side - left player scores
        leftScore++;
        updateScoreDisplay();
        if (leftScore >= 7) {
          endGameWithWinner("left");
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
  if (obj === ball && Math.abs(obj.spin) > 0.1) {
    // Apply Magnus effect curve
    const magnusStrength = 0.15; // Adjust for more/less curve
    const curveForce = obj.spin * magnusStrength;
    
    // Apply perpendicular force to velocity (creates curve)  ----> I found the magnus curve stuff online on various websites (magnus wtv effect is the proper name for beachball curve)
    if (Math.abs(obj.speedX) > 0.1) {
      obj.speedY += curveForce;
    }
    
    // Decay spin over time
    obj.spin *= obj.spinDecay;
  }
  
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
  
  function endGameWithWinner(winner) {
    gameActive = false;
    
    let winnerText = winner === "left" ? "LEFT PLAYER WINS!" : "RIGHT PLAYER WINS!";
    let $overlay = $("<div class='game-over-overlay'></div>");
    let $winnerMessage = $("<div class='winner-message'>" + winnerText + "</div>");
    let $restartMessage = $("<div class='restart-message'> Press SPACE to restart </div>");
    
    $overlay.append($winnerMessage);
    $overlay.append($restartMessage);
    
    $("#board").append($overlay);
  }
  
  function restartGame() {
    gameActive = true;
    leftScore = 0;
    rightScore = 0;
    updateScoreDisplay();
    resetBall();
    
    // Reset paddle positions
    paddleLeft.y = 0;
    paddleRight.y = BOARD_HEIGHT - PLAYER_HEIGHT;
    paddleLeft.speedY = 0;
    paddleRight.speedY = 0;
    
    $(paddleLeft.id).css("top", paddleLeft.y);
    $(paddleRight.id).css("top", paddleRight.y);
    
    // Remove game over overlay
    $(".game-over-overlay").remove();
  }
  
  function endGame() {
    clearInterval(interval);
    $(document).off();
  }
}