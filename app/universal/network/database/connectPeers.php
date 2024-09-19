<?php

// die("you made it");
            // id INTEGER PRIMARY KEY,
            // offer TEXT UNIQUE,
            // answer TEXT,
            // offer_sdp TEXT,
            // answer_sdp TEXT,
            // cTime INTEGER REQUIRED,
            // accessCount INTEGER DEFAULT 1
// exit("{offer}");exit("{type:'offer'}")
//$DB should exist here
//it may be possible here to add ice candidates one by one
$accessTimeLimit = 10;

$now = time();

$requestString = json_encode($_REQUEST);//not in use

$requestObj = json_decode($requestString);

// die(json_encode($requestObj));


if(property_exists($requestObj,"offer") && $requestObj->offer != ""){

    $peerId = $requestObj->offer;

    $row = getRowWithId($DB, "offer",$peerId);

    if($row && $row['answer'] && $row['answer'] != ""){

            if(property_exists($requestObj,"data") && $requestObj->data != ""){

                $updatedRow = addDataToRow($DB, "offer",$row['id'], $requestObj->data);

                exit(json_encode($updatedRow));

            }else{
                //no new data to put, but new data might exist, so return the whole row
                // if($row->answer_sdp != "" && $row->answer_sdp != null)
                //         deleteRowWithPeer($DB,"offer", $requestObj->offer);
                
                exit(json_encode($row));

            }
    }else{
        //either no this-client record as offer, or no answer, or answer empty
        $otherOffer = findNewestOffer($DB,$peerId);

        if($otherOffer && $otherOffer['answer'] == null){

            deleteRowWithPeer($DB, "offer",$peerId);//if any

            $updatedOffer = addAnswerId($DB, $otherOffer['id'], $peerId);

            exit(json_encode($updatedOffer));//all future requests from this client will be as 'answer'=pid

        }elseif(!$row){

            $updatedObj = writeNewOffer($DB, $requestObj);

            exit(json_encode($updatedObj));

        }
    }

    if($row){
        exit(json_encode($row));
    }

}elseif(property_exists($requestObj,"answer") && $requestObj->answer != ""){

    $peerId = $requestObj->answer;

    //this peer is dedicated to a particular offer

    $row = getRowWithId($DB,"answer",$peerId);

    if(property_exists($requestObj,"data") && $requestObj->data != ""){

        $rowWithAnswer = addDataToRow($DB, "answer", $row['id'], $requestObj->data);

        exit(json_encode($rowWithAnswer));


    }else{

        exit(json_encode($row));
    }


}else{

    die("{'ERROR':'request-sent-without-offer-or-answer'}");

}

die("you should never get this far");

//database is DB


function getRowWithId($db, $id_type, $id){
    //id_type can be id, offer, answer
    $Q = "SELECT * FROM mirror WHERE {$id_type} = :Id";
    $S = $db->prepare($Q);
    $S->bindParam(':Id',$id);
    $S->execute();
    $R = $S->fetch(PDO::FETCH_ASSOC);
    if($R){
        $i = $R['id'];
        $db->exec("UPDATE mirror SET accessCount = accessCount + 1 WHERE id={$i}");
    }
    return $R;
}


function findNewestOffer($db, $peerId){
    //first delete expired listings
    deleteExpired($db);
    $Q = "SELECT * FROM mirror WHERE (answer) IS (NULL) AND offer <> :peerId ORDER BY id DESC";
    $S = $db->prepare($Q);
    $S->bindParam(":peerId", $peerId);
    $S->execute();
    return $S->fetch(PDO::FETCH_ASSOC);
}

function deleteRowWithPeer($db, $id_type, $id){
    $Q = "DELETE FROM mirror WHERE :id_type = :id";
    $S = $db->prepare($Q);
    $S->bindParam(":id_type",$id_type);
    $S->bindParam(":id",$id);
    return $S->execute();
}

function deleteExpired($db){
    $now = time();
    $maxAgeInSecods = 120;
    $ex = $now - $maxAgeInSecods;
    $Q = "DELETE FROM mirror WHERE cTime < ".$ex." AND id <> 1";
    $db->exec($Q);
}

function addAnswerId($db, $row_id, $peer_id){
    $now = time();
    $type = 'answer';
    $Q = "UPDATE mirror SET {$type} = :pid, cTime = {$now} WHERE id = ".$row_id;
    $S = $db->prepare($Q);
    $S->bindParam(":pid", $peer_id);
    $S->execute();
    
    $Q = "SELECT * FROM mirror WHERE id = ".$row_id." ORDER BY id DESC";
    $S = $db->prepare($Q);
    $S->execute();
    return $S->fetch(PDO::FETCH_ASSOC);
}

function writeNewOffer($db, $requestObj){
    $now = time();
    $Q = "INSERT INTO mirror (offer,cTime) VALUES (:pid,:cTime)";
    $S = $db->prepare($Q);
    $S->bindParam(":pid", $requestObj->offer);
    $S->bindParam(":cTime", $now);
    $S->execute();
    
    $Q = "SELECT * FROM mirror WHERE offer = :pid ORDER BY id DESC";
    $S = $db->prepare($Q);
    $S->bindParam(":pid", $requestObj->offer);
    $S->execute();
    return $S->fetch(PDO::FETCH_ASSOC);
}

//this function wants the javascript client to assign the values to the data
function addDataToRow($db, $id_type, $row_id, $data){
    $now = time();
    $dataObj = json_decode($data);
    $rowArray = getRowWithId($db, "id", $row_id);
    $sqlStr = "UPDATE mirror SET ";

    foreach($rowArray as $key => $value){
        if(property_exists($dataObj, $key))
         $sqlStr .= $key." = :".$key.", ";
    }

    $sqlStr .= "cTime = ".$now.", accessCount = accessCount + 1 WHERE id = ".$row_id;
    // die($sqlStr);///testing to see sql statement
    $S = $db->prepare($sqlStr);

    foreach($rowArray as $key => $value){
        if(property_exists($dataObj, $key)){
                            $keyTxt = ":".$key;
                            $S->bindParam($keyTxt,$dataObj->$key);
        }
    }

    $S->execute();

    return getRowWithId($db, 'id', $row_id);

}