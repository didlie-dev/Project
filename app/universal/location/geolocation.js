Requires([
  "geolocation"
]);//window.geolocation should now equal an array that includes:
//geoplugin_latitude
//geoplugin_longitude
var echo = console.log;

//option to update available always
/**ADD LOCATION FORM TO LEFT PANE */
_3p.append("left",createLocationForm());
var location_form = document.getElementById("location_form");
locationFormSubmitEvent(location_form);

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latOut = "Latitude: " + position.coords.latitude;
      let longOut = "Longitude: " + position.coords.longitude;
      echo(latOut);
      echo(longOut);
      location_form.append(""+latOut);
      location_form.append("/"+longOut);
      localStorage.setItem("latitude",position.coords.latitude);
      localStorage.setItem("longitude",position.coords.longitude);
      displayLocationCoordinates();
    }, function(error) {
      let c = error.code;
      echo("Error occurred. Error code: " + c);
      switch (c) {
        case 1:
              var long = localStorage.getItem("longitude");
              var lat = localStorage.getItem("latitude");
              if(null == long || null == lat){

                // setTimeout(function(){

                    // _3p.append("left",displayLocationCoordinates());

                    alert('Geolocation access denied. Attempting to bypass...');
                    setTimeout(function(){
                      if(geolocationFromServer()){
                        _3p.append("left",displayLocationCoordinates());
                      }else{
                        location_form.style.display = "block";
                      }
                    },1000);


              }else{
                _3p.append("left",displayLocationCoordinates());
              }

          break;
      
        default:
          break;
      }
      // error.code can be:
      // 0: unknown error
      // 1: permission denied
      // 2: position unavailable (error response from location provider)
      // 3: timed out
    });
  } else {
    echo("Geolocation is not supported by this browser.");
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }