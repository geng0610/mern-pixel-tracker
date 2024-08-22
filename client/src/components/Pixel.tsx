import React, { useEffect } from 'react';

interface PixelProps {
  pixelId: string;
}

const Pixel: React.FC<PixelProps> = ({ pixelId }) => {
  useEffect(() => {
    const img = new Image(1, 1);
    img.src = `${import.meta.env.VITE_API_URL}/api/pixel-events/${pixelId}`;
    document.body.appendChild(img);
  }, [pixelId]);

  return (
    <div>
      <p>Pixel {pixelId} is being tracked.</p>
    </div>
  );
};

export default Pixel;
