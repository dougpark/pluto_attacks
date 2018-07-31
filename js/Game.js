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
        this.levelTimer = 0;
        this.alienEscape = 0;
        this.totalPerfectLevel = 0;
        this.totalAlienEscape = 0;

        //  The scrolling starfield background
        this.starfield = game.add.tileSprite(0,0,this.world.width,this.world.height, 'starfield');
        this.starfield.alpha = .3;

        this.imagePluto = game.add.sprite(0,0, 'pluto');
        this.imagePluto.anchor.setTo(0.7, 0.5);
        this.imagePluto.scale.setTo(.5, .5);
        this.imagePluto.alpha = .3;
        this.place(this.imagePluto, .3, .2);

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
        this.enemyBullets.createMultiple(60, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        //  Player
        this.player = game.add.sprite(0,0, 'shipLR');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(.3, .3); 
        this.place(this.player,0.5, 0.91);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('flyL', [3,4,3], 20, true);
        this.player.animations.add('flyR', [11,12,11], 20, true);
        this.player.animations.add('fly1', [0,1,2,1,0,11,12,11], 10, true);
        this.player.play('fly1');
        this.player.bonusPoints = 0;
        this.player.fire = 0;
        this.player.energy =0;

        // Shield
        this.shield = game.add.sprite(this.player.body.x, this.player.body.y, 'shield');
        this.shield.anchor.setTo(0.45, 0.5);
        this.shield.scale.setTo(.3, .3); 
        game.physics.enable(this.shield, Phaser.Physics.ARCADE);
        this.shield.animations.add('green', [0,0], 200, true);
        this.shield.animations.add('red',[1,1],200, true);
        this.shield.visible = false;

        //  Pluto Drones
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.aliens.bonusPoints = 0;
        
        this.createAliens();
        
        //  The score
        this.scoreString = 'Score ';
        this.scoreText = game.add.text(0,0, this.scoreString + "\n" +this.level + ':' + this.score, { font: '16px HappyKiller', fill: '#dc7b00' });
        this.place(this.scoreText,0.2075,0.03);

        //  Perfect Levels
        this.perfectLevelsString = 'Perfect: ';
        this.perfectLevelsText = game.add.text(0,0, this.perfectLevelsString + "" +this.totalPerfectLevel, { font: '16px HappyKiller', fill: '#dc7b00' });
        this.place(this.perfectLevelsText,.17,.95);

        //  Aliens Escaped
        this.aliensEscapedString = 'Escaped: ';
        this.aliensEscapedText = game.add.text(0,0, this.aliensEscapedString + "" +this.totalAlienEscape, { font: '16px HappyKiller', fill: '#dc7b00' });
        this.place(this.aliensEscapedText,.64,.95);

        //  Lives
        this.lives = game.add.group();

        // number of lives
        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(game.world.width - 240 + (30 * i), 40, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            //this.place(ship, x, 0.066);
            ship.angle = 90;
            ship.alpha = 1;
            ship.scale.setTo(0.8, 0.8);
        }

        //  An explosion pool
        this.explosions = game.add.group();
        this.explosions.createMultiple(80, 'kaboom');
        this.explosions.forEach(this.setupInvader, this);

        //  Player ship explosion pool
        this.ship_explosions = game.add.group();
        this.ship_explosions.createMultiple(40, 'ship_kaboom');
        this.ship_explosions.forEach(this.setupShip, this);

        //  Bullet ship explosion pool
        this.bullet_explosions = game.add.group();
        this.bullet_explosions.createMultiple(80, 'bullet_kaboom');
        this.bullet_explosions.forEach(this.setupBullet, this);

        //  And some controls to play the game with
        this.cursors = game.input.keyboard.createCursorKeys();
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
          };
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButtonNow = game.input.keyboard.addKey(Phaser.Keyboard.F);
    
        // HUD
        this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background')
        this.background.anchor.setTo(0.5, 0.5);
        this.background.scale.setTo(.50, .50);
     
        // Home button to return to the main menu
        this.buttonHome = game.add.button(0,0, 'buttonHome', this.actionOnClickHome, this, 2, 1, 0);
        this.buttonHome.anchor.setTo(0.5, 0.5);
        this.buttonHome.scale.setTo(.8, .8);
        this.place(this.buttonHome, 0.05, 0.066);
        this.buttonHome.events.onInputDown.add(this.onInputDownHome, this);
        this.buttonHome.events.onInputUp.add(this.onInputUpHome, this);
   
        // Game Speed
        this.gameSpeedText = game.add.text(0,0, this.gameSpeedTxt, { font: '20px HappyKiller', fill: '#0099ff', boundsAlignH: "center", boundsAlignV: "middle" });    
        this.gameSpeedText.setTextBounds(0, 45, this.game.world.width, 50);

        // Energy
        this.player.energyTxtAddition = game.add.text(0,0, "Energy 00", { font: '12px HappyKiller', fill: '#dc7b00' });
        this.place(this.player.energyTxtAddition, 0.6875, 0.1);
        this.player.energyTxtAddition.visible = false;

        // Audio
        this.explosionSfx = game.add.audio('explosionSfx',0.8);// enemy explodes
        this.ship_explosionSfx = game.add.audio('ship_explosionSfx',0.8); // player explodes
        this.swordSfx = game.add.audio('swordSfx',0.3); // bullet hits bullet
        this.blasterSfx = game.add.audio('blasterSfx', 0.2); // player shoots
        this.wilhelmSfx = game.add.audio('wilhelmSfx');
        this.alienSfx = game.add.audio('alienSfx'); // enemy escapesa
        this.alienPowerSfx = game.add.audio('alienPowerSfx'); // enemy power up to attack
        this.shieldSfx = game.add.audio('shieldSfx'); // player shields up
        this.shieldHitSfx = game.add.audio('shieldHitSfx',0.8); // player shield gets hit
        this.shieldDownSfx = game.add.audio('shieldDownSfx',1.5); // player shields down
        this.perfectSfx = game.add.audio('perfectSfx'); // complete perfect level

        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        //game.sound.setDecodedCallback([this.ship_explosionSfx, this.explosionSfx, this.swordSfx, this.blasterSfx, this.wilhelmSfx], this.update, this);
        // don't put anything past here, it will be skipped by the audio callback

         // Popup Scores Screen
         this.panelScores = this.add.group();
         this.panelScores.alpha = 0;
         //this.panelScores.visible = false;
 
         this.panelScores_title = game.add.sprite(0,0, 'score_panel');
         this.panelScores_title.anchor.setTo(0.5, 0.5);
         this.panelScores_title.scale.setTo(1.75,2.0);
         this.place(this.panelScores_title, 0.5, 0.55);
         this.panelScores.add(this.panelScores_title);

        //  High Scores Title
        this.scoresTitle = game.add.text(0,0, 'High Scores', { font: '24px arial', fill: '#0099ff' }); 
        this.scoresTitle.anchor.setTo(0.5, 0.5);
        this.panelScores.add(this.scoresTitle);
        this.place(this.scoresTitle, 0.5, 0.25);

        //  Rank Text
        this.scoresText_ra = game.add.text(0,0, 'Rank\tScore\tPerfect\tEscaped\tPlayer', { font: '20px arial', fill: '#dc7b00', tabs: [80, 100,100,100,100] }); 
        this.panelScores.add(this.scoresText_ra);
        this.place(this.scoresText_ra, 0.20, 0.29);

        //  Rank Value
        this.scoresText_rav = game.add.text(0,0, '1st', { font: '20px arial', fill: '#0099ff', align: 'left', tabs: [80, 120,100,80,100] }); 
        //this.scoresText_rav.anchor.setTo(0.5, 0);
        this.panelScores.add(this.scoresText_rav);
        this.place(this.scoresText_rav, 0.20, 0.34);

         //  Scores Text
        this.stateText = game.add.text(0,0, '', { font: '20px arial', fill: '#0099ff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.place(this.stateText,0.5, 0.69);
        this.stateText.align = 'center';
        this.stateText.visible = true;
        this.panelScores.add(this.stateText);

        //  Tap to play again Text
        //this.scoresText_pa = game.add.text(0,0, 'Tap/Space To Play Again', { font: '20px arial', fill: '#dc7b00' }); 
        //this.scoresText_pa.anchor.setTo(0.5, 0.5);
        //this.panelScores.add(this.scoresText_pa);
        //this.place(this.scoresText_pa, 0.5, 0.85);

        // Continue Button
        this.buttonContinue = game.add.button(0,0, 'buttonContinue', this.actionOnClickContinue, this, 2, 1, 0);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.scale.setTo(.75,.75);
        this.place(this.buttonContinue, 0.5, 0.85);
        this.panelScores.add(this.buttonContinue);
        this.buttonContinue.inputEnabled = false;
        this.buttonContinue.events.onInputDown.add(this.onInputDownContinue, this);
        this.buttonContinue.events.onInputUp.add(this.onInputUpContinue, this);

    }, // end create

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

    // button Continue
    actionOnClickContinue: function () {
        this.restartGame();
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
 
    // Kill the aliens when they leave the screen
    alienOut: function(alien) {
        // show a  text floating up the screen
        this.txtAlien = "-999";
        var txtAlien2 = game.add.text(alien.body.x, game.world.height, this.txtAlien, { font: '36px HappyKiller', fill: '#ff0000', align: 'center' });
        game.time.events.add(100, function () {
            game.add.tween(txtAlien2).to({ x: this.fromLeft2(0.20), y: this.fromTop2(.05), alpha: .5 }, 2000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(2000, function () {
            txtAlien2.destroy();
        }, this);

        this.alienSfx.play();

        this.score -= 999;
        this.alienEscape += 1;
        this.totalAlienEscape += 1;
        this.showScores();

        alien.kill();
    },

    // create the aliens
    createAliens: function () {
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = this.aliens.create(x * 49, y * 50, 'invader');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                alien.play('fly');
                alien.checkWorldBounds = true;
                alien.events.onOutOfBounds.add(this.alienOut, this);
                //alien.body.moves = false;
                alien.lives = 1;
                alien.atacking = false;
            }
        }
        this.aliens.x = 70;
        this.aliens.y = 150;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        this.tween2 = game.add.tween(this.aliens).to({ x: 300 }, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        this.tween2.onLoop.add(this.descend, this);
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
        ship.scale.setTo(0.5,0.5);
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
            //this.player.fire = 0;


            // keyboard input
            if (this.cursors.left.isDown || this.wasd.left.isDown) {
                this.player.body.velocity.x = -this.setvel-levelSpeed;
                this.player.play('flyL');
                this.player.fire = 10;
            }
            else if (this.cursors.right.isDown || this.wasd.right.isDown) {
                this.player.body.velocity.x = this.setvel+levelSpeed;
                this.player.play('flyR');
                this.player.fire = 10;
            } else {
                this.player.play('fly1');
            }

            // The shield always stays with the player ship
            if (this.player.body.velocity.x < 0) {
                this.shield.x = this.player.x-10;
                this.shield.y = this.player.y;
            } else if (this.player.body.velocity.x > 0) {
                this.shield.x = this.player.x+5;
                this.shield.y = this.player.y;
            } else {
                this.shield.x = this.player.x-2;
                this.shield.y = this.player.y;
            }

            if (this.player.energy > 0) {
                this.player.fire += 1;

                // play shield sfx when shield becomes available
                if (this.shield.visible == false) {
                    this.shieldSfx.play();
                }

                // show the shields
                this.shield.visible = true;
               
                if (this.player.energy > 3) {this.shield.frame=0;} // green
                else {this.shield.frame=1;} // red

                // show Energy text 
                this.player.energyTxtAddition.text = "Energy " + this.player.energy;
                this.player.energyTxtAddition.visible = true;
                
            } else {

                // play shield sfx when shield goes down
                if (this.shield.visible == true) {
                    this.shieldDownSfx.play();
                }

                this.shield.visible = false;
                this.player.energyTxtAddition.visible = false;
            }

            // Mouse Pointer
            /*
            if (game.input.activePointer.leftButton.isDown) {
              this.player.x = game.input.activePointer.x;
            }
            */
          
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

            // touch interface
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
                        this.player.y = game.input.pointer1.y - 40;
                    }
                }
            }

            // Fire
            //if (this.fireButton.isDown) {
            if (this.player.fire > 0) {
                this.fireBullet(false);
                this.player.fire = this.player.fire -1;
                if (this.player.fire < 1) {this.player.fire = 0;}
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

        // End of the level (all the enemies are killed)
        if (this.aliens.countLiving() == 0 && this.levelTimer == 0) {
            this.score += 999;
            this.showScores();
  
            this.level += 1;

            this.enemyBullets.callAll('kill', this);

            // show a Level text floating up the screen
            this.txtCaption = "Level " + this.level;
            var txtAddition = game.add.text(game.world.centerX - (game.world.centerX*.30), game.world.centerY, this.txtCaption, { font: '36px HappyKiller', fill: '#0099ff' });
            game.time.events.add(100, function () {
                game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            }, this);
            game.time.events.add(2000, function () {
                txtAddition.destroy();
            }, this);

            
            this.levelTimer = game.time.now + 2000; // wait n seconds to start next level
            
            // Perfect Level
            if (this.alienEscape == 0 ) {
                this.totalPerfectLevel += 1;

                var txtPerfect = "Perfect Level";

                this.perfectSfx.play();
                
                var txtPerfect2 = game.add.text(game.world.centerX, game.world.height, txtPerfect, { font: '36px HappyKiller', fill: '#30acfc', align: 'center' });
                txtPerfect2.anchor.setTo(0.5, 0.5);
                game.time.events.add(100, function () {
                    game.add.tween(txtPerfect2).to({ y:game.world.height/2, alpha: 1 }, 2500, Phaser.Easing.Quadratic.Out, true);
                }, this);
                game.time.events.add(2500, function () {
                    txtPerfect2.destroy();
                }, this);

                var txtPerfect3 = "+9,999";
                var txtPerfect4 = game.add.text(game.world.centerX, game.world.height, txtPerfect3, { font: '24px HappyKiller', fill: '#dc7b00', align: 'center' });
                txtPerfect4.anchor.setTo(0.5, 0.5);
                game.time.events.add(100, function () {
                    game.add.tween(txtPerfect4).to({ x: this.fromLeft2(0.25), y: this.fromTop2(.10), alpha: .5 }, 2000, Phaser.Easing.Quadratic.Out, true);
                }, this);
                game.time.events.add(2000, function () {
                    txtPerfect4.destroy();
                }, this);

                this.score += 9999;
                this.showScores();
            }
            
        }

        // Delay before starting the next level
        if (this.levelTimer > 0 && game.time.now > this.levelTimer) {
            this.levelTimer = 0;
            this.alienEscape = 0;
            this.restart();
            
        } 
    }, // end update


    showScores: function() {
        this.scoreText.text = this.scoreString + "\n" + this.level + ':' + this.score;
        this.perfectLevelsText.text = this.perfectLevelsString + "" +this.totalPerfectLevel;
        this.aliensEscapedText.text = this.aliensEscapedString + "" +this.totalAlienEscape;
    },

    render: function () {

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
            if (this.player.bonusPoints > 27) {this.player.bonusPoints = 27;}

            this.player.energy = this.player.energy + 1;
            if (this.player.energy > 27) {
                this.player.energy = 27; // temp
            } 

            // show a Bonus text floating up the screen
            this.txtCaption = "+" + this.player.bonusPoints;
            var txtAddition = game.add.text(enemyBullet.body.x, enemyBullet.body.y, this.txtCaption, { font: '18px HappyKiller', fill: '#00ddff' });
            game.time.events.add(100, function () {
                game.add.tween(txtAddition).to({ x: this.fromLeft2(0.6875), y: this.fromTop2(.10), alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            }, this);
            game.time.events.add(1000, function () {
                txtAddition.destroy();
            }, this);

            // removed score point for hitting alien bullets, only get enery points
            //this.score += this.player.bonusPoints;
            this.showScores();
            
        }
    },

    // Player bullet hits the enemny
    playerHitsEnemy: function (bullet, alien) {
        //  When a bullet hits an alien we kill the bullet
        bullet.kill();

        if (this.player.energy == 0 || alien.lives < 1) {
            alien.atacking = false;
            alien.lives = 1;
            alien.kill(); // kill the alien when player has no energy
            //  And create an explosion :)
            this.explosionSfx.play();
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);
            var txtPts = "+81";
            var txtPts2 = game.add.text(alien.body.x, alien.body.y, txtPts, { font: '18px HappyKiller', fill: '#0099ff' });
            game.time.events.add(100, function () {
                game.add.tween(txtPts2).to({ x: this.fromLeft2(0.20), y: this.fromTop2(.05), alpha: .25 }, 2000, Phaser.Easing.Linear.None, true);
            }, this);
            game.time.events.add(2000, function () {
                txtPts2.destroy();
            }, this);
        } else { // player has energy

                if (this.level >= 27) {
                
                    if (alien.atacking == false) {
                        game.physics.arcade.moveToXY(alien, game.rnd.integerInRange(0, game.width), game.height, 300);
                        alien.lives = 5;
                        alien.atacking = true;
                        this.alienPowerSfx.play();
                    } else {
                        alien.lives -= 1;
                    }
                } else {

                    if (this.level >= 18) {
                    
                        if (alien.atacking == false) {
                            game.physics.arcade.moveToXY(alien, game.rnd.integerInRange(0+100, game.width-100), game.height, 300);
                            alien.lives = 2;
                            alien.atacking = true;
                            this.alienPowerSfx.play();
                        } else {
                            alien.lives -= 1;
                        }
                    } else {
                
                        if (alien.atacking == false && Math.random() < .5) { // normal kill
                            alien.kill(); // alien just dies normally
                            //  And create an explosion :)

                            
                            this.explosionSfx.play();
                            var explosion = this.explosions.getFirstExists(false);
                            explosion.reset(alien.body.x, alien.body.y);
                            explosion.play('kaboom', 30, false, true);
                            alien.atacking = false;
                            alien.lives = 1;
                        } else {    // alien absorbs the energy and breaks rank
                            game.physics.arcade.moveToObject(alien, this.player, 300);
                            alien.atacking = true;
                            this.alienPowerSfx.play();
                            alien.lives = 0;
                        }
                    }
                }
                
        }
        

        //  Increase the score
        this.score += 81;
        this.showScores();
        this.aliens.bonusPoints = 0; // reset bonus counter when hit alien

        
    },

    // Enemny bullet hits the player
    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();

        if (this.player.energy < 1) { 
            // remove a player life
            this.live = this.lives.getFirstAlive();
            if (this.live) {
                this.live.kill();
            }

            // play cool explosion sound effect 
            this.ship_explosionSfx.play();

            //  And create an animated explosion :)
            var explosion = this.ship_explosions.getFirstExists(false);
            explosion.reset(this.player.x, this.player.y);
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
        } else {
            this.player.energy = this.player.energy - 1;

            // play shieldhitsfx of shield getting hit
            //  And create an explosion :)
            this.shieldHitSfx.play();
            var explosion = this.bullet_explosions.getFirstExists(false);
            explosion.reset(bullet.body.x, bullet.body.y);
            explosion.play('bullet_kaboom', 30, false, true);



        }

        // When the player dies
        if (this.lives.countLiving() < 1) {

            // hide the shield
            this.shield.visible = false;

            // play scream
            this.wilhelmSfx.play();

            this.player.kill();
            this.enemyBullets.callAll('kill');

            this.stateText.text = "";

            // save your current score to the score server
            Povin.saveHighScore(Povin.gameMode, Povin.gameLevel, this.level, this.totalPerfectLevel, this.totalAlienEscape, this.score);

            // retrieve high scores from server
            this.retrieveHighScores();

            // show the high score hud
            this.showHighScores();
          
            //if (Povin.compareHighScore(Povin.gameMode, Povin.gameLevel, this.level, this.totalPerfectLevel, this.totalAlienEscape, this.score)) {
            //    this.stateText.text += "New High Score!";
            //} 

            this.stateText.text += "\n A message from your commander:"

            if (this.score <=0) {this.stateText.text +=                 "\n Pluto ate your lunch.";
                } else if (this.score < 10000) {this.stateText.text +=  "\n Nice Try.";
                } else if (this.score < 100000) {this.stateText.text += "\n Not Bad.";
                } else if (this.score < 200000) {this.stateText.text += "\n Pretty Good.";
                } else if (this.score > 200000) {this.stateText.text += "\n Great Job.";
                } 


            //the "Tap to restart" handler
            this.fireButton.onDown.addOnce(this.restartGame, this);
            //game.input.onTap.addOnce(this.restartGame, this);
        }
    },

    restartGame: function() {

        // zero out scores
        this.score = 0;
        this.totalAlienEscape = 0;
        this.totalPerfectLevel = 0;

        this.restart();
    },

    // Pop up the Scores panel
    showHighScores: function () {
        game.add.tween(this.panelScores).to( { alpha: 0.95 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: 0.25 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        this.buttonContinue.inputEnabled = true;
        //this.panelScores.visible = true;
    },

    // Pop up the Scores panel
    hideHighScores: function () {
        game.add.tween(this.panelScores).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 250, 0, false);
        game.add.tween(this.starfield).to( { alpha: .3 }, 250, Phaser.Easing.Linear.None, true, 250, 0, false);
        this.buttonContinue.inputEnabled = false;
        //this.panelScores.visible = false;
    },

    // Enemy Fires
    enemyFires: function () {

        // Increase speed based on level
        var levelSpeed = this.level * 10 * (1+ this.level/30);
        

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

            // aim the bullet at the players ship
            // randomly aim a little different to keep the player moving
            var rnd =0;
            if (Math.random() < 0.5) {
                rnd = 50;
            } else {
                rnd = -50;
            }
            if (Math.random() < 0.99 ) {
                game.physics.arcade.moveToObject(this.enemyBullet, this.player, 120+levelSpeed);
            } else {
                game.physics.arcade.moveToXY(this.enemyBullet, this.player.x+rnd, this.player.y, 120+levelSpeed);
            }
            this.firingTimer = game.time.now + (this.gameSpeed * 2)-(levelSpeed/2);
            
            
        }
    },

    // Player Fires
    fireBullet: function (now) {
        // Increase speed based on level
        var levelSpeed = this.level * 10;

        if (this.levelTimer == 0) { // only fire if not waiting on level timer
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
        //this.stateText.visible = false;

        this.hideHighScores();

        this.showScores();
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
    fromTop2: function(percent)
    {
        return game.height*percent;
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
    fromLeft2: function(percent) 
    {
        return game.width * percent;
    },
    fromCenterH: function(obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },
    fromCenterV: function(obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },

    // retrieve high scores from the score server    
    retrieveHighScores: function() {
        self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //console.log("retriveHighScores= " + this.responseText);
                self.processHighScores(this.responseText);
            }
        };
        xmlhttp.open("GET", "gethighscore.php", true);
        xmlhttp.send();

    },

    // process the high scores from the score server
    processHighScores: function(highScores) {

        this.scoresText_rav.text = "";
        var scores = JSON.parse(highScores);
        
        var i,j;
        for (i = 0; i <= 4; i++) 
        { 
            j = i+1;
            this.scoresText_rav.text += j+'\t';
            this.scoresText_rav.text += this.addCommas(scores[i].Score) + "\t";
            this.scoresText_rav.text += scores[i].PerfectLevels + "\t";
            this.scoresText_rav.text += scores[i].AliensEscaped + "\t";
            this.scoresText_rav.text += "Player "+j+"\n";
        }

        // add Your scores to end of the list
        this.scoresText_rav.text += "n" + "\t" ;
        this.scoresText_rav.text += this.addCommas(this.score) + "\t";
        this.scoresText_rav.text += this.totalPerfectLevel + "\t";
        this.scoresText_rav.text += this.totalAlienEscape + "\t";
        this.scoresText_rav.text += "You";
    },

    parseHighScores: function(plv, aev) {

        console.log("plv="+plv+" aev="+aev);
    },

    addCommas: function(nStr)
    {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
}   

};
