const express = require('express');
const router = express.Router();
const PixelEvent = require('../../models/PixelEvent');

// Route to log a pixel event
router.get('/:pixelId', async (req, res) => {
  const { pixelId } = req.params;

  // Get the real IP address
  const ip = req.headers['x-forwarded-for'] || req.ip;

  try {
    const event = new PixelEvent({
      pixelId,
      ip, // Use the extracted IP address
      userAgent: req.headers['user-agent'],
      eventType: 'page_view', // or another type of event
    });

    await event.save();

    // Send a 1x1 transparent pixel
    const pixelBuffer = Buffer.from(
      'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
      'base64'
    );
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': pixelBuffer.length,
    });
    res.end(pixelBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// Route to retrieve events for a specific pixel
router.get('/events/:pixelId', async (req, res) => {
  const { pixelId } = req.params;

  try {
    const events = await PixelEvent.find({ pixelId }).sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

module.exports = router;
