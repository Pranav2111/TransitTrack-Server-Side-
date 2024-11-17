const express = require('express');
const router = express.Router();
const {
  scheduledBuses,
  feedBusRoute,
} = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/scheduled-buses', authMiddleware, scheduledBuses);
router.post('/feed-bus-route', authMiddleware, feedBusRoute);

module.exports = router;
