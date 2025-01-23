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
