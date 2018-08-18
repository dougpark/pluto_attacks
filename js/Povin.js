/**************************************************************************************
* Povin Object
* @author Doug Park
* @version v1.0
* @desc Utility object to manage localstorage, music, highscores, scaling, etc.
* @date 2018-07-22
**************************************************************************************/
"use strict";
 
var Povin = {
  gameLevel: 1,
  gameMode: 1,
  bgMusic: null,
  musicEnabled: 0,
  showIntro: 1,

  highScore: function() {
    hsGameMode = 0;
    hsGameLevel =0;
    hsScore =0;
    hsName ='';
  },


  // save the currently read intro text into browser local storage
  setReadIntroVer: function() {
    localStorage.setItem("PlutoAttacksReadIntroVer", this.currentIntroVer());
  },

  // return the version of the intro text that has been read
  getReadIntroVer: function() {
    if (localStorage.getItem("PlutoAttacksReadIntroVer") !== null) {
      return parseInt(localStorage.getItem("PlutoAttacksReadIntroVer"));
    } else {
      return 0;
    }
  },

  // return true if need to show intro text otherwise return false to not show it
  showIntroText: function () {

    if (this.currentIntroVer() == this.getReadIntroVer()) {
      return false;
    } else {
      return true;
    }

  },

  // current version of intro text
  // change this to reshow intro text on game start
  currentIntroVer: function() {

    return 3;

  },
  getIntroText: function() {
    return "Plutonians are not happy with us calling their home world\n"+
    "a Dwarf Planet. So when they discovered a trick in the space time \n"+
    "continuum they sent an infinite number of drones to attack Earth.  \n"+
    "We created an energy weapon that can siphon off the energy from \n"+
    "the drones weapons. This powers the Earth vessel and creates a \n"+
    "powerful energy shield.\n"+
    
    "Desktop: press the space bar to start and then left and right\n"+
    "arrows to move. That’s it.\n"+
    
    "Mobile: tap to start and then use your finger to move back and forth.\n"+
    "\nRemember don't let even one alien escape!"

    ;
    
  },

  

  // save score to score server
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

    //console.log("gameMode= "+gameMode+" gameLevel= "+gameLevel + " endLevel= "+ endLevel + " perfectLevels= "+perfectLevels + " aliensEscaped= "+aliensEscaped + " score= "+score);
    var localPA = { "Game":"Pluto Attacks", "Date":d.toJSON(), "WinWidth":w,"WinHeight":h,
    "GameMode":gameMode,"GameLevel":gameLevel,"EndLevel":endLevel,"PerfectLevels":perfectLevels, "AliensEscaped":aliensEscaped,
    "Score":score,"UserName":userName,"Browser":navigator.userAgent };

    var localPAJSON = JSON.stringify(localPA);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("ScoreServerResponse= " + this.responseText);
            //var rspText = this.responseText;
        }
    };
    xmlhttp.open("GET", "sethighscore.php?q=" + localPAJSON, true);
    xmlhttp.send();

  },

  saveHighScore: function(gameMode, gameLevel, endLevel, perfectLevels, aliensEscaped, score) {

    this.notifyServer(gameMode,gameLevel,endLevel, perfectLevels,aliensEscaped,score,'Player');

    if (score > this.highScore.hsScore) { 
      this.highScore.hsScore = score;
      this.saveHighScoreLocal(gameMode,gameLevel,score,'Player');
    
      return true;
    } else {
      return false;
    }
  },


  // high scores in local storage
  saveHighScoreLocal: function(gameMode, gameLevel, score, userName) {
    localStorage.setItem("PlutoAttacksHighScoreGameMode", gameMode);
    localStorage.setItem("PlutoAttacksHighScoreGameLevel", gameLevel);
    localStorage.setItem("PlutoAttacksHighScoreScore", score);
    localStorage.setItem("PlutoAttacksHighScoreName", userName);
    
  },

  // high scores in local storage
  getHighScoreLocal: function() {

    if (localStorage.getItem("PlutoAttacksHighScoreScore") !== null) {
      return parseInt(localStorage.getItem("PlutoAttacksHighScoreScore"));
      console.log("localStorage high score= "+parseInt(localStorage.getItem("PlutoAttacksHighScoreScore")));
    } else { return "Not defined"}
  },

  musicToggle: function() {
    if (Povin.bgMusic.isPlaying == true) {
      Povin.bgMusic.pause();
      Povin.musicEnabled = 0;
      localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled); 
    }
    else {
        Povin.bgMusic.stop();
        Povin.bgMusic.play();
        Povin.musicEnabled = 1;
        localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);  
    };
  },

  musicStatus: function() {

    return Povin.bgMusic.isPlaying;

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
  place: function(obj,xPercent, yPercent) {
      this.fromTop(obj,yPercent);
      this.fromLeft(obj,xPercent);
      
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
  centerGroupH: function(obj) {
      obj.y = game.height / 2 - obj.height / 2;
  },
  centerGroupW: function(obj) {
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
  fromTop:function(obj,percent,offet=0)
  {
      obj.y=game.height*percent;
      obj.y+=percent;
  },
  fromTop2: function(percent)
  {
      return game.height*percent;
  },
  fromRight: function(obj, percent, offset = 0) {
      obj.x = game.width - (game.width * percent);
      obj.x -= offset;
      //obj.x -= obj.width / 2;
  },
  fromLeft: function(obj, percent, offset = 0) {
      obj.x = game.width * percent;
      obj.x += offset;
  },
  fromLeft2: function(percent) 
  {
      return game.width * percent;
  },
  fromCenterH: function(obj, percent) {
      obj.x = game.width / 2 - (game.width * percent);
      obj.x -= obj.width / 2;
  },
  fromCenterV: function(obj, percent) {
      obj.x = game.width / 2 - (game.width * percent);
      obj.x -= obj.width / 2;
  },

  toString: function() {return " musicEnabled="+this.musicEnabled+" gameMode="+this.gameMode;}
}; // end of Povin



/**************************************************************************************
* Util Object
* @author Doug Park
* @version v1.0
* @desc Utility object 
* @date 2018-07-022
**************************************************************************************/

var Util = {};

Util = function () {
    // object level properties go here

};
  
Util.prototype = {

  // add commas to number string
  addCommas: function(nStr)
  {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
  } , 

  // Utility code to get a URL parameter
  getURLParameter: function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }

}

var util = new Util();

