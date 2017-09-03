// **************************************************************************************
// Game
// **************************************************************************************
"use strict";

var PlutoGame = function () {};

PlutoGame.prototype = {

    init: function (gameMode, trainingLevel) {
        if (gameMode === undefined) { gameMode = 1; }
        if (trainingLevel === undefined) { trainingLevel = 1; }
        this.gameMode = gameMode;
        this.trainingLevel = trainingLevel;
        this.level = this.trainingLevel;
    },

// **************************************************************************************
// Create
// **************************************************************************************
    create: function () {

        this.score = 0;
        this.firingTimer = 0;
        this.bulletTime = 0;

        //  The scrolling starfield background
        this.starfield = game.add.tileSprite(0,0,this.world.width,this.world.height, 'starfield');
      
        // Turn on if want to show debug FPS
       //game.time.advancedTiming = true;
        
        // GameMode 1=insane, 100=fun, 300=normal, 500=slow
        switch (this.gameMode) {
            case 1:
                { this.gameSpeed = 300; this.setvel = 200; this.gameSpeedTxt = "Normal"; } // Normal
                break;
            case 2:
                { this.gameSpeed = 100; this.setvel = 300;this.gameSpeedTxt = "Fun"; } // Fun
                break;
            case 3:
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
        this.player = game.add.sprite(game.world.centerX, game.world.centerY + 250, 'shipLR');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(.3, .3); 
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('fly1', [0,1,2,1,0,11,12,11], 10, true);
        this.player.play('fly1');
        this.player.bonusPoints = 0;

        // BlinkingPanels
        this.blinkingPanels = game.add.group();
        this.blinkingPanels.enableBody = true;
        this.blinkingPanels.physicsBodyType = Phaser.Physics.ARCADE;
        //this.createBlinkingPanels();

        //  The baddies!
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.aliens.bonusPoints = 0;

        this.createAliens();
        
        //  The score
        this.scoreString = 'Score ';
        this.scoreText = game.add.text(160, 25, this.scoreString + "\n" +this.level + ':' + this.score, { font: '20px HappyKiller', fill: '#0099ff' });

        //  Lives
        this.lives = game.add.group();
        game.add.text(game.world.width - 100, 50, 'Energy', { font: '20px HappyKiller', fill: '#0099ff' });

        //  Text
        this.stateText = game.add.text(game.world.centerX, game.world.centerY+75, '', { font: '30px HappyKiller', fill: '#0099ff' });
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
        this.explosions.createMultiple(60, 'kaboom');
        this.explosions.forEach(this.setupInvader, this);

        //  Player ship explosion pool
        this.ship_explosions = game.add.group();
        this.ship_explosions.createMultiple(20, 'ship_kaboom');
        this.ship_explosions.forEach(this.setupShip, this);

        //  Bullet ship explosion pool
        this.bullet_explosions = game.add.group();
        this.bullet_explosions.createMultiple(60, 'bullet_kaboom');
        this.bullet_explosions.forEach(this.setupBullet, this);

        //  And some controls to play the game with
        this.cursors = game.input.keyboard.createCursorKeys();
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButtonNow = game.input.keyboard.addKey(Phaser.Keyboard.F);

        // test button
        //this.buttonNorm = game.add.button(game.world.centerX - 161, 400, 'buttonNormGo', this.actionOnClickNorm, this, 2, 1, 0);

        // Top Bar
        //this.playerEnergy = game.add.sprite(game.world.centerX + 275, 25, 'playerEnergy');
        //this.playerEnergy.anchor.setTo(0.5, 0.5);
        //this.playerEnergy.scale.setTo(.20, .20);
       
        // HUD
        this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background')
        this.background.anchor.setTo(0.5, 0.5);
        this.background.scale.setTo(.50, .50);
     
        // Home button to return to the main menu
        this.buttonHome = game.add.button(40, 40, 'buttonHome', this.actionOnClickHome, this, 2, 1, 0);
        this.buttonHome.anchor.setTo(0.5, 0.5);
        this.buttonHome.scale.setTo(.8, .8);
        this.buttonHome.events.onInputDown.add(this.onInputDownHome, this);
        this.buttonHome.events.onInputUp.add(this.onInputUpHome, this);

        
        // Game Speed
        this.gameSpeedText = game.add.text(0,0, this.gameSpeedTxt, { font: '20px HappyKiller', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        this.gameSpeedText.setTextBounds(0, 45, this.game.world.width, 50);

        // FPS
        //this.txtFPS1 = "FPS: " + game.time.fps;
        //this.txtFPS = game.add.text(16, 332, this.txtFPS1, { font: '12px HappyKiller', fill: '#00ffff' });
        //2) game.time.fps returns the current FPS (after the first 1s of your game). 
        // You can draw it in your state's update method.

        // Audio
        this.explosionSfx = game.add.audio('explosionSfx',0.8);
        this.ship_explosionSfx = game.add.audio('ship_explosionSfx',0.8);
        this.swordSfx = game.add.audio('swordSfx',0.8);
        this.blasterSfx = game.add.audio('blasterSfx', 0.3);
        this.wilhelmSfx = game.add.audio('wilhelmSfx');

        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        game.sound.setDecodedCallback([this.ship_explosionSfx, this.explosionSfx, this.swordSfx, this.blasterSfx, this.wilhelmSfx], this.update, this);
        // don't put anything past here, it will be skipped by the audio callback

    }, // end create

    // temporary
    actionOnClickEnergy: function () {
    },

    // Action when click on the home button
    actionOnClickHome: function () {
        this.state.start('MainMenu');
    },

    onInputDownHome: function(target) {
        game.add.tween(target.scale).to({
            x: 0.6,
            y: 0.6
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

     onInputUpHome: function(target) {
        game.add.tween(target.scale).to({
            x: .8,
            y: .8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // test action based on clicking a button
    actionOnClickNorm: function () {
        var txtCaption = "+ Hi Stephen";
        var txtAddition = game.add.text(400, 400, txtCaption, { font: '12px HappyKiller', fill: '#0099ff' });
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

    setupBullet: function (bullet) {
        bullet.anchor.x = 0.5;
        bullet.anchor.y = 0.5;
        bullet.animations.add('bullet_kaboom');
    },

    setupShip: function (ship) {
        ship.anchor.x = 0.5;
        ship.anchor.y = 0.5;
        ship.animations.add('ship_kaboom');
        ship.scale.setTo(0.5,1);
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

// **************************************************************************************
// Update
// **************************************************************************************
   
    // main game loop
    update: function () {
        // FPS
        //this.txtFPS.text = "FPS: " + game.time.fps;

        //  Scroll the background
        this.starfield.tilePosition.y += 2;

        // crazy way to determine the speed at this level
        var levelSpeed = this.level * 10;

        if (this.player.alive) {
            //  Reset the player, then check for movement keys
            this.player.body.velocity.setTo(0, 0);

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -this.setvel-levelSpeed;
                this.player.animations.add('flyL', [3,4,3], 20, true);
                this.player.play('flyL');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = this.setvel+levelSpeed;
                this.player.animations.add('flyR', [11,12,11], 20, true);
                this.player.play('flyR');
            } else {
                this.player.play('fly1');
            }

            // Mouse Pointer
            //if (game.input.activePointer.leftButton.isDown) {
            //    this.player.x = game.input.activePointer.x;
            //}
          
            // Touch Interface
            //var touchRight =(game.world.centerX*2); // full width of display
            //var touchSize = touchRight*.20; // 20% of screen size
            //var touchLeft1 = 0;
            //var touchLeft2 = touchSize;
            //var touchRight1 = touchSize;
            //var touchRight2 = touchSize*2;
            //var touchLeft3 = touchRight-(touchSize*2);
            //var touchLeft4 = touchRight-(touchSize);
            //var touchRight3 = touchRight-(touchSize);
            //var touchRight4 = touchRight;

            
            if (game.input.pointer1.isDown) {

                /*
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
                */

                // Just put the player where ever they touch
                // If they touch in the bottom half of the screen
                if (game.input.pointer1.y > game.world.centerY) {
                    this.player.x = game.input.pointer1.x;
                    if (game.input.pointer1.y < game.world.centerY) {
                        this.player.y = game.world.centerY;
                    }  else {
                        this.player.y = game.input.pointer1.y - 70;
                    }
                }
            }

            // Fire
            if (this.fireButton.isDown) {
                this.fireBullet(false);
            }

            // Firing now no matter what!
            // A second touch on the screen fires now no matter what!
            if (this.fireButtonNow.isDown || game.input.pointer2.isDown) {
                this.fireBullet(true);
            }

            // Touch
            if ((game.input.pointer1.isDown || game.input.pointer2.isDown) && 
                (game.input.pointer1.y > game.world.centerY)) {
                this.fireBullet(false);
            }

            // Time for the enemy to fire
            if (game.time.now > this.firingTimer) {
                this.enemyFires();
            }

            //  Run collision
            game.physics.arcade.overlap(this.bullets, this.aliens, this.playerHitsEnemy, null, this);
            game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            game.physics.arcade.overlap(this.bullets, this.enemyBullets, this.bulletHitsBullet, null, this);
        }
    }, // end update

    render: function () {

        //for (var i = 0; i < this.aliens.length; i++)
        // {
        //      this.debug.body(this.aliens.children[i]);
        // }
        //game.debug.spriteInfo(this.player, 32, 32);

        //game.debug.text('this.trainingLevel ' + this.trainingLevel,16, 400);
        //var debug = this.game.debug;
        //debug.text('High score ' + Povin.getHighScore(),10,120);
        //debug.text('Povin ' + Povin,10,140);
    },

    // Player bullet hits an enemy bullet
    bulletHitsBullet: function (bullet, enemyBullet) {
        //  When a bullet hits an alien bullet we kill them both
        bullet.kill();
        enemyBullet.kill();

        //  And create an explosion :)
        this.swordSfx.play();
        var explosion = this.bullet_explosions.getFirstExists(false);
        explosion.reset(enemyBullet.body.x, enemyBullet.body.y);
        explosion.play('bullet_kaboom', 30, false, true);

        this.aliens.bonusPoints += 1; // start counting bonus when hit enemy bullet

        if (this.aliens.bonusPoints > 9) { // must hit n enemy bullets in a row to start bonus points
            this.player.bonusPoints = this.aliens.bonusPoints * 3;

            // show a Bonus text floating up the screen
            this.txtCaption = "+" + this.player.bonusPoints;
            var txtAddition = game.add.text(enemyBullet.body.x, enemyBullet.body.y, this.txtCaption, { font: '18px HappyKiller', fill: '#00ddff' });
            game.time.events.add(100, function () {
                game.add.tween(txtAddition).to({ y: enemyBullet.body.y-100, alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            }, this);
            game.time.events.add(1000, function () {
                txtAddition.destroy();
            }, this);

            this.score += this.player.bonusPoints;
            this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;
            
        }
    },

    // Player bullet hits the enemny
    playerHitsEnemy: function (bullet, alien) {
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

        this.aliens.bonusPoints = 0; // reset bonus counter when hit alien

        // End of the level (all the enemies are killed)
        if (this.aliens.countLiving() == 0) {
            this.score += 1000;
            this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;

            this.level += 1;

            this.enemyBullets.callAll('kill', this);

            // show a Level text floating up the screen
            this.txtCaption = "Level " + this.level;
            var txtAddition = game.add.text(game.world.centerX - 50, game.world.centerY, this.txtCaption, { font: '36px HappyKiller', fill: '#0099ff' });
            game.time.events.add(100, function () {
                game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            }, this);
            game.time.events.add(2000, function () {
                txtAddition.destroy();
            }, this);

            // Immediatly start the next level
            this.restart();
        }
    },

    // Enemny bullet hits the player
    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();

        // remove a player life
        this.live = this.lives.getFirstAlive();
        if (this.live) {
            this.live.kill();
        }

        // play cool explosion sound effect 
        this.ship_explosionSfx.play();

        //  And create an animated explosion :)
        var explosion = this.ship_explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('ship_kaboom', 30, false, true);

        // animate some cool text up the screen
        this.txtCaption = "AAAHHHH";
        var txtAddition = game.add.text(this.player.body.x, this.player.body.y, this.txtCaption, { font: '12px HappyKiller', fill: '#ff3333' });
        game.time.events.add(100, function () {
            game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(2000, function () {
            txtAddition.destroy();
        }, this);

        // When the player dies
        if (this.lives.countLiving() < 1) {

            // play scream
            this.wilhelmSfx.play();

            this.player.kill();
            this.enemyBullets.callAll('kill');

            if (Povin.compareHighScore(this.gameMode, this.level, this.score)) {

                this.stateText.text = "\n  New High Score!\n   Pluto Wins Again \n Tap to Save Earth";
                this.stateText.visible = true;

            } else {

                this.stateText.text = "\n   Pluto Wins Again \n Tap to Save Earth";
                this.stateText.visible = true;    

            }

            // reset score and level
            this.score = 0;

            // if in training mode then stay on current level, otherwise reset the level
            //this.level = this.trainingLevel;

            //the "Tap to restart" handler
            this.fireButton.onDown.addOnce(this.restart, this);
            game.input.onTap.addOnce(this.restart, this);
        }
    },

    // Enemy Fires
    enemyFires: function () {

        // Increase speed based on level
        var levelSpeed = this.level * 10;

        //  Grab the first bullet we can from the pool
        this.enemyBullet = this.enemyBullets.getFirstExists(false);

        var mylivingEnemies = [];
        var myalien;

        this.aliens.forEachAlive(function (myalien) {
            // put every living enemy in an array
            mylivingEnemies.push(myalien);
        });

        // detrmine the enemy to fire next
        if (this.enemyBullet && mylivingEnemies.length > 0) {

            var random = game.rnd.integerInRange(0, mylivingEnemies.length - 1);

            // randomly select one of them
            var shooter = mylivingEnemies[random];
            // And fire the bullet from this enemy
            this.enemyBullet.reset(shooter.body.x + 20, shooter.body.y + 20);

            game.physics.arcade.moveToObject(this.enemyBullet, this.player, 120+levelSpeed);
            this.firingTimer = game.time.now + (this.gameSpeed * 2)-(levelSpeed/2); //stephen
        }
    },

    // Player Fires
    fireBullet: function (now) {
        // Increase speed based on level
        var levelSpeed = this.level * 10;

        //  To avoid them being allowed to fire too fast we set a time limit
        if ((game.time.now > this.bulletTime) || (now)) {
            // play bullet sound effects
            this.blasterSfx.play();

            //  Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                //  And fire it
                this.bullet.reset(this.player.x, this.player.y - 8);
                this.bullet.body.velocity.y = -400 - levelSpeed;
                this.bulletTime = game.time.now + this.gameSpeed - (levelSpeed/2);
            }
        }
    },

    resetBullet: function (bullet) {
        //  Called if the bullet goes out of the screen
        bullet.kill();
    },

    restart: function () {

        //  A new level starts

        // resets the life count
        this.lives.callAll('revive');
        // And brings the aliens back from the dead :)
        this.aliens.removeAll();
        this.createAliens();

        //revives the player
        this.player.revive();
        //hides the text
        this.stateText.visible = false;

        this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;
    }
};
