<?php
/**
 * Get Pluto Attacks Scores API
 * @author Doug Park
 * @version v1.0
 * @return JSON message with the status
 * @desc 
 * @date 2018-07-022
 * Based On https://github.com/memaker/webservice-php-json/blob/master/api.php
 */

// the db access file
require_once 'api.php';

require('utility.php');

// Start debug logging
//$debug = new debug_log();
//$debug->start('dash.php');
//$debug->msg('$_SERVER["REMOTE_ADDR"]', $_SERVER );

showHeader();
showLinks();

// creates a new instance of the api class
$api = new api();

// call the database access api and pass array of params

//showTable('Game My Rank', $api->gameScoreMyRank(30000));

//showTable('Rankings', $api->Rankings(0));

showTable('Total Players Today', $api->playersToday(0));

showTable('Total Games Played Today', $api->gamesPlayedToday(0));

showTable('Game High Scores Today', $api->gameHighScoresToday(10));

showTable('Game High Scores', $api->gameHighScores(10));

showTable('High Scores Today', $api->highScoresToday(10));      

showTable('High Scores', $api->highScores(10));

showTable('Recent Scores', $api->recentScores(10));

function showTable($title, $result) {
    $all_property = array();  //declare an array for saving property
        
    //showing property
    echo '<h1>' . $title . '</h1>';

    echo '<table class="data-table">';

    echo '       <tr class="data-heading">';  //initialize table tag
    while ($property = $result->fetch_field()) {
        echo '<td>' . $property->name . '</td>';  //get field name for header
        array_push($all_property, $property->name);  //save those to array
    }
    echo '</tr>'; //end tr tag

    //showing all data
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        echo "<tr>";
        foreach ($all_property as $item) {
            echo '<td>' . $row[$item] . '</td>'; //get items using property value
        }
        echo '</tr>';
    }
    echo "</table>";

}

function showLinks() {

    $links = '

    <div class="fixedLeft">
    <h1>
    <a href="http://dougs-mbp-touchbar.local/plutoattacks/">Development Game</a>
    </h1>
    </div>

    <div class="fixedLeft2">
    <h1>
    <a href="http://dougs-mbp-touchbar.local/plutoattacks/dash.php">Development Dash</a>
    </h1>
    </div>

    <div class="fixedRight">
    <h1>
    <a href="https://povingames.com/plutoattacks/">Production Game</a>
    </h1>
    </div>
    
    <div class="fixedRight2">
    <h1>
    <a href="https://povingames.com/plutoattacks/dash.php">Production Dash</a>
    </h1>
    </div>
    ';

    echo $links;
}

function showHeader() {
    $header = '<head>
    <title>Dashboard</title>

    <style>
    div.fixedLeft {
        position: fixed;
        top: 0px;
        left: 00px;
        width: 300px;
        
        background: #f4fbff;
    }

    div.fixedLeft2 {
        position: fixed;
        top: 100px;
        left: 00px;
        width: 300px;
        
        background: #f4fbff;
    }
    div.fixedRight {
        position: fixed;
        top: 0px;
        right: 00px;
        width: 300px;
        
        background: #f4fbff;
    }

    div.fixedRight2 {
        position: fixed;
        top: 100px;
        right: 00px;
        width: 300px;
        
        background: #f4fbff;
    }
    </style>

    <style type="text/css">
        body {
            font-size: 15px;
            color: #343d44;
            font-family: "segoe-ui", "open-sans", tahoma, arial;
            padding: 0;
            margin: 0;
        }
        table {
            margin: auto;
            font-family: "Lucida Sans Unicode", "Lucida Grande", "Segoe Ui";
            font-size: 12px;
        }
    
        h1 {
            margin: 25px auto 0;
            text-align: center;
            text-transform: uppercase;
            font-size: 17px;
        }
    
        table td {
            transition: all .5s;
        }
        
        /* Table */
        .data-table {
            border-collapse: collapse;
            font-size: 14px;
            min-width: 537px;
        }
    
        .data-table th, 
        .data-table td {
            border: 1px solid #e1edff;
            padding: 7px 17px;
        }
        .data-table caption {
            margin: 7px;
        }
    
        /* Table Header */
        .data-table thead th {
            background-color: #508abb;
            color: #FFFFFF;
            border-color: #6ea1cc !important;
            text-transform: uppercase;
        }
    
        /* Table Body */
        .data-table tbody td {
            color: #353535;
        }
        .data-table tbody td:first-child,
        .data-table tbody td:nth-child(4),
        .data-table tbody td:last-child {
            text-align: right;
        }
    
        .data-table tbody tr:nth-child(odd) td {
            background-color: #f4fbff;
        }
        .data-table tbody tr:hover td {
            background-color: #ffffa2;
            border-color: #ffff0f;
        }
    
        /* Table Footer */
        .data-table tfoot th {
            background-color: #e5f5ff;
            text-align: right;
        }
        .data-table tfoot th:first-child {
            text-align: left;
        }
        .data-table tbody td:empty
        {
            background-color: #ffcccc;
        }
    </style>
    </head>';
    
    echo $header;

}
//the JSON message
//header('Content-type: application/json; charset=utf-8');
//echo 'list high scores';
//echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHED);
?>