// routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get dashboard data
router.get('/', auth, async (req, res) => {
  try {
    // Simulate various database operations for APM metrics
    const randomDelay = Math.floor(Math.random() * 200) + 50;
    
    // Simulate random errors (1 in 20 chance)
    if (Math.random() < 0.05) {
      throw new Error('Random dashboard error');
    }
    
    setTimeout(() => {
      res.json({
        stats: {
          activeUsers: Math.floor(Math.random() * 1000) + 100,
          newUsers: Math.floor(Math.random() * 50) + 5,
          totalTransactions: Math.floor(Math.random() * 10000) + 1000,
          errorRate: (Math.random() * 5).toFixed(2)
        },
        recentActivities: [
          { type: 'login', timestamp: new Date(Date.now() - 60000).toISOString() },
          { type: 'update', timestamp: new Date(Date.now() - 120000).toISOString() },
          { type: 'purchase', timestamp: new Date(Date.now() - 300000).toISOString() }
        ],
        systemHealth: {
          cpu: (Math.random() * 80 + 10).toFixed(1),
          memory: (Math.random() * 80 + 10).toFixed(1),
          disk: (Math.random() * 60 + 20).toFixed(1)
        }
      });
    }, randomDelay);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;