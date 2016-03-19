<?php
header('Content-type: application/json');
include "connection.php";

$data = array();
$startFrom = intval(json_decode(file_get_contents("php://input")));

function getAllThemes()
{
    global $connection, $data, $startFrom;
    $sql = "SELECT owner, title, picture, id FROM themes ORDER BY date DESC LIMIT 10 OFFSET $startFrom";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->bind_result($themeOwner, $title, $picture, $id);

    while($statement->fetch())
    {
        $messageCount = getMessageCount($id);
        $messageOwner = getMessageOwner($id);

        $data[] = array($themeOwner, $title, $picture, $id, $messageCount, $messageOwner[0], $messageOwner[1]);
    }
    
    $response = json_encode($data);

    echo $response;
    
}

function getMessageCount($id)
{
    global $connection2;
    $sql = "SELECT id FROM messages WHERE theme = $id"; //Get number of messages that this theme holds
    $statement = mysqli_prepare($connection2, $sql);
    $statement->execute();
    $statement->store_result();
    return $statement->num_rows;
}

function getMessageOwner($id) // Get owner of the last message in selected theme
{
    global $connection2;
    $sql = "SELECT owner, date FROM messages WHERE theme = $id ORDER BY id DESC LIMIT 1"; //Get number of messages that this theme holds
    $statement = mysqli_prepare($connection2, $sql);
    $statement->execute();
    $statement->bind_result($owner, $date);
    while($statement->fetch())
    {
        return array($owner, $date);
    }
}

getAllThemes();