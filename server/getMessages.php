<?php

include "connection.php";

$id = json_decode(file_get_contents("php://input"));

$data = array();

getMessages();

function getMessages()
{
    global $connection, $data, $id;
    
    $sql = "SELECT owner, message, date FROM messages WHERE theme = $id ORDER BY date ASC";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($messageOwner, $message, $date);

    while($statement->fetch())
    {
        $data[] = array($messageOwner, $message, $date);
    }
    
    header('Content-type: application/json');
    $response = json_encode($data);

    echo $response;
}