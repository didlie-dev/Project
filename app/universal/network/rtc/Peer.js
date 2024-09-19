////////////////////////////////////////////////////
//************************************************//
//******** This file is not free software ********//
//************************************************//
//********** (c) property of didlie.com **********//
////////////////////////////////////////////////////
class Peer{
    constructor(type,cfg,con){
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
        window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
        if(!RTCPeerConnection){
            console.log("this browser is not supported");
            alert("'WebRTC' must be enabled in your browser to use this application.")
            return(0);
        }
        var stunarray = ['stun:stun3.l.google.com:19302' ,
            'stun:stun1.l.google.com:19302' ,
            'stun:stun4.l.google.com:19302' ,
            'stun:stun.l.google.com:19302' ,
            'stun:stun2.l.google.com:19302'
            ];
        if(type=='offer'){
                cfg = (cfg)? cfg : {'iceServers': [{'urls': [stunarray[1],stunarray[3]] }] };
            }else if(type=='answer'){
                cfg = (cfg)? cfg : {'iceServers': [{'urls': [stunarray[1],stunarray[3]] }] };
        };
        // cfg = (cfg)? cfg : {'iceServers': [{'urls': [stunarray[2],stunarray[4]] }] };
        con = (con)? con: { 'optional': [{'DtlsSrtpKeyAgreement': true}] },{"iceCandidatePoolSize" : new Int16Array(4)};
        this.pc = new RTCPeerConnection(cfg,con);
        this.peerId;//set from mirror
        this.name;
        this.peerId2;
        this.pc.oniceconnectionstatechange = () => {
            if(this.iceConnectionState === "connected") resolve(setOnlineStatus("Connected"));
            if(this.iceConnectionState === "new") resolve(setOnlineStatus("New"));
            if(this.iceConnectionState === "connecting") resolve(setOnlineStatus("Connecting..."));
            if(this.iceConnectionState === "disconnected") resolve(setOnlineStatus("Disconnected"));
            if(this.iceConnectionState === "closed") resolve(setOnlineStatus("Closed"));
            if(this.iceConnectionState === "failed") resolve(setOnlineStatus("Failed"));

        }
    };
    static encrypt(p){
        return btoa(p);
    };
    static decrypt(p){
        return atob(p);
    };
    setPeerId(pid){
        this.peerId = pid;
    }
    setPeerId2(pid){
        this.PeerId2 = pid;
    }
    static newDcId(){
        var u = Math.random().toString(36);
        return u.substring((u.length-10),u.length);//now used in mirror
    };
};

/************************************************ */
/******************OFFERER*********************** */
/************************************************ */

class Offerer extends Peer{
    constructor(){
        super('offer');//must call super constructor
        this.type = 'offer';
        this.connected = false;
        this.doOffer = 1;
        const is = this;//HA HA HA HA
        // (console.log("this is the 'this' in Offerer, where gPeer.offer = new Offerer as is : " + is));
    };
    offer(){
        const is = this;
        return  new Promise((resolve, reject) => {
            this.pc.createDataChannel("didlie.com");
            this.pc.createOffer({iceRestart:true,voiceActivityDetection:false})
                .then((desc) => this.pc.setLocalDescription(desc))
                .catch((err) => console.error(err));
            this.pc.onicecandidate = function(e){
                setOnlineStatus("Gathering candidates for network negotiation...");
                if(e == null || e.candidate === null){
                    resolve(window.connectToNetwork(Offerer.sendLocalDescription(is.pc.localDescription)));
                }
            };
            var dcId = Peer.newDcId();
            this.dataChannel = this.pc.createDataChannel(dcId);
            this.dataChannel.onopen = () => {
/*********************PUT THE PEER CONNECTION WITH DATACHANNEL IN AN ARRAY AND CLEAN UP */

                this.connected = true;
                // var x = window.mirror.peerId;
                var x = this.dataChannel.label;
                setOnlineStatus("A data channel was successfully added.");
                AllPeers[x] = is;
                window.gPeer = undefined;
                window.mirror = undefined;
                AllPeers[x].dataChannel.send("! Answerer says : we are now connected !")
                AllPeers[x].dataChannel.send("message from Answerer with mirror.peerId = " + this.mirror.peerId);
                // setTimeout(connectToNetwork, 1000);
            };
            //has dataChannel function: send()
            this.dataChannel.onmessage = (e) => {
              messageFunctions.onmessage(e);
              setOnlineStatus("Connected:<br>Data received...");

            }
            this.dataChannel.onclose = (e) => {
                setOnlineStatus("Connection:" + e.label + " is closed.");
              }
        });
    };

