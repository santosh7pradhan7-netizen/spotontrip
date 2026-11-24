// pages/api/search-transport.js
import { searchLiveBuses } from '../../lib/transportEngine';

const AIRLINES = {
  AI: 'Air India', IX: 'Air India Express', '6E': 'IndiGo', UK: 'Vistara',
  SG: 'SpiceJet', QP: 'Akasa Air', S5: 'Star Air', '9I': 'Alliance Air',
  EK: 'Emirates', QR: 'Qatar Airways', EY: 'Etihad', SQ: 'Singapore Airlines',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { mode, origin, destination, date } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ message: 'origin and destination are required' });
  }

  const travelDate = date || new Date().toISOString().slice(0, 10);

  // TEMPORARY diagnostics: shows only names and yes/no values, never secrets.
  const debug = {
    hasToken: !!process.env.TRAVELPAYOUTS_TOKEN,
    hasMarker: !!process.env.TRAVELPAYOUTS_MARKER,
    vercelEnv: process.env.VERCEL_ENV || null,
    productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || null,
    visibleNames: Object.keys(process.env).filter((k) => /TRAVEL|PAYOUT|MARKER|SUPABASE/i.test(k)),
  };

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
          `&departure_at=${encodeURIComponent(travelDate.slice(0, 7))}` +
          '&currency=inr&sorting=price&one_way=true&limit=30' +
          `&token=${encodeURIComponent(token)}`;

        try {
          const r = await fetch(url);
          debug.status = r.status;
          const json = await r.json();
          debug.success = json.success;
          debug.apiError = json.error || null;

          const rows = Array.isArray(json.data) ? json.data : [];
          debug.rows = rows.length;

          let mapped = rows.map((f, i) => {
            const dep = f.departure_at ? new Date(f.departure_at) : null;
            const mins = Number(f.duration) || 0;
            const stops = Number(f.transfers) || 0;
            const stopsText = stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`;
            const durationText = mins ? `${Math.floor(mins / 60)}h ${mins % 60}m` : '';
            const link = f.link
              ? `https://www.aviasales.com${f.link}${f.link.includes('?') ? '&' : '?'}marker=${marker || ''}`
              : null;

            return {
              id: `TP-${i}-${f.flight_number || ''}`,
              depTime: dep ? dep.getTime() : 0,
              carrier: AIRLINES[f.airline] || f.airline || 'Airline',
              flightNo: `${f.airline || ''}${f.flight_number ? '-' + f.flight_number : ''}`,
              departure: dep
                ? dep.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                : '',
              arrival: '',
              duration: [durationText, stopsText].filter(Boolean).join(' · '),
              price: Math.round(Number(f.price)),
              link,
            };
          });

          const chosen = new Date(travelDate + 'T00:00:00').getTime();
          const onOrAfter = mapped.filter((m) => m.depTime >= chosen);
          if (onOrAfter.length > 0) mapped = onOrAfter;

          results = mapped.slice(0, 10).map(({ depTime, ...rest }) => rest);
          live = results.length > 0;
        } catch (e) {
          debug.fetchError = String(e && e.message ? e.message : e);
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
    return res.status(200).json({ results, live, debug });
  } catch (error) {
    console.error('search-transport error:', error);
    return res.status(500).json({ message: 'Search failed', error: error.message, debug });
  }
}