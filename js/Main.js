// **************************************************************************************
// Main
// **************************************************************************************
"use strict";                    

var winW = Math.max(window.innerWidth, document.documentElement.clientWidth);
var winH = Math.max(window.innerHeight, document.documentElement.clientHeight);

winW = 800;
winH = 600;

var game = new Phaser.Game(winW, winH, Phaser.AUTO, 'PlutoAttacks'), Main = function () {};
      
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

  compareHighScore: function(gameMode, gameLevel, endLevel, perfectLevels, aliensEscaped, score) {

    this.notifyServer(gameMode,gameLevel,endLevel, perfectLevels,aliensEscaped,score,'Player');

    if (score > this.highScore.hsScore) { 
      this.highScore.hsScore = score;
      this.saveHighScore(gameMode,gameLevel,score,'Player');
     
      return true;
    } else {
      return false;
    }
  },

  saveHighScore: function(gameMode, gameLevel, score, userName) {
    localStorage.setItem("PlutoAttacksHighScoreGameMode", gameMode);
    localStorage.setItem("PlutoAttacksHighScoreGameLevel", gameLevel);
    localStorage.setItem("PlutoAttacksHighScoreScore", score);
    localStorage.setItem("PlutoAttacksHighScoreName", userName);
    
  },

  notifyServer: function(gameMode, gameLevel, endLevel, perfectLevels, aliensEscaped, score, userName) {
    // Notify the sever of score
    var d = new Date();
    //var n = d.toJSON();
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    
    var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    console.log("gameMode= "+gameMode+" gameLevel= "+gameLevel + " endLevel= "+ endLevel + " perfectLevels= "+perfectLevels + " aliensEscaped= "+aliensEscaped + " score= "+score);
    var localPA = { "Game":"Pluto Attacks", "Date":d.toJSON(), "WinWidth":w,"WinHeight":h,
    "GameMode":gameMode,"GameLevel":gameLevel,"EndLevel":endLevel,"PerfectLevels":perfectLevels, "AliensEscaped":aliensEscaped,
    "Score":score,"UserName":userName,"Browser":navigator.userAgent };

    var localPAJSON = JSON.stringify(localPA);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("notifyScoreServerResponse= " + this.responseText);
            //var rspText = this.responseText;
        }
    };
    xmlhttp.open("GET", "sethighscore.php?q=" + localPAJSON, true);
    xmlhttp.send();

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