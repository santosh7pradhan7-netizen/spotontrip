// pages/buses.js
import { useState } from 'react';
import Head from 'next/head';
import { Bus, ArrowLeftRight, ChevronRight, Activity } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import BookingModal from '../components/BookingModal';

const CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Goa', 'Jaipur', 'Kochi'];
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Buses() {
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
      const res = await fetch(`/api/search-transport?mode=buses&origin=${from}&destination=${to}&date=${date}`);
      const data = await res.json();
      setResults(data.results || []);
      setLive(!!data.live);
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <SiteLayout>
      <Head><title>Buses | SpotOnTrip</title></Head>
      <div className="sot-hero">
        <h1>Book intercity buses</h1>
        <p>AC sleepers, seaters and Volvo multi-axle — search and pay in seconds.</p>
      </div>

      <div className="sot-search-card">
        <div className="sot-field">
          <span className="sot-field-label">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <button className="sot-swap" onClick={swap}><ArrowLeftRight size={16} /></button>
        <div className="sot-field">
          <span className="sot-field-label">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
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
            <span>{results.length} buses</span>
            <span className={`sot-live-tag ${live ? 'is-live' : 'is-demo'}`}><Activity size={12} /> {live ? 'Live data' : 'Demo data — bus API not subscribed yet'}</span>
          </div>
          {results.length === 0 && <div className="sot-empty">No buses found for this route.</div>}
          {results.map((b) => (
            <div className="sot-row" key={b.id}>
              <div className="sot-row-icon" style={{ background: '#0EA5E922', color: '#0EA5E9' }}><Bus size={18} /></div>
              <div className="sot-row-main">
                <div className="sot-row-title">{b.operator}</div>
                <div className="sot-row-sub">{b.type} · ★ {b.rating}</div>
              </div>
              <div className="sot-row-time"><span>{b.departure}</span><span>→</span><span>{b.arrival}</span></div>
              <div className="sot-row-action">
                <span className="sot-price">{inr(b.price)}</span>
                <button onClick={() => setSelected(b)}>Select <ChevronRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <BookingModal title={`${selected.operator} · ${selected.type}`} amount={selected.price} onClose={() => setSelected(null)} />}
    </SiteLayout>
  );
}
