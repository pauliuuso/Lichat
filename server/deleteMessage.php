<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$username = $data -> username;
$id = $data -> id;
$token = $data -> token;
$level = $data -> level;

if(checkToken($token, $username))
{
    startThemeDeletion();
}
else
{
    $response = "Wrong token";
}

function startThemeDeletion()
{
    global $username, $level, $id, $response;
    
    $owner = getOwner();
    
    if($username === $owner || $level >= 2)
    {
        deleteMessage($id);
    }
    else
    {
        $response = "You have no right to delete this messsage.";
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

function deleteMessage($id)
{
    global $connection, $response;
    
    $sql = "DELETE FROM messages WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        $response = "Message deleted!";
    }
    else
    {
        $response = "Failed to delete theme!";
    }

    echo $response;
    
}