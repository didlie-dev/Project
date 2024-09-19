// requires([
//     "mirror",
//     "peer",
// ]);

function createDiv(id,color,height){
    let d = document.createElement("div");
    d.id = id;
    d.style.margin = "5px";
    d.style.padding = "5px;"
    d.style.display = "block";
    d.style.width = "100%";
    d.style.height = height;
    // d.style.overflow = "scroll";
    d.style.backgroundColor = color;
    d.style.position = "relative";
    d.style.opacity = "0.8";
    d.innerHTML = "Searching...";
    return d;
}

var topdiv = createDiv("network","black","320px");
var ldiv1 = createDiv("network_status","violet","100px");
var ldiv2 = createDiv("network_console","green","200px");
topdiv.appendChild(ldiv1);
topdiv.appendChild(ldiv2);

_3p.fill("left","");
_3p.append("left",topdiv);

function setOnlineStatus(txt){
    /*******USED IN PEER.JS */
    let d = document.getElementById("network_status");
    d.innerHTML = "";
    d.innerHTML = txt;
}

function updateLeft(stuff){
    let d = document.getElementById("network_console")
    d.innerHTML = stuff;
    _3p.scroll_left();
}

var network_connection_attempts = 0;//count the connection attempts for future notifications or browser reset
var connectToNetwork = function(data=''){
    /*******************CREATE MIRROR FOR SERVER COMMUNICATION */
    if(typeof window.mirror != 'object') window.mirror = createMirror();
    mirror.send(data).then((r)=>{
        console.log("mirror got response::::::::::::::");
        console.log(r);
        if(typeof r == 'string' && r.length > 4){
            try {
                window.mirror.responseObj = JSON.parse(r);
                window.mirror.handleResponse(r);
            } catch (error) {
                console.error(error);
                return 0;
            }
        }
        if(window.mirror.responseObj.answer != null){
            //we need some method to delete the gPeer when it is no longer useful to allow for a new one
            if(typeof window.gPeer != 'object' && window.mirror.type == "offer"){
                if(typeof window.clientCreatedPeers != 'array') window.clientCreatedPeers = [];
                window.clientCreatedPeers[mirror.peerId] = window.mirror.createPeer();
                window.gPeer = window.clientCreatedPeers[window.mirror.peerId];
                window.gPeer.mirror = window.mirror;
                window.gPeer.offer();
                window.gPeer.sdpLoaded = 0;
                window.mirror.pollCount = 0;
                return 0;
            }
            if(typeof window.gPeer == 'object' && window.gPeer.type == "offer" && window.gPeer.sdpLoaded == 0){
                let sdp = mirror.responseObj.answer_sdp;        //answer sdp available
                if(sdp && sdp != null && sdp != ""){
                    window.gPeer.sdpLoaded = 1;
                    window.gPeer.loadAnswer(sdp);
                    window.mirror.pollCount = 0;
                    return 0;
                }
            }
            let sdp = mirror.responseObj.offer_sdp;
            if(sdp && sdp != null && sdp != ""){
                if(typeof window.gPeer != 'object' && window.mirror.type == "answer"){
                    window.gPeer = window.mirror.createPeer();
                    window.gPeer.mirror = window.mirror;
                    window.gPeer.answer(sdp);
                    window.mirror.pollCount = 0;
                    return 0;
                }else if(typeof window.gPeer == 'object' && window.mirror.type == "offer"){
                    if(mirror.pollCount > 10){
                        resetNetwork();
                        connectToNetwork();
                        return 0;
                    }
                }
            }else if(typeof sdp == 'undefined' || sdp == null || sdp == ""){
                if(window.mirror.type == "answer"){
                    if(window.mirror.pollCount > 12){
                        resetNetwork();
                        connectToNetwork();
                        return 0;
                    }
                }
            }
        }
        //no answerer, so keep polling
            setTimeout(window.connectToNetwork, 1000);
    })
    .catch(error => {
        console.error('There was a problem with the network operation:', error);
    });
}

const resetNetwork = function(){
    window.gPeer = undefined;
    window.mirror.reset();
    window.network_connection_attempts += 1;
    console.log("Connection failed due to transient node, or a peer is too slow to connect, ! reset network connection !");
    console.log("To stop the network, run mirror.stopPoll()");
}


function createMirror(){
    m = new Mirror();
    m.handleResponse = function(){
        this.type = (this.responseObj.offer === this.peerId)? "offer" : "answer";
        console.log("this type is: " + this.type);
        updateLeft("<h1>" + this.peerId + "</h1><h2>" + this.type + "</h2>");
    }
    
    m.createPeer = function(){
        let O;
        switch (this.type) {
            case "offer":
                    console.log("creating Offerer gPeer"); 
                    O = new Offerer;
                break;
            
            case "answer":
                    console.log("creating gPeer Answerer");
                    O = new Answerer;
                break;
    
            default:
                break;
        }
        return O;
    }
    return m;
}

window.AllPeers = []
connectToNetwork();




