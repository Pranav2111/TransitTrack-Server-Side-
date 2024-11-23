const mongoose = require('mongoose');

const BusRouteSchema = new mongoose.Schema({
  bus_number: {
    type: String,
    required: true,
    unique: true,
  },
  path: {
    type: Array,
  },
});

const BusRoute = mongoose.model('BusRoute', BusRouteSchema);
module.exports = BusRoute;
