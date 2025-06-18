var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var jet;
        var car;
        var buildings = [];
        var bgImage1, bgImage2;
               // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundImage = draw.bitmap("img/gamebackground.png");
            bgImage1 = draw.bitmap("img/gamebackground.png");
            bgImage2 = draw.bitmap("img/gamebackground.png");

            // Position them side by side
            bgImage1.x = 0;
            bgImage1.y = 0;
            bgImage2.x = app.canvas.width;
            bgImage2.y = 0;

            // Match height of ground
            var scaleY = groundY / bgImage1.image.height;
            var scaleX = app.canvas.width / bgImage1.image.width;
            bgImage1.scaleX = scaleX;
            bgImage1.scaleY = scaleY;
            bgImage2.scaleX = scaleX;
            bgImage2.scaleY = scaleY;

            background.addChild(bgImage1);
            background.addChild(bgImage2);

            /* TODO 2: - Add a moon and starfield
            for(var i = 0; i < 250; i++){
                var circle = draw.circle(3, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);   
            };
            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth - 400;
            moon.y = canvasHeight - 800;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 6; ++i) {
                var buildingColors = ["lightblue", "green", "purple", "pink", "magenta", "cyan"];
                var buildingHeight = 700 * Math.random();
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building); 
} */

            
            // TODO 3: Part 1 - Add a tree
            car = draw.bitmap("img/car.png");
            car.x = 0;
            car.y = groundY-160;
            background.addChild(car);      
            
            jet = draw.bitmap("img/jets.png");
            jet.x = 0;
            jet.y = groundY - 800;
            background.addChild(jet);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;


            var scrollSpeed = 0.3;

            if (bgImage1 && bgImage2) {
                bgImage1.x -= scrollSpeed;
                bgImage2.x -= scrollSpeed;

                // When one background is off screen, move it to the right of the other
                if (bgImage1.x + bgImage1.getBounds().width * bgImage1.scaleX <= 0) {
                    bgImage1.x = bgImage2.x + bgImage2.getBounds().width * bgImage2.scaleX;
                }
                if (bgImage2.x + bgImage2.getBounds().width * bgImage2.scaleX <= 0) {
                    bgImage2.x = bgImage1.x + bgImage1.getBounds().width * bgImage1.scaleX;
                }
            }

            
            // TODO 3: Part 2 - Move the tree! hah now its a car
            car.x = car.x -= 12;
            jet.x = jet.x -= 20;

            if (car.x < -2000){
                car.x = canvasWidth + 500;
            }

            if (jet.x < -3000){
                jet.x = canvasWidth + 500;
            }
            
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++) {
                var building=buildings[i];
                building.x -= 1.5;
                if(building.x < -100) {
                    building.x = canvasWidth + 100;
                }
            }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
