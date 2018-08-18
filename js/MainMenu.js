/**************************************************************************************
* MainMenu State
* @author Doug Park
* @version v1.0
* @desc Display Menu Options, show Intro Text, show Pluto Facts
* @date 2018-07-022
**************************************************************************************/
"use strict";

var MainMenu = {};

MainMenu = function (game) {
    // state level properties go here

};

MainMenu.prototype = {

    init: function() {
    },

    create: function () {

        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // background image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        this.starfield.alpha = 0.5;

        this.imagePluto = game.add.sprite(0,0, 'pluto');
        this.imagePluto.anchor.setTo(0.7, 0.5);
        this.imagePluto.scale.setTo(.5, .5);
        Povin.place(this.imagePluto, .3, .2);

        // load Pluto Facts json file
        this.plutoFacts = game.cache.getJSON('plutoFacts');
        
        // Game mode menu group
        this.panelGameMode = this.add.group();
        this.panelGameMode.visible = true;
        this.panelGameMode.alpha = 1;

        // Game mode menu title image
        this.imageGameMode_title = game.add.sprite(0,0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        //this.panelGameMode.add(this.imageGameMode_title);
        Povin.place(this.imageGameMode_title, .5, .1);

        /*
        // Game mode menu floaters
        this.imageGameMode_floater = game.add.sprite(0,0, 'levelSelect');
        this.imageGameMode_floater.scale.setTo(.35, .35);
        this.imageGameMode_floater.anchor.setTo(0.5, 0.5);
        this.imageGameMode_floater.angle = 90;
        this.panelGameMode.add(this.imageGameMode_floater);

        Povin.place(this.imageGameMode_floater, .13, .85);
        var levelTween = game.add.tween(this.imageGameMode_floater.scale).to({ x: .4, y: .4 }, 2000, Phaser.Easing.Linear.None, true);
        levelTween.yoyo(true, 0);
        levelTween.repeat(-1);
        */
        

        var offset = .1;
        // Game mode menu buttons
        this.buttonGameModeNormal = game.add.button(0,0, 'buttonNormal', this.actionOnClickGameMode, this, 2, 1, 0);
        this.buttonGameModeNormal.anchor.setTo(0.5, 0.5);
        Povin.place(this.buttonGameModeNormal, .5, .58-offset);
        this.buttonGameModeNormal.events.onInputDown.add(this.onInputDownGameMode, this);
        this.buttonGameModeNormal.events.onInputUp.add(this.onInputUpGameMode, this);
        this.buttonGameModeNormal.gameMode = 1;
        this.panelGameMode.add(this.buttonGameModeNormal);

        this.buttonGameModeFun = game.add.button(game.world.centerX, 345, 'buttonFun', this.actionOnClickGameMode, this, 2, 1, 0);
        this.buttonGameModeFun.anchor.setTo(0.5, 0.5);
        Povin.place(this.buttonGameModeFun, .5, .40-offset);
        this.buttonGameModeFun.events.onInputDown.add(this.onInputDownGameMode, this);
        this.buttonGameModeFun.events.onInputUp.add(this.onInputUpGameMode, this);
        this.buttonGameModeFun.gameMode = 2;
        this.panelGameMode.add(this.buttonGameModeFun);        

        // this.buttonGameModeInsane = game.add.button(0,0, 'buttonInsane', this.actionOnClickGameMode, this, 2, 1, 0);
        // this.buttonGameModeInsane.anchor.setTo(0.5, 0.5);
        // Povin.place(this.buttonGameModeInsane, .5, .76);
        // this.buttonGameModeInsane.events.onInputDown.add(this.onInputDownGameMode, this);
        // this.buttonGameModeInsane.events.onInputUp.add(this.onInputUpGameMode, this);
        // this.buttonGameModeInsane.gameMode = 3;
        // this.panelGameMode.add(this.buttonGameModeInsane);
        
        // Options Button 
        this.buttonOptions = game.add.button(0,0, 'buttonOptions', this.actionOnClickOptions, this, 2, 1, 0);
        this.buttonOptions.anchor.setTo(0.5, 0.5);
        //this.buttonOptions.scale.setTo(1,1);
        Povin.place(this.buttonOptions, .5, .76-offset);
        this.buttonOptions.events.onInputDown.add(this.onInputDownOptions, this);
        this.buttonOptions.events.onInputUp.add(this.onInputUpOptions, this);
        this.panelGameMode.add(this.buttonOptions);

        // Pluto Facts

        // Facts Hover image Left
        this.imageFactsHover = game.add.sprite(0,0, 'factsHover');
        this.imageFactsHover.scale.setTo(.35, .35);
        this.imageFactsHover.anchor.setTo(0.5, 0.5);
        this.imageFactsHover.angle = -90;
        this.panelGameMode.add(this.imageFactsHover);

        Povin.place(this.imageFactsHover, .05, .85);
        var factsHoverTween = game.add.tween(this.imageFactsHover.scale).to({ x: .4, y: .4 }, 2000, Phaser.Easing.Linear.None, true);
        factsHoverTween.yoyo(true, 0);
        factsHoverTween.repeat(-1);

        // Facts Hover image Right
        this.imageFactsHoverR = game.add.sprite(0,0, 'factsHover');
        this.imageFactsHoverR.scale.setTo(.35, .35);
        this.imageFactsHoverR.anchor.setTo(0.5, 0.5);
        this.imageFactsHoverR.angle = 90;
        this.panelGameMode.add(this.imageFactsHoverR);

        Povin.place(this.imageFactsHoverR, .95, .85);
        var factsHoverRTween = game.add.tween(this.imageFactsHoverR.scale).to({ x: .4, y: .4 }, 2000, Phaser.Easing.Linear.None, true);
        factsHoverRTween.yoyo(true, 0);
        factsHoverRTween.repeat(-1);

        /* this.panelFacts = game.add.sprite(0,0, 'score_panel');
        this.panelFacts.anchor.setTo(0.5, 0.5);
        this.panelFacts.scale.setTo(2,0.4);
        Povin.place(this.panelFacts, 0.5, 0.85);
        this.panelGameMode.add(this.panelFacts); */

        var r = game.rnd.between(0,this.plutoFacts.facts.length-1);
        this.factsString = this.plutoFacts.facts[r];
        this.factsText = game.add.text(0,0, this.factsString, { font: '24px Arial', fill: '#dc7b00', wordWrap: true, wordWrapWidth: game.width*.8, align: 'center' });
        this.factsText.anchor.setTo(0.5, 0.5);
        Povin.place(this.factsText,0.5,0.85);
        this.panelGameMode.add(this.factsText);
        this.factsText.inputEnabled = true;
        this.factsText.events.onInputDown.add(this.factsTextClick, this);

        var factsTween = game.add.tween(this.factsText.scale).to({ x: 1.05, y: 1.05 }, 2000, Phaser.Easing.Linear.None, true);
        factsTween.yoyo(true, 0);
        factsTween.repeat(-1);

       
        // Popup Game level menu
        this.panelGameLevel = this.add.group();
        this.panelGameLevel.alpha = 0;
        this.panelGameLevel.visible = false;

        this.buttonGameLevel_title = game.add.sprite(0,0, 'level_title');
        this.buttonGameLevel_title.anchor.setTo(0.5, 0.5)
        Povin.place(this.buttonGameLevel_title, 0.5, 0.5);
        this.panelGameLevel.add(this.buttonGameLevel_title);

        this.buttonGameLevel_1 = game.add.button(0,0, 'buttonLevel_1', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_1.anchor.setTo(0.5, 0.5);
        this.buttonGameLevel_1.scale.setTo(1,1);
        Povin.place(this.buttonGameLevel_1, 0.5, 0.30);
        this.buttonGameLevel_1.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_1.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_1);
        this.buttonGameLevel_1.gameLevel = 1;

        this.buttonGameLevel_9 = game.add.button(0,0, 'buttonLevel_9', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_9.anchor.setTo(0.5, 0.5); 
        this.buttonGameLevel_9.scale.setTo(1,1);
        Povin.place(this.buttonGameLevel_9, 0.5, 0.47);
        this.buttonGameLevel_9.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_9.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_9);
        this.buttonGameLevel_9.gameLevel = 9;
     
        this.buttonGameLevel_18 = game.add.button(0,0, 'buttonLevel_18', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_18.anchor.setTo(0.5, 0.5); 
        this.buttonGameLevel_18.scale.setTo(1,1);
        Povin.place(this.buttonGameLevel_18, 0.5, 0.64);
        this.buttonGameLevel_18.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_18.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_18);
        this.buttonGameLevel_18.gameLevel = 18;
        
        this.buttonGameLevel_27 = game.add.button(0,0, 'buttonLevel_27', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_27.anchor.setTo(0.5, 0.5);
        this.buttonGameLevel_27.scale.setTo(1,1);
        Povin.place(this.buttonGameLevel_27,0.5, 0.81);
        this.buttonGameLevel_27.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_27.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_27);
        this.buttonGameLevel_27.gameLevel = 27;

        //game.add.tween(this.buttonGameLevel_1.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_9.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 50, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_18.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 100, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_27.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 150, false).yoyo(true);
        
        // Popup Intro Screen
        this.panelIntro = this.add.group();
        this.panelIntro.alpha = 0;
        //this.panelIntro.visible = false;

        this.panelIntro_title = game.add.sprite(0,0, 'score_panel');
        this.panelIntro_title.anchor.setTo(0.5, 0.5);
        this.panelIntro_title.scale.setTo(1.75,2.0);
        Povin.place(this.panelIntro_title, 0.5, 0.55);
        this.panelIntro.add(this.panelIntro_title);

        //  Intro Title
        this.introTitle = game.add.text(0,0, 'Intro', { font: '24px arial', fill: '#0099ff' }); 
        this.introTitle.anchor.setTo(0.5, 0.5);
        this.panelIntro.add(this.introTitle);
        Povin.place(this.introTitle, 0.5, 0.25);

        // Intro Text
        this.introTxt = Povin.getIntroText();                       
        this.introText = game.add.text(0,0, this.introTxt, { font: '16px arial', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        Povin.place(this.introText,0.2,0.30);
        this.panelIntro.add(this.introText);

        //  Tap to start Text
        this.introText_pa = game.add.text(0,0, 'Tap To Start', { font: '20px arial', fill: '#dc7b00' }); 
        this.introText_pa.anchor.setTo(0.5, 0.5);
        this.panelIntro.add(this.introText_pa);
        Povin.place(this.introText_pa, 0.5, 0.85);

        if (Povin.showIntroText() == true) {
            this.showIntro();
            Povin.setReadIntroVer();
        }  
        
    }, // end create:

    update: function() {
        //  Scroll the background
        this.starfield.tilePosition.y += 2;
    },

    render: function() {
        /* var debug = this.game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('gameLevel '+ Povin.gameLevel,10,140);
        debug.text('Povin '+ Povin,10,160);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
        */
    },

    nextState: function () {
        this.state.start('PlutoGame', true, false, Povin.gameMode, Povin.gameLevel);
    },

    // Pop up the Intro Text panel
    showIntro: function () {
        this.buttonGameModeNormal.inputEnabled = false;
        this.buttonGameModeFun.inputEnabled = false;
        this.buttonOptions.inputEnabled = false;
        game.add.tween(this.panelGameMode).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.panelIntro).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        //game.add.tween(this.starfield).to( { alpha: 0.25 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
    
        //the "Tap to restart" handler
        this.fireButton.onDown.addOnce(this.hideIntro, this);
        game.input.onTap.addOnce(this.hideIntro, this);
    },

    // Hide the Intro Text Panel
    hideIntro: function () {
        this.buttonGameModeNormal.inputEnabled = true;
        this.buttonGameModeFun.inputEnabled = true;
        this.buttonOptions.inputEnabled = true;
        game.add.tween(this.panelIntro).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.panelGameMode).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        //this.panelGameMode.alpha = 1;
    },

    // Show another fact on click
    factsTextClick: function () {
        var r = game.rnd.between(0,this.plutoFacts.facts.length-1);
        this.factsText.text = this.plutoFacts.facts[r];
    },

    // Action when click on the Options button
    actionOnClickOptions: function () {
        this.state.start('Options', true, false, Povin);   
    },

    onInputDownOptions: function(target) {
        game.add.tween(target.scale).to({
            x: 0.95,
            y: 0.95
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpOptions: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // Pop up the GameLevel select panel
    selectGameLevel: function() {
        game.add.tween(this.imageGameMode_title).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 0, 0, false);
      
        //this.imageGameMode_title.alpha = 0;
        game.add.tween(this.panelGameMode).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.add.tween(this.panelGameLevel).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        this.panelGameLevel.visible = true;
    },

    // button game selected
    actionOnClickGameMode: function (target) {
        Povin.gameMode = target.gameMode;
        this.selectGameLevel();
    },

    onInputDownGameMode: function(target) {
        game.add.tween(target.scale).to({
            x: 0.95,
            y: 0.95
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpGameMode: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // Select Game Level 
    actionOnClickGameLevel: function (target) {
        Povin.gameLevel = target.gameLevel;
        game.add.tween(this.panelGameLevel).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 0, 0, false);        
    },

    onInputDownGameLevel: function(target) {
        game.add.tween(target.scale).to({
            x: 0.8,
            y: 0.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpGameLevel: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
        this.nextState();
    },

};