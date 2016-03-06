<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$title = $data -> title;
$description = $data -> description;
$picture = $data -> picture;
$owner = $data -> owner;


$sql = "INSERT INTO themes (owner, title, description, picture, date) VALUES ('$owner', '$title', '$descripion', '$picture', NOW())";
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