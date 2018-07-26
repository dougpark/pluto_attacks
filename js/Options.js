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
        this.starfield.alpha = 0.5;

        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Game mode menu title image
        this.imageGameMode_title = game.add.sprite(0,0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        this.place(this.imageGameMode_title, .5, .1);
        
        // Option menu title image
        //this.title = game.add.sprite(0,0, 'options');
        //this.title.anchor.setTo(0.5, 0.5);
        //this.title.scale.setTo(1.2, .80);
        //this.place(this.title, .5, .10);

        this.options_title = game.add.sprite(0,0, 'options_title');
        this.options_title.anchor.setTo(0.5, 0.5)
        this.options_title.scale.setTo(1, .75);
        this.place(this.options_title, 0.5, 0.55);

        // Music Button
        this.buttonMusic = game.add.button(0,0, 'buttonMusic', this.actionOnClickMusic, this);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(1, 1);
        this.place(this.buttonMusic, 0.5, 0.48);
        this.buttonMusic.events.onInputDown.add(this.onInputDownMusic, this);
        this.buttonMusic.events.onInputUp.add(this.onInputUpMusic, this);
        this.buttonMusic.frame = Povin.musicEnabled; 

        // Credits Button
        this.buttonCredits = game.add.button(0,0, 'buttonCredits', this.actionOnClickCredits, this, 2, 1, 0);
        this.buttonCredits.anchor.setTo(0.5, 0.5);
        this.buttonCredits.scale.setTo(1,1);
        this.place(this.buttonCredits, 0.5, 0.7);
        this.buttonCredits.events.onInputDown.add(this.onInputDownCredits, this);
        this.buttonCredits.events.onInputUp.add(this.onInputUpCredits, this);
  
        // Back Button
        this.buttonBack = game.add.button(0,0, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0.5, 0.5);
        this.buttonBack.scale.setTo(.5,.5);
        this.place(this.buttonBack, 0.1, 0.10);
        this.buttonBack.events.onInputDown.add(this.onInputDownBack, this);
        this.buttonBack.events.onInputUp.add(this.onInputUpBack, this);

        

        // Popup Credits Screen
        this.panelCredits = this.add.group();
        this.panelCredits.alpha = 0;
        //this.panelCredits.visible = false;

        this.panelCredits_title = game.add.sprite(0,0, 'score_panel');
        this.panelCredits_title.anchor.setTo(0.5, 0.5);
        this.panelCredits_title.scale.setTo(1.75,2.0);
        this.place(this.panelCredits_title, 0.5, 0.55);
        this.panelCredits.add(this.panelCredits_title);

        //  Credits Title
        this.creditsTitle = game.add.text(0,0, 'Credits', { font: '24px arial', fill: '#0099ff' }); 
        this.creditsTitle.anchor.setTo(0.5, 0.5);
        this.panelCredits.add(this.creditsTitle);
        this.place(this.creditsTitle, 0.5, 0.25);

        this.creditsTxt = ""+
                          "Based on: phaser.io - example project\n"+
                          "Artwork: thegameassetsmine.com - Space Game UI\n"+
                          "Spaceship: market.envato.com - Spaceships by neogeo37\n"+
                          "Music: incompetech.com - Dangerous by Kevin MacLeod\n"+
                          "Font: dafont.com - Happy-Killer.font\n"+
                          "Sfx: phaser.io - example Sounds\n"+
                          "Scream: wilhelmscream.net - Wilhelm Scream";
        this.creditsText = game.add.text(0,0, this.creditsTxt, { font: '16px arial', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        this.place(this.creditsText,0.2,0.40);
        this.panelCredits.add(this.creditsText);

        //  Tap to return Text
        this.creditsText_pa = game.add.text(0,0, 'Tap To Return', { font: '20px arial', fill: '#0099ff' }); 
        this.creditsText_pa.anchor.setTo(0.5, 0.5);
        this.panelCredits.add(this.creditsText_pa);
        this.place(this.creditsText_pa, 0.5, 0.85);

    },

    // Pop up the Scores panel
    showCredits: function () {
        game.add.tween(this.panelCredits).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: 0.25 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
    
        //the "Tap to restart" handler
        this.fireButton.onDown.addOnce(this.hideCredits, this);
        game.input.onTap.addOnce(this.hideCredits, this);
    },

    // Pop up the Scores panel
    hideCredits: function () {
        game.add.tween(this.panelCredits).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: 0.5 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
     
        //this.panelCredits.visible = false;
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
      this.showCredits();
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

      //  Scroll the background
      this.starfield.tilePosition.y += 2;   

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