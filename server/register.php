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
            $headers = "From: robot@lichat.com";
            $message = "Welcome to lichat!\r\nYour username is '$user'\r\nHave a good time!";
            mail($userEmail, "Lichat registration", $message, $headers);
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