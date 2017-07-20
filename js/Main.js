// **************************************************************************************
// MainMenu
// **************************************************************************************
"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'PlutoAttacks'), Main = function () {};

var bgMusic;
var bgMusicTxt = "Stephen";

var Main = function (game) {
};

Main.prototype = {

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