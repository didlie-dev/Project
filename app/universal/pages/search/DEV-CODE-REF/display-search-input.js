    // Function to create and insert the search form
    function createSearchForm() {
        // Get the parent div
        const parentDiv = document.getElementById('parentDiv');

        // Clear the contents of the parent div
        parentDiv.innerHTML = '';

        // Create the form element
        const form = document.createElement('form');

        // Create the text input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'highlight'; // Add the CSS class to highlight the input field
        input.placeholder = 'Search...';

        // Append the input field to the form
        form.appendChild(input);

        // Append the form to the parent div
        parentDiv.appendChild(form);

        // Focus the cursor inside the text input field
        input.focus();
    }

    // Call the function to create and insert the search form
    const parentDiv = document.getElementById('parentDiv');
    parentDiv.addEventListener('click', createSearchForm);