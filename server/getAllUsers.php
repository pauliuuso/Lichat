<?php
header('Content-type: application/json');
include "connection.php";

$data = array();

$sql = "SELECT name, picture FROM users";
$statement = mysqli_prepare($connection, $sql);
$statement->execute();
$statement->bind_result($name, $picture);

while($statement->fetch())
{
    $data[] = array($name, $picture);
}

$response = json_encode($data);

echo $response;