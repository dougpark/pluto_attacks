/**************************************************************************************
* Credits State
* @author Doug Park
* @version v1.0
* @desc Show the credits 
* @date 2018-07-22
**************************************************************************************/
"use strict";

BasicGame.Credits = function (game) {
    // state level properties go here

};

BasicGame.Credits.prototype = {

    init: function() {
    },

    create: function () {
        // background starfield image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        this.starfield.alpha = 0.5;

        // background image of Pluto
        this.imagePluto = game.add.sprite(0, 0, 'pluto');
        this.imagePluto.anchor.setTo(0.7, 0.5);
        this.imagePluto.scale.setTo(.5, .5);
        Povin.place(this.imagePluto, .3, .2);

        // Pluto Attacks Title image
        this.imageGameMode_title = game.add.sprite(0, 0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        Povin.place(this.imageGameMode_title, .5, .1);

        // Home button to return to the main menu
        this.buttonHome = game.add.button(0, 0, 'buttonHome', Povin.actionOnClickHome, this, 2, 1, 0);
        this.buttonHome.anchor.setTo(0.5, 0.5);
        this.buttonHome.scale.setTo(.8, .8);
        Povin.place(this.buttonHome, 0.05, 0.13);
        this.buttonHome.events.onInputDown.add(Povin.onInputDownHome, this);
        this.buttonHome.events.onInputUp.add(Povin.onInputUpHome, this);

        // Speaker button to start/stop the background music
        this.buttonSpeaker = game.add.button(0, 0, 'buttonSpeaker', Povin.actionOnClickSpeaker, this, 2, 1, 0);
        this.buttonSpeaker.anchor.setTo(0.5, 0.5);
        this.buttonSpeaker.scale.setTo(.6, .6);
        Povin.place(this.buttonSpeaker, 0.97, 0.1);
        this.buttonSpeaker.events.onInputDown.add(Povin.onInputDownSpeaker, this);
        this.buttonSpeaker.events.onInputUp.add(Povin.onInputUpSpeaker, this);
        Povin.setSpeakerTexture(this.buttonSpeaker);

        // Spacebar to exit state
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButton.onDown.addOnce(this.actionOnClickBack, this);
        game.input.onTap.addOnce(this.actionOnClickBack, this);
      
        // Popup Credits Screen
        this.panelCredits = this.add.group();
        this.panelCredits.alpha = 1;

        // Nice blank panel
        this.panelCredits_panel = game.add.sprite(0, 0, 'score_panel');
        this.panelCredits_panel.anchor.setTo(0.5, 0.5);
        this.panelCredits_panel.scale.setTo(1.75, 2.2);
        Povin.place(this.panelCredits_panel, 0.5, 0.6);
        this.panelCredits.add(this.panelCredits_panel);

        //  Credits Title
        this.creditsTitle = game.add.text(0, 0, 'Credits', { font: '24px arial', fill: '#dc7b00' });
        this.creditsTitle.anchor.setTo(0.5, 0.5);
        this.panelCredits.add(this.creditsTitle);
        Povin.place(this.creditsTitle, 0.5, 0.27);

        // Credits Text
        this.creditsTxt = "" +
            "Based on: phaser.io - invaders example\n" +
            "Images: NASA.gov\n" +
            "Pluto Facts: NASA.gov\n" +
            "Artwork: thegameassetsmine.com - Space Game UI\n" +
            "Spaceship: market.envato.com - Spaceships by neogeo37\n" +
            "Music: incompetech.com - Dangerous by Kevin MacLeod\n" +
            "Font: dafont.com - Happy-Killer.font\n" +
            "Sound Effects: GameBurp.com\n" +
            "Scream: wilhelmscream.net - Wilhelm Scream\n";
            
        this.creditsText = game.add.text(0, 0, this.creditsTxt, { font: '16px arial', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });
        Povin.place(this.creditsText, 0.2, 0.35);
        this.panelCredits.add(this.creditsText);

        // Cookies Text
        this.cookiesTxt = "This site uses cookies and saves score data on Povingames.com, "+
                          "play at your own risk."
        this.cookiesText = game.add.text(0, 0, this.cookiesTxt, { font: '12px arial', fill: '#dc7b00', boundsAlignH: "center", boundsAlignV: "middle" });
        Povin.place(this.cookiesText, 0.2, 0.90);
        this.panelCredits.add(this.cookiesText);


    },

    update: function () {

        //  Scroll the background
        this.starfield.tilePosition.y += 2;   

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

    render2: function() {
      var debug = game.debug;
        debug.text('Credits Menu',10,100);
        debug.text('height ' + game.world.height,10,120); 
        debug.text('Povin '+ Povin.toString(),10,140);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
     
    },

    nextState: function () {
        this.state.start('Options', true, false);
    }
};