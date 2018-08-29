/**************************************************************************************
* HighScores State
* @author Doug Park
* @version v1.0
* @desc Show the high scores 
* @date 2018-08-29
**************************************************************************************/
"use strict";

BasicGame.HighScores = function (game) {
    // state level properties go here

};

BasicGame.HighScores.prototype = {

    init: function () {
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

        // Back Button to exit state
        this.buttonBack = game.add.button(0, 0, 'buttonBack', this.actionOnClickBack, this, 2, 1, 0);
        this.buttonBack.anchor.setTo(0, 0.5);
        this.buttonBack.scale.setTo(.5, .5);
        Povin.place(this.buttonBack, 0, 0.10);
        this.buttonBack.events.onInputDown.add(this.onInputDownBack, this);
        this.buttonBack.events.onInputUp.add(this.onInputUpBack, this);

        // Spacebar to exit state
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButton.onDown.addOnce(this.actionOnClickBack, this);
        game.input.onTap.addOnce(this.actionOnClickBack, this);

        // Popup Scores Screen
        this.panelScores = this.add.group();
        this.panelScores.alpha = 0;
        //this.panelScores.visible = false;

        this.panelScores_title = game.add.sprite(0, 0, 'score_panel');
        this.panelScores_title.anchor.setTo(0.5, 0.5);
        this.panelScores_title.scale.setTo(1.75, 2.0);
        Povin.place(this.panelScores_title, 0.5, 0.55);
        this.panelScores.add(this.panelScores_title);

        //  High Scores Title
        this.scoresTitle = game.add.text(0, 0, 'High Scores', { font: '24px arial', fill: '#0099ff' });
        this.scoresTitle.anchor.setTo(0.5, 0.5);
        this.panelScores.add(this.scoresTitle);
        Povin.place(this.scoresTitle, 0.5, 0.25);

        //  Rank Text
        this.scoresText_ra = game.add.text(0, 0, 'Rank\tScore\tPerfect\tEscaped\tPlayer', { font: '20px arial', fill: '#dc7b00', tabs: [80, 100, 100, 100, 100] });
        this.panelScores.add(this.scoresText_ra);
        Povin.place(this.scoresText_ra, 0.20, 0.29);

        //  Rank Value
        this.scoresText_rav = game.add.text(0, 0, '1st', { font: '20px arial', fill: '#0099ff', align: 'left', tabs: [80, 120, 100, 80, 100] });
        //this.scoresText_rav.anchor.setTo(0.5, 0);
        this.panelScores.add(this.scoresText_rav);
        Povin.place(this.scoresText_rav, 0.20, 0.34);

        //  Scores Text
        this.stateText = game.add.text(0, 0, '', { font: '20px arial', fill: '#0099ff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        Povin.place(this.stateText, 0.5, 0.69);
        this.stateText.align = 'center';
        this.stateText.visible = true;
        this.panelScores.add(this.stateText);

        //  Tap to play again Text
        //this.scoresText_pa = game.add.text(0,0, 'Tap/Space To Play Again', { font: '20px arial', fill: '#dc7b00' }); 
        //this.scoresText_pa.anchor.setTo(0.5, 0.5);
        //this.panelScores.add(this.scoresText_pa);
        //Povin.place(this.scoresText_pa, 0.5, 0.85);

        // Continue Button
        this.buttonContinue = game.add.button(0, 0, 'buttonContinue', this.actionOnClickContinue, this, 2, 1, 0);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.scale.setTo(.75, .75);
        Povin.place(this.buttonContinue, 0.5, 0.85);
        this.panelScores.add(this.buttonContinue);
        this.buttonContinue.inputEnabled = false;
        this.buttonContinue.events.onInputDown.add(this.onInputDownContinue, this);
        this.buttonContinue.events.onInputUp.add(this.onInputUpContinue, this);

        this.endGame();

    },

    update: function () {

        //  Scroll the background
        this.starfield.tilePosition.y += 2;

    },

    // button Continue
    actionOnClickContinue: function () {
        this.nextState();
    },

    onInputDownContinue: function (target) {
        game.add.tween(target.scale).to({
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpContinue: function (target) {
        game.add.tween(target.scale).to({
            x: .5,
            y: .5
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // button Back
    actionOnClickBack: function () {
        this.nextState();
    },

    onInputDownBack: function (target) {
        game.add.tween(target.scale).to({
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpBack: function (target) {
        game.add.tween(target.scale).to({
            x: 0.5,
            y: 0.5
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    render2: function () {
        var debug = game.debug;
        debug.text('Credits Menu', 10, 100);
        debug.text('height ' + game.world.height, 10, 120);
        debug.text('Povin ' + Povin.toString(), 10, 140);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);

    },

    nextState: function () {
        this.state.start('Level1', true, false);
    },

    endGame: function () {
        this.stateText.text = "";

        // save your current score to the score server
        Povin.saveHighScore(Povin.gameMode, Povin.gameLevel, Povin.level, Povin.totalPerfectLevel, Povin.totalAlienEscape, Povin.score);

        // retrieve my rank from the score server
        this.retrieveMyRank(Povin.score);

        // show the high score hud
        this.showHighScores();

        this.stateText.text += "\n A message from your commander:"

        if (this.score <= 0) {
            this.stateText.text += "\n Pluto ate your lunch.";
        } else if (this.score < 10000) {
            this.stateText.text += "\n Nice Try.";
        } else if (this.score < 100000) {
            this.stateText.text += "\n Not Bad.";
        } else if (this.score < 200000) {
            this.stateText.text += "\n Pretty Good.";
        } else if (this.score > 200000) {
            this.stateText.text += "\n Great Job.";
        }
        this.stateText.text += "\n Keep playing until the IAU says Pluto is a planet!";

        //the "Tap to restart" handler
        this.fireButton.onDown.addOnce(this.nextState, this);
        //game.input.onTap.addOnce(this.restartGame, this);

    },

    // !! move to highscores state
    // Pop up the Scores panel
    showHighScores: function () {
        game.add.tween(this.panelScores).to({ alpha: 0.95 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to({ alpha: 0.25 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        this.buttonContinue.inputEnabled = true;
        //this.panelScores.visible = true;
    },

    // !! move to highscore state
    // Pop up the Scores panel
    hideHighScores: function () {
        game.add.tween(this.panelScores).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to({ alpha: .3 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        this.buttonContinue.inputEnabled = false;
        //this.panelScores.visible = false;
    },

    // !! move to highscore state
    // retrieve high scores from the score server    
    retrieveMyRank: function (myScore) {
        Povin.rank = -1;
        self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //console.log("retriveHighScores= " + this.responseText);
                self.processMyRank(this.responseText);
            }
        };

        xmlhttp.open("GET", "getmyrank.php?q=" + myScore, true);
        xmlhttp.send();

    },

    // !! move to highscore state
    // process the high scores from the score server
    processMyRank: function (highScores) {

        if (highScores != 'null') {
            var scores = JSON.parse(highScores);
            //console.log('my rank = ' + highScores);
            Povin.rank = Number(scores[0].Rank) + 1;
            //console.log('Calc rank = ' + Povin.rank);
        } else {
            Povin.rank = 1;
            //console.log('Calc rank1 = ' + Povin.rank);

        }

        // retrieve high scores from server
        this.retrieveHighScores();


    },

    // !! move to highscore state
    // retrieve high scores from the score server    
    retrieveHighScores: function () {
        self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //console.log("retriveHighScores= " + this.responseText);
                self.processHighScores(this.responseText);
            }
        };
        xmlhttp.open("GET", "gethighscore.php", true);
        xmlhttp.send();

    },

    // !! move to highscore state
    // process the high scores from the score server
    processHighScores: function (highScores) {

        this.scoresText_rav.text = "";
        var scores = JSON.parse(highScores);

        var i, j;
        for (i = 0; i <= 4; i++) {
            j = i + 1;
            this.scoresText_rav.text += j + '\t';
            this.scoresText_rav.text += util.addCommas(scores[i].Score) + "\t";
            this.scoresText_rav.text += scores[i].PerfectLevels + "\t";
            this.scoresText_rav.text += scores[i].AliensEscaped + "\t";
            this.scoresText_rav.text += "Player " + j + "\n";
        }

        // add Your scores to end of the list
        this.scoresText_rav.text += Povin.rank + "\t";
        this.scoresText_rav.text += util.addCommas(Povin.score) + "\t";
        this.scoresText_rav.text += Povin.totalPerfectLevel + "\t";
        this.scoresText_rav.text += Povin.totalAlienEscape + "\t";
        this.scoresText_rav.text += "You";
    },
};