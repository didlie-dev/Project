<?php

set_error_reporting();

require_once("../interfaces/I_request.php");
require_once("../interfaces/I_registry.php");
require_once("../classes/request.php");
require_once("../classes/regedit.php");
// require_once("../openssl/openssl.php");//what the fvk is this bull shit

$request = new request();//this is a request to this website
$request->write_php_ini();
$request->write_htaccess();//require https, stop url script injection, keep app views on the front page
$request->filter_request();//be selective with request variables, delete _FILES that don't belong

//uncomment to update registry
// regedit::create_registry();

//everything in the root needs to be in the registry, the registry file should not have an extension
regedit::clean_root();

//back to the request
$request->application_root(); // input something for testing
// print_r($_REQUEST);
// die();
$request->start_application();
// print_r($_REQUEST);//TEST
// die();//TEST
$request->exit_application();

//************functions*************//

function set_error_reporting(){
    error_reporting(E_ALL);//comment out after deployment
    ini_set('display_errors', 1);//comment out after deployment
}

 ?>
