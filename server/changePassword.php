<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$username = $data -> username;
$password = $data -> newPassword;
$token = $data -> token;

if(checkToken($token, $username))
{
    changePassword();
}

function changePassword()
{
    global $username, $password, $connection;
    
    if($username && strlen($password) > 3)
    {
        $password = sha1($password);
        $sql = "UPDATE users SET password = '$password' WHERE name = '$username'";
        $statement = mysqli_prepare($connection, $sql);
        if($statement->execute())
        {
            $response = "Your password is updated";
        }
        else
        {
            $response = "Failed to update password!";
        }

    }
    else
    {
        $response = "This password is not allowed!";
    }

    echo $response;
}
