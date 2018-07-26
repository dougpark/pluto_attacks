// **************************************************************************************
// Main Menu
// **************************************************************************************
"use strict";

var MainMenu = function () {};

MainMenu.prototype = {

    init: function() {
    },

    create: function () {
        // background image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        
        // Game mode menu group
        this.panelGameMode = this.add.group();
        this.panelGameMode.visible = true;
        this.panelGameMode.alpha = 1;

        // Game mode menu title image
        this.imageGameMode_title = game.add.sprite(0,0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        this.panelGameMode.add(this.imageGameMode_title);
        this.place(this.imageGameMode_title, .5, .1);

        // Game mode menu floaters
        this.imageGameMode_floater = game.add.sprite(0,0, 'levelSelect');
        this.imageGameMode_floater.anchor.setTo(0.5, 0.5);
        this.panelGameMode.add(this.imageGameMode_floater);
        this.place(this.imageGameMode_floater, .5, .58);
        var levelTween = game.add.tween(this.imageGameMode_floater.scale).to({ x: 1.05, y: 1.05 }, 2000, Phaser.Easing.Linear.None, true);
        levelTween.yoyo(true, 0);
        levelTween.repeat(-1);

        // Game mode menu buttons
        this.buttonGameModeNormal = game.add.button(0,0, 'buttonNormal', this.actionOnClickGameMode, this, 2, 1, 0);
        this.buttonGameModeNormal.anchor.setTo(0.5, 0.5);
        this.place(this.buttonGameModeNormal, .5, .58);
        this.buttonGameModeNormal.events.onInputDown.add(this.onInputDownGameMode, this);
        this.buttonGameModeNormal.events.onInputUp.add(this.onInputUpGameMode, this);
        this.buttonGameModeNormal.gameMode = 1;
        this.panelGameMode.add(this.buttonGameModeNormal);

        this.buttonGameModeFun = game.add.button(game.world.centerX, 345, 'buttonFun', this.actionOnClickGameMode, this, 2, 1, 0);
        this.buttonGameModeFun.anchor.setTo(0.5, 0.5);
        this.place(this.buttonGameModeFun, .5, .40);
        this.buttonGameModeFun.events.onInputDown.add(this.onInputDownGameMode, this);
        this.buttonGameModeFun.events.onInputUp.add(this.onInputUpGameMode, this);
        this.buttonGameModeFun.gameMode = 2;
        this.panelGameMode.add(this.buttonGameModeFun);        

        // this.buttonGameModeInsane = game.add.button(0,0, 'buttonInsane', this.actionOnClickGameMode, this, 2, 1, 0);
        // this.buttonGameModeInsane.anchor.setTo(0.5, 0.5);
        // this.place(this.buttonGameModeInsane, .5, .76);
        // this.buttonGameModeInsane.events.onInputDown.add(this.onInputDownGameMode, this);
        // this.buttonGameModeInsane.events.onInputUp.add(this.onInputUpGameMode, this);
        // this.buttonGameModeInsane.gameMode = 3;
        // this.panelGameMode.add(this.buttonGameModeInsane);
        
        // Options Button 
        this.buttonOptions = game.add.button(0,0, 'buttonOptions', this.actionOnClickOptions, this, 2, 1, 0);
        this.buttonOptions.anchor.setTo(0.5, 0.5);
        //this.buttonOptions.scale.setTo(1,1);
        this.place(this.buttonOptions, .5, .76);
        this.buttonOptions.events.onInputDown.add(this.onInputDownOptions, this);
        this.buttonOptions.events.onInputUp.add(this.onInputUpOptions, this);
        this.panelGameMode.add(this.buttonOptions);

       
        // Popup Game level menu
        this.panelGameLevel = this.add.group();
        this.panelGameLevel.alpha = 0;
        this.panelGameLevel.visible = false;

        this.buttonGameLevel_title = game.add.sprite(0,0, 'level_title');
        this.buttonGameLevel_title.anchor.setTo(0.5, 0.5)
        this.place(this.buttonGameLevel_title, 0.5, 0.5);
        this.panelGameLevel.add(this.buttonGameLevel_title);

        this.buttonGameLevel_1 = game.add.button(0,0, 'buttonLevel_1', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_1.anchor.setTo(0.5, 0.5);
        this.buttonGameLevel_1.scale.setTo(1,1);
        this.place(this.buttonGameLevel_1, 0.5, 0.30);
        this.buttonGameLevel_1.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_1.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_1);
        this.buttonGameLevel_1.gameLevel = 1;

        this.buttonGameLevel_9 = game.add.button(0,0, 'buttonLevel_9', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_9.anchor.setTo(0.5, 0.5); 
        this.buttonGameLevel_9.scale.setTo(1,1);
        this.place(this.buttonGameLevel_9, 0.5, 0.47);
        this.buttonGameLevel_9.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_9.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_9);
        this.buttonGameLevel_9.gameLevel = 9;
     
        this.buttonGameLevel_18 = game.add.button(0,0, 'buttonLevel_18', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_18.anchor.setTo(0.5, 0.5); 
        this.buttonGameLevel_18.scale.setTo(1,1);
        this.place(this.buttonGameLevel_18, 0.5, 0.64);
        this.buttonGameLevel_18.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_18.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_18);
        this.buttonGameLevel_18.gameLevel = 18;
        
        this.buttonGameLevel_27 = game.add.button(0,0, 'buttonLevel_27', this.actionOnClickGameLevel, this, 2, 1, 0);
        this.buttonGameLevel_27.anchor.setTo(0.5, 0.5);
        this.buttonGameLevel_27.scale.setTo(1,1);
        this.place(this.buttonGameLevel_27,0.5, 0.81);
        this.buttonGameLevel_27.events.onInputDown.add(this.onInputDownGameLevel, this);
        this.buttonGameLevel_27.events.onInputUp.add(this.onInputUpGameLevel, this);
        this.panelGameLevel.add(this.buttonGameLevel_27);
        this.buttonGameLevel_27.gameLevel = 27;

        //game.add.tween(this.buttonGameLevel_1.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_9.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 50, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_18.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 100, false).yoyo(true);
        //game.add.tween(this.buttonGameLevel_27.scale).to( {x: .95, y: .95}, 500, Phaser.Easing.Back.InOut, true, 150, false).yoyo(true);
        
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
       // this.nextState();
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

    render: function() {
        /* var debug = this.game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('gameLevel '+ Povin.gameLevel,10,140);
        debug.text('Povin '+ Povin,10,160);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
        */
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
    },

    nextState: function () {
        this.state.start('PlutoGame', true, false, Povin.gameMode, Povin.gameLevel);
    }
};