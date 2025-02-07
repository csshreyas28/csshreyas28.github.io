const API_URL = 'https://csshreyas-backend.onrender.com';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('username').style.display = 'none';
        document.getElementById('password').style.display = 'none';
        document.querySelector("button").style.display = "none";
        fetchContacts();
    } else {
        alert('Login failed! ' + data.message);
    }
}

async function fetchContacts() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Unauthorized access');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'GET',  // Change to 'GET' method to fetch contacts
            headers: { 'Authorization': `Bearer ${token}` }
        });

        // Log the response status and body for debugging
        const text = await response.text();  // Read the response as text first
        // console.log('Response:', text);

        // Check if the response is okay (status 200)
        if (!response.ok) {
            alert('Error fetching contacts: ' + response.statusText);
            return;
        }

        // Try to parse the response as JSON
        const data = JSON.parse(text);  // Attempt to parse the response as JSON
        if (data.success) {
            const table = document.getElementById('contactTable');
            table.innerHTML = "";
            data.contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                `;
                table.appendChild(row);
            });
        } else {
            alert('Error fetching contacts');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error with the request');
    }
}


function logout() {
    localStorage.removeItem('token');
    location.reload();
}
