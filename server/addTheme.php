<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$date = date("Y-m-d H:i:s");
$title = $data -> title;
$title = addslashes($title);
$description = $data -> description;
$description = addslashes($description);
$picture = $data -> picture;
$owner = $data -> owner;
$token = $data -> token;


if(checkToken($token, $owner))
{
    addTheme();
}

function addTheme()
{
    global $connection, $owner, $title, $description, $picture, $date;
    $sql = "INSERT INTO themes (owner, title, description, picture, date) VALUES ('$owner', '$title', '$description', '$picture', '$date')";
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

echo $response;