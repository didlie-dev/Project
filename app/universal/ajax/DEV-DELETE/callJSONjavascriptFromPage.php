<!-- server.php -->
<?php
// Prepare some data (you can fetch this from a database or any other source)
$data = [
    'name' => 'John Doe',
    'age' => 30,
    'email' => 'john@example.com',
    'thisFunction' => function ($a, $b) {
        return $a + $b;
    },
];

// Encode the data as JSON
$jsonData = json_encode($data);
?>

<!-- now the html and page javascript -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Object Example</title>
</head>
<body>
    <p>Hello, my name is <span id="name"></span>.</p>
    <button id="fetchButton">Fetch Data</button>

    <script>
        // Function to fetch the JSON data
        async function fetchData() {
            try {
                const response = await fetch('server.php'); // Replace with your server URL
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server');
                }
                const serverData = await response.json();
                console.log('Server data:', serverData);

                // Now you can use serverData properties and functions
                const nameElement = document.getElementById('name');
                nameElement.textContent = serverData.name;

                // Call the function
                const result = serverData.thisFunction(10, 20);
                console.log('Result of thisFunction:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Attach the fetchData function to the button click event
        const fetchButton = document.getElementById('fetchButton');
        fetchButton.addEventListener('click', fetchData);
    </script>
</body>
</html>