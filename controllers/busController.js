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
    console.error('Error fetching scheduled buses:', error);
    res
      .status(500)
      .json({ message: 'Server error while fetching scheduled buses.' });
  }
};

// Feed Bus Route
exports.feedBusRoute = async (req, res) => {
  const { busNumber, busRoute } = req.body;

  try {
    if (!Array.isArray(busRoute) || busRoute.length === 0) {
      return res.status(400).json({
        message:
          'Invalid bus route data. Ensure it is an array of lat/lng pairs.',
      });
    }

    const route = await BusRoute.findOne({ busNumber });

    if (!route) {
      const newRoute = new BusRoute({
        busNumber,
        busRoute,
      });

      await newRoute.save();
      return res
        .status(201)
        .json({ message: 'New bus route created and added successfully.' });
    }

    route.busRoute = [...route.busRoute, ...busRoute];

    await route.save();

    res.status(200).json({ message: 'Bus route updated successfully.' });
  } catch (error) {
    console.error('Error feeding bus route:', error);
    res
      .status(500)
      .json({ message: 'Server error while updating the bus route.' });
  }
};
