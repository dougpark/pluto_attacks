<?php
/**
 * Pluto Attacks High Score API
 * @author Doug Park
 * @version 2018-07-22
 * Based On https://github.com/memaker/webservice-php-json/blob/master/api.php
 */
class api
{
    private $db;
    private $type;
	/**
	 * Constructor - open DB connection
	 *
	 * @param none
	 * @return database
	 */
	function __construct()
	{
		$conf = json_decode(file_get_contents('configuration.json'), TRUE);
		$this->db = new mysqli($conf["host"], $conf["user"], $conf["password"], $conf["database"]);
        $this->type = $conf["type"];
    }
	/**
	 * Destructor - close DB connection
	 *
	 * @param none
	 * @return none
	 */
	function __destruct()
	{
		$this->db->close();
    }
    
    /**
     * Set High Score
     * 
     * @param array of params
     * @return result of db insert
     * 
     */
    function set($params)
    {
        $query = "INSERT INTO `highscore` ("
        . "`id`, `Type`, `Game`, `Date`, `WinWidth`, "
        . "`WinHeight`, `GameMode`, `GameLevel`,`EndLevel`, "
        . "`PerfectLevels`, `AliensEscaped`, "
        . "`Score`, `UserName`, `IpAddress`, `Browser`)"
        . " VALUES (NULL, "
        . "'" . $this->type . "',"
        . "'" . $params["Game"] . "',"
        . "'" . $params["Date"] . "',"
        . "'" . $params["WinWidth"] . "',"
        . "'" . $params["WinHeight"] . "',"
        . "'" . $params["GameMode"] . "',"
        . "'" . $params["GameLevel"] . "',"
        . "'" . $params["EndLevel"] . "',"
        . "'" . $params["PerfectLevels"] . "',"
        . "'" . $params["AliensEscaped"] . "',"
        . "'" . $params["Score"] . "',"
        . "'" . $params["UserName"] . "',"
        . "'" . $_SERVER["REMOTE_ADDR"] . "',"
        . "'" . $params["Browser"] . "')"
        ;
        $result = $this->db->query($query);

        return $result;
    }
    /**
	 * Get game high score list
	 *
	 * @param none 
	 * @return list array
	 */
	function gameHighScoresList($params)
	{
        $query = 'SELECT Score, PerfectLevels, AliensEscaped ' 
        . ' FROM highscore'
        . ' where GameLevel > 0 and type = "prod" '
		. ' ORDER BY Score DESC, PerfectLevels DESC, AliensEscaped Limit 10'
        ;
        
		$list = array();
        $result = $this->db->query($query);
        while ($row = $result->fetch_assoc())
        {   
            $list[] = $row;
        }
        return $list;       
    }
    
    /**
	 * Get game high score 
	 *
	 * @param none 
	 * @return result set
	 */
	function gameHighScores($params)
	{
        $query = 'SELECT Score, PerfectLevels, AliensEscaped ' 
        . ' FROM highscore'
        . ' where GameLevel > 0 and type = "prod" '
		. ' ORDER BY Score DESC, PerfectLevels DESC, AliensEscaped Limit 10'
		;
		
        $result = $this->db->query($query);
        
        return $result;        
    }
    /**
	 * Get game high score today
	 *
	 * @param none 
	 * @return result set
	 */
	function gameHighScoresToday($params)
	{
        $query = 'SELECT Score, PerfectLevels, AliensEscaped ' 
        . ' FROM highscore'
        . ' where GameLevel > 0 and type = "prod" '
        . ' and Date(Time) = CURDATE() '
		. ' ORDER BY Score DESC, PerfectLevels DESC, AliensEscaped Limit 10'
		;
		
        $result = $this->db->query($query);
        
        return $result;        
    }
    /**
	 * Get high score today
	 *
	 * @param none 
	 * @return result set
	 */
	function highScoresToday($params)
	{
        $query = 'SELECT Time, Score, PerfectLevels, AliensEscaped, GameMode, (EndLevel - GameLevel) as LevelsCompleted,' 
        . ' GameLevel, EndLevel, '
        . ' (PerfectLevels / (EndLevel-GameLevel))*100 as Percent,'
        . ' IpAddress'
        . ' FROM highscore'
        . ' where GameLevel > 0 and type = "prod" '
        . ' and Date(Time) = CURDATE() '
		. ' ORDER BY Score DESC, PerfectLevels DESC, AliensEscaped Limit 10'
		;
		
        $result = $this->db->query($query);
        
        return $result;        
    }
    /**
	 * Get count of games played today
	 *
	 * @param none 
	 * @return result set
	 */
	function gamesPlayedToday($params)
	{
        $query = 'SELECT count(id) as GameCount' 
        . ' from highscore  '
        . ' where GameLevel >0 and type = "prod" '
        . ' and Date(Time) = CURDATE() '
		;
		
        $result = $this->db->query($query);
        
        return $result;        
    }

	/**
	 * Get the high scores
	 *
	 * @param none or user id
	 * @return result set
	 */
	function highScores($params)
	{
        $query = 'SELECT Time, Score, PerfectLevels, AliensEscaped, GameMode, (EndLevel - GameLevel) as LevelsCompleted,' 
        . ' GameLevel, EndLevel, '
        . ' (PerfectLevels / (EndLevel-GameLevel))*100 as Percent,'
        . ' IpAddress'
        . ' FROM highscore'
        . ' where GameLevel > 0 and type = "prod" '
		. ' ORDER BY Score DESC, PerfectLevels DESC, Percent DESC Limit 10'
		;
		
        $result = $this->db->query($query);
        
        return $result;
        
    }
    /**
	 * Get the recent scores
	 *
	 * @param none or user id
	 * @return result set
	 */
	function recentScores($params)
	{
        $query = 'SELECT Time, Score, PerfectLevels, AliensEscaped, GameMode, (EndLevel - GameLevel) as LevelsCompleted,' 
        . ' GameLevel, EndLevel, '
        . ' (PerfectLevels / (EndLevel-GameLevel))*100 as Percent,'
        . ' IpAddress'
        . ' FROM highscore'
        . ' where UserName != "" '
        . ' and type = "prod" '
		. ' ORDER BY Date DESC, Score DESC, PerfectLevels DESC, Percent DESC Limit 10'
		;
		
        $result = $this->db->query($query);
        
        return $result;
        
    }
}