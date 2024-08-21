const mongoose = require('mongoose');

const PixelEventSchema = new mongoose.Schema({
  pixelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pixel',
    required: true,
  },
  ip: String,
  userAgent: String,
  eventType: {
    type: String,
    default: 'page_view', // Example event type, could be extended to clicks, etc.
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PixelEvent', PixelEventSchema);
