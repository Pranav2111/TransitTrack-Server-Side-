const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const formRequisiteRoutes = require('./routes/formRequisiteRoute');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/form-requisite', formRequisiteRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
