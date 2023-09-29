const loginUser = async (event) => { // Created a loginUser async function to bridge the front end logic with the backend.
    event.preventDefault();
    const username = document.querySelector('#username').value.trim(); // Target the input element with the id username on line 8 of login.handlebars. value.trim() utilized to remove trailing or leading whitespace
    const password = document.querySelector('#password').value.trim();
    if (username && password) {
        const serverResponse = await fetch('/api/users/login', { // Created a variable to call a fetch to the login homeroute with a POST method.
            method: 'POST',
            body: JSON.stringify({ username, password }), // Send the user input to the server as a JSON string.
            headers: { 'Content-Type': 'application/json' }, // Indicates that the request body for the server is in JSON format.
        });
        if (serverResponse.ok) {
            alert('Welcome to Stock Flocker!') // Take the user back to the homepage if the serverResponse variable passes.
        } else {
            alert('There was a problem logging in. Please make sure you are uusing the correct credentials and try again.'); // Display an alert to the user if they enter incorrect login credential compared to what is stored in the database.
        }
    }
};

document.querySelector('.button.is-link').addEventListener('submit', loginUser); // Added an event listener to target the element with the class
