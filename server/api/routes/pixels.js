const express = require('express');
const router = express.Router();
const Pixel = require('../../models/Pixel');

// Route to create a new pixel
router.post('/', async (req, res) => {
  const { name } = req.body;
  const customerId = 'defaultCustomerId'; // Replace with actual customer ID logic if needed

  try {
    const newPixel = new Pixel({ name, customerId });
    await newPixel.save();
    res.status(201).json(newPixel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pixel' });
  }
});

module.exports = router;

// Route to update an existing pixel
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPixel = await Pixel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPixel) {
      return res.status(404).json({ error: 'Pixel not found' });
    }
    res.json(updatedPixel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pixel' });
  }
});

// Route to get the last 5 pixels created
router.get('/last5', async (req, res) => {
  try {
    const pixels = await Pixel.find().sort({ createdAt: -1 }).limit(5);
    res.json(pixels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pixels' });
  }
});

// Route to get details of a specific pixel
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pixel = await Pixel.findById(id);
    if (!pixel) {
      return res.status(404).json({ error: 'Pixel not found' });
    }
    res.json(pixel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve pixel' });
  }
});

module.exports = router;
