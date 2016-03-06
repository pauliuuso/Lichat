<?php
header('Content-type: application/json');
include "connection.php";

$params = json_decode(file_get_contents("php://input"));

$id = $params->id;
$startFrom = $params->startFrom;
$count = $params->count;

$data = array();

getMessages();

function getMessages()
{
    global $connection, $data, $id, $count, $startFrom;

    $sql = "SELECT owner, message, date FROM messages WHERE theme = $id ORDER BY date ASC LIMIT $count OFFSET $startFrom";

    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($messageOwner, $message, $date);

    while($statement->fetch())
    {
        $data[] = array($messageOwner, $message, $date);
    }
    
    $response = json_encode($data);

    echo $response;
}