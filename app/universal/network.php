<?php
//not in use




// echo(__file__);
$content .= file_get_contents("../app/universal/network/mirror.js");
$content .= file_get_contents("../app/universal/network/Peer.js");
$content = file_get_contents("../app/universal/network/network.js");


echo(JSMin::minify($content));