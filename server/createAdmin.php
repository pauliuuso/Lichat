<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"));

$user = $data -> username;
$userPassword = $data -> password;
$userEmail = $data -> email;

$isGood = checkForCharacters($user);
$userTableEmpty = checkUserTable();

function createAdmin()
{
    global $connection, $user, $userPassword, $userEmail, $isGood, $userTableEmpty;

    if(isCorrect($user) && isCorrect($userPassword) && isCorrect($userEmail) && $isGood && $userTableEmpty)
    {
        $userPassword = sha1($userPassword);
        $statement = $connection->prepare("INSERT INTO users (name, email, password, level) VALUES ('$user', '$userEmail', '$userPassword', 3)");
        if($statement->execute())
        {
            $headers = "From: robot@lichat.com";
            $message = "Welcome to lichat!\r\nYour admin username is '$user'\r\nHave a good time!";
            mail($userEmail, "Lichat registration", $message, $headers);
            echo true;
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

function checkUserTable()
{
    global $connection;
    
    $sql = "SELECT id FROM users";
    $statement = mysqli_prepare($connection, $sql);
    $statement->execute();
    $statement->store_result();
    if($statement->num_rows() > 0)
    {
        return false;
    }
    else
    {
        return true;
    }
    
}

createAdmin();