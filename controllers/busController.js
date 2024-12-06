const Bus = require('../models/busModel');
const BusRoute = require('../models/busRouteModel');

// Fetch Bus List
exports.scheduledBuses = async (req, res) => {
  const { originId, destinationId } = req.query;

  try {
    const buses = await Bus.find(
      {
        origin_id: originId,
        destination_id: destinationId,
      },
      { _id: 0, __v: 0 }
    );

    res.status(200).json({ schedules: buses });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching scheduled buses.' });
  }
};

// Feed Bus path
exports.feedBusRoute = async (req, res) => {
  const { bus_number, path } = req.body;

  try {
    if (!Array.isArray(path) || path.length === 0) {
      return res.status(400).json({
        message:
          'Invalid bus route data. Ensure it is an array of lat/lng pairs.',
      });
    }

    let route = await BusRoute.findOne({ bus_number });
    if (!route) {
      const newRoute = new BusRoute({
        bus_number,
        path,
      });

      await newRoute.save();
      return res
        .status(201)
        .json({ message: 'New bus route created and added successfully.' });
    }

    route.path = [...route.path, ...path];

    await route.save();

    res.status(200).json({ message: 'Bus route updated successfully.' });
  } catch (error) {
    console.error('Error feeding bus route:', error);
    res
      .status(500)
      .json({ message: 'Server error while updating the bus route.' });
  }
};

// fetch bus path
exports.getBusRoute = async (req, res) => {
  const { bus_number } = req.query;

  try {
    if (!bus_number) {
      return res.status(400).json({
        message: 'Invalid bus number',
      });
    }
    const busRoute = await BusRoute.findOne({ bus_number });

    if (!busRoute) {
      return res.status(200).json({ message: 'Journey not started yet!' });
    }

    res.status(200).json({ path: busRoute.path });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching the bus details' });
  }
};
