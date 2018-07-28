// **************************************************************************************
// Preload
// **************************************************************************************
"use strict";

var WebFontConfig;

var Preload = function () {};

Preload.prototype = { 

  // loading scripts in index.html while in development so can debug in Safari
  loadScripts: function () {
    game.load.script('MainMenu',  "js/MainMenu.js");
    game.load.script('Options',   "js/Options.js");
    game.load.script('Credits',   "js/Credits.js");
    game.load.script('PlutoGame', "js/Game.js");
    game.load.script('Util',      "js/Util.js");

    //game.load.script('style',   'lib/style.js');
    //game.load.script('mixins',  'lib/mixins.js');
    //game.load.script('gamemenu','states/GameMenu.js');
    //game.load.script('game',    'states/Game.js');
    //game.load.script('gameover','states/GameOver.js');
    //game.load.script('credits', 'states/Credits.js');
    //game.load.script('options', 'states/Options.js');

    //Fonts
    //game.load.script('WebFont', 'lib/webfontloader.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('bgm', 'assets/audio/Dangerous.mp3');
    //game.load.audio('bgm', 'assets/audio/Exit the Premises.mp3');
    //game.load.audio('bgm', 'assets/audio/Kevin_MacLeod_-_Early_Riser.mp3');
  },

 
  loadImages: function () {
    // MainMenu Images
    game.load.image('title', 'assets/buttons/title.png');
    game.load.image('levelSelect', 'assets/buttons/levelMenu.png');
    game.load.spritesheet('buttonNormal', 'assets/buttons/button_normal2.png', 227, 100);
    game.load.spritesheet('buttonFun', 'assets/buttons/button_fun2.png', 227, 100);
    game.load.spritesheet('buttonInsane', 'assets/buttons/button_insane.png', 227, 100);
    game.load.spritesheet('buttonOptions', 'assets/buttons/button_options2.png', 227, 100);

    // Options Images
    game.load.image('options', 'assets/buttons/options.png');
    game.load.spritesheet('buttonCredits', 'assets/buttons/button_credits2.png',100,100);
    game.load.spritesheet('buttonLevel_1', 'assets/buttons/button_level_1_2.png', 100,100);
    game.load.spritesheet('buttonLevel_9', 'assets/buttons/button_level_9_2.png', 100,100);
    game.load.spritesheet('buttonLevel_18', 'assets/buttons/button_level_18_2.png', 100,100);
    game.load.spritesheet('buttonLevel_27', 'assets/buttons/button_level_27_2.png', 100,100);
    game.load.image('level_title', 'assets/buttons/panel_level.png');
    game.load.image('options_title', 'assets/buttons/panel_options.png');
    game.load.spritesheet('buttonBack', 'assets/buttons/button_left2.png',100,100);
    game.load.image('score_panel', 'assets/buttons/panel_2b.png');
    //game.load.spritesheet('buttonCredits', 'assets/buttons/button_back.png',100,100);

    // Other Images
    game.load.spritesheet('buttonContinue', 'assets/buttons/button_continue.png',227,50);

    // Game Images
    game.load.image('bullet', 'assets/images/bullet.png');
    game.load.image('enemyBullet', 'assets/images/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/images/invader32x32x4.png', 32, 32);
    game.load.image('ship', 'assets/images/player.png');
    game.load.spritesheet('kaboom', 'assets/images/explodeblue.png', 128, 128);
    game.load.spritesheet('ship_kaboom', 'assets/images/explode_ice_nova.png',256,128);
    game.load.spritesheet('bullet_kaboom', 'assets/images/explode_blue.png',66,66);

    game.load.image('starfield', 'assets/images/starfield1.png');
    game.load.image('background', 'assets/images/hud_1.png');
    game.load.spritesheet('shipleft', 'assets/images/ship_1_left_strip10.png',138,150);
    game.load.spritesheet('shipright', 'assets/images/ship_1_right_strip10.png',138,150);
    game.load.spritesheet('shipLR', 'assets/images/ship_1_strip20.png',138,150);
    game.load.spritesheet('shield','assets/images/shield_1.png',150,150);

    // Top Status Bars
    game.load.spritesheet('playerEnergy', 'assets/buttons/player_energy.png');
    game.load.spritesheet('buttonHome', 'assets/buttons/button_home1a.png',100,100);
    game.load.spritesheet('buttonPause', 'assets/buttons/button_pause.png');
    game.load.spritesheet('buttonSpeaker', 'assets/buttons/button_speaker.png');
    game.load.spritesheet('buttonMusic', 'assets/buttons/button_music2.png',100,100);
    game.load.spritesheet('buttonMusicOn', 'assets/buttons/button_music_on.png',100,100);
    game.load.spritesheet('buttonMusicOff', 'assets/buttons/button_music_off.png',100,100);
  
    // Sound Effects
    game.load.audio('explosionSfx', 'assets/audio/pusher.wav');
    game.load.audio('ship_explosionSfx', 'assets/audio/pusher.wav');
    game.load.audio('swordSfx', 'assets/audio/alien_death1.wav');
    game.load.audio('blasterSfx', 'assets/audio/pistol.wav');
    game.load.audio('wilhelmSfx', 'assets/audio/wilhelm.mp3');
    game.load.audio('alienSfx', 'assets/audio/lazer_wall_off.mp3');

    // Test buttons
    game.load.spritesheet('buttonNorm', 'assets/buttons/Panel2ButtonSpritex71.png', 161, 71);
    game.load.spritesheet('buttonNormGo', 'assets/buttons/Panel2ButtonSpritex71Go.png', 161, 71);
  },

  // Load and process web fonts
  /*
  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['HappyKiller'],
        urls: ['style/HappyKiller.css']
      }
    }
  },
  */

  init: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    
    this.scale.setMinMax(400, 300, 1200, 900);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.loadingBar = game.make.sprite(0,0, "loading");
    this.loadingBar.anchor.setTo(0.5, 0.5);
    this.place(this.loadingBar, .5, .66);
    this.logo = game.make.sprite(0,0, 'logo');
    this.logo.anchor.setTo(0.5,0.5);
    this.place(this.logo, 0.5, .33)
    this.status = game.make.text(0,0, ' ', { font: '20px HappyKiller', fill: '#dc7b00' });
    this.status.anchor.setTo(0.5,0.5);
    this.place(this.status, 0.5, .62);

    this.intro = game.make.text(0,0, " ", { font: '16px arial', fill: '#0099ff' });
    this.intro.setText("Unhappy Plutonians send an infinite number of drones to attack Earth.\n"+
                       "                      The action really begins at Fun Level 9");
    this.intro.anchor.setTo(0.5,0.5);
    this.place(this.intro, 0.5, .75);
  },

  preload: function () {
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    game.add.existing(this.intro);
    this.load.setPreloadSprite(this.loadingBar);

    //this.loadScripts();
    this.loadImages();
    //this.loadFonts();
    this.loadBgm();
  },

  addGameStates: function () {
    game.state.add('MainMenu', MainMenu);
    game.state.add('Options', Options);
    game.state.add('Credits', Credits);
    game.state.add('PlutoGame', PlutoGame);
    //game.state.add("GameOver",GameOver);
  },

  addGameMusic: function () {
    game.sound.setDecodedCallback('blasterSfx', enableSound, this);
    
            function enableSound() {
                function enableTheSound() {
                    dummySound.play();
                };
                console.log("ready");
                game.input.onDown.addOnce(enableTheSound, this);
            }
    Povin.bgMusic = game.add.audio('bgm');
    Povin.bgMusic.loop = true;
    //if (Povin.musicEnabled == 1) {Povin.bgMusic.play();}
  },

  getLocalStorage: function() {
    // get the localstorage saved value for musicEnabled
    if (localStorage.getItem("PlutoAttacksMusicEnabled") !== null) {
      Povin.musicEnabled = parseInt(localStorage.getItem("PlutoAttacksMusicEnabled"));
    }
  },

  notifyServer: function() {
    // Notify the sever that a new game is starting
    var d = new Date();
    //var n = d.toJSON();
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    
    var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    var localPA = { "Game":"Pluto Attacks", "Date":d.toJSON(), "WinHeight":h,"WinWidth":w,"GameLevel":"0","GameMode":"0","Score":"0","Browser":navigator.userAgent };
    var localPAJSON = JSON.stringify(localPA);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("notifyServerResponse= " + this.responseText);
            //var rspText = this.responseText;
        }
    };
    xmlhttp.open("GET", "sethighscore.php?q=" + localPAJSON, true);
    xmlhttp.send();

  },

  create: function() {
    this.status.setText('Ready!');
    this.notifyServer();
    this.getLocalStorage();
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("MainMenu"); // wait on splash screen for 2 seconds then go to main menu
    }, 2000);  
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
  fromRight: function(obj, percent, offset = 0) {
      obj.x = game.width - (game.width * percent);
      obj.x -= offset;
      //obj.x -= obj.width / 2;
  },
  fromLeft: function(obj, percent, offset = 0) {
      obj.x = game.width * percent;
      obj.x += offset;
  },
  fromCenterH: function(obj, percent) {
      obj.x = game.width / 2 - (game.width * percent);
      obj.x -= obj.width / 2;
  },
  fromCenterV: function(obj, percent) {
      obj.x = game.width / 2 - (game.width * percent);
      obj.x -= obj.width / 2;
  }
};