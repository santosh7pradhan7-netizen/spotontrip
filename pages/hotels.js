// pages/hotels.js
import { useState } from 'react';
import Head from 'next/head';
import { Hotel, ChevronRight, Star } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import BookingModal from '../components/BookingModal';

const CITIES = ['Goa', 'Delhi', 'Mumbai', 'Bengaluru', 'Jaipur', 'Kochi', 'Udaipur', 'Manali'];
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Hotels() {
  const [city, setCity] = useState(CITIES[0]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const search = async () => {
    setLoading(true); setResults(null);
    try {
      const res = await fetch(`/api/search-hotels?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <SiteLayout>
      <Head><title>Hotels | SpotOnTrip</title></Head>
      <div className="sot-hero">
        <h1>Find a place to stay</h1>
        <p>Browse hotels by city and book instantly.</p>
      </div>

      <div className="sot-search-card">
        <div className="sot-field">
          <span className="sot-field-label">City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <button className="sot-search-btn" onClick={search} disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </div>

      <p style={{ fontSize: 12, opacity: 0.55, marginTop: 10 }}>
        Note: hotel listings here are generated from public location data, not a live hotel inventory provider — treat prices as indicative until a real hotel API is connected.
      </p>

      {results && (
        <div className="sot-results">
          <div className="sot-results-head"><span>{results.length} hotels in {city}</span></div>
          {results.length === 0 && <div className="sot-empty">No hotels found.</div>}
          {results.map((h) => (
            <div className="sot-row" key={h.id}>
              <div className="sot-row-icon" style={{ background: '#10B98122', color: '#10B981' }}><Hotel size={18} /></div>
              <div className="sot-row-main">
                <div className="sot-row-title">{h.name}</div>
                <div className="sot-row-sub">{h.location} · <Star size={11} style={{ verticalAlign: 'middle' }} /> {h.rating}</div>
              </div>
              <div className="sot-row-action">
                <span className="sot-price">{inr(h.pricePerNight)}/night</span>
                <button onClick={() => setSelected(h)}>Select <ChevronRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <BookingModal title={selected.name} amount={selected.pricePerNight} onClose={() => setSelected(null)} />}
    </SiteLayout>
  );
}
