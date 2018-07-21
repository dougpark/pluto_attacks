<?php header('Content-Type: charset=utf-8'); ?>

<head>

  <meta charset="utf-8">
  <title>Space Adventure 3001</title>

  <!-- Font -->  
  <link href='https://fonts.googleapis.com/css?family=Orbitron:500' rel='stylesheet' type='text/css'> 

  <!-- P5.js --> 
  <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.0/p5.min.js"></script>
  <script language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.0/addons/p5.dom.min.js"></script>
  <script language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.0/addons/p5.sound.min.js"></script>
  <script language="javascript" src="lib/p5.speech.js"></script>  
  
  <!-- jquery.js --> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  
  <!-- this line removes any default padding and style. you might only need one of these values set. -->
  <style> body {padding: 0; margin: 0;} </style>
 
</head>

<?php /* CSS Styles */ ?>
<style>

  :root {
  --main-bg-color: #0E65B9;
   --main-bg-color: #1A1A1A;
   
  --main-br-color: #084D90;
   --main-br-color: #5792CB;
   
  --main-tx-color: #FFDA62;
  --main-hd-color: #FF5300;
  --main-db-color: #084D90;
    --main-db-color: #1A1A1A;
  
  --main-bt-color: #FFC300;
  
  --btn-background-color: #FF5300 ;
  --btn-text-color: white;
  --btn-background-hover-color: #FF7735;
  --btn-background-click-color: #AE3800;
  
  --btn-background-color: #5792CB ;
  --btn-text-color: #B8F999;
  --btn-background-hover-color: #337ABE;
  --btn-background-click-color: #084D90;
  }
  
.button {
   border: none;
   background: var(--btn-background-color);
   padding: 15px 10px;
   border-radius: 0px;
   width: 90px;
   color: var(--btn-text-color);
   font-family: 'Orbitron', sans-serif;
   font-size: 14px;
   text-decoration: none;
   vertical-align: middle;
   }
.button:hover {
   background: var(--btn-background-hover-color);
   color: #ccc;
   }
.button:active {
   background: var(--btn-background-click-color);
   }
   
    div.buttons1D {
      position: relative;
      width: 100px;
      height: 500px;
      border: 1px var(--main-brxx-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      text-align: left; 
      background-color: var(--main-btxx-color);     
    }
    
    div.buttons2D {
      position: relative;
      width: 100px;
      height: 500px;
      border: 1px var(--main-brxx-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      text-align: left;  
      background-color: var(--main-btxx-color);    
    }
   
    div.roomD {
      position: relative;
      width: 100px;
      height: 500px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      text-align: left;
      background-color: var(--main-bg-color);
      overflow: scroll;
    }
  
    div.resultD {
      position: relative;
      width: 500px;
      height: 200px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      background-color: var(--main-bg-color);
      overflow: scroll;
    }
    
    div.commandD {
      position: relative;
      width: 500px;
      height: 50px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      background-color: var(--main-bg-color);
      overflow: scroll;
    }
    
    div.debugD {
      position: relative;
      width: 720px;
      height: 200px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      background-color: var(--main-db-color);
      overflow: scroll;
    }
    
    div.skip {
      position: absolute;
      width: 500px;
      height: 230px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      background-color: var(--main-bg-color);
      z-index: 0;
    }
    
    div.inventoryD {
      position: absolute;
      width: 100px;
      height: 500px;
      border: 1px var(--main-br-color) solid;
      color: var(--main-tx-color);
      padding: 2px;
      margin: 0;
      background-color: var(--main-bg-color);
      overflow: scroll;
    }
    
    .headOne {
      color: var(--main-hd-color);
    }
    
    input[type=text] {
        background-color: var(--main-bg-color);
        color: var(--btn-text-color);
        border: 1px solid var(--btn-text-color);
        width: 60eml;
        padding: 5px 5px;
        margin: 4px 0; 
        resize: none;
    }

    body {
      padding: 0;
      margin: 0;
    }
    
    canvas {
      vertical-align: top;
    }
	
	html { 
	  background: url(images/hud.jpg) no-repeat center center fixed; 
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
  
	  font-family: 'Orbitron', sans-serif; font-size: 75%;
	}
</style>

<?php /* p5.js sketch */ ?>
<script>

var song, fft;
var buttons1 = new Array ();
var buttons1Desc = new Array ();
var buttons2 = new Array ();
var buttons2Desc = new Array ();

function setup() {
  var canvas = createCanvas(500, 230);
  canvas.parent('skip');
  
	fft = new p5.FFT();   
}

function draw() {
  //background('#0E65B9');
  stroke (255,0,0);
  //fill('#0E65B9');
  
  if ( song != null) {
	if ( song.isPlaying() ) { 
		var waveform = fft.waveform(song);  // analyze the waveform
		beginShape();
		strokeWeight(5);
		for (var i = 0; i < waveform.length; i++){
			var x = map(i, 0, waveform.length, 0, width);
			var y = map (waveform[i], -1, 1, height, 0);
			vertex(x, y);
		}
		endShape();
	}
	}
}
</script>

<?php /* ajax scripts */ ?>
<script>
//
// When enter is pressed then send the command to the server to get the results
//
function getResult() {

	debug = "";
	
	// redisplay what the user typed
	$('#txtResult').text($('#txtInput').val());
	
	// get the characters the user typed
	str = $('#txtInput').val();
	
	// clear what the user typed
	$('#txtInput').val("");
	
	if (str.length==0) { 
	return;
	}
	
	// Call the server with an ajax query
	// Returns a JSON string with key value pairs
	// Populate html properties (Key) with value
	$.getJSON("space.php", { command: str}, 
		function( data ) {
	 		$.each( data, function( key, val )  {
	 			$('#'+key).html(val);
	 			debug += "<b>["+key + "::: </b>" + val + " ] ";
 	 		});
 	 		processResult(data, jQuery(debug).text());
 	 		
 	 	}
 	 ).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
 		$('#debug').html(jqXHR.responseText);
 	 
 	 });	
}

