document.addEventListener("DOMContentLoaded", () => {
  // Get references to the elements
  const modeToggle = document.getElementById("mode-toggle");
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");

  if (modeToggle && moonIcon && sunIcon) {
    // Set default theme to dark mode when the page loads
    document.body.classList.add("dark-mode");
    modeToggle.checked = true;
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    localStorage.setItem("theme", "dark");

    // Switch between dark and light mode
    modeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", modeToggle.checked);
      document.body.classList.toggle("light-mode", !modeToggle.checked);
      moonIcon.style.display = modeToggle.checked ? "block" : "none";
      sunIcon.style.display = modeToggle.checked ? "none" : "block";
      localStorage.setItem("theme", modeToggle.checked ? "dark" : "light");
    });
  }

  // Set the year dynamically
  const yearSpan = document.querySelector(".year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Toggle Read More functionality
  const readMoreBtn = document.getElementById("readMoreBtn");
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      const aboutText = document.getElementById("aboutText");
      if (aboutText) {
        const expanded = aboutText.style.webkitLineClamp !== "7";
        aboutText.style.webkitLineClamp = expanded ? "7" : "unset";
        readMoreBtn.textContent = expanded ? "Read More" : "Read Less";
      }
    });
  }

  // Typewriter effect
  const typewriterText = ["Hey.\nI'm Shreyas!"];
  const typewriterElement = document.getElementById("typewriter");

  let charIndex = 0;
  let isDeleting = false;

  function typewriterEffect() {
    if (!typewriterElement) return;

    const currentText = typewriterText[0];
    const displayedText = isDeleting
      ? currentText.substring(0, charIndex--)
      : currentText.substring(0, charIndex++);

    typewriterElement.innerHTML = displayedText.replace(/\n/g, "<br>");

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      setTimeout(typewriterEffect, 500);
      return;
    }

    setTimeout(typewriterEffect, isDeleting ? 100 : 150);
  }

  typewriterEffect();

  // Initialize the map
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([15.3173, 75.7139], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([15.3173, 75.7139])
      .addTo(map)
      .bindPopup("Karnataka, India")
      .openPopup();
  }

  // Contact form submission with reCAPTCHA
 const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();
      const responseMessage = document.getElementById("responseMessage");
      const submitButton = contactForm.querySelector("button[type='submit']");

      if (!name || !email || !message) {
        responseMessage.innerText = "⚠️ All fields are required!";
        responseMessage.style.color = "red";
        return;
      }

      // Disable button to prevent multiple submissions
      submitButton.disabled = true;
      submitButton.innerText = "Sending...";

      try {
        // Get reCAPTCHA token
        const recaptchaResponse = await grecaptcha.execute(
          "6LeajM8qAAAAAGMH3Zvf-voIfoNfUNKJhdKn5RDS",
          { action: "submit" }
        );

        // Send data to backend
        const response = await fetch(
          "https://csshreyas-backend.onrender.com/api/contact",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, recaptchaResponse }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong! Please try again.");
        }

        // Success message
        responseMessage.innerText = "✅ Message sent successfully!";
        responseMessage.style.color = "green";

        // Clear form on success
        contactForm.reset();
      } catch (error) {
        // Show proper error message
        responseMessage.innerText = `❌ ${error.message}`;
        responseMessage.style.color = "red";
      }

      // Re-enable button
      submitButton.disabled = false;
      submitButton.innerText = "Send";
    });
  }
});
