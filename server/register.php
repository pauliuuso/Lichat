<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$user = $data -> username;
$userPassword = $data -> password;
$userEmail = $data -> email;

$isGood = checkForCharacters($user);

if(isCorrect($user) && isCorrect($userPassword) && isCorrect($userEmail) && $isGood)
{
    $response = "All fields are correct!";
    $isTaken = checkIfExists($user, $userEmail);
    
    if($isTaken)
    {
        $response = "Username is taken.";
    }
    else
    {
        $userPassword = sha1($userPassword);
        $statement = $connection->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $statement->bind_param("sss", $user, $userEmail, $userPassword);
        if($statement->execute())
        {
            $subject = "Lichat registration successful!";
            $headers = "From: robot@lichat.com\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n";
            $message = "<p>Welcome to lichat!</p><p>Your username is <b>$user</b></p><p>Have a good time!</p>";
            mail($userEmail, $subject, $message, $headers);
            $response = "created";
        }
        else
        {
            $response = "Failed to create new user.";
        }
    }
}
else
{
    $response = "Incorrect username or password.";
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

function checkForCharacters($user)
{
    if (preg_match("/[^A-Za-z0-9\_]/", $user))
    {
        return false;
    }
    else if(strlen($user) > 15)
    {
        return false;
    }
    else
    {
        return true;
    }
}
    
echo $response;