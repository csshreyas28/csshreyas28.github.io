require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(cors());  // Enable CORS

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Use routes
app.use('/api/contact', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Shreyas!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
