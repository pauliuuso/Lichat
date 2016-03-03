<?php

include "connection.php";

$data = array();

$sql = "SELECT owner, title, picture, id FROM themes";
$statement = mysqli_prepare($connection, $sql);
$statement->execute();
$statement->bind_result($themeOwner, $title, $picture, $id);

while($statement->fetch())
{
//    $sql2 = "SELECT id FROM messages WHERE theme = $id"; //Get number of messages that this theme holds
//    $statement2 = mysqli_prepare($connection2, $sql2);
//    $statement2->execute();
//    $statement2->store_result();
//    $messageCount = $statement2->num_rows;
    
    $sql3 = "SELECT owner FROM messages";
    $statement3 = mysqli_prepare($connection2, $sql3);
    $statement3->execute();
    $statement3->bind_result($messageOwner);
    
    //Reiktu padaryt kad nereiketu 3 connection
    
    $data[] = array($themeOwner, $title, $picture, $id);
}

header('Content-type: application/json');
$response = json_encode($data);

echo $response;