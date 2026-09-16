# My Portfolio Website

Please visit [csshreyas.netlify.app](https://csshreyas.netlify.app/)

Welcome to my portfolio website! This repo contains the source code for my personal website, including both the frontend and backend components. The frontend is a **Next.js** app hosted on Netlify, and the backend (Node.js and Express) is hosted on Render.

---

## Live Versions

- **Website (Frontend):** [csshreyas.netlify.app](https://csshreyas.netlify.app/)
- **Backend API:** [https://csshreyas-backend.onrender.com](https://csshreyas-backend.onrender.com)
- **Admin Dashboard:** [/admin](https://csshreyas.netlify.app/admin) (requires credentials)

---

## Project Structure

```
csshreyas28.github.io/
├── frontend/            # Next.js frontend (App Router, Tailwind CSS)
│   ├── src/
│   │   ├── app/         # Pages (home, admin)
│   │   ├── components/  # Bento grid UI components
│   │   └── content/     # Profile, projects, skills data
│   └── public/images/   # Portfolio & project images
├── client/              # Legacy static frontend (deprecated)
├── server/              # Backend (Node.js/Express)
│   ├── server.js
│   ├── models/
│   └── routes/
└── netlify.toml         # Netlify deployment config
```

---

## Features

### Frontend (Next.js)
- Modern **bento grid** layout with dark theme and lime accent
- Featured projects showcase with nested grid
- Contact form with Google reCAPTCHA v3
- Live GitHub commit activity
- Interactive location map (Leaflet)
- Admin dashboard at `/admin`

### Backend (unchanged)
- **Node.js & Express** REST API
- **MongoDB Atlas** for contact messages
- **Nodemailer** email notifications
- **JWT** admin authentication
- **reCAPTCHA**, rate limiting, input sanitization

---

## Setup and Installation

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # optional — defaults are set
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Build for production:**

```bash
npm run build
npm start
```

### Backend

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_bcrypt_hashed_password
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
   EMAIL_RECIPIENT=admin_recipient@example.com
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   PORT=3000
   SERVER_URL=http://localhost:3000
   ```
4. Run the server:
   ```bash
   node server.js
   ```

---

## Deployment

- **Frontend:** Deploy the `frontend/` directory on Netlify (see `netlify.toml`)
- **Backend:** Deploy `server/` on Render with environment variables configured

---

## Contact

- [LinkedIn](https://www.linkedin.com/in/csshreyas/)
- [GitHub](https://github.com/csshreyas28)
- [Send a message](https://csshreyas.netlify.app/#contact)

Happy Coding!
