// pages/api/track.js
export default async function handler(req, res) {
  const { type, id } = req.query; // e.g., type=flight, id=AI101
  
  try {
    // Exchange credentials securely on the server side
    const apiResponse = await fetch(`https://api.aviation-edge.com/v1/aircraftTracker?key=YOUR_SECRET_KEY&flightIcao=${id}`);
    const trackingData = await apiResponse.json();
    
    // Send the raw geographical coordinates back to your frontend layout securely
    return res.status(200).json({
      lat: trackingData[0]?.aircraft?.latitude || 30.48,  // Fallback coordinates
      lng: trackingData[0]?.aircraft?.longitude || 76.60,
      speed: trackingData[0]?.aircraft?.speed || 0,
      status: trackingData[0]?.status || "In-Transit"
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to connect to global transit stream" });
  }
}