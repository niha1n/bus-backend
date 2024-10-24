const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Bus model
const Bus = mongoose.model('Bus', new mongoose.Schema({
  busNumber: String,
  status: String,
  statusColor: String,
  startPoint: String,
  endPoint: String,
  waypoints: Array,
  startTime: String,
  endTime: String,
  driverName: String,
  driverAvatar: String,
  driverContact: String,
}));

// Route to get all bus data
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
