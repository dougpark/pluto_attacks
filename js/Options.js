/**************************************************************************************
* Options State
* @author Doug Park
* @version v1.0
* @desc User selects game options
* @date 2018-07-22
**************************************************************************************/
"use strict";

BasicGame.Options = function (game) {
    // state level properties go here

};

BasicGame.Options.prototype = {

    init: function() {

       
        
    },

    create: function () {
        // background starfield image
        this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        this.starfield.alpha = 0.5;

        // background pluto image
        this.imagePluto = game.add.sprite(0,0, 'pluto');
        this.imagePluto.anchor.setTo(0.7, 0.5);
        this.imagePluto.scale.setTo(.5, .5);
        Povin.place(this.imagePluto, .3, .2) ;

        // Spacebar
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Game title image
        this.imageGameMode_title = game.add.sprite(0,0, 'title');
        this.imageGameMode_title.anchor.setTo(0.5, 0.5);
        this.imageGameMode_title.scale.setTo(1.25, .80);
        Povin.place(this.imageGameMode_title, .5, .1);
     /*    
        // Music Button
        this.buttonMusic = game.add.button(0,0, 'buttonMusicOn', this.actionOnClickMusic, this, 2, 1, 0);
        this.buttonMusic.anchor.setTo(0.5, 0.5);
        this.buttonMusic.scale.setTo(1, 1);
        Povin.place(this.buttonMusic, 0.5, 0.4);
        this.buttonMusic.events.onInputDown.add(this.onInputDownMusic, this);
        this.buttonMusic.events.onInputUp.add(this.onInputUpMusic, this);
        //this.buttonMusic.frame = Povin.musicEnabled; 
 */
        // High Scores Button
        this.buttonHighScores = game.add.button(0, 0, 'buttonHighScores', this.actionOnClickHighScores, this, 2, 1, 0);
        this.buttonHighScores.anchor.setTo(0.5, 0.5);
        this.buttonHighScores.scale.setTo(1, 1);
        Povin.place(this.buttonHighScores, 0.2, 0.9);
        this.buttonHighScores.events.onInputDown.add(this.onInputDownHighScores, this);
        this.buttonHighScores.events.onInputUp.add(this.onInputUpHighScores, this);

        // Credits Button
        this.buttonCredits = game.add.button(0, 0, 'buttonCredits', this.actionOnClickCredits, this, 2, 1, 0);
        this.buttonCredits.anchor.setTo(0.5, 0.5);
        this.buttonCredits.scale.setTo(1, 1);
        Povin.place(this.buttonCredits, 0.8, 0.9);
        this.buttonCredits.events.onInputDown.add(this.onInputDownCredits, this);
        this.buttonCredits.events.onInputUp.add(this.onInputUpCredits, this);
  
        // Home button to return to the main menu
        this.buttonHome = game.add.button(0, 0, 'buttonHome', Povin.actionOnClickHome, this, 2, 1, 0);
        this.buttonHome.anchor.setTo(0.5, 0.5);
        this.buttonHome.nextState = 'MainMenu';
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
        if (!options.playMusic.checked) {
            this.buttonSpeaker.alpha = 0;
            this.buttonSpeaker.inputEnabled = false;
        }

        // list of available game options
        options.playSFX = new Checkbox('playSFX',Povin.placeX(.25), Povin.placeY(.4), 'Enable SFX',options.playSFX.checked);       
        options.playMusic = new Checkbox('playMusic',Povin.placeX(.25), Povin.placeY(.5), 'Enable Music',options.playMusic.checked);       
        options.playVoice = new Checkbox('playVoice',Povin.placeX(.25), Povin.placeY(.6), 'Enable Voice',options.playVoice.checked);       
        options.joystick = new Checkbox('joystick', Povin.placeX(.25), Povin.placeY(.7), 'Enable on screen joystick for mobile', options.joystick.checked);

    },

    // Action when click on the music button
    actionOnClickMusic: function (target) {

        Povin.musicToggle() ;
        this.setMusicTexture(target);
        Povin.setSpeakerTexture(this.buttonSpeaker);
    },

    setMusicTexture: function (target) {

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
    },

     onInputUpMusic: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // button Credits
    actionOnClickCredits: function () {
        this.creditsState();
    },

    onInputDownCredits: function(target) {
        game.add.tween(target.scale).to({
            x: 0.9,
            y: 0.9
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpCredits: function(target) {
        game.add.tween(target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // button HighScores
    actionOnClickHighScores: function () {
        this.HighScoresState();
    },

    onInputDownHighScores: function (target) {
        game.add.tween(target.scale).to({
            x: 0.9,
            y: 0.9
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpHighScores: function (target) {
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
      
        if (!options.playMusic.checked) {
            this.buttonSpeaker.alpha = 0;
            this.buttonSpeaker.inputEnabled = false;
        } else {
            this.buttonSpeaker.alpha = 1;
            this.buttonSpeaker.inputEnabled = true;

        }

    },

    render2: function() {
     var debug = game.debug;
        debug.text('height ' + game.world.height,10,120);
        debug.text('trainingLevel '+ Povin.trainingLevel,10,140);
        debug.text('Povin '+ Povin,10,160);
        debug.text('Options Menu',10,180);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);
    },

    nextState: function () {
        this.state.start('MainMenu', true, false);
    },

    creditsState: function () {
        this.state.start('Credits', true, false);
    },

    HighScoresState: function () {
        Povin.HSNextState = 'Options';
        this.state.start('HighScores', true, false);
    }
};


