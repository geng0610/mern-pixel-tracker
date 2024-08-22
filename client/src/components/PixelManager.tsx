import React, { useState } from 'react';
import Pixel from './Pixel';

const PixelManager: React.FC = () => {
  const [pixelId, setPixelId] = useState<string>('');
  const [createdPixelId, setCreatedPixelId] = useState<string | null>(null);
  const [existingPixelId, setExistingPixelId] = useState<string>('');

  const createPixel = async () => {
    const name = `Pixel ${Date.now()}`; // Example pixel name
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pixels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setCreatedPixelId(data._id);
      setPixelId(data._id);
    } catch (error) {
      console.error('Error creating pixel:', error);
    }
  };

  const handleExistingPixelSubmit = () => {
    setPixelId(existingPixelId);
  };

  return (
    <div>
      <h2>Pixel Manager</h2>

      {/* Create a New Pixel */}
      <div>
        <h3>Create a New Pixel</h3>
        <button onClick={createPixel}>Create Pixel</button>
        {createdPixelId && <p>New Pixel ID: {createdPixelId}</p>}
      </div>

      {/* Enter Existing Pixel ID */}
      <div>
        <h3>Enter Existing Pixel ID</h3>
        <input
          type="text"
          placeholder="Enter Pixel ID"
          value={existingPixelId}
          onChange={(e) => setExistingPixelId(e.target.value)}
        />
        <button onClick={handleExistingPixelSubmit}>Get Pixel Info</button>
      </div>

      {/* Display Pixel Information */}
      {pixelId && <Pixel pixelId={pixelId} />}
    </div>
  );
};

export default PixelManager;
