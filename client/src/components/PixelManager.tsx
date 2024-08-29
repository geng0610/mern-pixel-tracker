import React, { useEffect, useState } from 'react';
import Pixel from './Pixel';

interface PixelData {
  _id: string;
  name: string;
  createdAt: string;
}

const PixelManager: React.FC = () => {
  const [pixelId, setPixelId] = useState<string>('');
  const [createdPixelId, setCreatedPixelId] = useState<string | null>(null);
  const [existingPixelId, setExistingPixelId] = useState<string>('');
  const [lastPixels, setLastPixels] = useState<PixelData[]>([]);

  const createPixel = async () => {
    const name = `Pixel ${Date.now()}`;
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
      fetchLastPixels(); // Refresh the list of last 5 pixels
    } catch (error) {
      console.error('Error creating pixel:', error);
    }
  };

  const handleExistingPixelSubmit = () => {
    setPixelId(existingPixelId);
  };

  const fetchLastPixels = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pixels/last5`);
      const data = await response.json();
      setLastPixels(data);
    } catch (error) {
      console.error('Error fetching last pixels:', error);
    }
  };

  useEffect(() => {
    fetchLastPixels();
  }, []);

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

      {/* Display Last 5 Pixels Created */}
      <div>
        <h3>Last 5 Pixels Created</h3>
        <ul>
          {lastPixels.map((pixel) => (
            <li key={pixel._id}>
              <strong>ID:</strong> {pixel._id} <br />
              <strong>Name:</strong> {pixel.name} <br />
              <strong>Created At:</strong> {new Date(pixel.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Display Pixel Information */}
      {pixelId && <Pixel pixelId={pixelId} />}
    </div>
  );
};

export default PixelManager;