    loadAnswer(answer){
        // answer = this.decrypt(answer);
        setOnlineStatus("Received agreement to connect from another node...");
        var thisObj = this;
        return new Promise((resolve,reject) => {
            setOnlineStatus("Loading agreement to connect...");
            let oa = {};
            oa.sdp = Peer.decrypt(answer);
            oa.type = "answer";
            var dsc = new RTCSessionDescription(oa);
            this.pc.setRemoteDescription(dsc)
            .then((e) => {
                /////////////////////////////////////
                // console.log("e from setRemoteDescription",e);//shows the window object
                setTimeout(function(){
                    setOnlineStatus("Validating network connection...");
                    if(thisObj.connected){
                        setOnlineStatus("Connected Successfully !");
                        resolve(true);
                    }else{
                        setOnlineStatus("ERROR: failed to connect to network.");
                        resolve(false);
                    }
                },12000);
            }).catch((e) => console.log(e));//reject
        });
    };

    static sendLocalDescription(e){
        setOnlineStatus("Sending your credentials to the network...");
        // console.log(e);console.log(e.sdp);
        var crypted = Peer.encrypt(e.sdp);//e.candidate
        var column = "offer_sdp";//to match the database column key
        var str = "{\""+column+"\":\"" + crypted + "\"}"
        return str;
    }
};



/************************************************ */
/******************ANSWERER********************** */
/************************************************ */


class Answerer extends Peer{
    constructor(){
        super('answer');
        this.type = 'answer';
        this.connected = false;
    };
    answer(offer){
        const is = this;
        // offer = this.decrypt(offer);
        //update from single peerId added ondatachannel, to peers[] added on instantiation
        return  new Promise((resolve, reject) => {
            // this.offer = (offer)? offer : this.offer;//not in use??
            // if(!this.offer) { console.log("ERR: Answerer invoked without offer"); return false; };
            var newOffer = {};
            newOffer.type = "offer";
            newOffer.sdp = Peer.decrypt(offer);//this better be the sdp
            /////////////////////////////////
            this.pc.setRemoteDescription(new RTCSessionDescription(newOffer));
            this.pc.onicecandidate = (e) => {
                if(e.candidate === null){
                    //condition, just in case this is the source of an error
                    if(typeof window.mirror != 'undefined')
                    resolve(window.mirror.send(Answerer.sendLocalDescription(is.pc.localDescription)));
                }
            };
            this.pc.createAnswer({iceRestart:true,voiceActivityDetection:false})
              .then((ad)=> this.pc.setLocalDescription(ad))
              .catch((err) => console.warn("Couldn't create answer"));

            this.pc.ondatachannel = (e) => {
                setOnlineStatus("Data channel created...");
              this.dataChannel = e.channel;
              var count = 0;
              this.dataChannel.onopen = () => {
/*********************PUT THE PEER CONNECTION WITH DATACHANNEL IN AN ARRAY AND CLEAN UP */
//this hits twice
                if(count == 1) return;
                count +=1;
                this.connected = true;
                // var x = window.mirror.peerId;
                var x = this.dataChannel.label;
                // console.log("x = " + x)
                window.AllPeers[x] = is;
                window.gPeer = undefined;
                window.mirror = undefined;
                window.AllPeers[x].mirror = undefined;
                window.AllPeers[x].dataChannel.send("! Alive !")
                // window.AllPeers[x].dataChannel.send("message from Answerer with mirror.peerId = " + x);

              }
              this.dataChannel.onmessage = (e) => {
                messageFunctions.onmessage(e);
                setOnlineStatus("Connected:<br>Data received...");
              }
              this.dataChannel.onclose = (e) => {
                console.log(e);
                setOnlineStatus("Connection: " + e.label + " is closed.");
              }
            }
        });
    };
    static sendLocalDescription(e){
        setOnlineStatus("Sending your agreement to connect to the network...");
        // console.log(e);console.log(e.sdp);
        var crypted = Peer.encrypt(e.sdp);//e.candidate
        var column = "answer_sdp";//to match the database column key
        var str = "{\""+column+"\":\"" + crypted + "\"}"
        return str;
    }
}


/*********************Communications Functions : Raw */

var messageFunctions = {
    send2peers: function(dataString='NO DATA, send2Peers invoked without argument'){
        for (const [key, value] of Object.entries(AllPeers)) {
            messageFunctions.channelSend(key,dataString);
          }
    },
    channelSend: function(dataChannelLabel,str){
        let send = {
            channel : dataChannelLabel,
            data : str
        };
        let j = JSON.stringify(send);
        AllPeers[dataChannelLabel].dataChannel.send(j);
    },
    onmessage: function(e){
        label = e.currentTarget.label;
        let msg;
        let msgObj;
        ///wierd
        try {
            msgObj = JSON.parse(e.data);
            msg = msgObj.data;
        } catch (error) {
            msg = e.data;
        }


        _3p.fill("right", label+":"+msg);



        if(msg =='ping'){
            messageFunctions.channelSend(label,"pong");
            setTimeout(function(){ messageFunctions.channelSend(label,"ping")}, 2000);
            // setOnlineStatus("Ping received.<br>Pong sent.");
            return;
        }
        if(msg == "pong"){
            // setOnlineStatus("Pong received.<br>Sending ping...");
        }

        // console.log(e);
    },
    validJSON : function(str){
            try {
                var obj = JSON.parse(str);
                return obj;
            } catch (error) {
                return -1;
            }
    }
}
