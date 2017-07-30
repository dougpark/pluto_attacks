// **************************************************************************************
// Main
// **************************************************************************************
"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'PlutoAttacks'), Main = function () {};
      
// Global Povin object to track stuff  
var Povin = {
  gameLevel: 1,
  gameMode: 1,
  bgMusic: null,
  musicEnabled: 0,

  highScore: function() {
    hsGameMode = 0;
    hsGameLevel =0;
    hsScore =0;
    hsName ='';
  },

  compareHighScore: function(gm, gl, sc) {

    if (sc > this.highScore.hsScore) { 
      this.highScore.hsScore = sc;
      this.saveHighScore(gm,gl,sc,'Doug');
      return true;
    } else {
      return false;
    }
  },

  saveHighScore: function(gm, gl, sc, name) {
    localStorage.setItem("PlutoAttacksHighScoreGameMode", gm);
    localStorage.setItem("PlutoAttacksHighScoreGameLevel", gl);
    localStorage.setItem("PlutoAttacksHighScoreScore", sc);
    localStorage.setItem("PlutoAttacksHighScoreName", name);
  },

  getHighScore: function() {

    if (localStorage.getItem("PlutoAttacksHighScoreScore") !== null) {
      return parseInt(localStorage.getItem("PlutoAttacksHighScoreScore"));
      console.log("localStorage high score= "+parseInt(localStorage.getItem("PlutoAttacksHighScoreScore")));
    } else { return "Not defined"}
  },

  toString: function() {return " musicEnabled="+this.musicEnabled+" gameMode="+this.gameMode;}
};

var Main = function () {};  

Main.prototype = {

  init: function() {

    if (localStorage.getItem("PlutoAttacksHighScoreGameMode") !== null) {
      Povin.highScore.hsGameMode = parseInt(localStorage.getItem("PlutoAttacksHighScoreGameMode"));
    } else {Povin.highScore.hsGameMode = 1}
    if (localStorage.getItem("PlutoAttacksHighScoreGameLevel") !== null) {
      Povin.highScore.hsGameLevel = parseInt(localStorage.getItem("PlutoAttacksHighScoreGameLevel"));
    } else {Povin.highScore.hsGameLevel = 1}
    if (localStorage.getItem("PlutoAttacksHighScoreScore") !== null) {
      Povin.highScore.hsScore = parseInt(localStorage.getItem("PlutoAttacksHighScoreScore"));
      console.log("localStorage high score= "+Povin.highScore.hsScore);
    } else {Povin.highScore.hsScore = 0}
    if (localStorage.getItem("PlutoAttacksHighScoreName") !== null) {
      Povin.highScore.hsName = localStorage.getItem("PlutoAttacksHighScoreName");
    } else {Povin.highScore.hsName = 'DNP'}

  },

  preload: function () {
    game.load.image('logo', 'assets/images/povinlogo.png');
    game.load.image('loading',  'assets/images/loading.png');
    //game.load.script('Preload',  'js/Preload.js');
  },

  create: function () {
    game.state.add('Preload', Preload);
    game.state.start('Preload');
  }

};

game.state.add('Main', Main);
game.state.start('Main');