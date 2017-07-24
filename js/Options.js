// **************************************************************************************
// Options
// **************************************************************************************
"use strict";

var Options = function () {};

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
        this.buttonLevel_1.events.onInputDown.add(this.onInputDownTraining, this);
        this.buttonLevel_1.events.onInputUp.add(this.onInputUpTraining, this);

        this.buttonLevel_9 = game.add.button(game.world.centerX, game.world.centerY+50, 'buttonLevel_9', this.actionOnClickTrainingLevel_9, this, 2, 1, 0);
        this.buttonLevel_9.anchor.setTo(0.5, 0.5); 
        this.buttonLevel_9.scale.setTo(1,1);
        this.buttonLevel_9.events.onInputDown.add(this.onInputDownTraining, this);
        this.buttonLevel_9.events.onInputUp.add(this.onInputUpTraining, this);

        this.buttonLevel_27 = game.add.button(game.world.centerX+100, game.world.centerY+50, 'buttonLevel_27', this.actionOnClickTrainingLevel_27, this, 2, 1, 0);
        this.buttonLevel_27.anchor.setTo(0.5, 0.5);
        this.buttonLevel_27.scale.setTo(1,1);
        this.buttonLevel_27.events.onInputDown.add(this.onInputDownTraining, this);
        this.buttonLevel_27.events.onInputUp.add(this.onInputUpTraining, this);

        // Music Button
        this.buttonMusic = game.add.button(game.world.width-75, game.world.centerY+200, 'buttonMusic', this.actionOnClickMusic, this, 2, 1, 0);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(.6, .6);
        this.buttonMusic.events.onInputDown.add(this.onInputDownMusic, this);
        this.buttonMusic.events.onInputUp.add(this.onInputUpMusic, this);

        // Back Button
        this.buttonBack = game.add.button(75, game.world.centerY+200, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0.5, 0.5);
        this.buttonBack.scale.setTo(1,1);
        this.buttonBack.events.onInputDown.add(this.onInputDownBack, this);
        this.buttonBack.events.onInputUp.add(this.onInputUpBack, this);

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

     onInputDownMusic: function(target) {
        game.add.tween(target.scale).to({
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
        //game.add.tween(target.my_txt.scale).to({
        //    x: 0.9,
        //    y: 0.9
        //}, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpMusic: function(target) {
        game.add.tween(target.scale).to({
            x: 0.6,
            y: 0.6
        }, 100, Phaser.Easing.Cubic.Out, true);
        //game.add.tween(target.my_txt.scale).to({
        //    x: 1,
        //    y: 1
        //}, 100, Phaser.Easing.Cubic.Out, true);
        /*
        if (target.music) {
            music.fadeOut(500);
            target.music = false;
            music_btn_txt.text = "MUSIC OFF";
            music.enabled = 0;
            localStorage.setItem("followMyLeadMusicIsPlaying", music.enabled);
        } else {
            music.fadeIn(500);
            target.music = true;
            music.enabled = 1;
            music_btn_txt.text = "MUSIC ON";
            localStorage.setItem("followMyLeadMusicIsPlaying", music.enabled);
        }
        if (sfx.enabled) {
            click.play();
        }
        */
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

    onInputDownTraining: function(target) {
        game.add.tween(target.scale).to({
            x: 0.8,
            y: 0.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpTraining: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // button Back
    actionOnClickBack: function () {
        this.nextState();
    },

    onInputDownBack: function(target) {
        game.add.tween(target.scale).to({
            x: 0.8,
            y: 0.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpBack: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    render: function() {
     /* var debug = game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('trainingLevel '+ Povin.trainingLevel,10,140);
        debug.text('Povin '+ Povin,10,160);
        debug.text('Options Menu',10,180);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
     */
    },

    nextState: function () {
        this.state.start('MainMenu', true, false);
    }
};