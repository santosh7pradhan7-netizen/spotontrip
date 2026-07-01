// pages/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import {
  Plane, TrainFront, Bus, Hotel, MapPin, ChevronRight, ArrowLeftRight,
  CheckCircle2, X, ShieldCheck, AlertTriangle, Activity, Star,
} from 'lucide-react';

const CITIES = [
  { name: 'Delhi', code: 'DEL' }, { name: 'Mumbai', code: 'BOM' }, { name: 'Bengaluru', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' }, { name: 'Chennai', code: 'MAA' }, { name: 'Kolkata', code: 'CCU' },
  { name: 'Pune', code: 'PNQ' }, { name: 'Goa', code: 'GOI' }, { name: 'Jaipur', code: 'JAI' }, { name: 'Kochi', code: 'COK' },
];

const MODES = {
  flights: { label: 'Flights', icon: Plane, accent: '#FF6B35' },
  trains: { label: 'Trains', icon: TrainFront, accent: '#16A34A' },
  buses: { label: 'Bus', icon: Bus, accent: '#FFB800' },
  hotels: { label: 'Hotels', icon: Hotel, accent: '#0EA5E9' },
  packages: { label: 'Packages', icon: MapPin, accent: '#A855F7' },
};

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
const pnr = () => Array.from({ length: 10 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

export default function Home({ initialPackages }) {
  const [tab, setTab] = useState('flights');
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[1]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [hotelCity, setHotelCity] = useState('Goa');

  const [results, setResults] = useState(null);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const swap = () => { setFrom(to); setTo(from); };

  const search = async () => {
    setLoading(true);
    setResults(null);
    try {
      if (tab === 'hotels') {
        const res = await fetch(`/api/search-hotels?city=${encodeURIComponent(hotelCity)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
        setLive(false); // this route is location-name based, not real bookable hotel inventory
      } else if (tab === 'packages') {
        setResults(initialPackages);
        setLive(true);
      } else {
        const res = await fetch(
          `/api/search-transport?mode=${tab}&origin=${encodeURIComponent(from.code)}&destination=${encodeURIComponent(to.code)}&date=${date}`
        );
        const data = await res.json();
        setResults(data.results || []);
        setLive(!!data.live);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setResults(null); }, [tab]);

  return (
    <div className="app">
      <Head>
        <title>SpotOnTrip | Flights, Trains, Bus, Hotels &amp; Packages</title>
        <meta name="description" content="Book flights, trains, buses, hotels and curated packages across India — live fares, instant UPI/card checkout." />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </Head>
      <style>{CSS}</style>

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <div className="brand-name">Spot<span>OnTrip</span></div>
            <div className="brand-tag">the right fare, spotted first</div>
          </div>
        </div>
        <Link href="/packages" className="nav-link">Explore packages</Link>
      </header>

      <section className="hero">
        <h1>Flights, trains, buses,<br />hotels. Spot on.</h1>
        <p>Search once, compare live fares, pay with UPI or card, and get your confirmation by email.</p>
      </section>

      <nav className="tabs">
        {Object.entries(MODES).map(([key, m]) => {
          const Icon = m.icon;
          return (
            <button key={key} className={`tab ${tab === key ? 'active' : ''}`} style={{ '--accent': m.accent }} onClick={() => setTab(key)}>
              <Icon size={16} /> {m.label}
            </button>
          );
        })}
      </nav>

      <main className="content">
        <div className="search-card">
          {tab === 'hotels' ? (
            <div className="field">
              <span className="field-label">City</span>
              <select value={hotelCity} onChange={(e) => setHotelCity(e.target.value)}>
                {CITIES.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
          ) : tab === 'packages' ? (
            <div className="field-note">Showing all curated packages from our catalogue.</div>
          ) : (
            <>
              <div className="field">
                <span className="field-label">From</span>
                <select value={from.code} onChange={(e) => setFrom(CITIES.find((c) => c.code === e.target.value))}>
                  {CITIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
              <button className="swap-btn" onClick={swap} aria-label="Swap"><ArrowLeftRight size={16} /></button>
              <div className="field">
                <span className="field-label">To</span>
                <select value={to.code} onChange={(e) => setTo(CITIES.find((c) => c.code === e.target.value))}>
                  {CITIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
              <div className="field">
                <span className="field-label">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </>
          )}
          <button className="search-btn" onClick={search} disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {results && (
          <div className="results">
            <div className="results-head">
              <span>{results.length} results</span>
              <span className={`live-tag ${live ? 'is-live' : 'is-demo'}`}>
                <Activity size={12} /> {live ? 'Live data' : 'Demo data — provider not connected yet'}
              </span>
            </div>
            {results.length === 0 && <div className="empty">No results. Try a different search.</div>}
            {results.map((item) => (
              <ResultRow key={item.id} item={item} mode={tab} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      {selected && <BookingModal item={selected} mode={tab} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ResultRow({ item, mode, onSelect }) {
  const Icon = MODES[mode].icon;
  const title = item.carrier || item.name || item.operator || item.title;
  const sub = item.flightNo || item.trainNo || item.type || item.location || item.duration_days || '';
  const price = item.price ?? item.pricePerNight ?? 0;
  return (
    <div className="result-row">
      <div className="result-icon" style={{ background: MODES[mode].accent + '22', color: MODES[mode].accent }}>
        <Icon size={18} />
      </div>
      <div className="result-main">
        <div className="result-title">{title}</div>
        <div className="result-sub">{sub}</div>
      </div>
      {(item.departure || item.arrival) && (
        <div className="result-time">
          <span>{item.departure}</span><span className="arrow">→</span><span>{item.arrival}</span>
        </div>
      )}
      <div className="result-action">
        <span className="price">{mode === 'hotels' ? `${inr(price)}/night` : inr(price)}</span>
        <button onClick={() => onSelect(item)}>Select <ChevronRight size={14} /></button>
      </div>
    </div>
  );
}

function BookingModal({ item, mode, onClose }) {
  const [step, setStep] = useState('details'); // details | processing | done | error
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [booking, setBooking] = useState(null);

  const amountRupees = item.price ?? item.pricePerNight ?? 0;
  const validDetails = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 10;

  const pay = async () => {
    setErrorMsg('');
    setStep('processing');
    try {
      // create-order.js expects the amount in RUPEES — it multiplies by 100 itself
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountRupees, currency: 'INR' }),
      });
      const order = await orderRes.json();
      if (!order.id) throw new Error(order.message || 'Could not create order');

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        order_id: order.id,
        name: 'SpotOnTrip',
        description: `${item.carrier || item.name || item.title || 'Booking'}`,
        prefill: { name, email, contact: phone },
        theme: { color: '#FF6B35' },
        notes: {
          customer_name: name,
          package_title: item.carrier || item.name || item.title || mode,
          travel_date: new Date().toISOString().slice(0, 10),
          total_guests: 1,
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verify = await verifyRes.json();
            if (!verify.success) throw new Error('Signature verification failed');

            setBooking({
              id: pnr(),
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: amountRupees,
            });
            setStep('done');
          } catch (err) {
            setErrorMsg('Payment went through, but we could not verify it. Contact support with your payment ID: ' + response.razorpay_payment_id);
            setStep('error');
          }
        },
        modal: { ondismiss: () => setStep('details') },
      });
      rzp.on('payment.failed', (resp) => {
        setErrorMsg('Payment failed: ' + (resp.error?.description || 'please try again.'));
        setStep('error');
      });
      rzp.open();
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
      setStep('error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && step !== 'processing' && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}><X size={18} /></button>

        {step === 'details' && (
          <>
            <h3>Your details</h3>
            <p className="modal-sub">{item.carrier || item.name || item.title} — {inr(amountRupees)}</p>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email (for your confirmation)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button className="primary-btn" disabled={!validDetails} onClick={pay}>
              <ShieldCheck size={16} /> Pay {inr(amountRupees)}
            </button>
          </>
        )}

        {step === 'processing' && <div className="processing"><div className="spinner" /><p>Opening secure checkout…</p></div>}

        {step === 'error' && (
          <div className="processing">
            <AlertTriangle size={32} color="#DC2626" />
            <p>{errorMsg}</p>
            <button className="primary-btn" onClick={() => setStep('details')}>Try again</button>
          </div>
        )}

        {step === 'done' && booking && (
          <div className="confirm">
            <CheckCircle2 size={40} color="#16A34A" />
            <h3>Payment received</h3>
            <p className="modal-sub">A confirmation email is on its way to {email}.</p>
            <div className="ticket">
              <div className="ticket-row"><span>Reference</span><b>{booking.id}</b></div>
              <div className="ticket-row"><span>Payment ID</span><b>{booking.paymentId}</b></div>
              <div className="ticket-row"><span>Amount</span><b>{inr(booking.amount)}</b></div>
            </div>
            <button className="primary-btn" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data: packages, error } = await supabase.from('packages').select('*');
    if (error) throw error;
    return { props: { initialPackages: packages || [] } };
  } catch (e) {
    console.error('Supabase fetch failed:', e.message);
    return { props: { initialPackages: [] } };
  }
}

const CSS = `
* { box-sizing: border-box; }
.app { font-family: 'Inter', sans-serif; background: #0B1D3A; min-height: 100vh; color: #F7F3E8; }
.topbar { display:flex; align-items:center; justify-content:space-between; padding: 18px 28px; border-bottom: 1px solid rgba(247,243,232,0.1); }
.brand { display:flex; align-items:center; gap:10px; }
.brand-mark { width:36px; height:36px; border-radius:9px; background:#FF6B35; display:flex; align-items:center; justify-content:center; color:#0B1D3A; font-weight:800; font-family:'Rajdhani',sans-serif; }
.brand-name { font-family:'Rajdhani', sans-serif; font-weight:700; font-size:20px; }
.brand-name span { color:#FF6B35; }
.brand-tag { font-size:11px; opacity:0.55; text-transform:uppercase; letter-spacing:0.5px; }
.nav-link { color:#F7F3E8; text-decoration:none; font-size:13px; font-weight:600; opacity:0.8; }
.hero { text-align:center; padding: 48px 20px 24px; }
.hero h1 { font-family:'Rajdhani',sans-serif; font-size:34px; font-weight:700; margin:0 0 10px; }
.hero p { opacity:0.65; max-width:480px; margin:0 auto; }
.tabs { display:flex; gap:8px; padding: 0 28px; flex-wrap:wrap; justify-content:center; }
.tab { display:flex; align-items:center; gap:7px; background:rgba(247,243,232,0.06); border:1px solid rgba(247,243,232,0.1); color:#F7F3E8; padding:10px 16px; border-radius:10px 10px 0 0; font-size:13px; font-weight:600; cursor:pointer; opacity:0.6; }
.tab.active { opacity:1; background:rgba(247,243,232,0.1); box-shadow: inset 0 3px 0 var(--accent); }
.content { padding: 22px 20px 60px; max-width: 900px; margin:0 auto; }
.search-card { background:#F7F3E8; color:#0B1D3A; border-radius:14px; padding:18px; display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end; }
.field { display:flex; flex-direction:column; gap:5px; flex:1; min-width:130px; }
.field-label { font-size:11px; text-transform:uppercase; opacity:0.6; font-weight:600; }
.field-note { flex:1; font-size:13px; opacity:0.7; padding: 10px 0; }
.field select, .field input, .modal input { border:1.5px solid rgba(11,29,58,0.15); border-radius:8px; padding:9px 10px; font-size:14px; background:#fff; color:#0B1D3A; }
.swap-btn { border:1.5px solid rgba(11,29,58,0.15); background:#fff; border-radius:8px; padding:9px; cursor:pointer; }
.search-btn { background:#FF6B35; color:#fff; border:none; border-radius:8px; padding:12px 22px; font-weight:700; cursor:pointer; }
.search-btn:disabled { opacity:0.7; }
.results { margin-top:20px; display:flex; flex-direction:column; gap:10px; }
.results-head { display:flex; justify-content:space-between; font-size:12px; opacity:0.7; padding:0 4px; align-items:center; }
.live-tag { display:flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-weight:700; }
.live-tag.is-live { color:#16A34A; background:rgba(22,163,74,0.12); }
.live-tag.is-demo { color:#FFB800; background:rgba(255,184,0,0.12); }
.empty { opacity:0.5; text-align:center; padding: 30px; }
.result-row { background:rgba(247,243,232,0.06); border:1px solid rgba(247,243,232,0.1); border-radius:12px; padding:14px 16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.result-icon { width:38px; height:38px; border-radius:9px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.result-main { min-width:140px; flex:1; }
.result-title { font-weight:700; font-size:14px; }
.result-sub { font-size:12px; opacity:0.6; }
.result-time { display:flex; align-items:center; gap:8px; font-size:13px; opacity:0.8; }
.result-action { display:flex; align-items:center; gap:12px; }
.price { font-weight:700; font-size:14px; }
.result-action button { background:#FF6B35; color:#fff; border:none; padding:8px 14px; border-radius:7px; font-size:12px; font-weight:700; display:flex; align-items:center; gap:4px; cursor:pointer; }
.modal-backdrop { position:fixed; inset:0; background:rgba(5,13,28,0.75); display:flex; align-items:center; justify-content:center; z-index:100; padding:16px; }
.modal { background:#F7F3E8; color:#0B1D3A; border-radius:16px; padding:26px; width:100%; max-width:400px; position:relative; display:flex; flex-direction:column; gap:10px; }
.modal h3 { font-family:'Rajdhani',sans-serif; font-size:22px; margin:0; }
.modal-sub { font-size:12px; opacity:0.65; margin:0 0 6px; }
.modal-close { position:absolute; top:14px; right:14px; background:rgba(11,29,58,0.06); border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; }
.primary-btn { background:#FF6B35; color:#fff; border:none; padding:13px; border-radius:9px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; margin-top:6px; }
.primary-btn:disabled { opacity:0.5; }
.processing { display:flex; flex-direction:column; align-items:center; text-align:center; gap:10px; padding: 20px 0; }
.spinner { width:30px; height:30px; border:3px solid rgba(255,107,53,0.2); border-top-color:#FF6B35; border-radius:50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.confirm { display:flex; flex-direction:column; align-items:center; text-align:center; gap:4px; }
.ticket { width:100%; background:#fff; border-radius:10px; padding:14px; margin:12px 0; }
.ticket-row { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
`;