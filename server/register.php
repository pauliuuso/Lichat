<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$user = $data -> username;
$userPassword = $data -> password;
$userEmail = $data -> email;

if(isCorrect($user) && isCorrect($userPassword) && isCorrect($userEmail))
{
    $response = "All fields are correct!";
    $isTaken = checkIfExists($user, $userEmail);
    
    if($isTaken)
    {
        $response = "Username is taken.";
    }
    else
    {
        $userPassword = sha1($password);
        $statement = $connection->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $statement->bind_param("sss", $user, $userEmail, $userPassword);
        if($statement->execute())
        {
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
    
echo $response;

?>