const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST route for contact form submissions
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate the data (could be extended)
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new contact entry
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
