<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));
$response = "";

$user = $data -> username;
$userPassword = $data -> password;

if(isCorrect($user) && isCorrect($userPassword))
{
    $isCorrect = checkIfCorrect($user, $userPassword);
    
    if($isCorrect)
    {
        $response = "login";
    }
    else
    {
        $response = "Incorrect username or password.";
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