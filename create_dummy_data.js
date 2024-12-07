const mongoose = require('mongoose');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Bus = require('./models/busModel');
const User = require('./models/userModel');

const dotenv = require('dotenv');
dotenv.config();

const busStops = [
  {
    name: 'Aurangabad',
    id: 'AUR-004',
    coordinates: [75.31689035657773, 19.88195413594014],
  },
  {
    name: 'Nashik',
    id: 'NAS-003',
    coordinates: [73.78094009239338, 19.998461020776134],
  },
  {
    name: 'Mumbai',
    id: 'MUM-001',
    coordinates: [72.82211275777108, 18.96934738564226],
  },
  {
    name: 'Shirdi',
    id: 'SHI-006',
    coordinates: [74.47703133023003, 19.763932562667353],
  },
  {
    name: 'Pune',
    id: 'PUN-002',
    coordinates: [73.87461263565967, 18.531605331390075],
  },
  {
    name: 'Kolhapur',
    id: 'KOL-005',
    coordinates: [74.24269808245127, 16.706279571634095],
  },
];

const driverNames = [
  'Rahul Patel',
  'Amit Kumar',
  'Priya Sharma',
  'Rajesh Singh',
  'Neha Gupta',
  'Ravi Yadav',
  'Sunil Verma',
  'Manish Deshmukh',
  'Kavita Reddy',
  'Rohit Jain',
  'Anjali Singh',
  'Vikas Sharma',
  'Geeta Yadav',
  'Suresh Kumar',
  'Aparna Nair',
  'Jeevan Reddy',
  'Meenal Deshmukh',
  'Sanjay Verma',
  'Shweta Gupta',
  'Rakesh Patel',
  'Arun Kumar',
  'Pooja Iyer',
  'Vijay Sharma',
  'Deepak Singh',
  'Nisha Gupta',
  'Mukesh Patel',
  'Ritu Sharma',
  'Karan Jain',
  'Suman Reddy',
  'Ravi Kumar',
  'Madhuri Deshmukh',
  'Pradeep Yadav',
  'Richa Gupta',
  'Ajay Verma',
  'Ravi Singh',
  'Laxmi Patel',
  'Rahul Kumar',
  'Anil Sharma',
  'Suman Sharma',
  'Neelam Yadav',
  'Dinesh Gupta',
  'Maya Reddy',
  'Vikram Verma',
  'Vinay Kumar',
  'Divya Gupta',
  'Madhav Patel',
  'Neha Yadav',
  'Siddharth Kumar',
  'Sonali Sharma',
  'Ankur Yadav',
  'Parvati Deshmukh',
  'Satish Patel',
  'Vandana Kumar',
  'Ramesh Gupta',
  'Rajendra Verma',
  'Tanvi Sharma',
  'Manoj Reddy',
  'Bhavana Gupta',
  'Prakash Singh',
  'Shalini Yadav',
  'Harish Kumar',
  'Kiran Verma',
  'Vijay Kumar',
  'Rupali Sharma',
  'Dinesh Sharma',
  'Sunita Reddy',
  'Jatin Yadav',
  'Ashok Patel',
  'Kavita Gupta',
  'Nandini Verma',
  'Sunil Patel',
  'Neeraj Sharma',
  'Rekha Deshmukh',
  'Ajay Kumar',
  'Priya Yadav',
  'Suresh Reddy',
  'Vikram Sharma',
  'Anjali Gupta',
  'Ravi Reddy',
  'Shruti Yadav',
  'Vikas Yadav',
  'Vinod Kumar',
  'Seema Gupta',
  'Umesh Patel',
  'Lalit Sharma',
  'Geeta Sharma',
  'Nitin Verma',
  'Sanjay Yadav',
  'Komal Kumar',
  'Shankar Patel',
  'Anil Yadav',
  'Divya Sharma',
  'Ashwini Deshmukh',
  'Mohit Kumar',
  'Vandana Verma',
  'Shivani Reddy',
  'Manoj Kumar',
  'Jyoti Gupta',
  'Sanjay Kumar',
  'Tanuja Sharma',
];

const generateBusNumber = () => {
  const randomNum = Math.floor(Math.random() * 100) + 10;
  const randomCode = Math.floor(Math.random() * 9000) + 1000;
  return `MH-${randomNum}-${randomCode}`;
};