//
// See what came back from the server and do it
//
function processResult(data, debug) {
	$('#debug').html(debug);    
	 
	// perform ui show/hide commands
	$('#'+data.show).slideDown("slow"); 
	$('#'+data.hide).slideUp("slow"); 
	
	// load a sound and play it
	if (data.sound != null) { playLoop(data.sound); }
}
</script>

<?php /* audio scripts */ ?>
<script>

//
// Play Audio
//
function playLoop(sound) {

if (sound == "p") {
	song.play();
} else if (sound == "q") {
	song.pause();
} else if (sound != "") {
	song = loadSound("sounds/" + sound + ".mp3", playsound);
	//song.play();
	//var audio = new Audio("sounds/" + responseObj.sound + ".mp3");
	//audio.play();
	} 

}

// callback function to start playing when sound is loaded
function playsound() {
	song.play();
}

</script>

<?php /* Init Javascript */ ?>
<script>

function placeDiv(divId, x_pos, y_pos) {
  var d = document.getElementById(divId);
  d.style.position = "absolute";
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
}

function initPage() {

    var w = window.innerWidth;
    var h = window.innerHeight;
    var l = (w/2)-460;
    var t = 10;
 
 	initButtons();
    
	placeDiv("buttons1D", l+0, t+0); // 100 x 500
	placeDiv("roomD", l+100, t+0); // 100 x 500
	placeDiv("resultD", l+210, t+0); // 500 x 200
	placeDiv("commandD", l+210, t+210);// 500 x 50
	placeDiv("inventoryD", l+720, t+0); // 100 x 500
	placeDiv("buttons2D", l+830, t+0); // 100 x 500
	
	placeDiv("skip", l+210, t+270); // 500 x 230
	placeDiv("debugD", l+100, t+510); // 720 x 200
	

}

$(window).resize(function() {
  initPage();
});

</script>

<?php /* buttons */ ?>
<script>
//
// Buttons
//

// process a button click
function clickButton(e) {
	$('#txtInput').val(e.target.innerText);
			getResult();
}

function initButtons() {

	//
	// Buttons 1
	//

	buttons1Desc = ["Login", "Yes","No","Play","Pause","Stop","Home","Save","Load","Settings"];

	var buttons1D = createDiv('');
	buttons1D.id('buttons1D');
	buttons1D.addClass('buttons1D');

  for (i = 0; i < buttons1Desc.length; i++) {
			buttons1[i] = createButton(buttons1Desc[i]);
			buttons1[i].id('btn'+buttons1Desc[i]);
			buttons1[i].addClass('button');
	
			buttons1D.child(buttons1[i]);
			
			document.getElementById('btn'+buttons1Desc[i]).addEventListener("click", clickButton);
			document.getElementById('btn'+buttons1Desc[i]).addEventListener("touchstart", clickButton);
    	
	}
	
	
	//
	// Buttons2
	//
	
	buttons2Desc = ["North", "South","East","West","Up","Down","Run","Rest","Get","Drop"];

	var buttons2D = createDiv('');
	buttons2D.id('buttons2D');
	buttons2D.addClass('buttons2D');

  for (i = 0; i < buttons2Desc.length; i++) {
			buttons2[i] = createButton(buttons2Desc[i]);
			buttons2[i].id('btn'+buttons2Desc[i]);
			buttons2[i].addClass('button');
	
			buttons2D.child(buttons2[i]);
			
			document.getElementById('btn'+buttons2Desc[i]).addEventListener("click", clickButton);
			document.getElementById('btn'+buttons2Desc[i]).addEventListener("touchstart", clickButton);

	}	

}
</script>

<?php /* html */ ?>
<body onload="initPage()";>

	<div id="roomD" class="roomD" ;>
	<span class="headOne">Room:</br></span>
	<span id="room"></span>
	</div>

	<div id="resultD" class="resultD" ;>
	<span id="user"></span>
	<p>Command-> <span id="txtResult"></span></p>
	<p><span id="robotTalk"></span></p>
	<p>Result=> <span id="result"></span></p>
	</div>

	<div id="commandD" class="commandD" ;>
	<p>
	<form onsubmit="javascript:getResult();return false;">
	->
	<input autofocus size="65" id="txtInput" type="text">
	</form>
	</p>
	</div>

	<div id="debugD" class="debugD" ;>
	<span class="headOne">Debug:</br></span>
	<p><span id="debug"></span></p>
	</div>

	<div id="skip" class="skip" >
	<!-- Our sketch will go here! -->
	</div>
	
	<div id="inventoryD" class="inventoryD" ;>
	<span class="headOne"> Inventory:</br></span>
	<span id="inventory"></span>
	</div>

</body>
</html>