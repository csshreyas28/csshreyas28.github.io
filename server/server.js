require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
  process.exit(1); // Exit process on DB failure
});

// Use Routes
app.use('/api/contact', contactRoutes);

// Root Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// 🔴 Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err.message || err);
  res.status(500).json({ success: false, message: 'Something went wrong, please try again.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
