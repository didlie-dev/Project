<?php 
//this  is probably accessable by other peers because of the use of the global $_SERVER variable
//instead of hiding this, it will be used as a method to identify and ban infultrators
$_SERVER['_pdbn_'] = nodeName();


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

?>

window.addEventListener('beforeunload', async () => {
    $peerDBname = $_SERVER['_pdbn_'];
    //send the request to delete the network database.
    fetchtarget = "?close=" + <?php echo $peerDBname; ?>
    globalVariableRequest(fetchTarget,named);

  });
  //this function is only loaded to the browser instance if the database for peer connections does not exist
  //the database is deleted by the node window onbeforeclose event, 
  //and the php code for deletion in in router.php !!!
