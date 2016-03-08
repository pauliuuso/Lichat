<?php
header('Content-type: application/json');
include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$username = $data -> username;

if($username)
{
    $sql = "SELECT name, picture, level, visited, token FROM users WHERE name = '$username'";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_execute($statement);
    mysqli_stmt_bind_result($statement, $name, $picture, $level, $lastVisit, $token);
    mysqli_stmt_fetch($statement);
    $data = array("username" => $name, "picture" => $picture, "level" => $level, "visited" => $lastVisit, "token" => $token);

    $response = json_encode($data);
}
else
{
    $response = false;
}
  
echo $response;