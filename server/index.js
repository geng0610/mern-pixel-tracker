require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const pixelRoutes = require('./api/routes/pixels');
const pixelEventRoutes = require('./api/routes/pixelEvents');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/api/pixels', pixelRoutes);
app.use('/api/pixel-events', pixelEventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
