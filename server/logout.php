<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$username = $data->username;

if(checkToken($token, $username))
{
    logout();
}

function logout()
{
    global $connection, $token;
    
    $sql = "UPDATE users SET token = 'out' WHERE token = '$token'"; //out means that user is logged out
    $statement = $connection->prepare($sql);
    if($statement->execute())
    {
        echo "Logged out";
    }
    else
    {
        echo "Failed to log out";
    }
}
