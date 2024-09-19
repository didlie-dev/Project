<?php
function isValidSearch(){
    switch ($$_REQUEST["SEARCH"]) {
        case '':
            return false;
            break;
        
        default:
            return true;
            break;
    }
}