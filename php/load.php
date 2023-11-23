<?php
session_start();
if(isset($_SESSION['data'])){
    foreach ($_SESSION['data'] as $elem){
        echo "<tr class='columns'>";
        echo "<td>" . $elem['x'] . "</td>";
        echo "<td>" . $elem['y'] . "</td>";
        echo "<td>" . $elem['r'] . "</td>";
        echo "<td>" . $elem['result']  . "</td>";
        echo "<td>" . $elem['exe_time'] . "</td>";
        echo "<td>" . $elem['cur_time']  . "</td>";
        echo "</tr>";
    }
}
?>