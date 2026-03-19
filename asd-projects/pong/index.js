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
  const PLAYER_WIDTH = $(".player").width();
  const PLAYER_HEIGHT = $(".player").height();
  
  const KEY = {
    UP: 38, // right player 
    DOWN: 40,

    W: 87, // left player
    S: 83, 

    SPACE: 32,
    ENTER: 13,
  }
  // Game Item Objects

    let player1 = {
    id: "#player1",
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  }
  
  let player2 = {
    id: "#player2",
    x: BOARD_WIDTH - PLAYER_WIDTH,
    y: BOARD_HEIGHT - PLAYER_HEIGHT,
    speedX: 0,
    speedY: 0
  }
  

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
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
        player2.speedY = -5;
        player2.speedX = 0;
    } else if (event.which === KEY.DOWN) {
        player2.speedY = 5;
        player2.speedX = 0;
    }
    if (event.which === KEY.W) {
        player1.speedY = -5;
        player1.speedX = 0;
    } else if (event.which === KEY.S) {
        player1.speedY = 5;
        player1.speedX = 0;
    }
  }

  function handleKeyUp (){
    if (event.which === KEY.W || event.which === KEY.S) {
      player1.speedY = 0;
    }

    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      player2.speedY = 0;
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
