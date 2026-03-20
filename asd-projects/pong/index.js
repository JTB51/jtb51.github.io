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
  
  const KEY = {
    UP: 38, // right player 
    DOWN: 40,

    W: 87, // left player
    S: 83, 

    SPACE: 32,
    ENTER: 13,
  }
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
  let ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                          

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    moveObject(paddleLeft);
    moveObject(paddleRight);
    wallCollision(ball);
    wallCollision(paddleLeft);
    wallCollision(paddleRight);
    doCollide(paddleRight, ball);
    doCollide(paddleLeft, ball);
  }
  
  /* 
  Called in response to events.
  */
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

  function doCollide (paddle, ball) {
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
        obj.speedX = -obj.speedX;
      } else if (obj.x > BOARD_WIDTH - obj.width) {
        obj.speedX = -obj.speedX;
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
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
