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
        this.title = game.add.sprite(0,0, 'options');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale.setTo(1.2, .80);
        this.place(this.title, .5, .10);

        // Music Button
        this.buttonMusic = game.add.button(0,0, 'buttonMusic', this.actionOnClickMusic, this);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(1, 1);
        this.place(this.buttonMusic, 0.5, 0.30);
        this.buttonMusic.events.onInputDown.add(this.onInputDownMusic, this);
        this.buttonMusic.events.onInputUp.add(this.onInputUpMusic, this);
        this.buttonMusic.frame = Povin.musicEnabled; 

        // Credits Button
        //this.buttonCredits = game.add.button(0,0, 'buttonCredits', this.actionOnClickCredits, this, 2, 1, 0);
        //this.buttonCredits.anchor.setTo(0.5, 0.5);
        //this.buttonCredits.scale.setTo(1,1);
        //this.place(this.buttonCredits, 0.5, 0.6);
        //this.buttonCredits.events.onInputDown.add(this.onInputDownCredits, this);
        //this.buttonCredits.events.onInputUp.add(this.onInputUpCredits, this);
  
        // Back Button
        this.buttonBack = game.add.button(0,0, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0.5, 0.5);
        this.buttonBack.scale.setTo(.5,.5);
        this.place(this.buttonBack, 0.1, 0.10);
        this.buttonBack.events.onInputDown.add(this.onInputDownBack, this);
        this.buttonBack.events.onInputUp.add(this.onInputUpBack, this);

        this.creditsTxt = "Credits:\n"+
                          "Based on: phaser.io - example project\n"+
                          "Artwork: thegameassetsmine.com - Space Game UI\n"+
                          "Spaceship: market.envato.com - Spaceships by neogeo37\n"+
                          "Music: incompetech.com - Dangerous by Kevin MacLeod\n"+
                          "Font: dafont.com - Happy-Killer.font\n"+
                          "Sfx: phaser.io - example Sounds\n"+
                          "Scream: wilhelmscream.net - Wilhelm Scream";
        this.creditsText = game.add.text(0,0, this.creditsTxt, { font: '18px HappyKiller', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        this.place(this.creditsText,0.05,0.40);
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
    actionOnClickMusic: function (target) {
        if (Povin.bgMusic.isPlaying == true) {
            Povin.bgMusic.pause();
            Povin.musicEnabled = 0;
            localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);
            target.frame = 0; // button image music off
        }
        else {
            Povin.bgMusic.stop();
            Povin.bgMusic.play();
            Povin.musicEnabled = 1;
            localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);
            target.frame = 1; // button image music on
        };
    },

     onInputDownMusic: function(target) {
        game.add.tween(target.scale).to({
            x: 0.9,
            y: 0.9
        }, 100, Phaser.Easing.Cubic.Out, true);
        //game.add.tween(target.my_txt.scale).to({
        //    x: 0.9,
        //    y: 0.9
        //}, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpMusic: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
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

    // button Credits
    actionOnClickCredits: function () {
       // this.state.start('Credits', true, false);
    },

    onInputDownCredits: function(target) {
        game.add.tween(target.scale).to({
            x: 0.8,
            y: 0.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpCredits: function(target) {
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
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpBack: function(target) {
        game.add.tween(target.scale).to({
            x: 0.5,
            y: 0.5
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    update: function() {

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
        this.state.start('MainMenu', true, false);
    }
};