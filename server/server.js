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
app.set('trust proxy', 1); // ✅ Fix for 'X-Forwarded-For' issue
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(helmet()); // Secure HTTP headers

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected to:', process.env.MONGO_URI);
  })
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

// Rate Limiting Logs for '/api/contact'
const contactLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 5, 
  handler: (req, res) => {
    console.log(`⚠️ Rate Limiting Triggered for IP: ${req.ip} on /api/contact`);
    res.status(429).json({ success: false, message: 'Too many requests, please try again later' });
  }
});
app.use('/api/contact', contactLimiter);

// Rate Limiting Logs for '/api/admin/login'
const loginLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  handler: (req, res) => {
    console.log(`⚠️ Rate Limiting Triggered for IP: ${req.ip} on /api/admin/login`);
    res.status(429).json({ success: false, message: 'Too many login attempts, please try again later' });
  }
});
app.use('/api/admin/login', loginLimiter);

// JWT Authentication Middleware
const authenticateJWT = async (req, res, next) => {
  try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
          return res.status(403).json({ message: "🚫 Access Denied! Nice try though! 😜" });
      }

      const user = await jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
  } catch (err) {
      res.status(403).json({ message: "🔒 Oops! You don't have the magic key to enter here! 🚷" });
  }
};

// Default Route
app.get('/', (_req, res) => {
    res.send('Hello from Shreyas! 🚀');
  });
  
// 🔹 Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  console.log("🔍 Entered Username:", username);
  console.log("🔍 Entered Password:", password);
  console.log("🔍 Stored Username:", ADMIN_USERNAME); //comment later if not required
  console.log("🔍 Stored Hashed Password:", ADMIN_PASSWORD); //comment later if not required

  if (username !== ADMIN_USERNAME) {
    console.log("❌ Invalid Username");
    return res.status(401).json({ success: false, message: 'Invalid username' });
  }

  console.log("✅ Username Matched");

  // Check if password matches
  const isMatch = bcrypt.compareSync(password, ADMIN_PASSWORD);
  console.log("🔍 Password Match Result:", isMatch);

  if (!isMatch) {
    console.log("❌ Invalid Password");
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  console.log("✅ Password Matched");

  // Generate JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  console.log("🔑 JWT Token Generated:", token);
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

    // Check for dummy request
    if (req.body.name === 'keep-alive') {
      console.log("⏳ Dummy request received to keep the server alive");

      // Respond without processing anything (no DB, no email)
      return res.status(200).json({ success: true, message: 'Server kept alive' });
    }

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
      console.log("🔍 reCAPTCHA Response:", recaptchaResult.data);
      if (!recaptchaResult.data.success) {
        console.log("❌ Invalid reCAPTCHA");
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
    console.log(`📢 Admin Login Detected! User: ${req.user.username}, Time: ${new Date().toISOString()}`);
    
    const contacts = await Contact.find();
    console.log(`✅ Fetched Contacts`);
    // console.log(`✅ Fetched ${contacts.length} Contacts`);

    res.json({ success: true, contacts });
  } catch (error) {
    console.error("❌ Error Fetching Contacts:", error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

// Send dummy request periodically to keep the server alive; can be later placed in a new file
const sendDummyRequest = async () => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}/api/contact`, {
      name: 'keep-alive', // Identifies as a dummy request
      email: 'dummy@keepalive.com',
      message: 'This is a dummy request to keep the server alive.',
      recaptchaResponse: '', // You can leave this empty or put a fake response
    });
    console.log('Server kept alive:', response.data.message);
  } catch (error) {
    console.error('Error sending dummy request:', error);
  }
};

// Send dummy request every hour (3600000 milliseconds)
setInterval(sendDummyRequest, 3600000); // 1 hour

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});