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
      live = !!(process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET);
      if (live) results = await searchLiveFlights(params);
    } else if (mode === 'trains') {
      // Train prices in transportEngine are random numbers, so never show them as real.
      live = false;
    } else if (mode === 'buses') {
      live = !!(process.env.BUS_API_KEY && process.env.BUS_API_ENDPOINT);
      if (live) results = await searchLiveBuses(params);
    } else {
      return res.status(400).json({ message: 'mode must be flights, trains, or buses' });
    }

    // Remove any placeholder results so customers never see fake options.
    results = results.filter((r) => !String(r.id).includes('FALLBACK'));

    return res.status(200).json({ results, live });
  } catch (error) {
    console.error('search-transport error:', error);
    return res.status(500).json({ message: 'Search failed', error: error.message });
  }
}