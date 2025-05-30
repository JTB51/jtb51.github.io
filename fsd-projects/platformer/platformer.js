$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(125,605,250,10,"white"); // left 1 
    createPlatform(125,427.5,250,10,"white"); // left 2
    createPlatform(125,250,250,10,"white"); // left 3

    createPlatform(575,540,250,10, "white"); // middle 1
    createPlatform(575,362.5,250,10, "white"); // middle 2
    createPlatform(575,185,250,10, "white"); // middle 2

    createPlatform(1025,605,250,10, "white"); // right 1
    createPlatform(1025,427.5,250,10, "white"); // right 2
    createPlatform(1025,250,250,10, "white"); // right 3
    // TODO 3 - Create Collectables
    createCollectable("redbull", 225, 170, 0, 0); // on left 3
    createCollectable("redbull", 1125, 170, 0, 0); // on right 3
    createCollectable("redbull", 675, 300, 0, 0); // on middle 2
    createCollectable("redbull", 675, 120, 0, 0); // on middle 3
    // TODO 4 - Create Cannons
    createCannon("top", 100, 800);
    createCannon("top", 550, 800);
    createCannon("top", 960, 800);
    createCannon("top", 1400, 800);
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
