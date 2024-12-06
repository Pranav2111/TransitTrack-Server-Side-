const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { driverSchedule } = require('../controllers/driverController');
const { feedBusRoute } = require('../controllers/busController');

router.get('/driver-schedule', authMiddleware, driverSchedule);
router.post('/bus/feed-bus-route', authMiddleware, feedBusRoute);

module.exports = router;
