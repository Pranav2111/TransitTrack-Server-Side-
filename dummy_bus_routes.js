const mongoose = require('mongoose');
const Bus = require('./models/busModel');
const dotenv = require('dotenv');

dotenv.config();

const cityDistances = {
  'Mumbai-Pune': 150,
  'Mumbai-Nashik': 165,
  'Pune-Aurangabad': 230,
  'Mumbai-Kolhapur': 390,
  'Pune-Shirdi': 185,
};

const originsAndDestinations = [
  { origin: 'Mumbai', destination: 'Pune' },
  { origin: 'Mumbai', destination: 'Nashik' },
  { origin: 'Pune', destination: 'Aurangabad' },
  { origin: 'Mumbai', destination: 'Kolhapur' },
  { origin: 'Pune', destination: 'Shirdi' },
];

const cityIdMapping = {
  Mumbai: 'MUM-001',
  Pune: 'PUN-002',
  Nashik: 'NAS-003',
  Aurangabad: 'AUR-004',
  Kolhapur: 'KOL-005',
  Shirdi: 'SHI-006',
};

const generateBusNumber = () => {
  const stateCode = 'MH';
  const districtCode = Math.floor(Math.random() * 99) + 1;
  const plateNumber = Math.floor(Math.random() * 10000);
  return `${stateCode}-${String(districtCode).padStart(2, '0')}-${String(
    plateNumber
  ).padStart(4, '0')}`;
};

const generateDriverName = () => {
  const names = [
    'Amit Sharma',
    'Vikas Joshi',
    'Rahul Patil',
    'Suresh Reddy',
    'Manoj Deshmukh',
    'Nilesh Gupta',
    'Ravi Kumar',
    'Arvind Singh',
    'Sandeep Yadav',
    'Prakash Mehta',
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Randomize the number of seats between 15 and 30
const generateAvailableSeats = () => {
  return Math.floor(Math.random() * 16) + 15;
};

// Calculate the travel time based on the distance
const calculateTravelTime = (distance, busIndex) => {
  const travelTimeInHours = distance / 100; // assuming 100 km/hr average speed

  const today = new Date();
  const todayStartOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set to 00:00 for today

  const randomStartOffset = Math.floor(Math.random() * (24 * 60)); // random time offset in minutes
  // Add bus-specific offset (busIndex) to ensure different start times for each bus
  const startTimeOffset = randomStartOffset + busIndex * 10; // Adding a small offset based on index
  const startTime = new Date(
    todayStartOfDay.getTime() + startTimeOffset * 60000
  );

  // Ensure end time is after the start time, and the buses run on the same day
  const endTime = new Date(
    startTime.getTime() + travelTimeInHours * 60 * 60 * 1000
  );

  if (endTime.getDate() !== today.getDate()) {
    endTime.setHours(23, 59, 59, 999); // Ensure end time does not go past midnight
  }

  return { startTime, endTime };
};

const seedBusData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const busData = [];

    for (const pair of originsAndDestinations) {
      const recordCount = Math.floor(Math.random() * 3) + 3; // Randomize number of buses (3 to 5 buses per route)
      const routeKey = `${pair.origin}-${pair.destination}`;
      const distance = cityDistances[routeKey];
      if (!distance) continue;

      // Create a bus record for each bus, ensuring different start and end times
      for (let i = 0; i < recordCount; i++) {
        const { startTime, endTime } = calculateTravelTime(distance, i);

        const originId = cityIdMapping[pair.origin];
        const destinationId = cityIdMapping[pair.destination];

        const bus = new Bus({
          busNumber: generateBusNumber(),
          driverName: generateDriverName(),
          origin: pair.origin,
          destination: pair.destination,
          availableSeats: generateAvailableSeats(),
          origin_id: originId,
          destination_id: destinationId,
          ac_type: Math.random() > 0.5 ? 'AC' : 'Non-AC',
          start_time: startTime,
          end_time: endTime,
        });

        busData.push(bus);
      }
    }

    await Bus.insertMany(busData);
    console.log('Successfully seeded bus data.');
  } catch (err) {
    console.error('Error seeding bus data:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedBusData();
