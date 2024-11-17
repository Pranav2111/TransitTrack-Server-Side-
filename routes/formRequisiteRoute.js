const express = require('express');
const router = express.Router();
const { busStopRoute } = require('../controllers/formRequisiteRouteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/bus-stops', authMiddleware, busStopRoute);

module.exports = router;
