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

var game = new Phaser.Game(winW, winH, Phaser.AUTO, 'game2');

var BasicGame = {
    // Game global vars go here

    orientated: false

};

//var BasicGame.Boot = {};

BasicGame.Boot = function (game) {
    // state level properties go here

};
  
BasicGame.Boot.prototype = {

  init: function() {

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    
    BasicGame.orientated = true;
    //this.scale.setMinMax(400, 300, 1200, 900);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // Orientation
    if (this.game.device.desktop)
		{
			//this.scale.maxWidth = this.game.width;
			//this.scale.maxHeight = this.game.height;
			//this.scale.setScreenSize(true);
		}
		else
		{
			//this.scale.maxWidth = this.game.width * 2.5;
      //this.scale.maxHeight = this.game.height * 2.5;
      
      game.scale.forceOrientation(true, false);
      //game.scale.forceOrientation(forceLandscape, forcePortrait);
			//this.scale.hasResized.add(this.gameResized, this);
			game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
			//this.scale.setScreenSize(true);
		}


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

    game.state.add('CheckOrientation', BasicGame.CheckOrientation);
    game.state.add('Preloader', BasicGame.Preloader);
    this.state.start('CheckOrientation');

    //game.state.add('Preloader', BasicGame.Preloader);
    //game.state.start('Preloader');
  },

  gameResized: function (width, height) {

		//  This could be handy if you need to do any extra processing if the game resizes.
		//  A resize could happen if for example swapping orientation on a device.

	},

	enterIncorrectOrientation: function () {

    BasicGame.orientated = false;
    game.paused = true;

		document.getElementById('orientation').style.display = 'block';

	},

	leaveIncorrectOrientation: function () {

		BasicGame.orientated = true;

    document.getElementById('orientation').style.display = 'none';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.paused = false;
		//this.scale.setScreenSize(true);

	}

};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');



