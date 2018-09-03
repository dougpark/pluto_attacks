/**************************************************************************************
* Povin Object
* @author Doug Park
* @version v1.0
* @desc Utility object to manage localstorage, music, highscores, scaling, etc.
* @date 2018-07-22
**************************************************************************************/
"use strict";
 
var Povin = {
  gameLevel: 1,
  gameMode: 1,
  bgMusic: null,
  musicEnabled: 0,
  showIntro: 1,
  restarting: false,
  firstRun: true,
  gameOn: true,
  plutoFacts: 0,
  plutoFactsTime: 0,
  level: 1,
  HSNextState: 'Level1',
  totalPerfectLevel: 0,
  totalAlienEscape: 0,
  score: 0,
  rank: 0,                  // store rank from scoreserver
  useJoystick: false,

  highScore: function() {
    hsGameMode = 0;
    hsGameLevel =0;
    hsScore =0;
    hsName ='';
  },


  // save the currently read intro text into browser local storage
  setReadIntroVer: function() {
    localStorage.setItem("PlutoAttacksReadIntroVer", this.currentIntroVer());
  },

  // return the version of the intro text that has been read
  getReadIntroVer: function() {
    if (localStorage.getItem("PlutoAttacksReadIntroVer") !== null) {
      return parseInt(localStorage.getItem("PlutoAttacksReadIntroVer"));
    } else {
      return 0;
    }
  },

  // return true if need to show intro text otherwise return false to not show it
  showIntroText: function () {

    if (this.currentIntroVer() == this.getReadIntroVer()) {
      return false;
    } else {
      return true;
    }

  },

  // current version of intro text
  // change this to reshow intro text on game start
  currentIntroVer: function() {

    return 3;

  },
  getIntroText: function() {
    return "Plutonians are not happy with us calling their home world\n"+
    "a Dwarf Planet. So when they discovered a trick in the space time \n"+
    "continuum they sent an infinite number of drones to attack Earth.  \n"+
    "We created an energy weapon that can siphon off the energy from \n"+
    "the drones weapons. This powers the Earth vessel and creates a \n"+
    "powerful energy shield.\n"+
    
    "Desktop: press the space bar to start and then left and right\n"+
    "arrows to move. That’s it.\n"+
    
    "Mobile: tap to start and then use your finger to move back and forth.\n"+
    "\nRemember don't let even one alien escape!"

    ;
    
  },

  

  // save score to score server
  notifyServer: function(gameMode, gameLevel, endLevel, perfectLevels, aliensEscaped, score, userName) {
    // Notify the sever of score
    var d = new Date();
    //var n = d.toJSON();
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    
    var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    //console.log("gameMode= "+gameMode+" gameLevel= "+gameLevel + " endLevel= "+ endLevel + " perfectLevels= "+perfectLevels + " aliensEscaped= "+aliensEscaped + " score= "+score);
    var localPA = { "Game":"Pluto Attacks", "Date":d.toJSON(), "WinWidth":w,"WinHeight":h,
    "GameMode":gameMode,"GameLevel":gameLevel,"EndLevel":endLevel,"PerfectLevels":perfectLevels, "AliensEscaped":aliensEscaped,
    "Score":score,"UserName":userName,"Browser":navigator.userAgent };

    var localPAJSON = JSON.stringify(localPA);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("ScoreServerResponse= " + this.responseText);
            //var rspText = this.responseText;
        }
    };
    xmlhttp.open("GET", "sethighscore.php?q=" + localPAJSON, true);
    xmlhttp.send();

  },

  saveHighScore: function(gameMode, gameLevel, endLevel, perfectLevels, aliensEscaped, score) {

    this.notifyServer(gameMode,gameLevel,endLevel, perfectLevels,aliensEscaped,score,'Player');

    if (score > this.highScore.hsScore) { 
      this.highScore.hsScore = score;
      this.saveHighScoreLocal(gameMode,gameLevel,score,'Player');
    
      return true;
    } else {
      return false;
    }
  },


  // high scores in local storage
  saveHighScoreLocal: function(gameMode, gameLevel, score, userName) {
    localStorage.setItem("PlutoAttacksHighScoreGameMode", gameMode);
    localStorage.setItem("PlutoAttacksHighScoreGameLevel", gameLevel);
    localStorage.setItem("PlutoAttacksHighScoreScore", score);
    localStorage.setItem("PlutoAttacksHighScoreName", userName);
    
  },

  // high scores in local storage
  getHighScoreLocal: function() {

    if (localStorage.getItem("PlutoAttacksHighScoreScore") !== null) {
      return parseInt(localStorage.getItem("PlutoAttacksHighScoreScore"));
      console.log("localStorage high score= "+parseInt(localStorage.getItem("PlutoAttacksHighScoreScore")));
    } else { return "Not defined"}
  },

  musicToggle: function() {
    if (Povin.bgMusic.isPlaying == true) {
      Povin.bgMusic.pause();
      Povin.musicEnabled = 0;
      localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled); 
    }
    else {
        Povin.bgMusic.stop();
        Povin.bgMusic.play();
        Povin.musicEnabled = 1;
        localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);  
    };
  },

  musicStatus: function() {

    return Povin.bgMusic.isPlaying;

  },

    // Action when click on the home button
    actionOnClickHome: function (target) {
        this.state.start(target.nextState);
    },

    onInputDownHome: function (target) {
        game.add.tween(target.scale).to({
            x: 0.6,
            y: 0.6
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpHome: function (target) {
        game.add.tween(target.scale).to({
            x: .8,
            y: .8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // Action when click on the speaker button
    actionOnClickSpeaker: function (target) {
        Povin.musicToggle();
        Povin.setSpeakerTexture(target);

    },

    setSpeakerTexture(target) {
        if (Povin.musicStatus() == true) {
            target.loadTexture('buttonSpeaker');

        } else {
            target.loadTexture('buttonSpeakerOff');
        }

    },

    onInputDownSpeaker: function (target) {

        game.add.tween(target.scale).to({
            x: 0.4,
            y: 0.4
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpSpeaker: function (target) {
        game.add.tween(target.scale).to({
            x: .6,
            y: .6
        }, 100, Phaser.Easing.Cubic.Out, true);
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
    placeY: function (percent, offset = 0) {
        var y = game.height * percent;
        y += offset;
        return y;
    },
    placeX: function (percent, offset = 0) {
       var x = game.width * percent;
        x += offset;
        return x;
    },
    fromTop: function (obj, percent, offset = 0) {
        obj.y = game.height * percent;
        obj.y += offset;
    },
    fromLeft: function (obj, percent, offset = 0) {
        obj.x = game.width * percent;
        obj.x += offset;
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

  toString: function() {return " musicEnabled="+this.musicEnabled+" gameMode="+this.gameMode;}
}; // end of Povin



/**************************************************************************************
* Util Class
* @author Doug Park
* @version v1.0
* @desc Utility Class 
* @date 2018-07-22
**************************************************************************************/
class Util {
    // object level properties go here
    constructor() {

    }

    // add commas to number string
    addCommas(nStr) {
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

    // Utility code to get a URL parameter
    getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

} // end Util

var util = new Util();

/**************************************************************************************
* Options Class
* @author Doug Park
* @version v1.0
* @desc Keep track of user selected options
* @date 2018-09-02
**************************************************************************************/
class Options {

    constructor() {
        this.list = []; // store all options objects
        this.joystick = new Object;
        this.playSFX = new Object;
        this.playMusic = new Object;
        this.playVoice = new Object;
        this.setDefaults();
        this.load();
    }

    setDefaults() {
        this.joystick.checked = false;
        this.playSFX.checked = true;
        this.playMusic.checked = true;
        this.playVoice.checked = false;
    }

    getProperties() {
   
        var key;
        var value;

        /* Don't delete  
        // return string
        var s = ''; // string 
        for (var i = 0; i < this.list.length; i++) {
            s += this.list[i].key + ':' + this.list[i].checked + ','; // string of key value pairs
        }
        */

        /*  Dont' delete     
        // return array with key value pairs
        var arr = []; // array to contain just the key value pairs
        for (var i = 0; i < this.list.length; i++) {
            key = this.list[i].key; // get the key from the list array
            value = this.list[i].checked; // get the checked value fro list array
            arr.push({ key: key, checked: value }); // create arrray of key, value paires
        }
        */

        // return object with key value properties
        var brr = new Object; // obj to contain just the key value pairs
        for (var i = 0; i < this.list.length; i++) {
            key = this.list[i].key; // get the key from the list array
            value = this.list[i].checked; // get the checked value fro list array
            brr[key]=value;// create properties in object of key, value pairs    
        }
        //console.log(s);
        //console.log(arr);
        //console.log(brr);
        return brr;

    }

    toJSON(obj) { // create a JSON string based on the properties in the object
        return JSON.stringify(obj);
    }

    toObj(json) {
        return JSON.parse(json); // create an object with prooperties from JSON string
    }

    setProperties(object) { // pass in the obj created from the JSON string
        /* Don't delete
        // set object.checked to value from obj created from JSON string
        // safe for older browsers ECMA5
        for (var property in object) { // loop through all properties in object
            if (object.hasOwnProperty(property)) { // make sure property is not from parent object
                console.log(property+":"+object[property]); // log the property and the value
                this[property].checked = object[property]; // set obj.checked to value
            }
        }
         */

        // set object.checked to value from obj created from JSON string
        // uses ES2017 features
        Object.keys(object).forEach(property => { // loop through all properties in object
            //console.log(`${property}:${object[property]}`) // log the property and the value
            this[property].checked = object[property]; // set obj.checked to value
        }
        
        );
    }

    // load all options from local storage
    load() {
        if (localStorage.getItem("PlutoAttacksOptions") !== null) {
            var j= localStorage.getItem("PlutoAttacksOptions");
            var o = this.toObj(j); // make obj created from JSON string
            this.setProperties(o); // set properties from obj created from JSON string
        } else {
            this.save(); // save defaults
        }
    }
    
    // save all options to local storage
    save() {
        var obj = this.getProperties(); // get obj from properties list
        var j = this.toJSON(obj); // make JSON string from obj
        // save json string to local storage
        localStorage.setItem("PlutoAttacksOptions", j);   
    }

} // end Options

// Create options object and load values from local storage
var options = new Options();

/**************************************************************************************
* Checkbox Class
* @author Doug Park
* @version v1.0
* @desc Display a checkbox and text on the screen
* @date 2018-09-02
**************************************************************************************/

// UI Checkbox for options screen
class Checkbox {
    constructor(key,x, y, text, checked) {

        // save all checkbox instances in an array
        options.list.push(this);

        // checkbox indicator
        this.checked = checked;
        this.key = key;
        this.checkbox = game.add.button(0, 0, 'buttonCheckbox', this.actionOnClick, this);

        //  Checkbox text
        this.checkboxText = game.add.text(0, 0, text, { font: '26px Arial', fill: '#dc7b00' });
        this.checkbox.anchor.setTo(0.5, 0.5);
        this.checkbox.scale.setTo(.3, .3);
        this.checkbox.x = x;
        this.checkbox.y = y;
        //Povin.place(this.checkbox, x, y);

        this.checkbox.events.onInputDown.add(this.onInputDown, this);
        this.checkbox.events.onInputUp.add(this.onInputUp, this);

        this.checkboxText.x = this.checkbox.x + 30;
        this.checkboxText.y = this.checkbox.y - 10;
        this.setTexture(this.checkbox); // set initial state
    }

    // Action when click on the checkbox button
    actionOnClick (target) {

        if (this.checked == true) {
            this.checked = false;
        } else {
            this.checked = true;
        }
        this.setTexture(target);

        // This should be done once a checkbox is selected

        options.save(); // save options to local storage
    }

    setTexture (target) {

        if (this.checked == true) {
            target.frame = 1;
        } else {
            target.frame = 0;
        }
    }

    onInputDown (target) {
        game.add.tween(target.scale).to({
            x: target.scale.x*.8,
            y: target.scale.y*.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    }

    onInputUp (target) {
        game.add.tween(target.scale).to({
            x: target.scale.x*1.25,
            y: target.scale.y*1.25
        }, 100, Phaser.Easing.Cubic.Out, true);
    }
}; // end Checkbox
