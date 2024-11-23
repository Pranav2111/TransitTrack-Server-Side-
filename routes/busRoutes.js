const express = require('express');
const router = express.Router();
const {
  scheduledBuses,
  getBusRoute,
  feedBusRoute,
} = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/scheduled-buses', authMiddleware, scheduledBuses);
router.get('/bus-path', authMiddleware, getBusRoute);
router.post('/feed-bus-route', authMiddleware, feedBusRoute);

module.exports = router;
