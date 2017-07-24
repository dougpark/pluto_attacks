// **************************************************************************************
// MainMenu
// **************************************************************************************
"use strict";

var MainMenu = function () {};

MainMenu.prototype = {

    init: function() {
    },

    create: function () {
        // background image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        // Main menu title image
        this.title = game.add.sprite(game.world.centerX, 65, 'title');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale.setTo(1.25, .80);

        // Main menu
        this.levelSelect = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'levelSelect');
        this.levelSelect.anchor.setTo(0.5, 0.5);
        var levelTween = game.add.tween(this.levelSelect.scale).to({ x: 1.05, y: 1.05 }, 2000, Phaser.Easing.Linear.None, true);
        levelTween.yoyo(true, 0);
        levelTween.repeat(-1);

        // BlinkingPanels
        this.blinkingPanels = game.add.group();
        this.blinkingPanels.enableBody = true;
        this.blinkingPanels.physicsBodyType = Phaser.Physics.ARCADE;
        //this.createBlinkingPanels();
        
        // Game mode buttons
        this.buttonNormal = game.add.button(game.world.centerX, 240, 'buttonNormal', this.actionOnClickNormal, this, 2, 1, 0);
        this.buttonNormal.anchor.setTo(0.5, 0.5);
        this.buttonNormal.events.onInputDown.add(this.onInputDownGame, this);
        this.buttonNormal.events.onInputUp.add(this.onInputUpGame, this);

        this.buttonFun = game.add.button(game.world.centerX, 345, 'buttonFun', this.actionOnClickFun, this, 2, 1, 0);
        this.buttonFun.anchor.setTo(0.5, 0.5);
        this.buttonFun.events.onInputDown.add(this.onInputDownGame, this);
        this.buttonFun.events.onInputUp.add(this.onInputUpGame, this);

        this.buttonInsane = game.add.button(game.world.centerX, 450, 'buttonInsane', this.actionOnClickInsane, this, 2, 1, 0);
        this.buttonInsane.anchor.setTo(0.5, 0.5);
        this.buttonInsane.events.onInputDown.add(this.onInputDownGame, this);
        this.buttonInsane.events.onInputUp.add(this.onInputUpGame, this);
        
        // Options Button
        this.buttonOptions = game.add.button(75, game.world.centerY+200, 'buttonOptions', this.actionOnClickOptions, this, 2, 1, 0);
        this.buttonOptions.anchor.setTo(0.5, 0.5);
        this.buttonOptions.scale.setTo(1,1);
        this.buttonOptions.events.onInputDown.add(this.onInputDownOptions, this);
        this.buttonOptions.events.onInputUp.add(this.onInputUpOptions, this);

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

    // Action when click on the Options button
    actionOnClickOptions: function () {
        this.state.start('Options', true, false, Povin);   
    },

    onInputDownOptions: function(target) {
        game.add.tween(target.scale).to({
            x: 0.8,
            y: 0.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpOptions: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // button Normal
    actionOnClickNormal: function () {
        Povin.gameMode = 1;
        //this.nextState();
    },

    // button Fun
    actionOnClickFun: function () {
        Povin.gameMode = 2;
        //this.nextState();
    },

    // button Insane
    actionOnClickInsane: function () {
        Povin.gameMode = 3;
        //this.nextState();
    },

    onInputDownGame: function(target) {
        game.add.tween(target.scale).to({
            x: 0.95,
            y: 0.95
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpGame: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
        this.nextState();
    },

    render: function() {
        /* var debug = this.game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('trainingLevel '+ Povin.trainingLevel,10,140);
        debug.text('Povin '+ Povin,10,160);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
        */
    },

    nextState: function () {
        this.state.start('PlutoGame', true, false, Povin.gameMode, Povin.trainingLevel);
    }
};