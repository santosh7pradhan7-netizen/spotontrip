// pages/flights.js
import { useState } from 'react';
import Head from 'next/head';
import { Plane, ArrowLeftRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

const CITIES = [
  { name: 'Delhi', code: 'DEL' }, { name: 'Mumbai', code: 'BOM' }, { name: 'Bengaluru', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' }, { name: 'Chennai', code: 'MAA' }, { name: 'Kolkata', code: 'CCU' },
  { name: 'Pune', code: 'PNQ' }, { name: 'Goa', code: 'GOI' }, { name: 'Jaipur', code: 'JAI' }, { name: 'Kochi', code: 'COK' },
];

// Your Travelpayouts White Label (runs on your own subdomain).
const WL_BASE = 'https://flights.spotontrip.com';

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

// "2026-12-10" -> "1012" (DDMM, the format the White Label expects)
function ddmmFromIso(iso) {
  const parts = String(iso || '').slice(0, 10).split('-');
  if (parts.length !== 3 || !parts[1] || !parts[2]) return null;
  return parts[2] + parts[1];
}

// "16 Dec, 02:25 pm" -> "1612"
function ddmmFromDeparture(text) {
  const m = /^(\d{1,2})\s+([A-Za-z]{3})/.exec(String(text || '').trim());
  if (!m) return null;
  const mm = MONTHS[m[2].toLowerCase()];
  if (!mm) return null;
  return m[1].padStart(2, '0') + mm;
}

// Opens the White Label with the search already filled in (1 adult, economy).
function whiteLabelLink(origin, destination, ddmm) {
  if (!origin || !destination || !ddmm) return WL_BASE;
  return `${WL_BASE}/?flightSearch=${origin}${ddmm}${destination}1`;
}

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Flights() {
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[1]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };

  const search = async () => {
    if (from.code === to.code) {
      setResults([]);
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch(
        `/api/search-transport?mode=flights&origin=${from.code}&destination=${to.code}&date=${date}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const liveSearchUrl = whiteLabelLink(from.code, to.code, ddmmFromIso(date));

  const liveSearchButton = (
    <a
      href={liveSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block', marginTop: 10, padding: '10px 18px', borderRadius: 10,
        background: '#FF6B35', color: '#fff', fontWeight: 700, textDecoration: 'none',
      }}
    >
      Search live fares on SpotOnTrip Flights
    </a>
  );

  return (
    <SiteLayout>
      <Head><title>Flights | SpotOnTrip</title></Head>

      <div className="sot-hero">
        <h1>Search flights across India</h1>
        <p>Compare recently seen fares from airlines and travel partners.</p>
      </div>

      <div className="sot-search-card">
        <div className="sot-field">
          <span className="sot-field-label">From</span>
          <select value={from.code} onChange={(e) => setFrom(CITIES.find((c) => c.code === e.target.value))}>
            {CITIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>

        <button className="sot-swap" onClick={swap} aria-label="Swap cities">
          <ArrowLeftRight size={16} />
        </button>

        <div className="sot-field">
          <span className="sot-field-label">To</span>
          <select value={to.code} onChange={(e) => setTo(CITIES.find((c) => c.code === e.target.value))}>
            {CITIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>

        <div className="sot-field">
          <span className="sot-field-label">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <button className="sot-search-btn" onClick={search} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {results && (
        <div className="sot-results">
          {results.length > 0 && (
            <div className="sot-results-head">
              <span>{results.length} fares found</span>
              <span style={{ fontSize: 12, opacity: 0.65 }}>
                These prices were seen recently and can change. Check live fares for today&rsquo;s price in ₹.
              </span>
              {from.code !== to.code && <div>{liveSearchButton}</div>}
            </div>
          )}

          {results.length === 0 && (
            <div className="sot-empty">
              <p>
                {from.code === to.code
                  ? 'Please choose two different cities.'
                  : "We couldn't find recent fares for this route and date. Try another date or route, or search live fares below."}
              </p>
              {from.code !== to.code && liveSearchButton}
            </div>
          )}

          {results.map((f) => {
            const dealUrl = whiteLabelLink(
              from.code,
              to.code,
              ddmmFromDeparture(f.departure) || ddmmFromIso(date)
            );
            return (
              <div className="sot-row" key={f.id}>
                <div className="sot-row-icon" style={{ background: '#FF6B3522', color: '#FF6B35' }}>
                  <Plane size={18} />
                </div>

                <div className="sot-row-main">
                  <div className="sot-row-title">{f.carrier}</div>
                  <div className="sot-row-sub">
                    {[f.flightNo, f.duration].filter(Boolean).join(' · ')}
                  </div>
                </div>

                <div className="sot-row-time">
                  <span>{f.departure}</span>
                  {f.arrival && <span>→</span>}
                  {f.arrival && <span>{f.arrival}</span>}
                </div>

                <div className="sot-row-action">
                  <span className="sot-price">from {inr(f.price)}</span>
                  <a
                    href={dealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 10, fontWeight: 700, color: '#FF6B35', textDecoration: 'none' }}
                  >
                    Check live fare →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SiteLayout>
  );
}