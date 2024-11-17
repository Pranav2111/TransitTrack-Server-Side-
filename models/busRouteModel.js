const mongoose = require('mongoose');

const BusRouteSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busRoute: {
    type: Array,
  },
});

const BusRoute = mongoose.model('BusRoute', BusRouteSchema);
module.exports = BusRoute;
