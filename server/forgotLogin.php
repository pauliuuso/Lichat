<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"));

$user = $data -> username;
$userEmail = $data -> email;

if(isCorrect($user) && isCorrect($userEmail))
{

    $isTaken = checkIfExists($user, $userEmail);
    
    if($isTaken)
    {
        generateNew();
    }
    else
    {
        echo false;
    }
}
else
{
    echo false;
}

function generateNew()
{
    global $connection, $user, $userEmail;
    $password = uniqid();
    $encodedPassword = sha1($password);
    $headers = "From: robot@lichat.com";
    $message = "You requested your password to be reseted\r\nYour new password is " . $password . "\r\nHave a good time.";

    $sql = "UPDATE users SET password = '$encodedPassword' WHERE name = '$user' AND email = '$userEmail'";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        mail($userEmail, "Lichat password reset", $message, $headers);
        echo true;
    }
    else
    {
        echo false;
    }
}

function isCorrect($var)
{
    if($var != "" && $var != null && $var != 'undefined' && strlen($var) > 3)
    {
        return true;
    }
    else
    {
        return false;
    }
}