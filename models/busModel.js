const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  driverName: {
    type: String,
  },
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  availableSeats: {
    type: Number,
  },
  origin_id: {
    type: String,
  },
  destination_id: {
    type: String,
  },
  ac_type: {
    type: String,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
});

const Bus = mongoose.model('Bus', BusSchema);
module.exports = Bus;
