<?php
include "connection.php";


function createMessages()
{
    global $connection;
    $sql = "CREATE TABLE IF NOT EXISTS messages(id int(5) NOT NULL AUTO_INCREMENT, theme int(5) NOT NULL, owner varchar(150) COLLATE utf8_bin DEFAULT NULL,
    message varchar(5000) COLLATE utf8_bin NOT NULL, date datetime DEFAULT NULL, PRIMARY KEY (id)) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin";
    $statement = mysqli_prepare($connection, $sql);
    if($statement->execute())
    {
        echo true;
    }
    else
    {
        echo false;
    } 
}

createMessages();