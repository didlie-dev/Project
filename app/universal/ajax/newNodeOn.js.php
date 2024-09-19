<?php 
/**THIS FILE WILL BE CONDITIONALLY REQUIRED, IN CASE NO PEERDB EXISTS */

require_once("universal/network/database/peeerDatabaseName.php");

if(!$dbn = peerDatabaseName()){
    //this will only be defined on initial instance, where the *.peerdb does not exist
    $peerdb = nodeName();
    $peerdb .= ".peerdb";
    $_SERVER['db'] = 'sqlite:universal/network/database/'.$peerdb;//used in dbCreate && Request
    require_once("universal/network/database/dbCreate.php");
    ?>
    <script>
            window.addEventListener('beforeunload', async () => {
                $peerDBname = $_SERVER['_pdbn_'];
                //send the request to delete the network database.
                fetchtarget = "?close=" + <?php echo $peerdb; ?>
                globalVariableRequest(fetchTarget,named);
            });
    </script>
    <?php
}else{
    //do nothing
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

/**********javascript function below only  exists in the node browser */
 //this function is only loaded to the browser instance if the database *.peerdb does not exist
  //the database is deleted by the node window onbeforeclose event, 
  //and the php code for deletion in in router.php !!!
?>

 
