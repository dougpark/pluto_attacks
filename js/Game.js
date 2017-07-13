// **************************************************************************************
// Game
// **************************************************************************************
"use strict";

PlutoAttacks.Game = function () {

    this.player;
    this.aliens;
    var bullets;
    this.bulletTime = 0;
    var cursors;
    var fireButton;
    var fireButtonNow;
    var explosions;
    var starfield;
    var background;
    this.score = 0;
    this.level = 1;
    var scoreString = '';
    var scoreText;
    var lives;
    this.enemyBullet;
    this.firingTimer = 0;
    var stateText;
    this.livingEnemies = [];
    var explosionSfx;
    var swordSfx;
    var blasterSfx;
    var wilhelmSfx;

    // Top Bar
    var playerEnergy;
    var buttonHome;
    var buttonSpeaker;
    var buttonPause;

    var gameSpeed; // set based on gameMode
    var gameSpeedTxt;
    var gameSpeedText; // display
    this.gameMode; // determined by MainMenu
    this.setvel;

    var buttonNorm;

};

PlutoAttacks.Game.prototype = {

    init: function (gameMode) {

        this.gameMode = gameMode;

    },

    create: function () {

        //  The scrolling starfield background
      
        this.starfield = game.add.tileSprite(0,0,800,600, 'starfield');
      
       
        
        // Game Speed mode 1=insane, 100=fun, 300=normal, 500=slow
        //this.gameMode = getURLParameter('gameMode');
        switch (this.gameMode) {
            case "1":
                { this.gameSpeed = 300; this.setvel = 200; this.gameSpeedTxt = "Normal"; } // Normal
                break;
            case "2":
                { this.gameSpeed = 100; this.setvel = 300;this.gameSpeedTxt = "Fun"; } // Fun
                break;
            case "3":
                { this.gameSpeed = 1; this.setvel = 500; this.gameSpeedTxt = "Insane"; } // Insane
                break;
            default:
                { this.gameSpeed = 300; this.setvel = 200; this.gameSpeedTxt = "Normal"; } // Normal
        }

        //  Our bullet group
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(60, 'bullet'); //stephen
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // The enemy's bullets
        this.enemyBullets = game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(60, 'enemyBullet'); //stephen
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        //  The hero!
        this.player = game.add.sprite(game.world.centerX, game.world.centerY + 250, 'ship');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(.8, .8);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        // BlinkingPanels
        this.blinkingPanels = game.add.group();
        this.blinkingPanels.enableBody = true;
        this.blinkingPanels.physicsBodyType = Phaser.Physics.ARCADE;

        //this.createBlinkingPanels();

        //  The baddies!
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

        this.createAliens();

        
        //  The score
        this.scoreString = 'Score ';
        this.scoreText = game.add.text(160, 25, this.scoreString + "\n" +this.level + ':' + this.score, { font: '20px HappyKiller', fill: '#0099ff' });

        //  Lives
        this.lives = game.add.group();
        game.add.text(game.world.width - 100, 50, 'Energy', { font: '20px HappyKiller', fill: '#0099ff' });

        //  Text
        this.stateText = game.add.text(game.world.centerX, game.world.centerY, 'T', { font: '30px HappyKiller', fill: '#0099ff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;

        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(game.world.width - 240 + (30 * i), 40, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 1;
            ship.scale.setTo(0.8, 0.8);
        }

        //  An explosion pool
        this.explosions = game.add.group();
        this.explosions.createMultiple(60, 'kaboom'); //stephen
        this.explosions.forEach(this.setupInvader, this);

        //  And some controls to play the game with
        this.cursors = game.input.keyboard.createCursorKeys();
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButtonNow = game.input.keyboard.addKey(Phaser.Keyboard.F);

        // buttons
        //this.buttonNorm = game.add.button(game.world.centerX - 161, 400, 'buttonNormGo', this.actionOnClickNorm, this, 2, 1, 0);

        // Top Bar

        //this.playerEnergy = game.add.sprite(game.world.centerX + 275, 25, 'playerEnergy');
        //this.playerEnergy.anchor.setTo(0.5, 0.5);
        //this.playerEnergy.scale.setTo(.20, .20);

       
        // HUD
        this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background')
        this.background.anchor.setTo(0.5, 0.5);
        this.background.scale.setTo(.50, .50);
     
        this.buttonHome = game.add.button(20, 20, 'buttonPause', this.actionOnClickHome, this, 2, 1, 0);
        this.buttonHome.anchor.setTo(0.5, 0.5);
        this.buttonHome.scale.setTo(.5, .5);

        // Game Speed
        //this.gameSpeedText = game.add.text(game.world.centerX - this.gameSpeedTxt.length/2, 50, this.gameSpeedTxt, { font: '20px HappyKiller', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });
        this.gameSpeedText = game.add.text(0,0, this.gameSpeedTxt, { font: '20px HappyKiller', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });
        
        this.gameSpeedText.setTextBounds(0, 45, 800, 50);
        // Audio
        this.explosionSfx = game.add.audio('explosionSfx');
        this.swordSfx = game.add.audio('swordSfx');
        this.blasterSfx = game.add.audio('blasterSfx', 0.3);
        this.wilhelmSfx = game.add.audio('wilhelmSfx');

        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        game.sound.setDecodedCallback([this.explosionSfx, this.swordSfx, this.blasterSfx, this.wilhelmSfx], this.update, this);

    }, // end create

    // temporary
    actionOnClickEnergy: function () {


    },

    // Action when click on the home button
    actionOnClickHome: function () {

        this.state.start('MainMenu');
    },

    // test action based on clicking a button
    actionOnClickNorm: function () {
        var txtCaption = "+ Hi Stephen";

        var txtAddition = game.add.text(400, 400, txtCaption, { font: '12px Arial', fill: '#fff' });
        game.time.events.add(100, function () {
            game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(6000, function () {
            txtAddition.destroy();
        }, this);
    },

    // test panel to show an aminmation
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

    // create the aliens
    createAliens: function () {

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = this.aliens.create(x * 48, y * 50, 'invader');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                alien.play('fly');
                alien.body.moves = false;
            }
        }

        this.aliens.x = 160;
        this.aliens.y = 150;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = game.add.tween(this.aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(this.descend, this);

    },

    setupInvader: function (invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');


    },

    // not working, supposed to move the aliens down after each pass
    descend: function () {

        this.aliens.y += 100;

    },

    // main game loop
    update: function () {

        //  Scroll the background
        this.starfield.tilePosition.y += 2;

        if (this.player.alive) {
            //  Reset the player, then check for movement keys
            this.player.body.velocity.setTo(0, 0);

            //this.player.x = game.input.x;

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -this.setvel;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = this.setvel;
            }

            // Touch Interface
            var touchRight =(game.world.centerX*2); // full width of display
            var touchSize = touchRight*.20; // 20% of screen size
            var touchLeft1 = 0;
            var touchLeft2 = touchSize;
            var touchRight1 = touchSize;
            var touchRight2 = touchSize*2;
            var touchLeft3 = touchRight-(touchSize*2);
            var touchLeft4 = touchRight-(touchSize);
            var touchRight3 = touchRight-(touchSize);
            var touchRight4 = touchRight;

            if (game.input.pointer1.isDown) {
                // Left thumb move to the left
                if (game.input.pointer1.x > touchLeft1 &&
                    game.input.pointer1.x < touchLeft2) { this.player.body.velocity.x = -this.setvel;}
                // Right thumb move to the left
                if (game.input.pointer1.x > touchLeft3 &&
                    game.input.pointer1.x < touchLeft4) { this.player.body.velocity.x = -this.setvel;}
                // Left thumb move to the right
                if (game.input.pointer1.x > touchRight1 &&
                    game.input.pointer1.x < touchRight2) { this.player.body.velocity.x = this.setvel;}
                // Right thumb move to the right
                if (game.input.pointer1.x > touchRight3 &&
                    game.input.pointer1.x < touchRight4) { this.player.body.velocity.x = this.setvel;}
                this.player.x = game.input.pointer1.x;  
            }

            /*
            // Touch
            // Left
            if (game.input.pointer1.isDown &&
                ((game.input.pointer1.x > game.world.centerX) &&
                    (game.input.pointer1.x < game.world.centerX + game.world.centerX * .75))) {
                this.player.body.velocity.x = -this.setvel;
            }
            if (game.input.pointer1.isDown &&
                (game.input.pointer1.x < game.world.centerX - game.world.centerX * .75)) {
                this.player.body.velocity.x = -this.setvel;
            }

            // Right
            if (game.input.pointer1.isDown &&
                ((game.input.pointer1.x > game.world.centerX - game.world.centerX * .75) &&
                    (game.input.pointer1.x < game.world.centerX))
            ) {
                this.player.body.velocity.x = this.setvel;
            }

            if (game.input.pointer1.isDown &&
                game.input.pointer1.x > game.world.centerX + game.world.centerX * .75) {
                this.player.body.velocity.x = this.setvel;
            }
            */

            //  Firing?
            if (this.fireButton.isDown) {
                this.fireBullet(false);

            }

            //  Firing?
            if (this.fireButtonNow.isDown) {
                this.fireBullet(true);

            }
            

            // Touch
            if (game.input.pointer1.isDown || game.input.pointer2.isDown) {
                this.fireBullet(false);

            }



            if (game.time.now > this.firingTimer) {
                this.enemyFires();
            }

            //  Run collision
            game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
            game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            game.physics.arcade.overlap(this.bullets, this.enemyBullets, this.bulletHitsBullet, null, this);
        }


    }, // end update

    render: function () {

        // for (var i = 0; i < this.aliens.length; i++)
        // {
        //     this.debug.body(this.aliens.children[i]);
        // }

        //this.debug.inputInfo(16, 16);

    },

    bulletHitsBullet: function (bullet, enemyBullet) {
        //  When a bullet hits an alien bullet we kill them both
        bullet.kill();
        enemyBullet.kill();


        //  And create an explosion :)
        this.swordSfx.play();
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemyBullet.body.x, enemyBullet.body.y);
        explosion.play('kaboom', 30, false, true);


    },


    collisionHandler: function (bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();

        //  Increase the score
        this.score += 20;
        this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;

        //  And create an explosion :)
        this.explosionSfx.play();
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        if (this.aliens.countLiving() == 0) {
            this.score += 1000;
            this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;

            this.level += 1;

            this.enemyBullets.callAll('kill', this);
            //this.stateText.text = " Level " + this.level;
            //this.stateText.visible = true;

            this.txtCaption = "Level " + this.level;

            var txtAddition = game.add.text(game.world.centerX - 50, game.world.centerY, this.txtCaption, { font: '36px Arial', fill: '#fff' });
            game.time.events.add(100, function () {
                game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            }, this);

            game.time.events.add(2000, function () {
                txtAddition.destroy();
            }, this);

            //the "Tap to restart" handler
            //game.input.onTap.addOnce(restart,this);
            this.restart();
        }


    },

    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();

        this.live = this.lives.getFirstAlive();

        if (this.live) {
            this.live.kill();
        }

        // play cool explosion sound effect 
        this.explosionSfx.play();

        //  And create an animated explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);

        // animate some cool text up the screen
        this.txtCaption = "AAAHHHH";

        var txtAddition = game.add.text(this.player.body.x, this.player.body.y, this.txtCaption, { font: '12px Arial', fill: '#fff' });
        game.time.events.add(100, function () {
            game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(2000, function () {
            txtAddition.destroy();
        }, this);

        // When the player dies
        if (this.lives.countLiving() < 1) {
            this.wilhelmSfx.play();

            this.player.kill();
            this.enemyBullets.callAll('kill');

            this.stateText.text = "\n      GAME OVER \n Tap to Restart";
            this.stateText.visible = true;

            // reset score and level
            this.score = 0;
            this.level = 1;

            //the "Tap to restart" handler
            this.fireButton.onDown.addOnce(this.restart, this);
            game.input.onTap.addOnce(this.restart, this);
        }


    },

    enemyFires: function () {

        //  Grab the first bullet we can from the pool
        this.enemyBullet = this.enemyBullets.getFirstExists(false);

        var mylivingEnemies = [];
        var myalien;

        this.aliens.forEachAlive(function (myalien) {

            // put every living enemy in an array
            mylivingEnemies.push(myalien);
        });


        if (this.enemyBullet && mylivingEnemies.length > 0) {

            var random = game.rnd.integerInRange(0, mylivingEnemies.length - 1);

            // randomly select one of them
            var shooter = mylivingEnemies[random];
            // And fire the bullet from this enemy
            this.enemyBullet.reset(shooter.body.x + 20, shooter.body.y + 20);

            game.physics.arcade.moveToObject(this.enemyBullet, this.player, 120);
            this.firingTimer = game.time.now + this.gameSpeed * 2; //stephen
        }
    },

    fireBullet: function (when) {
        //  To avoid them being allowed to fire too fast we set a time limit
        if ((game.time.now > this.bulletTime) || (when)) {
            // play bullet sound effects
            this.blasterSfx.play();

            //  Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                //  And fire it

                this.bullet.reset(this.player.x, this.player.y + 8);
                this.bullet.body.velocity.y = -400;
                this.bulletTime = game.time.now + this.gameSpeed; //stephen
            }
        }


    },

    resetBullet: function (bullet) {
        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function () {

        //  A new level starts

        //resets the life count
        this.lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        this.aliens.removeAll();
        this.createAliens();

        //revives the player
        this.player.revive();
        //hides the text

        this.stateText.visible = false;

        this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;

    }

};
