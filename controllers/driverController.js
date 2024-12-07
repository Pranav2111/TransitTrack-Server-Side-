const Bus = require('../models/busModel');

exports.driverSchedule = async (req, res) => {
  const { userId } = req;

  try {
    const buses = await Bus.find(
      {
        driver_id: userId,
        completed: false,
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

exports.markJourneyCompleted = async (req, res) => {
  const { bus_number } = req.body;

  try {
    const buses = await Bus.find(
      {
        bus_number: bus_number,
      },
      { _id: 0, __v: 0 }
    );

    if (!buses.length) {
      return res.status(404).json({ message: 'Bus not found.' });
    }

    const result = await Bus.updateOne(
      { bus_number: bus_number },
      { $set: { completed: true } }
    );

    res
      .status(200)
      .json({ message: 'Journey marked as completed successfully.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while marking journey as completed.' });
  }
};
