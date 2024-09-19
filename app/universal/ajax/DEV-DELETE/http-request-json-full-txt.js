// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Configure it: GET-request for the URL /api/data
xhr.open('GET', '/api/data', true);

// Send the request over the network
xhr.send();

// This will be called after the response is received
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP response status code
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    // response is the server response
    var response = JSON.parse(xhr.response);

    // Assuming the response is text that you want to insert into the DOM
    var textNode = document.createTextNode(response.text);

    // Assuming you have a container div with the id 'container'
    var container = document.getElementById('container');

    // Append the text to the container
    container.appendChild(textNode);
  }
};

xhr.onerror = function() {
  alert("Request failed");
};