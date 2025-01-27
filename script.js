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
    updateGameColors('dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
    localStorage.setItem('theme', 'light');
    updateGameColors('light');
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

// Snake Game Code
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

let score = 0;
let d;
let game;
let isPaused = false;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

function collision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  if (isPaused) return;

  ctx.fillStyle = document.body.classList.contains('dark-mode') ? "#000" : "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

function startGame() {
  game = setInterval(draw, 100);
}

document.getElementById("pauseBtn").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("pauseBtn").textContent = isPaused ? "Resume" : "Pause";
});

document.getElementById("restartBtn").addEventListener("click", () => {
  clearInterval(game);
  snake = [{ x: 9 * box, y: 10 * box }];
  score = 0;
  d = null;
  isPaused = false;
  document.getElementById("pauseBtn").textContent = "Pause";
  startGame();
});

function updateGameColors(theme) {
  if (theme === 'dark') {
    ctx.fillStyle = "#000";
  } else {
    ctx.fillStyle = "#fff";
  }
}

startGame();
