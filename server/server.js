require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const contactRoutes = require('./routes/contact');

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
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

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

// Use Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
