<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$date = date("Y-m-d H:i:s");
$username = $data -> username;
$token = $data -> token;

if(checkToken($token, $username))
{
    setDate();
}

function setDate()
{
    global $connection, $username, $date;
    
    if($username)
    {
        $sql = "UPDATE users SET visited = '$date' WHERE name = '$username'";
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