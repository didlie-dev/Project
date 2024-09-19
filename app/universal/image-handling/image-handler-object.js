let ImageHandler = {
    resizeImage: function(fileInput, callback) {
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('No file selected!');
            return;
        }

        let file = fileInput.files[0];

        if (!file.type.startsWith('image/')) {
            alert('Selected file is not an image!');
            return;
        }

        let reader = new FileReader();

        reader.onerror = function() {
            alert('Error reading file!');
        };

        reader.onloadend = function() {
            let img = new Image();

            img.onerror = function() {
                alert('Invalid image data!');
            };

            img.onload = function() {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                let MAX_WIDTH = 300;
                let scaleFactor = MAX_WIDTH / img.width;
                let newWidth = MAX_WIDTH;
                let newHeight = img.height * scaleFactor;

                if (newWidth > 32767 || newHeight > 32767 || newWidth * newHeight > 268435456) {
                    alert('Image is too large!');
                    return;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let dataUrl = canvas.toDataURL('image/jpeg');

                callback(dataUrl);
            };

            img.src = reader.result;
        };

        reader.readAsDataURL(file);
    },

    displayImage: function(imageContainer, resizedImageUrl) {
        let img = document.createElement('img');
        img.src = resizedImageUrl;
        imageContainer.appendChild(img);
    },

    sendImageToServer: function(resizedImageUrl) {
        let byteString = atob(resizedImageUrl.split(',')[1]);
        let mimeString = resizedImageUrl.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], {type: mimeString});

        fetch('https://your-server.com/upload', {
            method: 'POST',
            body: blob
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Image uploaded successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
};

// examples of use in single process
// let fileInput = document.querySelector('#fileInput');
// let imageContainer = document.querySelector('#imageContainer'); // Replace with the ID of your image container

// ImageHandler.resizeImage(fileInput, function(resizedImageUrl) {
//     ImageHandler.displayImage(imageContainer, resizedImageUrl);
//     ImageHandler.sendImageToServer(resizedImageUrl);
// });

// examples of use in seperate processes
// Process 1: User selects a file to be resized
let fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', function() {
    ImageHandler.resizeImage(fileInput, function(resizedImageUrl) {
        // Store the resized image URL for later use
        localStorage.setItem('resizedImageUrl', resizedImageUrl);
    });
});

// Process 2: User decides to display the resized image
let displayButton = document.querySelector('#displayButton');
displayButton.addEventListener('click', function() {
    let imageContainer = document.querySelector('#imageContainer');
    let resizedImageUrl = localStorage.getItem('resizedImageUrl');
    if (resizedImageUrl) {
        ImageHandler.displayImage(imageContainer, resizedImageUrl);
    } else {
        console.log('No resized image found!');
    }
});

// Process 3: User decides to send the resized image to the server
let sendButton = document.querySelector('#sendButton');
sendButton.addEventListener('click', function() {
    let resizedImageUrl = localStorage.getItem('resizedImageUrl');
    if (resizedImageUrl) {
        ImageHandler.sendImageToServer(resizedImageUrl);
    } else {
        console.log('No resized image found!');
    }
});

// alternate additional functionality with error handling and cancel method using the dirty word
// let ImageHandler = {
//     // ...same as before...

//     resizeImage: function(fileInput, callback) {
//         try {
//             // ...same as before...
//         } catch (error) {
//             console.error('Error resizing image:', error);
//         }
//     },

//     displayImage: function(imageContainer) {
//         try {
//             // ...same as before...
//         } catch (error) {
//             console.error('Error displaying image:', error);
//         }
//     },

//     sendImageToServer: function() {
//         try {
//             // ...same as before...
//         } catch (error) {
//             console.error('Error sending image to server:', error);
//         }
//     },
// // .............we don't use this method ..............................................
   // // cancel: function() {
  //  //     try {
  //  //         this.reader.abort();
  //  //     } catch (error) {
  //  //         console.error('Error aborting read operation:', error);
  //  //     }
// //    }
// // ...........end of method............................................................
// };

// examples of use
// ...same as before...

//example of object with internal variable storage for the image url
// let ImageHandler = {
//     resizedImageUrl: null, // This is the internal variable where we'll store the resized image URL

//     resizeImage: function(fileInput, callback) {
//         // ...same as before...

//         reader.onloadend = function() {
//             let img = new Image();

//             img.onerror = function() {
//                 alert('Invalid image data!');
//             };

//             img.onload = function() {
//                 // ...same as before...

//                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//                 let dataUrl = canvas.toDataURL('image/jpeg');

//                 // Store the resized image URL in the internal variable
//                 ImageHandler.resizedImageUrl = dataUrl;

//                 callback(dataUrl);
//             };

//             img.src = reader.result;
//         };

//         reader.readAsDataURL(file);
//     },

//     displayImage: function(imageContainer) {
//         if (this.resizedImageUrl) {
//             let img = document.createElement('img');
//             img.src = this.resizedImageUrl;
//             imageContainer.appendChild(img);
//         } else {
//             console.log('No resized image found!');
//         }
//     },

//     sendImageToServer: function() {
//         if (this.resizedImageUrl) {
//             let byteString = atob(this.resizedImageUrl.split(',')[1]);
//             let mimeString = this.resizedImageUrl.split(',')[0].split(':')[1].split(';')[0];
//             let ab = new ArrayBuffer(byteString.length);
//             let ia = new Uint8Array(ab);
//             for (let i = 0; i < byteString.length; i++) {
//                 ia[i] = byteString.charCodeAt(i);
//             }
//             let blob = new Blob([ab], {type: mimeString});

//             fetch('https://your-server.com/upload', {
//                 method: 'POST',
//                 body: blob
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text();
//             })
//             .then(data => {
//                 console.log('Image uploaded successfully:', data);
//             })
//             .catch(error => {
//                 console.error('Error uploading image:', error);
//             });
//         } else {
//             console.log('No resized image found!');
//         }
//     }
// };

// // examples of use
// let fileInput = document.querySelector('#fileInput');
// let imageContainer = document.querySelector('#imageContainer'); // Replace with the ID of your image container

// fileInput.addEventListener('change', function() {
//     ImageHandler.resizeImage(fileInput, function() {
//         // The resized image URL is now stored in ImageHandler.resizedImageUrl
//     });
// });

// // Later...
// ImageHandler.displayImage(imageContainer);
// ImageHandler.sendImageToServer();