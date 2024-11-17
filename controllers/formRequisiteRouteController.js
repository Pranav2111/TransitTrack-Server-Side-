const BusStop = require('../models/busStopModel');

exports.busStopRoute = async (req, res) => {
  try {
    const busStops = await BusStop.find().select('city_name city_id -_id');
    const formOptions = busStops.map(({ city_name, city_id }) => ({
      label: city_name,
      value: city_id,
    }));
    return res.status(200).json(formOptions);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
