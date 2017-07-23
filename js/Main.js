// **************************************************************************************
// Main
// **************************************************************************************
"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'PlutoAttacks'), Main = function () {};
      
// Global Povin object to track stuff  
var Povin = {
  trainingLevel: 1,
  gameMode: 1,
  bgMusic: null,
  toString: function() {return "I am new Povin!";}
};

var Main = function () {};  

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