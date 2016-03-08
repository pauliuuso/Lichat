<?php
header('Content-type: application/json');
include "connection.php";

$id = json_decode(file_get_contents("php://input"));

$data = array();

getTheme();

function getTheme()
{
    global $connection, $data, $id;
    
    $sql = "SELECT owner, title, description, picture FROM themes WHERE id = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($themeOwner, $title, $description, $picture);
    $statement->fetch();

    $data = array($themeOwner, $title, $description, $picture);
 
    $response = json_encode($data);

    echo $response;
}