const createBusData = (
  origin,
  destination,
  originId,
  destinationId,
  driverName,
  driverId,
  originCoordinates,
  destinationCoordinates
) => {
  const busNumber = generateBusNumber();
  const startTime = moment()
    .startOf('day')
    .add(Math.floor(Math.random() * 720) + 1, 'minutes')
    .toDate();
  const endTime = moment(startTime)
    .add(Math.floor(Math.random() * 120) + 60, 'minutes')
    .toDate();

  return {
    bus_number: busNumber,
    driver_name: driverName,
    driver_id: driverId,
    origin: origin,
    destination: destination,
    available_seats: Math.floor(Math.random() * 51),
    origin_id: originId,
    destination_id: destinationId,
    ac_type: 'AC',
    start_time: startTime,
    end_time: endTime,
    origin_coordinates: originCoordinates,
    destination_coordinates: destinationCoordinates,
    completed: false,
  };
};

const createUser = async driverName => {
  if (!driverName) {
    throw new Error('Driver name is undefined');
  }

  const email = driverName.toLowerCase().replace(' ', '.') + '@driver.com';
  const password = Math.random().toString(36).substring(7);

  console.log(`Creating user for driver: ${driverName}`);

  const user = new User({
    name: driverName,
    email: email,
    password: password,
    userType: 'driver',
  });

  try {
    await user.save();
    console.log(`User created successfully for driver: ${driverName}`);
  } catch (error) {
    console.error(`Error creating user for driver: ${driverName}`, error);
    throw error; // Rethrow the error to halt execution
  }

  return { _id: user._id, email, password };
};

const createBuses = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful.');

    console.log('Dropping existing collections...');
    await mongoose.connection.db.dropCollection('buses');
    await mongoose.connection.db.dropCollection('users');
    console.log('Existing collections dropped.');

    const busData = [];
    const userData = [];
    const usedDriverNames = new Set();
    let driverIndex = 0;

    // Shuffle the driver names array to ensure random assignments
    const shuffledDriverNames = [...driverNames];
    for (let i = shuffledDriverNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDriverNames[i], shuffledDriverNames[j]] = [
        shuffledDriverNames[j],
        shuffledDriverNames[i],
      ];
    }

    console.log('Starting to generate buses...');
    let busCount = 0;
    for (let i = 0; i < busStops.length; i++) {
      for (let j = i + 1; j < busStops.length; j++) {
        const origin = busStops[i].name;
        const originId = busStops[i].id;
        const destination = busStops[j].name;
        const destinationId = busStops[j].id;
        const originCoordinates = busStops[i].coordinates;
        const destinationCoordinates = busStops[j].coordinates;

        const busesPerPair = Math.floor(Math.random() * 3) + 3; // 3-5 buses

        console.log(
          `Generating ${busesPerPair} buses between ${origin} and ${destination}...`
        );

        for (let k = 0; k < busesPerPair; k++) {
          if (driverIndex >= shuffledDriverNames.length) {
            console.log('No more drivers available to assign.');
            break;
          }

          let driverName = shuffledDriverNames[driverIndex];

          // Ensure the driver has not been used yet
          while (usedDriverNames.has(driverName)) {
            driverIndex++;
            if (driverIndex >= shuffledDriverNames.length) {
              console.log('No more drivers available to assign.');
              break;
            }
            driverName = shuffledDriverNames[driverIndex];
          }

          // If all drivers are used, break out of the loop
          if (driverIndex >= shuffledDriverNames.length) {
            break;
          }

          usedDriverNames.add(driverName);

          const {
            _id: driverId,
            email,
            password,
          } = await createUser(driverName);

          console.log(`Creating bus for driver ${driverName}...`);
          const bus = createBusData(
            origin,
            destination,
            originId,
            destinationId,
            driverName,
            driverId,
            originCoordinates,
            destinationCoordinates
          );
          busData.push(bus);
          userData.push({ email, password });

          driverIndex++;
          busCount++;
        }
      }
    }

    if (busData.length > 0) {
      console.log(`Inserting ${busData.length} buses into database...`);
      await Bus.insertMany(busData);
      console.log(`${busData.length} buses created successfully.`);
    } else {
      console.log('No buses created due to lack of available drivers.');
    }

    const csvWriter = createCsvWriter({
      path: 'dummy_driver_logins.csv',
      header: [
        { id: 'email', title: 'Email' },
        { id: 'password', title: 'Password' },
      ],
    });

    console.log('Writing driver data to CSV...');
    await csvWriter.writeRecords(userData);
    console.log(
      'Driver Emails and Passwords have been written to driver_data.csv'
    );

    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error creating buses:', error);
    mongoose.connection.close();
  }
};

createBuses();
