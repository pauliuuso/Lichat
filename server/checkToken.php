<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));

$token = $data->token;
$sql = "SELECT name FROM users WHERE token = '$token'";
$result = $connection->query($sql);
$result = $result->fetch_assoc();


if(count($result) === 1)
{
    echo "okay";
}
else 
{
    echo $token;
}