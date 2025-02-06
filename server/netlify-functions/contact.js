const mongoose = require('mongoose');
const { Handler } = require('@netlify/functions');
const Contact = require('../models/Contact');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { name, email, message } = JSON.parse(event.body);

      const newContact = new Contact({ name, email, message });
      await newContact.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error.message }),
      };
    }
  }
  return { statusCode: 405, body: 'Method Not Allowed' };
};

exports.handler = handler;
