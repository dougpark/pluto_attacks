// **************************************************************************************
// Options
// **************************************************************************************
"use strict";

var Options = function () {};

var xwin_doug = window.Options;

Options.prototype = {

    init: function() {
    },

    create: function () {
        // background image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        // Option menu title image
        this.title = game.add.sprite(game.world.centerX, 65, 'options');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale.setTo(1.5, .80);

        // Option menu
        this.levelSelect = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'levelSelect');
        this.levelSelect.anchor.setTo(0.5, 0.5);
        //this.buttonNormal.scale.setTo(.90,.90);
        //var levelTween = game.add.tween(this.levelSelect.scale).to( { x: game.world.centerX-5, y:game.world.centerY+50-5 }, 500, Phaser.Easing.Back.Out, true, -1);

        var levelTween = game.add.tween(this.levelSelect.scale).to({ x: 1.05, y: 1.05 }, 2000, Phaser.Easing.Linear.None, true);
        levelTween.yoyo(true, 0);
        levelTween.repeat(-1);
     
        // Training Level menu title image
        this.training_level = game.add.sprite(game.world.centerX, game.world.centerY-50, 'training_level');
        this.training_level.anchor.setTo(0.5, 0.5);
        this.training_level.scale.setTo(0.3, 0.3);

        this.buttonLevel_1 = game.add.button(game.world.centerX-100, game.world.centerY+50, 'buttonLevel_1', this.actionOnClickTrainingLevel_1, this, 2, 1, 0);
        this.buttonLevel_1.anchor.setTo(0.5, 0.5);
        this.buttonLevel_1.scale.setTo(1,1);

        this.buttonLevel_9 = game.add.button(game.world.centerX, game.world.centerY+50, 'buttonLevel_9', this.actionOnClickTrainingLevel_9, this, 2, 1, 0);
        this.buttonLevel_9.anchor.setTo(0.5, 0.5); 
        this.buttonLevel_9.scale.setTo(1,1);

        this.buttonLevel_27 = game.add.button(game.world.centerX+100, game.world.centerY+50, 'buttonLevel_27', this.actionOnClickTrainingLevel_27, this, 2, 1, 0);
        this.buttonLevel_27.anchor.setTo(0.5, 0.5);
        this.buttonLevel_27.scale.setTo(1,1);

        // Music Button
        this.buttonMusic = game.add.button(game.world.width-75, game.world.centerY+200, 'buttonMusic', this.actionOnClickMusic, this, 2, 1, 0);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(.6, .6);

        // Back Button
        this.buttonBack = game.add.button(75, game.world.centerY+200, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0.5, 0.5);
        this.buttonBack.scale.setTo(1,1);
    },

    // Test to animate blinking panels
    createBlinkingPanels: function () {
        var blinkingPanel = this.blinkingPanels.create(1, 1, 'buttonNorm');
        //blinkingPanel.anchor.setTo(0.5,0.5);
        blinkingPanel.animations.add('fly', [0, 1], 2, true);
        blinkingPanel.play('fly');
        blinkingPanel.body.moves = false;
        this.blinkingPanels.x = 50;
        this.blinkingPanels.y = 300;
        //var tween = game.add.tween(this.blinkingPanels).to( { x: 50 }, 20, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    // Action when click on the music button
    actionOnClickMusic: function () {
        if (Povin.bgMusic.isPlaying == true) {Povin.bgMusic.pause();}
        else {Povin.bgMusic.play();};
    },

    // Start Level 1
    actionOnClickTrainingLevel_1: function () {
        Povin.trainingLevel = 1;
    },

    // Start Level 9
    actionOnClickTrainingLevel_9: function () {
        Povin.trainingLevel = 9;
    },

    // Start Level 27
    actionOnClickTrainingLevel_27: function () {
        Povin.trainingLevel = 27;
    },

    // button Back
    actionOnClickBack: function () {
        this.nextState();
    },

    render: function() {
        var debug = game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('trainingLevel '+ Povin.trainingLevel,10,140);
        debug.text('Povin '+ Povin,10,160);
        debug.text('Options Menu',10,180);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
    },

    nextState: function () {
        this.state.start('MainMenu', true, false, Povin);
    }
};