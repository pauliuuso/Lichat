<?php

include "config.php";

$connection = new mysqli($_hostname, $_username, $_password, $_database);
$connection2 = new mysqli($_hostname, $_username, $_password, $_database);
//mysqli_report(MYSQLI_REPORT_ALL);

function newConnection()
{
    global $_hostname, $_username, $_password, $_database;
    return new mysqli($_hostname, $_username, $_password, $_database);
}

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
    $sql = ("SELECT name, email from users WHERE name = '$name' and password = '$encodedPassword'");
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_execute($statement);
    mysqli_stmt_bind_result($statement, $userName, $userEmail);
    mysqli_stmt_fetch($statement);
    
    if($userName)
    {
        return true;
    }
    else
    {
        return false; //wrong username or password
    }
}


function setToken($name)
{
    global $connection;
    $token = "S-" . $name . " | " . uniqid() . uniqid() . uniqid();
    $sql = "UPDATE users SET token = '$token' WHERE name = '$name'";
    $statement = $connection->prepare($sql);
        
    if($statement->execute())
    {
        return $token;
    }
    else
    {
        return false;
    }
}

