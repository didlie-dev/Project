<?php
/***********REQUIRE******************************** */
require("universal/validations/php/isValidSearch.php");
require("universal/utilities/jsmin.php");//minify output with JSMin::minify(script)
//handle all incoming javascript requests
$GLOBALS['filePaths'] = [
    "languagePatterns" => "universal/requires/languagePatterns.js",
    "makeElementDrag" => "universal/requires/makeElementDrag.js",
    "geolocation" => "universal/location/location.php"
];//REMEMBER THE VALUE OF THE FILE-NAME IN AJAX MUST BE 'true'

if(array_key_exists('chat',$_REQUEST)){

    die;
}

if(!empty($_REQUEST)){
    //check for network request
    //network request consists of "cid" and "type"
    if(isset($_REQUEST['offer']) || isset($_REQUEST['answer'])){
        // die("here you are in router");
        require_once("universal/network/mirror.php");
        exit();
    }
/**here we will check what the request wants and return the values */
    $keys = array_keys($_REQUEST);
    $key = $keys[0];
    $fp = $GLOBALS['filePaths'];
    if(array_key_exists($key,$fp)){
        //send javascript object file contents
        $fileArray = explode(".",$fp[$key]);
        $fileExt = end($fileArray);
        secureJsonResponse();
        switch ($fileExt) {
            case 'js':
                $js = file_get_contents($fp[$key]);
                $min = JSMin::minify($js);
                echo($min);
                die;
                break;
            case 'php':
                require_once($fp[$key]);
                die;
                break;
            default:
                # code...
                break;
        }

    }elseif(array_key_exists("SEARCH",$fp) && isValidSearch()){
        //send the results of the search

        die;
    }else{
        echo("{'no cigar'}");
        die;
    }
}



function secureJsonResponse() {
    // Prevent caching
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');
    header('Expires: 0');

    // Security headers
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('X-Content-Type-Options: nosniff');
    header('Content-Security-Policy: default-src \'self\'; script-src \'self\'');
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    header('Referrer-Policy: no-referrer');
    header('X-Robots-Tag: noindex, nofollow');
}
//     checkJsCodePost();
    // // Ensure the request is an AJAX request
    // if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    //     http_response_code(403);
    //     echo json_encode(['error' => 'Forbidden']);
    //     exit;
    // }

    // Your response data, with data received decoded and in json string

//     foreach($_REQUEST as $key => $value){
// /*** WOW IT FVKN WORKS, LOADING JAVASCRIPT OBJECTS VIA AJAX */
//         $fp = $GLOBALS['filePaths'];
//         if(array_key_exists($key, $fp) && $_REQUEST[$key]=='true'){
//             $fileContents = file_get_contents($fp[$key]);
//             $sendArray[$key] = $fileContents;
//             $jsonString = json_encode($sendArray,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

//             header('Content-Type: application/json');
//             echo $jsonString;

//             die();

//         }
//     }

// }

// function checkJsCodePost() {

//     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//             $data = file_get_contents('php://input');
//             $script = json_decode($data, true);
//             $fp = $GLOBALS['filePaths'];
//         if(array_key_exists($script, $fp) && $_REQUEST[$script]=='true'){
//             $fileContents = file_get_contents($fp[$key]);
//             $sendArray[$key] = $fileContents;
//             // $jsonString = json_encode($sendArray,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
//             $jsonString = json_encode($sendArray);
//             // header('Content-Type: application/json');
//             // console.log($jsonString);
//             echo($jsonString);
//             // echo("{'thisis':'something here'}");
//             die();

//         }else{
//             echo("Your requested script doesn't exist. Check the router.");
//             die;
//         }
//         // return true;
//     } else {
//         return false;
//     }
// }

?>