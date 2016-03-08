<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"));

$token = $data->token;
$user = $data->user;

if(checkToken($token, $user))
{
    echo "okay";
}
else 
{
    echo $token;
}