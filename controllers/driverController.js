const Bus = require('../models/busModel');

exports.driverSchedule = async (req, res) => {
  const { userId } = req;

  try {
    const buses = await Bus.find(
      {
        driver_id: userId,
      },
      { _id: 0, __v: 0 }
    );
    const current_schedule = buses.length ? buses[0] : {};
    res.status(200).json({ current_schedule });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching scheduled buses.' });
  }
};
