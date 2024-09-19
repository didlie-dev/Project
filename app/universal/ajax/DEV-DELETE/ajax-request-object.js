var AjaxRequest = {
    send: function(url, containerId) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          var response = JSON.parse(xhr.response);
          var textNode = document.createTextNode(response.text);
          var container = document.getElementById(containerId);
          container.innerHTML = "";
          container.appendChild(textNode);
        }
      };
      xhr.onerror = function() {
        alert("Request failed");
      };
    }
  }
//   var requestHash = "unique-hash-here";
//   var ajaxTarget = "/file-target-here";
//   AjaxRequest.send(ajaxTarget . '?hash=' . requestHash, 'container');
//some interesting code for getting javascript
//from the server and instantiating the scripts:
//provided by ai;
// objectLoader.js
async function loadObjectsFromServer() {
  try {
      const response = await fetch('server.php'); // Replace with your server URL
      if (!response.ok) {
          throw new Error('Failed to fetch data from the server');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}

//display  something loaded from the server in html:
//provided by ai:
async function displayObjects() {
  const objects = await loadObjectsFromServer();
  const container = document.getElementById('objects-container');

  objects.forEach(obj => {
      const div = document.createElement('div');
      div.textContent = obj.name;
      container.appendChild(div);
  });
}


displayObjects();


// functionLoader.js
async function loadFunctionNamesFromServer() {
  try {
      const response = await fetch('server.php'); // Replace with your server URL
      if (!response.ok) {
          throw new Error('Failed to fetch function names from the server');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching function names:', error);
      return [];
  }
}
//look at this one more time then delete:
//its a function that gets a list 
//of available functions from the server
//then it defines the functions in the page
//independent of the server
//then it runs itself, in the page 
//(prior to calling the server for the list)
//silly:

//this one makes a little more sense:
// functionLoader.js

// Load function names from the server
async function loadFunctionNamesFromServer() {
  try {
      const response = await fetch('server.php'); // Replace with your server URL
      if (!response.ok) {
          throw new Error('Failed to fetch function names from the server');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching function names:', error);
      return [];
  }
}

// Instantiate a function based on its name
function instantiateFunctionByName(functionName) {
  switch (functionName) {
      case 'calculateSum':
          return (a, b) => a + b;
      case 'generateRandomNumber':
          return () => Math.random();
      case 'doSomethingElse':
          return () => console.log('Doing something else!');
      default:
          console.warn(`Function "${functionName}" not found.`);
          return null;
  }
}

// Example usage:
async function main() {
  const functionNames = await loadFunctionNamesFromServer();
  const functionNameToInstantiate = 'calculateSum'; // Change this to the desired function name
  const instantiatedFunction = instantiateFunctionByName(functionNameToInstantiate);

  if (instantiatedFunction) {
      // Call the instantiated function
      const result = instantiatedFunction(10, 20);
      console.log(`Result of ${functionNameToInstantiate}:`, result);
  }
}

main();
//here is an even better example, where the function
//instantiated is async
async function main() {
  const functionNames = await loadFunctionNamesFromServer();
  const functionNameToInstantiate = 'calculateSum'; // Change this to the desired function name
  const instantiatedFunction = instantiateFunctionByName(functionNameToInstantiate);

  if (instantiatedFunction) {
      // Call the instantiated function asynchronously
      try {
          const result = await instantiatedFunction(10, 20);
          console.log(`Result of ${functionNameToInstantiate}:`, result);
      } catch (error) {
          console.error(`Error executing ${functionNameToInstantiate}:`, error);
      }
  }
}

main();
