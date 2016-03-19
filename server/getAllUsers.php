<?php
header('Content-type: application/json');
include "connection.php";

$data = array();

$sql = "SELECT name, picture, id, level FROM users";
$statement = mysqli_prepare($connection, $sql);
$statement->execute();
$statement->bind_result($name, $picture, $id, $level);

while($statement->fetch())
{
    $data[] = array($name, $picture, $id, $level);
}

$response = json_encode($data);

echo $response;