const mongoose = require('mongoose');
const BusStop = require('./models/busStopModel');
const dotenv = require('dotenv');
dotenv.config();

const cityIdMapping = {
  Mumbai: 'MUM-001',
  Pune: 'PUN-002',
  Nashik: 'NAS-003',
  Aurangabad: 'AUR-004',
  Kolhapur: 'KOL-005',
  Shirdi: 'SHI-006',
};

const seedBusStops = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const busStopData = [];

    for (const [cityName, cityId] of Object.entries(cityIdMapping)) {
      const busStop = new BusStop({
        city_name: cityName,
        city_id: cityId,
      });

      busStopData.push(busStop);
    }

    await BusStop.insertMany(busStopData);
    console.log('Successfully seeded bus stop data.');
  } catch (err) {
    console.error('Error seeding bus stop data:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedBusStops();
