const mongoose = require('mongoose');

const PixelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pixel', PixelSchema);
