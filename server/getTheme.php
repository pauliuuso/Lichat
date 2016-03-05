<?php

include "connection.php";

$id = json_decode(file_get_contents("php://input"));

$data = array();

getTheme();

function getTheme()
{
    global $connection, $data, $id;
    
    $sql = "SELECT owner, title, description FROM themes WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($themeOwner, $title, $description);
    $statement->fetch();

    $data[] = array($themeOwner, $title, $description);
 

    header('Content-type: application/json');
    $response = json_encode($data);

    echo $response;
}