const indexedDBInterface = {
    db: null,
    openDB: function (dbName, version, objectStores) {
        return new Promise((resolve, reject) => {
          const request = indexedDB.open(dbName, version);
          request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            // Create object stores based on the provided objectStores parameter
            objectStores.forEach(store => {
              if (!this.db.objectStoreNames.contains(store.name)) {
                const objectStore = this.db.createObjectStore(store.name, store.options);
                // Create indexes if specified
                if (store.indexes) {
                  store.indexes.forEach(index => {
                    objectStore.createIndex(index.name, index.keyPath, index.options);
                  });
                }
              }
            });
          };
          request.onsuccess = (event) => {
            this.db = event.target.result;
            resolve(this.db);
          };
          request.onerror = (event) => {
            reject(event.target.error);
          };
        });
      },
    getObjectStore: function (storeName, mode) {
      return this.db.transaction(storeName, mode).objectStore(storeName);
    },
    addData: function (storeName, data) {
      return new Promise((resolve, reject) => {
        const store = this.getObjectStore(storeName, 'readwrite');
        const request = store.add(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },
    getData: function (storeName, key) {
      return new Promise((resolve, reject) => {
        const store = this.getObjectStore(storeName, 'readonly');
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },
    updateData: function (storeName, data) {
      return new Promise((resolve, reject) => {
        const store = this.getObjectStore(storeName, 'readwrite');
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },
    deleteData: function (storeName, key) {
      return new Promise((resolve, reject) => {
        const store = this.getObjectStore(storeName, 'readwrite');
        const request = store.delete(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },
    search: function (storeName, query) {
      return new Promise((resolve, reject) => {
        const store = this.getObjectStore(storeName, 'readonly');
        const index = store.index(query.indexName);
        const request = index.get(query.key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    // Additional methods for handling all data types and full search capabilities can be added here
  };
  
  // Usage example:
  const objectStoreConfigurations = [
    {
      name: "user",
      options: { keyPath: "id" },
      indexes: [
        { name: "namespace", keyPath: "namespace", options: { unique: true } },
        { name: "username", keyPath: "username", options: { unique: true } },
        { name: "realName", keyPath: "realName", options: { unique: false } },
        { name: "phoneNumber", keyPath: "phoneNumber", options: { unique: false } },
        { name: "imageNames", keyPath: "imageNames", options: { unique: false, multiEntry: true } }
      ]
    },
    {
      name: "pages",
      options: { keyPath: "id", autoIncrement: true },
      indexes: [
        // Since 'namespace' is an array of UTF8 encoded words, we use 'multiEntry' to index each word separately
        { name: "namespace", keyPath: "namespace", options: { unique: false, multiEntry: true } }
      ]
    }
  ];

  function updateUserObjectWithDynamicFields(userObject, dynamicFields) {
    dynamicFields.forEach(field => {
      const fieldName = field.getAttribute('name');
      const fieldValue = field.value;
      userObject[fieldName] = fieldValue;
    });
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Open the database
    indexedDBInterface.openDB('thisDB', 1, objectStoreConfigurations).then(db => {
      // Get form data for static fields
      const formData = new FormData(event.target);
      const user = {
        id: formData.get('userId'),
        namespace: formData.get('namespace'),
        username: formData.get('username'),
        realName: formData.get('realName'),
        phoneNumber: formData.get('phoneNumber'),
        imageNames: formData.get('imageNames').split(',').map(name => name.trim())
        // ... other static fields ...
      };
      
      // Get dynamic fields and update the user object
      const dynamicFields = document.querySelectorAll('#dynamicFields input');
      updateUserObjectWithDynamicFields(user, dynamicFields);
      
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
  
//   // Usage example prior to event listener for form submit
//
//   indexedDBInterface.openDB('thisDB', 1, objectStoreConfigurations)
//     .then(db => {
//       console.log('Database opened successfully with object stores', db);
//     })
//     .catch(error => {
//       console.error('Error opening database', error);
//     });
  
//   // Usage
//   indexedDBInterface.openDB('thisDB', 1, objectStoreConfigurations)
//     .then(db => {
//       console.log('Database opened successfully with object stores', db);
//     })
//     .catch(error => {
//       console.error('Error opening database', error);
//     });
  
    //decide on the structure:
    //top-level is user, because the user can post to multiple namespaces
    //namespaces must be seperable into each word, where each word is in reversable hash for UTF8 support
    //the user then has options to create fields on each page, with a togle to show each field value, 

    //...issue, when data is deleted, the option field for that user selected data type will still persist,
    //...therefore the user will also have the option to delete the field option in the IndexedDB
    //...this will create a new update and version number for the DB,
    //...the user must be prompted to delete the data contained in the field before allowed to remove the
    //...the index. and perhapse the update should be stopped if data persists that is not in the updated
    //...index, or simply deleted with a warning prompt that requires the user [OK]
    //
    // begin with a profile: 
    // namespace, [3] images, username, real name, phone number, email, location (long/lat)
    // gender, m-status
