<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$setUser = $data -> setUser;
$setLevel = $data -> setLevel;
$username = $data -> username;
$token = $data -> token;
$level = $data -> level;

if(checkToken($token, $username))
{
    setLevel();
}

function setLevel()
{
    global $connection, $setUser, $setLevel, $level;

    if($level == 3)
    {
        $sql = "UPDATE users SET level = $setLevel WHERE id = $setUser";
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
        echo false;
    }
}
