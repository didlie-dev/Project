function resizeImage(fileInput, callback) {
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
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleFactor;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let dataUrl = canvas.toDataURL('image/jpeg');

            callback(dataUrl);
        };

        img.src = reader.result;
    };

    reader.readAsDataURL(file);
}

// now function to send the image
function sendImageToServer(resizedImageUrl) {
    // Convert data URL to blob
    let byteString = atob(resizedImageUrl.split(',')[1]);
    let mimeString = resizedImageUrl.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: mimeString});

    // Send blob to server
    fetch('https://your-server.com/upload', { // Replace with your server URL
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

// now examples of both functions in use
// this collection of functions will be condensed into
// one object
//////////////////////
let fileInput = document.querySelector('#fileInput');
let imageContainer = document.querySelector('#imageContainer'); // Replace with the ID of your image container

// resizeImage(fileInput, function(resizedImageUrl) {
//     let img = document.createElement('img');
//     img.src = resizedImageUrl;
//     imageContainer.appendChild(img);
// });

// sendImageToServer(resizedImageUrl);

