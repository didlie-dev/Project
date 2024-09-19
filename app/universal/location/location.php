<?php

/*********if the service stops, so fvukin what **** */
$locationArray = unserialize(file_get_contents('http://www.geoplugin.net/php.gp'));
//var_export(
                    // https://www.geoplugin.com/webservices/php
// $locationArray = json_decode($locationArray);
$return_string = "return {";
foreach($locationArray as $key => $value){
    $return_string .= "\"".$key."\":\"".addslashes($value)."\",";
}
$return_string .= "\"Thanks\":\"geoplugin . com/webservices/php\"}";
exit($return_string);