/**************************************************************************************
* Boot State
* @author Doug Park
* @version v1.0
* @desc Bootstrap new game
* @date 2018-07-22
**************************************************************************************/
"use strict";                    

var winW = Math.max(window.innerWidth, document.documentElement.clientWidth);
var winH = Math.max(window.innerHeight, document.documentElement.clientHeight);

winW = 800;
winH = 600;

var game = new Phaser.Game(winW, winH, Phaser.AUTO, 'PlutoAttacks');

var Boot = {};

Boot = function (game) {
    // state level properties go here

};
  
Boot.prototype = {

  init: function() {

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    
    this.scale.setMinMax(400, 300, 1200, 900);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // get high scores from local storage
    if (localStorage.getItem("PlutoAttacksHighScoreGameMode") !== null) {
      Povin.highScore.hsGameMode = parseInt(localStorage.getItem("PlutoAttacksHighScoreGameMode"));
    } else {Povin.highScore.hsGameMode = 1}
    if (localStorage.getItem("PlutoAttacksHighScoreGameLevel") !== null) {
      Povin.highScore.hsGameLevel = parseInt(localStorage.getItem("PlutoAttacksHighScoreGameLevel"));
    } else {Povin.highScore.hsGameLevel = 1}
    if (localStorage.getItem("PlutoAttacksHighScoreScore") !== null) {
      Povin.highScore.hsScore = parseInt(localStorage.getItem("PlutoAttacksHighScoreScore"));
      //console.log("localStorage high score= "+Povin.highScore.hsScore);
    } else {Povin.highScore.hsScore = 0}
    if (localStorage.getItem("PlutoAttacksHighScoreName") !== null) {
      Povin.highScore.hsName = localStorage.getItem("PlutoAttacksHighScoreName");
    } else {Povin.highScore.hsName = 'DNP'}

  },

  preload: function () {
    game.load.image('logo', 'assets/images/povinlogo.png');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('pluto2',  'assets/images/pluto2.png');
  },

  create: function () {
    game.state.add('Preloader', Preloader);
    game.state.start('Preloader');
  }

};

game.state.add('Boot', Boot);
game.state.start('Boot');



