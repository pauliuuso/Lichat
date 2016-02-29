<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$username = $data -> username;

if($username)
{
    $sql = "SELECT picture, level FROM users WHERE name = '$username'";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_execute($statement);
    mysqli_stmt_bind_result($statement, $picture, $level);
    mysqli_stmt_fetch($statement);
    $data = array("picture" => $picture, "level" => $level);
    header('Content-type: application/json');
    $response = json_encode($data);
}
else
{
    $response = false;
}

    
echo $response;

?>