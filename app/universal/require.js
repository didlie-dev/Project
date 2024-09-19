/***checks all javascript dependencies when neccessary */
/***should load the javascript file required when the  */
/***dependency function is not defined. ************** */

//HAH HAHHA HHA HA HA ///

/** REQUIRES globalVariableRequest */

/****the files required must be referenced in router.php for security reasons */

const Requires = function(namesArray){
    const fetchTarget = window.location.origin + window.location.pathname;
    console.log("here is the fetch target:" + fetchTarget);
    var getThis = "";
    namesArray.forEach(name => {
        if (window[name] == undefined || window[name]=='') {
            console.log(name + ' is an undefined dependency');
                getThis = fetchTarget + "?" + name + "=true";
                console.log("Attempting to get this request: " + getThis);
                globalVariableRequest(getThis,name);
        }
    });
}
