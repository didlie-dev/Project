<?php
$functionNames = ['calculateSum', 'generateRandomNumber', 'doSomethingElse'];
header('Content-Type: application/json');
echo json_encode($functionNames);

//useless example demo js to call this server

// // functionLoader.js
// async function loadFunctionNamesFromServer() {
//     try {
//         const response = await fetch('server.php'); // Replace with your server URL
//         if (!response.ok) {
//             throw new Error('Failed to fetch function names from the server');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching function names:', error);
//         return [];
//     }
// }

//with some useless html to load the who thing:
// <!-- index.html -->
// <html>
// <head>
//     <!-- Other meta tags, styles, etc. -->
//     <script src="functionLoader.js"></script>
// </head>
// <body>
//     <script>
//         async function instantiateFunctions() {
//             const functionNames = await loadFunctionNamesFromServer();

//             // Assuming you have function implementations elsewhere
//             const calculateSum = (a, b) => a + b;
//             const generateRandomNumber = () => Math.random();
//             const doSomethingElse = () => console.log('Doing something else!');

//             // Instantiate the functions (you can call them as needed)
//             const sumResult = calculateSum(10, 20);
//             const randomNum = generateRandomNumber();
//             doSomethingElse();

//             // Feel free to use the function names as needed
//             console.log('Available function names:', functionNames);
//         }

//         instantiateFunctions();
//     </script>
// </body>
// </html>
?>

