// pages/flights.js
import { useState } from 'react';
import Head from 'next/head';
import { Plane, ArrowLeftRight, ChevronRight, Activity } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import BookingModal from '../components/BookingModal';

const CITIES = [
  { name: 'Delhi', code: 'DEL' }, { name: 'Mumbai', code: 'BOM' }, { name: 'Bengaluru', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' }, { name: 'Chennai', code: 'MAA' }, { name: 'Kolkata', code: 'CCU' },
  { name: 'Pune', code: 'PNQ' }, { name: 'Goa', code: 'GOI' }, { name: 'Jaipur', code: 'JAI' }, { name: 'Kochi', code: 'COK' },
];
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Flights() {
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[1]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [results, setResults] = useState(null);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const swap = () => { setFrom(to); setTo(from); };

  const search = async () => {
    setLoading(true); setResults(null);
    try {
      const res = await fetch(`/api/search-transport?mode=flights&origin=${from.code}&destination=${to.code}&date=${date}`);
      const data = await res.json();
      setResults(data.results || []);
      setLive(!!data.live);
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <SiteLayout>
      <Head><title>Flights | SpotOnTrip</title></Head>
      <div className="sot-hero">
        <h1>Book flights across India</h1>
        <p>Live fares via Amadeus, instant UPI/card checkout.</p>
      </div>

      <div className="sot-search-card">
        <div className="sot-field">
          <span className="sot-field-label">From</span>
          <select value={from.code} onChange={(e) => setFrom(CITIES.find((c) => c.code === e.target.value))}>
            {CITIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <button className="sot-swap" onClick={swap}><ArrowLeftRight size={16} /></button>
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
        <button className="sot-search-btn" onClick={search} disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </div>

      {results && (
        <div className="sot-results">
          <div className="sot-results-head">
            <span>{results.length} flights</span>
            <span className={`sot-live-tag ${live ? 'is-live' : 'is-demo'}`}><Activity size={12} /> {live ? 'Live via Amadeus' : 'Demo data — Amadeus not reachable'}</span>
          </div>
          {results.length === 0 && <div className="sot-empty">No flights found for this route.</div>}
          {results.map((f) => (
            <div className="sot-row" key={f.id}>
              <div className="sot-row-icon" style={{ background: '#FF6B3522', color: '#FF6B35' }}><Plane size={18} /></div>
              <div className="sot-row-main">
                <div className="sot-row-title">{f.carrier}</div>
                <div className="sot-row-sub">{f.flightNo} · {f.duration}</div>
              </div>
              <div className="sot-row-time"><span>{f.departure}</span><span>→</span><span>{f.arrival}</span></div>
              <div className="sot-row-action">
                <span className="sot-price">{inr(f.price)}</span>
                <button onClick={() => setSelected(f)}>Select <ChevronRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <BookingModal title={`${selected.carrier} ${selected.flightNo}`} amount={selected.price} onClose={() => setSelected(null)} />}
    </SiteLayout>
  );
}
