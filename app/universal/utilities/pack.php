<?php
/********* Jacobs, Isaac, Krishna, Deilson ** all rights reserved **********/
/***************************************************************************/
/***************************************************************************/

class pack
{
    //public static $hexRange = "^[0-9a-fA-F]+$";

  public static function decode($string){
    return zlib_decode(hex2bin($string));
  }

  public static function encode($string){
    return bin2hex(zlib_encode($string, ZLIB_ENCODING_RAW));
  }

    // public static function isHexSafe($string){
    //     $i=0;
    //     while(isset($string[$i])){
    //         if(!preg_match(self::$hexRange,$string[$i])) return false;
    //         $i++;
    //     }
    //     return true;
    // }

    public static function encodeMultiWordString($string){
        $string = explode(" ",$string);
        $i=0;
        do{
            $string[$i] = trim($string[$i]);
            if($string[$i] !== "") $string[$i] = self::encode($string[$i]);
            $i++;
        }while(isset($string[$i]));
        return implode(" ",$string);
    }

    public static function decodeMultiwordString($string){
        $string = explode(" ",$string);
        $i=0;
        do{
            $string[$i] = trim($string[$i]);
            if($string[$i] !== "") $string[$i] = addslashes(self::decode($string[$i]));
            $i++;
        }while(isset($string[$i]));
        return implode(" ",$string);
    }

}
