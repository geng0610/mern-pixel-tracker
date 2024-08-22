import React, { useEffect, useState } from 'react';

interface PixelProps {
  pixelId: string;
}

interface PixelEvent {
  _id: string;
  ip: string;
  userAgent: string;
  eventType: string;
  timestamp: string;
}

const Pixel: React.FC<PixelProps> = ({ pixelId }) => {
  const [events, setEvents] = useState<PixelEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset the loader and events state whenever the pixelId changes
    setLoading(true);
    setEvents([]);

    // Serve the pixel
    const img = new Image(1, 1);
    img.src = `${import.meta.env.VITE_API_URL}/api/pixel-events/${pixelId}`;
    
    img.onload = () => {
      // Fetch the events associated with the pixel after the pixel image is loaded
      const fetchEvents = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pixel-events/events/${pixelId}`);
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error('Error fetching pixel events:', error);
        } finally {
          setLoading(false); // Set loading to false once the fetch is complete
        }
      };

      fetchEvents();
    };

    img.onerror = () => {
      console.error('Failed to load the pixel image.');
      setLoading(false); // Set loading to false even if the image fails to load
    };

    document.body.appendChild(img);
  }, [pixelId]); // Dependency array ensures this runs whenever pixelId changes

  return (
    <div>
      <p>Pixel {pixelId} is being tracked.</p>
      <h3>Events:</h3>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <strong>IP:</strong> {event.ip} <br />
              <strong>User Agent:</strong> {event.userAgent} <br />
              <strong>Event Type:</strong> {event.eventType} <br />
              <strong>Timestamp:</strong> {new Date(event.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pixel;
