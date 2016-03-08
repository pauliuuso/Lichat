<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$url = $data -> pictureUrl;
$username = $data -> username;
$token = $data -> token;

if(checkToken($token, $username))
{
    updatePicture();
}

function updatePicture()
{
    global $connection, $url, $username;
    
    if($username)
    {
        $sql = "UPDATE users SET picture = '$url' WHERE name = '$username'";
        $statement = mysqli_prepare($connection, $sql);
        if($statement->execute())
        {
            echo true;
        }
        else
        {
            echo false;
        }

    }
    else
    {
        $response = false;
    }

    echo $response;
}
