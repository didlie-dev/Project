// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Open the database
    indexedDBInterface.openDB('thisDB', 1, objectStoreConfigurations).then(db => {
      // Get form data
      const formData = new FormData(event.target);
      const user = {
        id: formData.get('userId'),
        namespace: formData.get('namespace'),
        username: formData.get('username'),
        realName: formData.get('realName'),
        phoneNumber: formData.get('phoneNumber'),
        imageNames: formData.get('imageNames').split(',').map(name => name.trim())
      };

        // Handle dynamic fields
        const dynamicFields = document.querySelectorAll('#dynamicFields input');
        dynamicFields.forEach(field => {
        // Add logic to handle each dynamic field
        // For example, add them to the user object or handle them separately
        console.log(field.name + ': ' + field.value);
        });
      
      // Add or update the user object store
      indexedDBInterface.addData('user', user).then(() => {
        console.log('User data saved successfully');
      }).catch(error => {
        console.error('Error saving user data', error);
      });
      
      // Handle 'pages' object store similarly
      // ...
    }).catch(error => {
      console.error('Error opening database', error);
    });
  }
  
  // Add event listener to the form
  document.getElementById('objectStoreForm').addEventListener('submit', handleFormSubmit);