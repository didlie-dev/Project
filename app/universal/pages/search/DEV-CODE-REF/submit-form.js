function submitForm() {
    // Get the editable div content
    const editableDiv = document.querySelector('.editable-div');
    const content = editableDiv.innerText;

    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/submit'; // Replace with your form action URL

    // Create a hidden input field to hold the content
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'content';
    hiddenInput.value = content;

    // Append the hidden input to the form
    form.appendChild(hiddenInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
}

//ajax

    // Function to submit the form using fetch
    function submitForm() {
        // Get the editable div content
        const editableDiv = document.querySelector('.editable-div');
        const content = editableDiv.innerText;

        // Send the content using fetch
        fetch('/submit', { // Replace with your form action URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: content })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Form submitted successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Form submission failed!');
        });
    }

    ///now submit the form using fetch to a node server
        // Function to submit the form using fetch
      // Send the form data using fetch
      fetch('http://yourdomain.com:9999/your-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(data => {
        console.log('Success:', data);
        // Handle the response data here
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});