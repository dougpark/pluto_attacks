
// **************************************************************************************
// Splash
// **************************************************************************************
"use strict";

var PlutoAttacks = {};

PlutoAttacks.Splash = function (game) {

      this.splash;

};


PlutoAttacks.Splash.prototype = {

    init: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(400, 300, 1200, 900);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});

    }, // end init

    preload: function () {

        // Preload Images
        game.load.image('splash', 'assets/images/splash.png');
        game.add.existing(this.status);
        
       
    }, // end preload

    create: function () {

        // Splash image
        this.splash = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
        this.splash.anchor.setTo(0.5, 0.5);
        //this.splash.scale.setTo(1.25, .80);


        this.state.start('PlutoAttacks.Preloader');

    }

};
