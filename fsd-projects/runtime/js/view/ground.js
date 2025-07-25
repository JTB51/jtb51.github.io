(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var 
        _ = window._,
        draw = window.opspark.draw;
    
    window.opspark.makeGround = function(app) {
        var ground;
        
        ground = new createjs.Container();
        ground.resize = resize;
        render();
        
        app.addResizeable(ground);
        ground.y = (canvas.height-10);
        app.view.addChild(ground);
        
        function render() {
            ground.removeAllChildren();
            ground.addChild(draw.rect(canvas.width, 10, 'black'));
        }
        
        function resize(argument) {
            render();
        }

        app.ground = ground;
        
        return ground;
    };
}(window));