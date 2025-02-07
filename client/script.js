// Get references to the elements
const modeToggle = document.getElementById('mode-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Set default theme to dark mode when the page loads
document.body.classList.add('dark-mode');
modeToggle.checked = true;
moonIcon.style.display = 'block';
sunIcon.style.display = 'none';
localStorage.setItem('theme', 'dark'); // Ensure dark mode is saved

// Switch between dark and light mode
modeToggle.addEventListener('change', () => {
  if (modeToggle.checked) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
    localStorage.setItem('theme', 'light');
  }
});

// Set the year dynamically
const yearSpan = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

function toggleReadMore() {
    const aboutText = document.getElementById('aboutText');
    const readMoreBtn = document.getElementById('readMoreBtn');
  
    if (aboutText.style.webkitLineClamp === '7') {
      aboutText.style.webkitLineClamp = 'unset'; // Expand the text
      readMoreBtn.textContent = 'Read Less';
    } else {
      aboutText.style.webkitLineClamp = '7'; // Collapse the text
      readMoreBtn.textContent = 'Read More';
    }
}

// Typewriter effect
const typewriterText = ["Hey.\nI'm Shreyas!"]; // Include both lines as one entry
const typewriterElement = document.getElementById("typewriter");

let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
  const currentText = typewriterText[0];
  const displayedText = isDeleting
    ? currentText.substring(0, charIndex--)
    : currentText.substring(0, charIndex++);

  typewriterElement.innerHTML = displayedText.replace(/\n/g, "<br>"); // Handle new lines

  if (!isDeleting && charIndex === currentText.length) {
    // Pause before deleting
    setTimeout(() => (isDeleting = true), 1000);
  } else if (isDeleting && charIndex === 0) {
    // Pause before restarting
    isDeleting = false;
    setTimeout(typewriterEffect, 500); // Add a short delay before restarting
    return;
  }

  const typingSpeed = isDeleting ? 100 : 150; // Adjust typing and deleting speeds
  setTimeout(typewriterEffect, typingSpeed);
}

// Start the typewriter effect
typewriterEffect();

// Initialize the map
const map = L.map('map').setView([15.3173, 75.7139], 7); // Centered on Karnataka

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Add a marker to the map
L.marker([15.3173, 75.7139])
  .addTo(map)
  .bindPopup('Karnataka, India') 
  .openPopup();

// Contact form submission with reCAPTCHA
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Get reCAPTCHA token
  const recaptchaResponse = await grecaptcha.execute('your-site-key', { action: 'submit' });

  // Send data to backend
  const response = await fetch('https://name-backend.onrender.com/api/contact', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message, recaptchaResponse })
  });

  const result = await response.json();
  document.getElementById('responseMessage').innerText = result.message;
});
