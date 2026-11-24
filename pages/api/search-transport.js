// pages/api/search-transport.js
import { searchLiveBuses } from '../../lib/transportEngine';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { mode, origin, destination, date } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ message: 'origin and destination are required' });
  }

  const travelDate = date || new Date().toISOString().slice(0, 10);

  try {
    let results = [];
    let live = false;

    if (mode === 'flights') {
      const token = process.env.TRAVELPAYOUTS_TOKEN;
      const marker = process.env.TRAVELPAYOUTS_MARKER;
      if (token) {
        const url =
          'https://api.travelpayouts.com/aviasales/v3/prices_for_dates' +
          `?origin=${encodeURIComponent(origin)}` +
          `&destination=${encodeURIComponent(destination)}` +
          `&departure_at=${encodeURIComponent(travelDate)}` +
          '&currency=inr&sorting=price&one_way=true&limit=10' +
          `&token=${encodeURIComponent(token)}`;

        const r = await fetch(url);
        if (r.ok) {
          const json = await r.json();
          const rows = Array.isArray(json.data) ? json.data : [];
          results = rows.map((f, i) => {
            const dep = f.departure_at ? new Date(f.departure_at) : null;
            const mins = Number(f.duration) || 0;
            const link = f.link
              ? `https://www.aviasales.com${f.link}${f.link.includes('?') ? '&' : '?'}marker=${marker || ''}`
              : null;
            return {
              id: `TP-${i}-${f.flight_number || ''}`,
              carrier: f.airline || 'Airline',
              flightNo: `${f.airline || ''}${f.flight_number ? '-' + f.flight_number : ''}`,
              departure: dep ? dep.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '',
              arrival: '',
              duration: mins ? `${Math.floor(mins / 60)}h ${mins % 60}m` : '',
              price: Math.round(Number(f.price)),
              link,
            };
          });
          live = results.length > 0;
        }
      }
    } else if (mode === 'trains') {
      live = false; // no trustworthy source connected
    } else if (mode === 'buses') {
      live = !!(process.env.BUS_API_KEY && process.env.BUS_API_ENDPOINT);
      if (live) results = await searchLiveBuses({ origin, destination, travelDate });
    } else {
      return res.status(400).json({ message: 'mode must be flights, trains, or buses' });
    }

    results = results.filter((r) => !String(r.id).includes('FALLBACK'));
    return res.status(200).json({ results, live });
  } catch (error) {
    console.error('search-transport error:', error);
    return res.status(500).json({ message: 'Search failed', error: error.message });
  }
}