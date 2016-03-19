<?php
include "connection.php";

function createUsers()
{
    global $connection;
    $sql = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL AUTO_INCREMENT, name varchar(150) COLLATE utf8_bin NOT NULL, email varchar(150) COLLATE utf8_bin NOT NULL, password varchar(150) COLLATE utf8_bin NOT NULL, level int(2) NOT NULL DEFAULT '1',
    picture varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'pic/default.jpg', visited datetime DEFAULT NULL, token varchar(150) COLLATE utf8_bin NOT NULL DEFAULT 'null',
    PRIMARY KEY (id)) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin";
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

createUsers();