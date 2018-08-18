/**************************************************************************************
* Options State
* @author Doug Park
* @version v1.0
* @desc User selects game options
* @date 2018-07-022
**************************************************************************************/
"use strict";

var Options = {};

Options = function (game) {
    // state level properties go here

};

Options.prototype = {

    init: function() {
    },

    create: function () {
        // background image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        this.starfield.alpha = 0.5;

        this.imagePluto = game.add.sprite(0,0, 'pluto');
        this.imagePluto.anchor.setTo(0.7, 0.5);
        this.imagePluto.scale.setTo(.5, .5);
        Povin.place(this.imagePluto, .3, .2);

        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Game mode menu title image
        this.imageGameMode_title = game.add.sprite(0,0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        Povin.place(this.imageGameMode_title, .5, .1);
        
        // Option menu title image
        //this.title = game.add.sprite(0,0, 'options');
        //this.title.anchor.setTo(0.5, 0.5);
        //this.title.scale.setTo(1.2, .80);
        //Povin.place(this.title, .5, .10);

        this.options_title = game.add.sprite(0,0, 'options_title');
        this.options_title.anchor.setTo(0.5, 0.5)
        this.options_title.scale.setTo(1, .75);
        Povin.place(this.options_title, 0.5, 0.55);

        // Music Button
        this.buttonMusic = game.add.button(0,0, 'buttonMusicOn', this.actionOnClickMusic, this, 2, 1, 0);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(1, 1);
        Povin.place(this.buttonMusic, 0.5, 0.48);
        this.buttonMusic.events.onInputDown.add(this.onInputDownMusic, this);
        this.buttonMusic.events.onInputUp.add(this.onInputUpMusic, this);
        //this.buttonMusic.frame = Povin.musicEnabled; 

        // Credits Button
        this.buttonCredits = game.add.button(0,0, 'buttonCredits', this.actionOnClickCredits, this, 2, 1, 0);
        this.buttonCredits.anchor.setTo(0.5, 0.5);
        this.buttonCredits.scale.setTo(1,1);
        Povin.place(this.buttonCredits, 0.5, 0.7);
        this.buttonCredits.events.onInputDown.add(this.onInputDownCredits, this);
        this.buttonCredits.events.onInputUp.add(this.onInputUpCredits, this);
  
        // Back Button
        this.buttonBack = game.add.button(0,0, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0.5, 0.5);
        this.buttonBack.scale.setTo(.5,.5);
        Povin.place(this.buttonBack, 0.1, 0.10);
        this.buttonBack.events.onInputDown.add(this.onInputDownBack, this);
        this.buttonBack.events.onInputUp.add(this.onInputUpBack, this);

        // Continue Button
        this.buttonContinue = game.add.button(0,0, 'buttonContinue', this.actionOnClickContinue, this, 2, 1, 0);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.scale.setTo(.5,.5);
        Povin.place(this.buttonContinue, 0.5, 0.85);
        //this.buttonContinue.alpha = 0;
        this.buttonContinue.inputEnabled = false;
        this.buttonContinue.events.onInputDown.add(this.onInputDownContinue, this);
        this.buttonContinue.events.onInputUp.add(this.onInputUpContinue, this);

        

        // Popup Credits Screen
        this.panelCredits = this.add.group();
        this.panelCredits.alpha = 0;
        //this.panelCredits.visible = false;

        this.panelCredits_title = game.add.sprite(0,0, 'score_panel');
        this.panelCredits_title.anchor.setTo(0.5, 0.5);
        this.panelCredits_title.scale.setTo(1.75,2.0);
        Povin.place(this.panelCredits_title, 0.5, 0.55);
        this.panelCredits.add(this.panelCredits_title);

        //  Credits Title
        this.creditsTitle = game.add.text(0,0, 'Credits', { font: '24px arial', fill: '#dc7b00' }); 
        this.creditsTitle.anchor.setTo(0.5, 0.5);
        this.panelCredits.add(this.creditsTitle);
        Povin.place(this.creditsTitle, 0.5, 0.25);

        this.creditsTxt = ""+
                          "Based on: phaser.io - example project\n"+
                          "Images: NASA.gov\n"+
                          "Pluto Facts: NASA.gov\n"+
                          "Artwork: thegameassetsmine.com - Space Game UI\n"+
                          "Spaceship: market.envato.com - Spaceships by neogeo37\n"+
                          "Music: incompetech.com - Dangerous by Kevin MacLeod\n"+
                          "Font: dafont.com - Happy-Killer.font\n"+
                          "Sound Effects: GameBurp.com\n"+
                          "Scream: wilhelmscream.net - Wilhelm Scream\n"+
                          "->This site uses cookies and saves score data on Povingames.com";
        this.creditsText = game.add.text(0,0, this.creditsTxt, { font: '16px arial', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        Povin.place(this.creditsText,0.2,0.30);
        this.panelCredits.add(this.creditsText);

        this.panelCredits.add(this.buttonContinue);

        //  Tap to return Text
        //this.creditsText_pa = game.add.text(0,0, 'Tap To Return', { font: '20px arial', fill: '#dc7b00' }); 
        //this.creditsText_pa.anchor.setTo(0.5, 0.5);
        //this.panelCredits.add(this.creditsText_pa);
        //Povin.place(this.creditsText_pa, 0.5, 0.85);

    },

    // Pop up the Credits panel
    showCredits: function () {
        game.add.tween(this.panelCredits).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: 0.25 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        //this.buttonContinue.alpha = 1;
        this.buttonContinue.inputEnabled = true;

        //the "Tap to restart" handler
        //this.fireButton.onDown.addOnce(this.hideCredits, this);
        //game.input.onTap.addOnce(this.hideCredits, this);
    },

    // Pop up the Credits panel
    hideCredits: function () {
        game.add.tween(this.panelCredits).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: 0.5 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        //this.buttonContinue.alpha = 0;
        this.buttonContinue.inputEnabled = false;
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

        Povin.musicToggle();

        if (Povin.musicStatus() == true) {
            target.loadTexture('buttonMusicOn');

        } else {
            target.loadTexture('buttonMusicOff'); 
        }      
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

    // button Continue
    actionOnClickContinue: function () {
        this.hideCredits();
      },

    onInputDownContinue: function(target) {
        game.add.tween(target.scale).to({
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpContinue: function(target) {
        game.add.tween(target.scale).to({
            x: .5,
            y: .5
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

    nextState: function () {
        this.state.start('MainMenu', true, false);
    }
};