<?php
include "connection.php";

if($connection->connect_error)
{
    echo false;
}
else 
{
    echo true;
}