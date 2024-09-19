<?php

/** REQUIRE THE ROUTER BEFORE HEADERS ARE SENT */

require_once("universal/requests/router.php"); 
// die;
/** REQUIRE THE ROUTER BEFORE HEADERS ARE SENT */

?>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        <?php echo file_get_contents("3p.css"); ?>
    </style>
    <script>
        <?php 
        /******modules must be put in the head */
        ?>
    </script>
    <script>
        performance.mark("1");
        


        <?php 
        /***this handles dynamic requirements after page is loaded */
        require_once("universal/require.js"); 
        ?>
    </script>
</head>
<body>
    <div id='_3p-right' class="_3p-right-arrow">&raquo;</div>
    <div id="_3p-left" class="_3p-left-arrow">&laquo;</div>
    <div id="_3p-header">Secure _3p PHP</div>
    <div id="body">
        <div id="_3p-left-body" class="_3p-div">1</div>
        <div id="_3p-center-body" class="_3p-div">2</div>
        <div id="_3p-right-body" class="_3p-div">3</div>
    </div>
    <div id="_3p-footer"></div>
    <script>
    <?php
        global $namespace;
        echo file_get_contents("3p-min.js");
        include_once("../app/universal/search.php");//3p_center

        //PUT THIS SHIT DIRECTLY IN THE OUTPUT
        $content = file_get_contents("../app/universal/network/rtc/mirror.js");
        $content .= file_get_contents("../app/universal/network/rtc/Peer.js");
        $content .= file_get_contents("../app/universal/network/network.js");
        $content .= file_get_contents("../app/universal/location/location.js");
        $content .= file_get_contents("../app/universal/location/geolocation.js");


        //LOOK HERE
        echo(JSMin::minify($content));
    ?>
    </script>
</body>
</html>
