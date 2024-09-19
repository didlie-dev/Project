<?php


if($lock = openExclusiveLock()){

    $_SERVER['db'] = 'sqlite:universal/network/database/network.db';//used in dbCreate && Request

    require_once("universal/network/database/dbCreate.php");
    require_once("universal/network/database/connectPeers.php");

    die("{Look at me smile}");

    // $request = new Request();

}

/******THIS REALLY REALLY WORKS */

function openExclusiveLock(){
    $lockFile = 'universal/network/database/lockFile.lock';
    // Open the lock file
    $lock = fopen($lockFile, 'w+');
    if ($lock === false) {
        die('{error: Could not open lock file.}');
    }
    // Wait for an exclusive lock
    while (!flock($lock, LOCK_EX)) {
        // Wait for 100 milliseconds before trying again
        usleep(100000);
    }
    return $lock;
}

function nodeName($lock){
    //this will change on every call
    $fcontains = fread($lock,5);
    fseek($lock, 0);
    $seed = bin2hex(random_bytes(5));
    $str = $seed.$fcontains;
    $str = crc32($str);
    fwrite($lock,$str);
    fflush($lock);
    return $str;
}

function unLock($lock){

}