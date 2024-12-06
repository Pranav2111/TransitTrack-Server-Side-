const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  bus_number: {
    type: String,
    required: true,
    unique: true,
  },
  driver_name: {
    type: String,
  },
  driver_id: {
    type: String,
  },
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  available_seats: {
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
  origin_coordinates: {
    type: Array,
  },
  destination_coordinates: {
    type: Array,
  },
});

const Bus = mongoose.model('Bus', BusSchema);
module.exports = Bus;
