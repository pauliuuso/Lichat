<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$message = $data->message;
$themeId = $data->theme;
$token = $data->token;
$id = $data->messageId;
$level = $data->level;

if(checkToken($token, $username))
{
    startMessageUpdation();
}
else
{
    echo false;
}

function startMessageUpdation()
{
    global $username, $level;
    
    $owner = getOwner();
    
    if($username === $owner || $level >= 2)
    {
        updateMessage();
    }
    else
    {
        echo "You have no right to updte this message!";
    }
}

function getOwner()
{
    global $connection, $id;
    $sql = "SELECT owner FROM messages WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($owner);
    $statement->fetch();
    return $owner;
}

function updateMessage()
{
    global $connection, $message, $id;
    $sql = "UPDATE messages SET message = '$message' WHERE id = $id";
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