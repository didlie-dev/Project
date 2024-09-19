/*****DEFINE GLOBAL VARIABLES THAT CAN BE FETCHED */

/******for search: called like this:          ***********  */
/**globalVariableRequest(fetchTarget, postText, 'SEARCH');**/
/**  *******************************************************/
function globalVariableRequest(fetchTarget,name='SEARCH'){
    /***ALL INCLUDE SCRIPTS NOW MUST NOT BE PRE-WRAPPED */
    const wrap = function(x){
        return "(function() { " + x + " })();";
    }
        fetch(fetchTarget,{
                    method: 'GET'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }else{
                        return response.text(); // Assuming the response is JSON
        
                    }
                })
                .then(data =>{
                    // console.log("you are here 18 in fetch");
                    console.log("loading " + fetchTarget + " to eval()");
                    evalData = wrap(data);
                    window[name]=eval(evalData);
                    // console.log('request object ${name} Success!');
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
};

