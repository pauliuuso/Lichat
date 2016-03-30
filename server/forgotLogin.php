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
    $sql = "UPDATE users SET password = '$encodedPassword' WHERE name = '$user' AND email = '$userEmail'";
    $statement = mysqli_prepare($connection, $sql);
    
    if($statement->execute())
    {
        $subject = "Lichat password reset";
        $headers = "From: robot@lichat.com\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n";
        $message = "<p>You requested your password to be reseted</p><p>Your username is <b>" . $user . "</b> and your new password is <b>" . $password . "</b></p><p>Have a good time.</p>";
        mail($userEmail, $subject, $message, $headers);
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