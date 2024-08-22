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
  const pixelLink = `${import.meta.env.VITE_API_URL}/api/pixel-events/${pixelId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixelLink);
    alert('Pixel link copied to clipboard!');
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pixel-events/events/${pixelId}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching pixel events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const img = new Image(1, 1);
    img.src = pixelLink;

    img.onload = fetchEvents;

    img.onerror = () => {
      console.error('Failed to load the pixel image.');
      setLoading(false);
    };

    document.body.appendChild(img);
  }, [pixelId]);

  return (
    <div>
      <p>Pixel {pixelId} is being tracked.</p>
      <div>
        <p>Pixel Link:</p>
        <input type="text" value={pixelLink} readOnly />
        <button onClick={copyToClipboard}>Copy Link</button>
      </div>
      <button onClick={fetchEvents}>Refresh Events</button>
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
