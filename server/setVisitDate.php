<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$username = $data -> username;

if($username)
{
    $sql = "UPDATE users SET visited = NOW() WHERE name = '$username'";
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
