// components/TrackingMap.js
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TrackingMap({ vehicleId, type }) {
  const [position, setPosition] = useState([30.4897, 76.5910]); // Default Rajpura View Lat/Lng
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    async function updateCoordinates() {
      const res = await fetch(`/api/track?type=${type}&id=${vehicleId}`);
      const data = await res.json();
      if (data.lat && data.lng) {
        setPosition([data.lat, data.lng]);
        setMetrics(data);
      }
    }

    // Initialize immediate call and establish a persistent 30-second synchronization loop
    updateCoordinates();
    const interval = setInterval(updateCoordinates, 30000); 
    return () => clearInterval(interval);
  }, [vehicleId]);

  return (
    <div style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={position} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <strong>Tracking ID: {vehicleId}</strong><br />
            Speed: {metrics?.speed} km/h <br />
            Status: {metrics?.status}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}