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

function checkIfCorrect($name, $password)
{
    global $connection;
    $encodedPassword = sha1($password);
    $sql = ("SELECT name from users WHERE name = '$name' and password = '$encodedPassword'");
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_execute($statement);
    mysqli_stmt_bind_result($statement, $userName);
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

