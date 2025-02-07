document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('https://name-backend.onrender.com/api/contact');
      const data = await response.json();
  
      if (data.success) {
        const table = document.getElementById('contactTable');
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
        console.error('Error fetching contacts:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  