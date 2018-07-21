<?php
/**
 * Space Adventure 3000
 *
 * An on-line single player interactive fiction game
 * with a few extras.
 *
 * @author Doug Park <doug@robotcraft.org>
 * @copyright 2016 RobotCraft.org
 * @license MIT License
 */
 
/*
 * Code snipits to use later
 * echo strrev("Hello world!"); // reverse the output of a string
*/

/************************************************************************************
*
* Start
*
*************************************************************************************/
header('Content-Type: charset=utf-8');
session_name("SpaceGame");
setcookie("Nice", 'Puppy');
session_start();

/************************************************************************************
*
* Define the global variables 
*
*************************************************************************************/

$game = new gameState;
$user = new userState;
$command = array();

/************************************************************************************
*
* Utility Code
*
*************************************************************************************/

require('utility.php');

// Start debug logging
$debug = new debug_log();
$debug->start('space.php');
$debug->request();
$debug->session();
$debug->cookie();

/************************************************************************************
*
* Connect to the database
*
*************************************************************************************/
/*
$con=mysqli_connect("localhost","parkdn_space","space","parkdn_space");

// Check connection
if (mysqli_connect_errno()) {
  $debug->msg( "Failed to connect to MySQL: " , mysqli_connect_error());
}
*/
////
$con = new mysqli("localhost","parkdn_space","space","parkdn_space");
if ($con->connect_errno) {
    $debug->msg( "Failed to connect to MySQL: " , $con->connect_error);
}

//$res = $mysqli->query("SELECT 'choices to please everybody.' AS _msg FROM DUAL");
//$row = $res->fetch_assoc();
//echo $row['_msg'];
/************************************************************************************
*
* GameMap
*
*************************************************************************************/

Class gameMap {
  /**
   * Main game map
   *
   */

}

Class gameBasics {
	public $name;
	public $description;
	public $damage;
	public $hitPoints;
	public $things = array();
   
   	public function addThing($thing) {
   		$this->things[$thing->name] = $thing;  
   	}
   	
   	public function removeThing($thing) {
   		unset($this->things[$thing->name]);  
   	}

   	
   	public function  __construct($name, $description, $damage, $hitPoints) {
     $this->name = $name;
     $this->description = $description;
     $this->damage = $damage;
     $this->hitPoints = $hitPoints;
   }


}

Class gameRoom extends gameBasics {
  /**
   * Info about each room
   */
   public $exits = array();
  
   public function  __construct($name, $description, array $exits) {
    $this->name = $name;
    $this->description = $description;
    $this->exits = $exits; 
    
    global $debug;
    //$debug->msg('North exit= ', $this->exits['North']);

   }
   
   public function move($direction) {
   		global $rooms;
 
   		$nextRoom = $this->exits[$direction];
   		
   	   //global $debug;
       //$debug->msg('nextRoom= ', $nextRoom);
       //$debug->msg('returning rooms[nextRoom]= ', json_encode( (array)$rooms[$nextRoom]));

   		if ($nextRoom) {
   			return $rooms[$nextRoom];
   		} else {
   			return null; }
   }
}

class gameThing extends gameBasics {
  /**
   * Info about each thing in the game
   *
   */
 

}

class gamePlayer extends gameBasics {
  /**
   * Info about the game player
   *
   */
   
   public $currentRoom;
   
   public function setCurrentRoom($room) {
   
    	global $debug;
   		$this->currentRoom = $room;
   		//$debug->msg('Player is now in room= ', $this->currentRoom->name);

   }
   
   public function getAvailableExits() {
    	return $this->currentRoom->exits;
   }
   
   public function move($direction) {

   		$nextRoom = $this->currentRoom->move($direction);
   		
   		//global $debug;   		
   		//$debug->msg('return from currentRoom->move= ', json_encode( (array)$nextRoom));
   		
   		if ($nextRoom) {		
   			$this->setCurrentRoom($nextRoom);
   			return $this->currentRoom;
   		} else {
   			return null;
   		}
   	}
   	
   public function getThing() {
    	return;
   }

   public function putThing() {
    	return;
   }


}

/************************************************************************************
*
* Default Data
*
*************************************************************************************/

$player = new gamePlayer("Hero", "An heroic figure of wit and skill", 10, 100);

$rooms = array();
	$rooms['Lab'] = new gameRoom("Lab","A big open lab.", ["North"=>"Hall", "South"=>"Closet"]); 
	$rooms['Closet'] = new gameRoom("Closet","A small dark closet.",["North"=>"Lab", "Up"=>"Attic"]); 
	

$things = array();
	$things['Lamp'] = new gameThing("Lamp","A big bright lamp sitting on the table.", 1, 5); 
	$things['Hammer'] = new gameThing("Hammer","A normal hammer with a wooden handle. Not sure what it is doing here.", 5, 100); 
	$things['Bucket'] = new gameThing("Bucket","A white bucket used to hold mop water.", 5, 25); 
	
	
