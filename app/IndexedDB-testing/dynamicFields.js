// Function to handle adding new form fields
function addFormField() {
    const dynamicFieldsContainer = document.getElementById('dynamicFields');
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'dynamicField' + dynamicFieldsContainer.children.length;
    newField.placeholder = 'Enter value';
    dynamicFieldsContainer.appendChild(newField);
  }