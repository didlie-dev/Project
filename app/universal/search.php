<?php

$content = file_get_contents("universal/ajax/globalVariableRequest.js");
$content .= file_get_contents("universal/pages/search/load-search.js");
echo $content;
?>