require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const booksRoute = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/books', booksRoute);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/svlibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
