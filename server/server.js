require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const axios = require('axios');
const Contact = require('./models/Contact'); 

const app = express();
app.use(express.json());
app.use(cors());

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

// 🔹 Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ success: false, message: 'Invalid username' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  // Generate JWT Token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ success: true, token });
});

// Set up the transporter using Gmail (or another service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password or app password
  }
});

// reCAPTCHA Secret Key
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

// Contact Form Route with reCAPTCHA Verification
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, recaptchaResponse } = req.body;

    if (!name || !email || !message || !recaptchaResponse) {
      return res.status(400).json({ success: false, message: 'All fields and CAPTCHA are required' });
    }

    // Verify reCAPTCHA with Google API
    const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;

    const recaptchaResult = await axios.post(recaptchaVerificationUrl);
    if (!recaptchaResult.data.success) {
      return res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
    }

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,  
      subject: 'New Contact Form Submission',
      text: `New contact message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Save contact info to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch all contacts (Admin Dashboard - GET Request)
app.get('/api/contact', authenticateJWT, async (req, res) => {
    try {
      const contacts = await Contact.find();  // Fetch all contacts from MongoDB
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
