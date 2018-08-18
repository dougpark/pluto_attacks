// **************************************************************************************
// Povin
// **************************************************************************************
"use strict"; 

// Global Object
var Povin = {

    // Povin Properties
    game: null, // must initialize in game init method: Povin.game = game;
    gameLevel: 1,
    gameMode: 1,
    bgMusic: null,
    musicEnabled: 0,
    showIntro: 1,
    resized: false,
    //debugTextY: 115,

    // Povin Methods
    highScore: function() {
      hsGameMode = 0;
      hsGameLevel =0;
      hsScore =0;
      hsName ='';
      
    },

    log: function() {
        console.log("Povin object created");
    },

    debug: function() {

        game.debug.inputInfo(32, 32);
    },

    debugSprite: function(sprite,y) {

        game.debug.spriteInfo(sprite, 32, y, "#00ff00");
    },

    debugFps: function(y) {

        game.debug.text('FPS ' + game.time.fps || '--', 32, y, "#00ff00");
        
    },

    debugText: function(text,y) {

        game.debug.text(text || '--',32, y, "#00ff00");
        
    },

    // Scaling Functions
    getScaleToGameW: function(obj)
    {	
        console.log(obj.width/game.width);
    },
    scaleToGameW: function(obj,percent)
    {
        obj.width=game.width*percent;
        obj.scale.y=obj.scale.x;
    },
    place: function(obj,xPercent, yPercent, Xoffset=0, Yoffset=0) {
        this.fromTop(obj,yPercent, Yoffset);
        this.fromLeft(obj,xPercent, Xoffset);   
    },
    fromTop:function(obj,percent,offset=0)
    {
        obj.y = game.height * percent;
        obj.y += offset;
    },
    fromLeft: function(obj, percent, offset = 0) {
        obj.x = game.width * percent;
        obj.x += offset;
    },

    center: function(obj) {
        obj.x = game.width / 2;
        obj.y = game.height / 2;
    },
    centerH: function(obj) {
        obj.x = game.width / 2;
    },
    centerV: function(obj) {
        obj.y = game.height / 2;
    },
    centerGroup: function(obj) {
        obj.x = game.width / 2 - obj.width / 2;
        obj.y = game.height / 2 - obj.height / 2;
    },
    centerGroupV: function(obj) {
        obj.y = game.height / 2 - obj.height / 2;
    },
    centerGroupH: function(obj) {
        obj.x = game.width / 2 - obj.width / 2;
    },
    alignToBottom: function(obj, offset = 0) {
        obj.y = game.height - obj.height / 2;
        obj.y+= offset;
    },
    fromBottom: function(obj, percent, offset=0) {
        obj.y = game.height - (game.height * percent);
        obj.y -= offset;
    },
    
    fromRight: function(obj, percent, offset = 0) {
        obj.x = game.width - (game.width * percent);
        obj.x -= offset;
        //obj.x -= obj.width / 2;
    },
    
    fromCenterH: function(obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },
    fromCenterV: function(obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },
 
}; // End of Povin

// Global Variables
var test = 1;

// Call a method on the global object Povin
Povin.log();