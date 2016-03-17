<?php
header('Content-type: application/json');
include "connection.php";

$data = array();
$date = date("Y-m-d H:i:s");
$date = date("Y-m-d H:i:s", strtotime($date) - 5);

getOnline();

function getOnline()
{
    global $connection, $date, $data;
    $sql = "SELECT name FROM users WHERE visited > '$date' ORDER BY name ASC";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($name);
    while($statement->fetch())
    {
        $data[] = $name;
    }
    echo json_encode($data);
}