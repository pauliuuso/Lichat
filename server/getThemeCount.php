<?php
include "connection.php";

getThemeCount();

function getThemeCount()
{
    global $connection;
    
    $sql = "SELECT id FROM themes";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->store_result();
    echo $statement->num_rows;  
}