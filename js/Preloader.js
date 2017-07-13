
// **************************************************************************************
// Preloader
// **************************************************************************************
"use strict";

PlutoAttacks.Preloader = function () {

};

PlutoAttacks.Preloader.prototype = {


    preload: function () {

        // MainMenu Images
        this.load.image('title', 'assets/buttons/title.png');
        this.load.image('levelSelect', 'assets/buttons/levelMenu.png');
        this.load.spritesheet('buttonNormal', 'assets/buttons/button_normal.png', 227, 100);
        this.load.spritesheet('buttonFun', 'assets/buttons/button_fun.png', 227, 100);
        this.load.spritesheet('buttonInsane', 'assets/buttons/button_insane.png', 227, 100);

        // Game Images
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('enemyBullet', 'assets/images/enemy-bullet.png');
        this.load.spritesheet('invader', 'assets/images/invader32x32x4.png', 32, 32);
        this.load.image('ship', 'assets/images/player.png');
        this.load.spritesheet('kaboom', 'assets/images/explodeblue.png', 128, 128);
        this.load.image('starfield', 'assets/images/starfield1.png');
        this.load.image('background', 'assets/images/hud_1.png');
        

        // Top Status Bars
         this.load.spritesheet('playerEnergy', 'assets/buttons/player_energy.png');
         this.load.spritesheet('buttonHome', 'assets/buttons/button_home.png',50,50);
         this.load.spritesheet('buttonPause', 'assets/buttons/button_pause.png');
         this.load.spritesheet('buttonSpeaker', 'assets/buttons/button_speaker.png');
         
 

        // Sound Effects
        this.load.audio('explosionSfx', 'assets/audio/pusher.wav');
        this.load.audio('swordSfx', 'assets/audio/alien_death1.wav');
        this.load.audio('blasterSfx', 'assets/audio/pistol.wav');
        this.load.audio('wilhelmSfx', 'assets/audio/wilhelm.mp3');

        this.load.spritesheet('buttonNorm', 'assets/buttons/Panel2ButtonSpritex71.png', 161, 71);
        this.load.spritesheet('buttonNormGo', 'assets/buttons/Panel2ButtonSpritex71Go.png', 161, 71);

    }, // end preload

    create: function () {

        this.state.start('PlutoAttacks.MainMenu');

    }

};
