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
    //game.load.audio('bgm', 'assets/audio/Dangerous.mp3');
    game.load.audio('bgm', 'assets/audio/Exit the Premises.mp3');
    //game.load.audio('bgm', 'assets/audio/Kevin_MacLeod_-_Early_Riser.mp3');
  },

  // varios freebies found from google image search
  loadImages: function () {
    // MainMenu Images
    game.load.image('title', 'assets/buttons/title.png');
    game.load.image('levelSelect', 'assets/buttons/levelMenu.png');
    game.load.spritesheet('buttonNormal', 'assets/buttons/button_normal.png', 227, 100);
    game.load.spritesheet('buttonFun', 'assets/buttons/button_fun.png', 227, 100);
    game.load.spritesheet('buttonInsane', 'assets/buttons/button_insane.png', 227, 100);
    game.load.spritesheet('buttonOptions', 'assets/buttons/button_options.png');

    // Options Images
    game.load.image('options', 'assets/buttons/options.png');
    game.load.image('buttonCredits', 'assets/buttons/button_credits.png');
    game.load.spritesheet('buttonLevel_1', 'assets/buttons/button_level_1.png', 110,100);
    game.load.spritesheet('buttonLevel_9', 'assets/buttons/button_level_9.png', 110,100);
    game.load.spritesheet('buttonLevel_18', 'assets/buttons/button_level_18.png', 110,100);
    game.load.spritesheet('buttonLevel_27', 'assets/buttons/button_level_27.png', 110,100);
    game.load.image('level_title', 'assets/buttons/panel_level.png');
    game.load.spritesheet('buttonBack', 'assets/buttons/button_left.png',129,100);
    //game.load.spritesheet('buttonCredits', 'assets/buttons/button_back.png',100,100);

    // Credits Images

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

    // Top Status Bars
    game.load.spritesheet('playerEnergy', 'assets/buttons/player_energy.png');
    game.load.spritesheet('buttonHome', 'assets/buttons/button_home1.png',100,100);
    game.load.spritesheet('buttonPause', 'assets/buttons/button_pause.png');
    game.load.spritesheet('buttonSpeaker', 'assets/buttons/button_speaker.png');
    game.load.spritesheet('buttonMusic', 'assets/buttons/button_music.png',128,100);
  
    // Sound Effects
    game.load.audio('explosionSfx', 'assets/audio/pusher.wav');
    game.load.audio('ship_explosionSfx', 'assets/audio/pusher.wav');
    game.load.audio('swordSfx', 'assets/audio/alien_death1.wav');
    game.load.audio('blasterSfx', 'assets/audio/pistol.wav');
    game.load.audio('wilhelmSfx', 'assets/audio/wilhelm.mp3');

    // Test buttons
    game.load.spritesheet('buttonNorm', 'assets/buttons/Panel2ButtonSpritex71.png', 161, 71);
    game.load.spritesheet('buttonNormGo', 'assets/buttons/Panel2ButtonSpritex71Go.png', 161, 71);
  },

  // Load and process web fonts
  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['HappyKiller'],
        urls: ['style/HappyKiller.css']
      }
    }
  },

  init: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.setMinMax(400, 300, 1200, 900);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo = game.make.sprite(game.world.centerX, 200, 'logo');
    this.logo.anchor.setTo(0.5,0.5);
    this.status = game.make.text(game.world.centerX, 380, 'Loading...', { font: '20px HappyKiller', fill: '#0099ff' });
    this.status.anchor.setTo(0.5,0.5);
  },

  preload: function () {
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
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
    //game.state.add("Credits",Credits);
  },

  addGameMusic: function () {
    Povin.bgMusic = game.add.audio('bgm');
    Povin.bgMusic.loop = true;
    if (Povin.musicEnabled == 1) {Povin.bgMusic.play();}
  },

  getLocalStorage: function() {
    // get the localstorage saved value for musicEnabled
    if (localStorage.getItem("PlutoAttacksMusicEnabled") !== null) {
      Povin.musicEnabled = parseInt(localStorage.getItem("PlutoAttacksMusicEnabled"));
    }
  },

  create: function() {
    this.status.setText('Ready!');
    this.getLocalStorage();
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("MainMenu"); // wait on splash screen for 2 seconds then go to main menu
    }, 2000);  
  }
};