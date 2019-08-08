<?php
/**
 * Get Pluto Attacks My Rank API
 * @author Doug Park
 * @version v1.0
 * @return JSON message with the rank
 * @date 2018-08-23
 * Based On https://github.com/memaker/webservice-php-json/blob/master/api.php
 */

// the db access file
require_once 'api.php';
// creates a new instance of the api class
$api = new api();
// decode json q parameter to array
//$params = json_decode($_REQUEST["q"], true);
// call the database access api and pass array of params
$result = $api->gameScoreMyRank($_REQUEST["q"]);

//the JSON message
header('Content-type: application/json; charset=utf-8');
echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHED);
?>