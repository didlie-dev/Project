<?php

try {
    $DB = new PDO($_SERVER['db']);

    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $DB->exec("CREATE TABLE IF NOT EXISTS mirror (
            id INTEGER PRIMARY KEY,
            offer TEXT UNIQUE,
            answer TEXT UNIQUE,
            offer_sdp TEXT,
            answer_sdp TEXT,
            cTime INTEGER REQUIRED,
            accessCount INTEGER DEFAULT 1
        )");

} catch (PDOeXCEPTION $e) {
    echo $e->getMessage();
    die;
}
$now = time();
try {
    
    $S = $DB->prepare("SELECT * FROM mirror WHERE offer = 'adam'");
    $S->execute();
    $R = $S->fetch(PDO::FETCH_OBJ);

    if(!$R) $DB->exec("INSERT INTO mirror (offer, answer, offer_sdp, answer_sdp, cTime) 
    VALUES ('adam', 'eve', '{genesis_entry}', '{juicy_fruit}', {$now})");


} catch (\Throwable $th) {
    throw $th;
}
// die("EAT ME DRINK ME");