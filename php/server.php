<?php
function check_timezone($timezone) {
	return isset($timezone);
}

function check_1_area($x, $y, $r){
	return ($x>=0 && $y>=0 && sqrt($x*$x+$y*$y)<=$r*$r);
}

function check_2_area($x, $y, $r){
	return ($x<=0 && $y>=0 && $y>=$r+2*$x); 
}

function check_4_area($x, $y, $r){
	return ($x>=0 && $y<=0 && $x<=$r && $y>=$r/2);
}

session_start();
if (!isset($_SESSION['data']))
    $_SESSION['data'] = array();


$x = intval(@$_POST["x_value_name"]);
$y = floatval(@$_POST["y_value_name"]);
$r = intval(@$_POST["R_value_name"]);
$timezone= @$_POST["timezone"];

$check_all = check_1_area($x, $y, $r) || check_2_area($x, $y, $r) || check_4_area($x, $y, $r);
// $check_all = true;
$result = $check_all ? "Hit": "Miss";

$cur_time = date("j M o G:i:s", time()-$timezone*60);
$exe_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
$answer = array("x"=>$x, "y"=>$y, "r"=>$r, "result"=>$result, "exe_time"=>$exe_time, "cur_time"=>$cur_time);


array_push($_SESSION['data'], $answer);

foreach ($_SESSION['data'] as $elem){
	echo "<tr class='columns' id='columns'>";
	echo "<td>" . $elem['x'] . "</td>";
	echo "<td>" . $elem['y'] . "</td>";
	echo "<td>" . $elem['r'] . "</td>";
	echo "<td>" . $elem['result']  . "</td>";
	echo "<td>" . $elem['exe_time'] . "</td>";
	echo "<td>" . $elem['cur_time']  . "</td>";
	echo "</tr>";
}

?>

