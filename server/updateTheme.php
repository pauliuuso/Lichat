<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$title = $data -> title;
$description = $data -> description;
$picture = $data -> picture;
$username = $data -> owner;
$id = $data -> id;
$token = $data -> token;
$level = $data -> level;

if(checkToken($token, $username))
{
    startThemeUpdation();
}

function startThemeUpdation()
{
    global $username, $level;
    
    $owner = getOwner();
    
    if($username === $owner || $level >= 2)
    {
        updateTheme();
    }
    else
    {
        echo "You have no right to updte this message!";
    }
}

function getOwner()
{
    global $connection, $id;
    $sql = "SELECT owner FROM themes WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($owner);
    $statement->fetch();
    return $owner;
}


function updateTheme()
{
    global $connection, $title, $description, $picture, $id, $response;
    
    $sql = "UPDATE themes SET title = '$title', description = '$description', picture = '$picture' WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        echo true;
    }
    else
    {
        echo false;
    }

    echo $response;
}