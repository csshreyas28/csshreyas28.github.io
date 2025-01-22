// Get references to the elements
const modeToggle = document.getElementById('mode-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Check the current mode and set accordingly
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  modeToggle.checked = true;
  moonIcon.style.display = 'block';
  sunIcon.style.display = 'none';
} else {
  document.body.classList.add('light-mode');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
}

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
