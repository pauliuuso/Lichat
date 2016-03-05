<?php

include "connection.php";

$id = json_decode(file_get_contents("php://input"));

getMessageCount();

function getMessageCount()
{
    global $connection, $id;
    
    $sql = "SELECT owner FROM messages WHERE theme = $id";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->store_result();
    echo $statement->num_rows;
}