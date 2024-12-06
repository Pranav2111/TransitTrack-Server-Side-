const express = require('express');
const router = express.Router();
const {
  scheduledBuses,
  getBusRoute,
  feedBusRoute,
} = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/bus/scheduled-buses', authMiddleware, scheduledBuses);
router.get('/bus/bus-path', authMiddleware, getBusRoute);
router.post('/bus/feed-bus-route', authMiddleware, feedBusRoute);

module.exports = router;
