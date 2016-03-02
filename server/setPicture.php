<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$url = $data -> pictureUrl;
$username = $data -> username;

if($username)
{
    $sql = "UPDATE users SET picture = '$url' WHERE name = '$username'";
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
