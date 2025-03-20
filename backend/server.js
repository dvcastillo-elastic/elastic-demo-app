// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Elastic APM agent setup
const apm = require('elastic-apm-node').start({
  serviceName: 'elastic-demo-backend',
  secretToken: process.env.APM_SECRET_TOKEN,
  serverUrl: process.env.APM_SERVER_URL,
  environment: process.env.NODE_ENV || 'development',
  captureBody: 'all'
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Elastic Demo API is running');
});

// Generate some random CPU/Memory load for profiling demo
app.get('/api/load', (req, res) => {
  const startTime = Date.now();
  const duration = req.query.seconds ? parseInt(req.query.seconds) * 1000 : 5000;
  
  // CPU intensive operation
  while (Date.now() - startTime < duration) {
    for (let i = 0; i < 1000000; i++) {
      Math.sqrt(i);
    }
  }
  
  res.send(`Generated load for ${duration/1000} seconds`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});