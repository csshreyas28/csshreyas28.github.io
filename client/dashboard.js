const API_URL = 'https://name-backend.onrender.com';

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
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
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
    }
}

function logout() {
    localStorage.removeItem('token');
    location.reload();
}
