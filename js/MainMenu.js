// **************************************************************************************
// MainMenu
// **************************************************************************************
"use strict";

PlutoAttacks.MainMenu = function () {

    var levelSelect;
    var title;
    var buttonNormal;
    var buttonFun;
    var buttonInsane;
    this.gameMode;
};


PlutoAttacks.MainMenu.prototype = {

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
        //this.buttonNormal.scale.setTo(.90,.90);
        //var levelTween = game.add.tween(this.levelSelect.scale).to( { x: game.world.centerX-5, y:game.world.centerY+50-5 }, 500, Phaser.Easing.Back.Out, true, -1);

        var levelTween = game.add.tween(this.levelSelect.scale).to({ x: 1.05, y: 1.05 }, 2000, Phaser.Easing.Linear.None, true);
        levelTween.yoyo(true, 0);
        levelTween.repeat(-1);

        //game.input.onTap.addOnce(this.nextState,this);

        // BlinkingPanels
        this.blinkingPanels = game.add.group();
        this.blinkingPanels.enableBody = true;
        this.blinkingPanels.physicsBodyType = Phaser.Physics.ARCADE;

        //this.createBlinkingPanels();

        // level select buttons
        this.buttonNormal = game.add.button(game.world.centerX - 113, 190, 'buttonNormal', this.actionOnClickNormal, this, 2, 1, 0);
        this.buttonFun = game.add.button(game.world.centerX - 113, 295, 'buttonFun', this.actionOnClickFun, this, 2, 1, 0);
        this.buttonInsane = game.add.button(game.world.centerX - 113, 400, 'buttonInsane', this.actionOnClickInsane, this, 2, 1, 0);

    },

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

    // buttonNormal
    actionOnClickNormal: function () {

        this.gameMode = "1";
        this.nextState();

    },

    // buttonFun
    actionOnClickFun: function () {

        this.gameMode = "2";
        this.nextState();
    },

    // buttonInsane
    actionOnClickInsane: function () {

        this.gameMode = "3";
        this.nextState();
    },


    nextState: function () {

        this.state.start('Game', true, false, this.gameMode);

    }

};