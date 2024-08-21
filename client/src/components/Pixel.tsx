import React, { useEffect } from 'react';

interface PixelProps {
  pixelId: string;
}

const Pixel: React.FC<PixelProps> = ({ pixelId }) => {
  useEffect(() => {
    const img = new Image(1, 1);
    img.src = `http://localhost:5001/api/pixel-events/${pixelId}`;
    document.body.appendChild(img);
  }, [pixelId]);

  return (
    <div>
      <p>Pixel {pixelId} is being tracked.</p>
    </div>
  );
};

export default Pixel;
