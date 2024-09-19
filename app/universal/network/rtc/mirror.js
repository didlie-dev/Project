/************************************************ */

class Mirror{
    
    constructor(){
        this.reset();
    }

    reset(){
        this.peerId = Peer.newDcId();//only called once
        this.type = "offer";//default offer, if offer found, changed to answer
        this.poll = 1;
        this.pollCount = 0;
        this.response = "";
        this.responseObj = null;
    }

    changeType(){
        this.type = (this.type ==="offer")? "answer" : "offer";
    }

    exit(message){
        throw new Error(message || "Script terminated");
    }

    send(data=""){
                    if(this.poll == 0){
                        console.log("Mirror halted, to allow, run mirror.startPoll()");
                        console.log("To restart network, run window.connectToNetwork()");
                        console.log("In case of network error, run resetNetwork()");
                        return 0;//STOP
                    }
                    var uri = "?"+this.type+"="+this.peerId+"&data="+data;
                    console.log("this uri is: " + uri)
                return fetch(uri,{
                    method: 'GET'
                })
                .then(response => {
                    if (!response.ok) {

                        throw new Error('Network response was not ok ' + response.statusText);

                    }else{
                        this.pollCount++;
                        return response.text(); // Assuming the response is JSON, probably need to remove this
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            
        }


    startPoll(){
        this.poll = 1;
    }

    stopPoll(){
        this.poll = 0;
    }
}