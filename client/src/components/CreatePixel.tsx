import React, { useState } from 'react';
import Pixel from './Pixel';

const CreatePixel: React.FC = () => {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  const createPixel = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pixels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    console.log('Response Headers:', response.headers);
    setPixelId(data._id);
  };

  return (
    <div>
      <h2>Create a New Pixel</h2>
      <input
        type="text"
        placeholder="Pixel Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createPixel}>Create Pixel</button>

      {pixelId && (
        <div>
          <p>Pixel created with ID: {pixelId}</p>
          <Pixel pixelId={pixelId} />
        </div>
      )}
    </div>
  );
};

export default CreatePixel;
