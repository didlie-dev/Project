function createLocationForm() {

    const form = document.createElement('form');
    form.className = 'location_form';
    form.id = 'location_form';
    form.method = 'GET';
    form.action = '?location';
    form.target = '_self';

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Location (Required)';

    const longLabel = document.createElement('label');
    longLabel.textContent = 'Longitude (N):';
    const longInput = document.createElement('input');
    longInput.type = 'number';
    longInput.id = 'long';
    longInput.name = 'long';

    const latLabel = document.createElement('label');
    latLabel.textContent = 'Latitude (E):';
    const latInput = document.createElement('input');
    latInput.type = 'number';
    latInput.id = 'lat';
    latInput.name = 'lat';

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Change';

    const cancelButton = document.createElement('div');
    cancelButton.id = "cancel_location_change";
    cancelButton.innerHTML = '[X]';

    fieldset.appendChild(legend);
    fieldset.appendChild(latLabel);
    fieldset.appendChild(latInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(longLabel);
    fieldset.appendChild(longInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(submitButton);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(cancelButton);
    form.appendChild(fieldset);
    /***ation on submit */

    return form;
}

function displayLocationCoordinates(){
    let lat = localStorage.getItem("latitude");
    let long = localStorage.getItem("longitude");
    let displayAt = document.getElementById("_3p-header")
    document.getElementById("location_form").style.display = "none";
        let location_div = document.getElementById("location");
        if(location_div){
            var l  = location_div;
        }else{
            var l = document.createElement("div");
            l.id = "location";
            // l.style.zIndex="100";
            l.style.position="absolute";
            l.style.top="3";
            l.style.left="3";
            l.style.backgroundColor = "black";
            l.style.color = "white";
            l.onclick = function(){ 
                document.getElementById("location_form").style.display = "block";
            };
        }
    l.innerHTML = "Node@: "+lat+"N /"+long+"E [EDIT]";
    displayAt.appendChild(l);
}

function locationFormSubmitEvent(form){
    document.getElementById("cancel_location_change").addEventListener('click',(event)=>{
        document.getElementById("location_form").style.display = "none";
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
        let lat = document.getElementById("lat");
        let long = document.getElementById("long");
        localStorage.setItem("latitude",lat.value);
        localStorage.setItem("longitude",long.value);
        console.log('Longitude and Latitude updated.');
        displayLocationCoordinates();
    });
    
}

function geolocationFromServer(){
    if(geolocation.geoplugin_latitude && geolocation.geoplugin_longitude){
        localStorage.setItem("longitude",geolocation.geoplugin_longitude);
        localStorage.setItem("latitude",geolocation.geoplugin_latitude);
        return 1;
    }else{
        return 0;
    }
}