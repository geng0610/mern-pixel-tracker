const express = require('express');
const router = express.Router();
const Pixel = require('../../models/Pixel');

// Route to create a new pixel
router.post('/', async (req, res) => {
  const { name, customerId } = req.body;

  try {
    const newPixel = new Pixel({ name, customerId });
    await newPixel.save();
    res.status(201).json(newPixel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pixel' });
  }
});

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
