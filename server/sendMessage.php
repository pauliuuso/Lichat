<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$date = date("Y-m-d H:i:s");
$username = $data->username;
$message = $data->message;
$themeId = $data->theme;
$token = $data->token;

if(checkToken($token, $username))
{
    sendMessage();
}


function sendMessage()
{
    global $connection, $themeId, $username, $message, $date;
    $sql = "INSERT INTO messages (theme, owner, message, date) VALUES ('$themeId', '$username', '$message', '$date')";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        updateThemeDate();
    }
    else
    {
        echo false;
    }
}

function updateThemeDate()
{
    global $connection, $themeId;
    $sql = "UPDATE themes SET date = NOW() WHERE id = $themeId";
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
