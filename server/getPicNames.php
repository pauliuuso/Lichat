<?php
header('Content-type: application/json');
include "connection.php";

$response = array();

foreach(glob("../pic/*.*") as $filename)
{
    $filename = str_replace("../", "", $filename);
    array_push($response, $filename);
}

echo json_encode($response);

?>