// add things to rooms by key value
$rooms['Lab']->addThing($things['Lamp']);
$rooms['Lab']->addThing($things['Hammer']);
$rooms['Closet']->addThing($things['Bucket']);

// add things to player
$player->addThing($things['Hammer']);
$player->setCurrentRoom($rooms['Lab']);


/************************************************************************************
*
* Test Cases
*
*************************************************************************************/

$debug->msg('player= ', json_encode( (array)$player));
foreach ($player->things as $thing) {
	$debug->msg('player->things= ', json_encode( (array)$thing));
}

$debug->msg('Current room exits= ', json_encode( (array)$player->getAvailableExits()));

// for debug only	
foreach ($rooms as $room) {
	$debug->msg('$rooms[]= ', json_encode( (array)$room));
}	
	
foreach ($things as $thing) {
	$debug->msg('$things[]= ', json_encode( (array)$thing));
}

// display the name of the room in rooms[0]
$debug->msg('$rooms["Lab"] Name= ', $rooms['Lab']->name);

// display the name of the thing in things[1]
$debug->msg('$things["Hammer"] Desc= ', $things['Hammer']->description);

// display all the things in rooms['Lab']
foreach ($rooms['Lab']->things as $thing) {
	$debug->msg('$rooms["Lab"]->$things[]= ', json_encode( (array)$thing));

}

/************************************************************************************
*
* Move things and players around
*
*************************************************************************************/

//$rooms['Lab']->removeThing($things['Lamp']);

// display all the things in all rooms
foreach ($rooms as $room) {
	$debug->msg("display all things in all rooms= ", $room->name);
	foreach ($room->things as $thing) {
		$debug->msg("$room->name things= ", json_encode( (array)$thing));
	}
}


// move player
if ($player->move('South')) {
	$debug->msg('Moved player South= ', json_encode( (array)$player));
	} else {
	$debug->msg('Error cannot move player South= ', json_encode( (array)$player));
}

if ($player->move('East')) {
	$debug->msg('Moved player East= ', json_encode( (array)$player));
	} else {
	$debug->msg('Error cannot move player East= ', json_encode( (array)$player));
}

if ($player->move('North')) {
	$debug->msg('Moved player North= ', json_encode( (array)$player));
	} else {
	$debug->msg('Error cannot move player North= ', json_encode( (array)$player));
}

if ($player->move('North')) {
	$debug->msg('Moved player North part 2= ', json_encode( (array)$player));
	} else {
	$debug->msg('Error cannot move player North part 2= ', json_encode( (array)$player));
}




/************************************************************************************
*
* GameState
*
*************************************************************************************/

class gameState {
  /*
   * Main game state
   *
   */
   public $mode;
   public $world;
   public $location;
   
   public $room;
   public $roomDesc;
   public $inventory;
   public $inHand;
   public $sound;

   public $robotTalk;
   public $user;
   public $result;
   public $moreData;
   
   public $loginuser;
   
   // ui commands
   public $show;
   public $hide;
   
   public function loadGameState($newuser = Null) {
   
   		//
   		// should load user gamestate data from the database here
   		//
   		
		$this->mode = "new";
	    $this->world = "Station";
	    $this->location = "Deck 3";
   
	    $this->room = "Lab";
	    $this->roomDesc = 'Lab</br>Bright</br>Large</br>Object';
	    $this->inventory = 'Cup</br>Knife</br>Pencil</br>';
	   	$this->inHand = 'Empty';
	   	$this->sound = "";

	   	$this->robotTalk ='You must be new here. Im Skip, the cute robot assistant here to help you. Kinda like R2D2 and C3PO combined into one unit. I can interface with the world and speak your language most of the time. Who are you?';
   
	   	$this->user = Null;
	   	$this->result = "";
	   	$this->moreData = "nothing yet";
   
	   	$this->loginuser = Null;
	   	
	   	if ($newuser !== Null) {
	   		$this->user = $newuser;
	   	}
    	return "loadGameState with defaults for $newuser";
   }
   
   // Login the user and initialize their gamestate
   public function login() {
   
   		global $command;
   		
   		if ($command[1] != null)  {
   			$this->loadGameState($command[1]);
   			$_SESSION["Started"] = True;
   			return "logged in $command[1]";
   		} else {
   			return "Who is trying to login?";
   		}   
   }

	public function getJson() {
	// return the object as a json string
	}

	public function setJson($newJson) {
	// set the object from a json string
	}
	
	// save the gameState properties to SESSION as a Json string
	public function saveToSESSION() {
		$_SESSION["game"] = json_encode( (array)$this);
	}
	
	// Set gameState properties from array
	public function init(array $arguments = array()) {
		if (!empty($arguments)) {
			foreach ($arguments as $property => $argument) {
				$this->{$property} = $argument;
			}
		}
		// reset ui commands
		$this->sound = null;
		$this->show = null;
		$this->hide = null;
		
		return "Initialized.";
	}

	// load the gameState properties from the SESSION Json string	
	public function loadFromSESSION() {
		if ($_SESSION["game"] != "") {
			$this->init(json_decode( $_SESSION["game"], true));	
		}
	}
		
