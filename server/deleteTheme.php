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

function startThemeDeletion()
{
    global $username, $level, $id;
    
    $owner = getOwner();
    
    if($username === $owner || $level >= 2)
    {
        deleteTheme($id);
    }
}

function getOwner()
{
    global $connection, $username, $id;
    $sql = "SELECT owner FROM themes WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($owner);
    $statement->fetch();
    return $owner;
}

function deleteTheme($id)
{
    global $connection;
    
    $sql = "DELETE FROM themes WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        deleteMessages($id);
    }
    else
    {
        echo "Failed to delete theme!";
    }

}

function deleteMessages($id)
{
    global $connection;
    $sql = "DELETE FROM messages WHERE theme = $id";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        echo "Theme and messages deleted!";
    }
    else
    {
        echo "Failed to delete messages!";
    }
}