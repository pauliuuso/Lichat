<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$title = $data -> title;
$description = $data -> description;
$picture = $data -> picture;
$owner = $data -> owner;
$id = $data -> id;
$token = $data -> token;

if(checkToken($token, $owner))
{
    updateTheme();
}


function updateTheme()
{
    global $connection, $title, $description, $picture, $owner, $id, $response;
    
    $sql = "UPDATE themes SET owner = '$owner', title = '$title', description = '$description', picture = '$picture' WHERE id = $id";
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