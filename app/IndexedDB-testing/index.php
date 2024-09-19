<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IndexedDB Object Store Configuration Form</title>
</head>
<body>
<form id="objectStoreForm">
  <h2>User Configuration</h2>
  <label for="userId">User ID:</label>
  <input type="text" id="userId" name="userId"><br><br>

  <label for="namespace">Namespace:</label>
  <input type="text" id="namespace" name="namespace"><br><br>

  <label for="username">Username:</label>
  <input type="text" id="username" name="username"><br><br>

  <label for="realName">Real Name:</label>
  <input type="text" id="realName" name="realName"><br><br>

  <label for="phoneNumber">Phone Number:</label>
  <input type="tel" id="phoneNumber" name="phoneNumber"><br><br>

  <label for="imageNames">Image Names:</label>
  <input type="text" id="imageNames" name="imageNames" placeholder="Comma-separated list"><br><br>

  <h2>Pages Configuration</h2>
  <label for="pageId">Page ID:</label>
  <input type="text" id="pageId" name="pageId" disabled placeholder="Auto-incremented"><br><br>

  <!-- <label for="pageNamespace">Page Namespace:</label>
  <input type="text" id="pageNamespace" name="pageNamespace" placeholder="Comma-separated list"><br><br> -->

  <div id="dynamicFields"></div>
  <button type="button" id="addButton">+</button>
  
  <input type="submit" value="Submit">
</form>
<script>
    //javascript to add dynamic fields
    function addFormField() {
    const dynamicFieldsContainer = document.getElementById('dynamicFields');
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'dynamicField' + dynamicFieldsContainer.children.length;
    newField.placeholder = 'Enter value';
    dynamicFieldsContainer.appendChild(newField);
  }
  document.getElementById('addButton').addEventListener('onKeyUp', addFormField);
    //javascript for the object goes here
// JavaScript to handle form submission and interaction with IndexedDB will go here
</script>
</body>
</html>
