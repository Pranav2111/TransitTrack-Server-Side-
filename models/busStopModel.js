const mongoose = require('mongoose');

const BusStopSchema = new mongoose.Schema({
  city_name: {
    type: String,
  },
  city_id: {
    type: String,
  },
});

const Bus = mongoose.model('BusStop', BusStopSchema);
module.exports = Bus;
