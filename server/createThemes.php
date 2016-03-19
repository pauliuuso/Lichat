<?php
include "connection.php";

function createThemes()
{
    global $connection;
    $sql = "CREATE TABLE IF NOT EXISTS themes (id int(5) NOT NULL AUTO_INCREMENT, owner varchar(150) COLLATE utf8_bin NOT NULL, title varchar(250) COLLATE utf8_bin NOT NULL, description varchar(2000) COLLATE utf8_bin NOT NULL,
    picture varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'img/default_theme.png', date datetime DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin";
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

createThemes();