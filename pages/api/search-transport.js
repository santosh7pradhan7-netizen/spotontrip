// pages/api/search-transport.js
import { searchLiveFlights, searchLiveTrains, searchLiveBuses } from '../../lib/transportEngine';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { mode, origin, destination, date } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ message: 'origin and destination are required' });
  }

  const params = { origin, destination, travelDate: date || new Date().toISOString().slice(0, 10) };

  try {
    let results = [];
    let live = false;

    if (mode === 'flights') {
      results = await searchLiveFlights(params);
      live = !!(process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET);
    } else if (mode === 'trains') {
      results = await searchLiveTrains(params);
      live = !!process.env.RAPIDAPI_KEY;
    } else if (mode === 'buses') {
      results = await searchLiveBuses(params);
      live = !!process.env.BUS_API_KEY;
    } else {
      return res.status(400).json({ message: 'mode must be flights, trains, or buses' });
    }

    // `live` tells the frontend whether this came from a real provider or the
    // built-in fallback data, so the UI can be honest about which one it's showing.
    return res.status(200).json({ results, live });
  } catch (error) {
    console.error('search-transport error:', error);
    return res.status(500).json({ message: 'Search failed', error: error.message });
  }
}
