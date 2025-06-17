var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "scuffle", x: 400, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 600, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 800, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1000, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1200, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1400, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1600, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1800, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2000, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2200, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2400, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "enemy", x: 800, y: groundY - 50, speed: -4, image: "img/enemyNorris.png", offsetX: -25, offsetY: -75, scale: 0.5  },
          { type: "enemy", x: 1000, y: groundY - 50, speed: -4, image: "img/enemyNorris.png", offsetX: -25, offsetY: -75, scale: 0.5  },
          { type: "enemy", x: 1200, y: groundY - 50, speed: -4, image: "img/enemyNorris.png", offsetX: -25, offsetY: -75, scale: 0.5  },
          { type: "enemy", x: 1400, y: groundY - 50, speed: -4, image: "img/enemyNorris.png", offsetX: -25, offsetY: -75, scale: 0.5 },
          { type: "reward", x: 2000, y: groundY - 100, speed: -5, image: "img/homerdonut.png", offsetX: -48, offsetY: -160, scale: 0.17},
          { type: "reward", x: 3000, y: groundY - 100, speed: -3, image: "img/homerdonut.png", offsetX: -48, offsetY: -160, scale: 0.17},
          { type: "marker", x: 4000, y: groundY - 100, speed: -3, image: "img/levelup.png", offsetX: -152, offsetY: -170, scale: 0.75},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "scuffle", x: 400, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 600, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 800, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1000, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1200, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1400, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1600, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 1800, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2000, y: groundY - 115, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2200, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
          { type: "scuffle", x: 2400, y: groundY, damage: 12, image: "img/scuffle.png", offsetX: -50, offsetY: -65, scale: 0.2},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