	// logout of the game
	public function logout() {
	  	$_SESSION = array();
		foreach ($this as $prop => $value) {
			$this->$prop = Null;
		}
		return "See ya.";
	}

}

/************************************************************************************
*
* Save Game to database
*
*************************************************************************************/
class gameSave {
  /**
   * Save the game to the database
   *
   */
}

/************************************************************************************
*
* Load Game from database
*
*************************************************************************************/
class gameLoad {
  /**
   * Load the game from the database
   *
   */
}


class userState {
	/************************************************************************************
	*
	* Register a new user and setup initial game state
	*
	*************************************************************************************/
	public function Register() {
	  /**
	   * Initialize the game from the default database
	   *
	   */
	}


}

/************************************************************************************
*
* Check for optional URL parms
*
*************************************************************************************/

// Load the debug parameter from URL
// $d=$_REQUEST["d"];



/************************************************************************************
*
* Load GameState
*
*************************************************************************************/

// load the game sate from session if user is logged in
if ($_SESSION["Started"] = True) {
	$game->loadFromSession(); // load the gameState from the session variable
} 

/************************************************************************************
*
* Get from the database
*
*************************************************************************************/

//DECLARE YOUR ARRAY WHERE YOU WILL KEEP YOUR RECORD SETS
$names=array();

//$res = $mysqli->query("SELECT 'choices to please everybody.' AS _msg FROM DUAL");
//$row = $res->fetch_assoc();
//echo $row['_msg'];


$query="SELECT * FROM Names";
$index = 0;
if ($result = $con->query($query)) {// run the query

    // fetch object array 
    while ($row = $result->fetch_row()) {
        //printf ("%s\n", $row[0]);
        $names[$index] = $row[0]; // convert each row into an array element
        $index++;
    }

    //free result set 
    $result->close();
}

//close connection 
//$con->close();

function scanDatabase($commandIn) {

	global $names; 
	$hint = "";
	$len=strlen($commandIn);
	
// scan the database results for a matching name
  foreach($names as $name) {
	if (stristr($commandIn, substr($name,0,$len))) {
	  if ($hint==="") {
		$hint=$name;
	  } else {
		$hint .= ", $name";
	  }
	}
  }
  
  return $hint;

}

// End get from database

/************************************************************************************
*
* Evaluate the natural language command
*
*************************************************************************************/
function doCommand(array $command = array()) {

 // make the global variables available
 global $game;
 
 // commands always in lowercase
 $arg0 = strtolower($command[0]);
 
 // Perform command action
  switch ($arg0) {
    case "login":
   	   	$result=$game->login();   	
       	break;
    case "logout": 
	  	$result=$game->logout();
		break;
    case "init":
		$result=$game->loadGameState('Debug');
		break;
  	case "play":
  		$result="You asked for it.";
  		$game->sound = $command[1];
		break;
  	case "show":
  		$result="Showing $command[1]";
  		$game->show = $command[1];
		break;
  	case "hide":
  		$result="Hiding $command[1]";
  		$game->hide = $command[1];
		break;
  	case "save":
  		$result="You are saved! ";
		break;

    default:
        $result="";
   }
   return $result;
}

/************************************************************************************
*
* Make sure user is logged in
*
*************************************************************************************/
// check if came from login page
if ($_SESSION['user'] !== "") {
	$game->loginuser = $_SESSION['user']['username'];
}
 
/************************************************************************************
*
* Get the command
*
*************************************************************************************/
 function cleanInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// get the q parameter from URL
$commandIn=cleanInput($_REQUEST["command"]); 
$hint="";

// Interpret the users command
if ($commandIn !== Null) {
  $debug->msg('$command= ', $commandIn); 
 	
  // Determine number of words and convert to array
  $command = str_word_count($commandIn, 1);
  
  // Remove common connectors
  
  // Find synonyms for commands
  
  // Do the command	
  $hint = doCommand($command);
  
  // Last resort if command not found then scan the database
  if ($hint == "" ) {
  	$hint = scanDatabase($commandIn);
  }
 
  
  
}

/************************************************************************************
*
* Prepare the results of the command to return to the user
*
*************************************************************************************/

$game->result = $hint==="" ? "Error, please restate command" : $hint;


/************************************************************************************
*
* Update GameState 
*
*************************************************************************************/

// save everything to session variables
$game->saveToSession(); 

/************************************************************************************
*
* Debug
*
*************************************************************************************/
/*
  $temp = json_decode( $_SESSION["game"], true);
  $debug->msg('json_decode( $_SESSION["game"], true)= ', $temp);  
  $debug->msg('$temp["user"] = ', $temp["user"]);
  $debug->msg('json_encode( (array)$game) = ', json_encode( (array)$game));
*/  

/************************************************************************************
*
* Return new gameState to ui
*
*************************************************************************************/

echo json_encode( (array)$game);
session_write_close();

$debug->end();
?>