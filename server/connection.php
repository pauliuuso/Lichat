<?php

include "config.php";

$connection = new mysqli($hostname, $username, $password, $database);

function checkIfExists($name, $email)
{
    global $connection;
    
    $sql = ("SELECT name, email from users WHERE name = '$name' OR email = '$email'");
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_execute($statement);
    mysqli_stmt_bind_result($statement, $userName, $userEmail);
    mysqli_stmt_fetch($statement);
    
    if($userName)
    {
        return true; //Name is already taken
    }
    else
    {
        return false; //Name is available
    }


}




function getFromDatabase($statement)
{

}
