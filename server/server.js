require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Contact = require('./models/Contact');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(helmet()); // Secure HTTP headers

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// 🔐 Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// 🚀 Rate Limiting
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', apiLimiter);

const contactLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
app.use('/api/contact', contactLimiter);

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use('/api/admin/login', loginLimiter);

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
    if (!token) {
      return res.status(403).send("🚫 Access Denied! This area is for admin only. Nice try though! 😜");
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("🔒 Oops! You don't have the magic key to enter here! 🚷");
      }
      req.user = user;
      next();
    });
  };

// Default Route
app.get('/', (_req, res) => {
    res.send('Hello from Shreyas! 🚀');
  });
  
// 🔹 Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ success: false, message: 'Invalid username' });
  }

  const isMatch = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ success: true, token });
});

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// reCAPTCHA Secret Key
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

// Contact Form Route with reCAPTCHA Verification
app.post('/api/contact',
  [
    // Validate Inputs
    body('name').trim().escape().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('message').trim().escape().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('recaptchaResponse').notEmpty().withMessage('reCAPTCHA is required')
  ],
  async (req, res) => {
    // Handle Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let { name, email, message, recaptchaResponse } = req.body;

      // Sanitize User Input
      name = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
      message = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

      // Verify reCAPTCHA
      const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;
      const recaptchaResult = await axios.post(recaptchaVerificationUrl);
      if (!recaptchaResult.data.success) {
        return res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
      }

      // Send Email to Admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: 'New Contact Form Submission',
        text: `New contact message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
      await transporter.sendMail(adminMailOptions);

      // Send Confirmation Email to User
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Contacting Shreyas!',
        text: `Hi ${name},\n\nThank you for reaching out to me. I have received your message and will get back to you soon.\n\nRegards,\n\nShreyas C.S.\n\nYour Message:\n${message}`,
      };
      await transporter.sendMail(userMailOptions);

      // Save to Database
      const newContact = new Contact({ name, email, message });
      await newContact.save();

      res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Fetch all contacts (Admin Dashboard - GET Request)
app.get('/api/contact', authenticateJWT, async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching contacts' });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});