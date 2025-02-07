const express = require('express');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const router = express.Router();

// 🔹 Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail or SMTP email
    pass: process.env.EMAIL_PASS, // Your App Password (not actual email password)
  },
});

// 📩 Contact Form Route
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // 📩 Send Confirmation Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hi ${name},\n\nThank you for reaching out! I will get back to you soon.\n\nMessage: ${message}\n\nBest Regards,\nS`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Message sent successfully and confirmation email sent!' });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
