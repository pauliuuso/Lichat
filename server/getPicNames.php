<?php

include "connection.php";

$response = array();

foreach(glob("../pic/*.*") as $filename)
{
    $filename = str_replace("../", "", $filename);
    array_push($response, $filename);
}

header('Content-type: application/json');
echo json_encode($response);

?>