// **************************************************************************************
// Main
// **************************************************************************************
"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'PlutoAttacks'), Main = function () {};

/* var povin = function() {
        var trainingLevel=1;
        var gameMode="1";

    };

    povin.toString = function() {
        return "I am Povin!";
    }; */  
      
  // Global povin object to track stuff  
  var povin = {
    trainingLevel: 1,
    gameMode: 1,

    toString: function() {return "I am new Povin!";}
  };

var bgMusic;
var bgMusicTxt = "Stephen";

var Main = function (game) {

};  



Main.prototype = {

  init: function() {


  },

  preload: function () {
    game.load.image('logo', 'assets/images/povinlogo.png');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.script('splash',  'js/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');