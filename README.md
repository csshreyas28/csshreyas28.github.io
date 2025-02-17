# My Portfolio Website

# Please visit [csshreyas.netlify.app](https://csshreyas.netlify.app/)

# My Portfolio Website

Welcome to my portfolio website! This repo contains the source code for my personal website, including both the frontend and backend components. The frontend is hosted on Netlify, and the backend (built with Node.js and Express) is hosted on Render.

---

## Live Versions

- **Website (Frontend):** [csshreyas.netlify.app](https://csshreyas.netlify.app/)
- **Backend API:** [https://csshreyas-backend.onrender.com](https://csshreyas-backend.onrender.com)

---

## Project Structure

```
csshreyas28.github.io/
├── client/              # Frontend code (HTML, CSS, JavaScript)
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── images/
├── server/              # Backend code (Node.js/Express)
│   ├── server.js        # Main server file
│   ├── models/          # Mongoose models (e.g., Contact.js)
│   └── routes/          # API routes (e.g., contact.js)
└── README.md
```

---

## Features and Technologies Used

### Frontend
- **HTML, CSS, JavaScript**
- Contact form to submit messages

### Backend
- **Node.js & Express:** RESTful API to handle contact form submissions
- **MongoDB Atlas:** Database for storing contact messages
- **Nodemailer:** Sends email notifications on form submission (both to admin and as a confirmation to the user)
- **reCAPTCHA Integration:** Prevents spam submissions via Google reCAPTCHA
- **JWT Authentication:** Secures the admin dashboard for viewing contact submissions
- **Security Enhancements:**
  - **Helmet:** Sets secure HTTP headers
  - **Rate Limiting:** Limits requests to API endpoints to prevent abuse
  - **Input Validation & Sanitization:** Uses express-validator and sanitize-html to protect against XSS and injection attacks
  - **Request Body Size Limit:** Limits JSON payloads to 10kb

### Deployment
- **Frontend:** Deployed on Netlify
- **Backend:** Deployed on Render

---

## Setup and Installation

### Frontend
1. **Clone the repository:**
   ```bash
   git clone https://github.com/csshreyas28/csshreyas28.github.io
   ```
2. **Navigate to the `client` folder** and open `index.html` in your browser to view the website locally.

### Backend
1. **Navigate to the `server` folder:**
   ```bash
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up your environment variables:**

   Create a `.env` file in the `server` folder with the following variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_USERcsshreyas=your_admin_usercsshreyas
   ADMIN_PASSWORD=your_admin_password
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password_or_app_password
   EMAIL_RECIPIENT=admin_recipient@example.com
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   PORT=3000
   ```
4. **Run the backend server locally:**
   ```bash
   node server.js
   ```
5. **Access the API endpoints:**
   - **Contact Form Submission:** `POST /api/contact`
   - **Admin Login:** `POST /api/admin/login`
   - **Fetch Contacts (secured):** `GET /api/contact` (requires JWT token)

---

## Additional Information

- **Contact Form:** Users can submit their name, email, and message. The backend verifies the reCAPTCHA, sanitizes inputs, sends email notifications, and stores the message in MongoDB.
- **Admin Dashboard:** Secured using JWT authentication. Only authenticated users can view submitted contact messages.
- **Security Enhancements:** Helmet secures HTTP headers, express-rate-limit protects against DDoS and brute-force attacks, and request size is limited to 10kb.
- **Environment Variables:** Managed via a `.env` file.

---

## Contact

Feel free to reach out to me!

- [[LinkedIn](https://www.linkedin.com/in/csshreyas/)]

- [[Send a message here](https://csshreyas.netlify.app/#contact)]

- [[website link](https://csshreyas.netlify.app/)]

Happy Coding!
