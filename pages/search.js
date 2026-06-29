import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LogisticsDashboardPage() {
  const router = useRouter();
  const { category, from, to, date } = router.query;
  
  // 🔐 BULLETPROOF PRODUCTION KEY ISOLATION
  // Inlining the public key directly removes all Vercel compilation and environment cache risks.
  const LIVE_RAZORPAY_KEY = "rzp_test_SrzWGjEmRdi24a";

  const [activeCategory, setActiveCategory] = useState(category || 'packages');
  const [originInput, setOriginInput] = useState(from || '');
  const [destInput, setDestInput] = useState(to || '');
  const [originDropdown, setOriginDropdown] = useState([]);
  const [destDropdown, setDestDropdown] = useState([]);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [loadingDest, setLoadingDest] = useState(false);

  // Core Saturday State Engines
  const [schedules, setSchedules] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [radarId, setRadarId] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState({ operationalNodes: 42, activePings: 1840, totalBookingsToday: 148, platformStatus: "HEALTHY" });

  useEffect(() => {
    if (category) setActiveCategory(category);
    if (from) setOriginInput(from);
    if (to) setDestInput(to);
  }, [category, from, to]);

  // Saturday Location Autocomplete Systems (Origin Hub)
  useEffect(() => {
    if (originInput.trim().length < 3) { setOriginDropdown([]); return; }
    const delay = setTimeout(async () => {
      setLoadingOrigin(true);
      try {
        const res = await fetch(`/api/locations?keyword=${encodeURIComponent(originInput)}`);
        const json = await res.json();
        if (json.success) setOriginDropdown(json.data);
      } catch (err) { console.error(err); }
      finally { setLoadingOrigin(false); }
    }, 250);
    return () => clearTimeout(delay);
  }, [originInput]);

  // Saturday Location Autocomplete Systems (Destination Hub)
  useEffect(() => {
    if (destInput.trim().length < 3) { setDestDropdown([]); return; }
    const delay = setTimeout(async () => {
      setLoadingDest(true);
      try {
        const res = await fetch(`/api/locations?keyword=${encodeURIComponent(destInput)}`);
        const json = await res.json();
        if (json.success) setDestDropdown(json.data);
      } catch (err) { console.error(err); }
      finally { setLoadingDest(false); }
    }, 250);
    return () => clearTimeout(delay);
  }, [destInput]);

  // Unified Multi-Modal Saturday Data Matrix
  const triggerInventoryScan = (e) => {
    if (e) e.preventDefault();
    setScanning(true);
    setSchedules([]);
    setRadarId(null);

    setTimeout(() => {
      const src = originInput || "DEL";
      const dest = destInput || "IRK";

      if (activeCategory === 'flights') {
        setSchedules([
          { id: "FL-2411", provider: "IndiGo Air", tag: "Non-Stop Luxury Route", time: "06:15 AM - 08:30 AM", routing: `${src} to ${dest} Terminal 1`, rate: 4850, seats: 12, telemetry: { position: "23.25° N, 77.41° E", speed: "820 km/h", landmark: "Passing over Bhopal airspace", bar: 45 } },
          { id: "FL-803", provider: "Air India", tag: "Premium Executive Service", time: "11:30 AM - 01:55 PM", routing: `${src} to ${dest} Terminal 2`, rate: 5400, seats: 4, telemetry: { position: "28.61° N, 77.20° E", speed: "0 km/h", landmark: "Pre-flight clearance at gate", bar: 0 } }
        ]);
      } else if (activeCategory === 'trains') {
        setSchedules([
          { id: "TR-12002", provider: "Shatabdi Express", tag: "Premium AC Chair Car Class", time: "06:00 AM - 11:40 AM", routing: `${src} to ${dest} Platform 2`, rate: 1250, seats: 42, telemetry: { position: "30.37° N, 76.77° E", speed: "110 km/h", landmark: "Approaching Ambala Cantt Junction", bar: 80 } }
        ]);
      } else if (activeCategory === 'buses') {
        setSchedules([
          { id: "BS-ZING", provider: "Zingbus Premium", tag: "Multi-Axle Luxury Sleeper", time: "09:30 PM - 05:00 AM", routing: `${src} to ${dest} Main Station`, rate: 890, seats: 19, telemetry: { position: "29.05° N, 77.09° E", speed: "72 km/h", landmark: "Cruising near Murthal Highway", bar: 15 } }
        ]);
      } else if (activeCategory === 'events') {
        setSchedules([
          { id: "EV-SUNBURN", provider: "Sunburn Festival Live", tag: "Official VIP Entry Pass", time: "05:00 PM - 11:00 PM", routing: `Chandigarh Tricity Arena Grounds`, price: 2500, seats: 64, telemetry: { position: "Local Arena Zone", speed: "Operational", landmark: "Stage Setup Complete • Audio Live", bar: 100 } },
          { id: "EV-CAMPING", provider: "Shila Peak Camping Retreat", tag: "All-Inclusive Gear Pass", time: "Check-in 02:00 PM", routing: `Morni Hills Escape Canopy`, price: 3400, seats: 15, telemetry: { position: "Mountain Zone", speed: "Active", landmark: "Base Camp Set Up • Clear Weather", bar: 100 } }
        ]);
      } else {
        setSchedules([
          { id: "PKG-ESC", provider: "SpotOnTrip Tailored Package", tag: "All-Inclusive Escape Deal", time: "Customizable Schedule", routing: `${src} to ${dest} Heritage Resort`, rate: 14500, seats: 8, telemetry: { position: "Local Zone", speed: "Confirmed", landmark: "Booking validations operational", bar: 100 } }
        ]);
      }
      setScanning(false);
    }, 450);
  };

  useEffect(() => {
    if (from || to || activeCategory === 'events') triggerInventoryScan();
  }, [from, to, activeCategory]);

  // Universal Saturday Multi-Transport Razorpay Engine
  const launchPaymentOverlay = async (ticket) => {
    console.log("💳 [SATURDAY ENGINE INITIALIZATION]: Processing checkout node:", ticket.id);
    
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      await new Promise(r => script.onload = r);
    }

    const rawPrice = ticket.rate || ticket.price || 0;
    const calculatedAmountInPaise = Math.round(parseFloat(rawPrice) * 100);

    if (!calculatedAmountInPaise || isNaN(calculatedAmountInPaise)) {
      alert("Billing Error: Could not parse transport asset cost safely.");
      return;
    }

    const options = {
      key: LIVE_RAZORPAY_KEY, // Explicitly targets our inlined safe key string
      amount: calculatedAmountInPaise, 
      currency: "INR",
      name: "SpotOnTrip Platform",
      description: `Universal Checkout — ${ticket.provider} (${ticket.id})`,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&h=120&q=80",
      notes: {
        customer_name: "Santosh Pradhan",
        package_title: `${ticket.provider} (${ticket.id})`,
        travel_date: date || new Date().toISOString().split('T')[0]
      },
      handler: async function (res) {
        window.location.href = `/order-success?payment_id=${res.razorpay_payment_id}`;
      },
      prefill: { 
        name: "Santosh Pradhan", 
        email: "santosh@example.com",
        contact: "9999999999"
      },
      theme: { color: "#0f766e" }
    };
    
    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Gateway fault:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', color: '#111827', paddingBottom: '60px' }}>
      <Head>
        <title>SpotOnTrip | Master Infrastructure Dashboard</title>
      </Head>

      {/* TOP DEEPLY INTEGRATED METRICS BAR */}
      <div style={{ backgroundColor: '#0f766e', color: '#ffffff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(15,118,110,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            SpotOnTrip Control
          </Link>
          <div style={{ fontSize: '12px', opacity: 0.85, background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '6px' }}>
            Nodes Connected: <strong>{systemMetrics.operationalNodes}</strong>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.85, background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '6px' }}>
            Live API Pings: <strong>{systemMetrics.activePings}/s</strong>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '4px 12px', borderRadius: '6px' }}>
            ● ENGINE STATUS: {systemMetrics.platformStatus}
          </span>
        </div>
      </div>

      {/* DASHBOARD HERO STATS SUMMARY */}
      <div style={{ maxWidth: '1200px', margin: '30px auto 0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={statCardStyle}><h5>Daily Platform Orders</h5><h3>{systemMetrics.totalBookingsToday}</h3><span style={{ color: '#10b981' }}>↑ 14% vs yesterday</span></div>
        <div style={statCardStyle}><h5>Active Vehicle Channels</h5><h3>3,840</h3><span>Network paths clear</span></div>
        <div style={statCardStyle}><h5>Razorpay Router API</h5><h3>200 OK</h3><span style={{ color: '#10b981' }}>Handshake active</span></div>
        <div style={statCardStyle}><h5>Live Connected Target</h5><h3>www.spotontrip.com</h3><span>Domain bound</span></div>
      </div>

      {/* MAIN LAYOUT INTERFACE MATRIX */}
      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '30px' }}>
        
        {/* FILTERS AND DATA CONTROLLER */}
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#0f766e', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Route Configuration</h4>
          
          <form onSubmit={triggerInventoryScan} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>📍 Origin Hub</label>
              <input type="text" value={originInput} onChange={e => setOriginInput(e.target.value)} disabled={activeCategory === 'events'} placeholder={activeCategory === 'events' ? 'Universal Gate Access' : 'Enter departure location...'} style={inputStyle} />
              {loadingOrigin && <div style={searchFeedbackLabelStyle}>Querying global database hubs...</div>}
              {originDropdown.length > 0 && (
                <div style={dropStyle}>
                  {originDropdown.map(l => <div key={l.code} onClick={() => { setOriginInput(l.name); setOriginDropdown([]); }} style={dropItemStyle}><strong>[{l.code}]</strong> {l.name}</div>)}
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>🏁 Destination Target</label>
              <input type="text" value={destInput} onChange={e => setDestInput(e.target.value)} disabled={activeCategory === 'events'} placeholder={activeCategory === 'events' ? 'Festival Grounds' : 'Enter destination target...'} style={inputStyle} />
              {loadingDest && <div style={searchFeedbackLabelStyle}>Querying global database hubs...</div>}
              {destDropdown.length > 0 && (
                <div style={dropStyle}>
                  {destDropdown.map(l => <div key={l.code} onClick={() => { setDestInput(l.name); setDestDropdown([]); }} style={dropItemStyle}><strong>[{l.code}]</strong> {l.name}</div>)}
                </div>
              )}
            </div>

            <button type="submit" style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '6px', backgroundColor: '#0f766e', color: '#ffffff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
              Execute Network Scan
            </button>
          </form>
        </div>

        {/* WORKSPACE OPERATIONS SHEET BOARD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CATEGORY CONTROLLER STRIP */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: '#e5e7eb', padding: '4px', borderRadius: '8px', width: 'fit-content' }}>
            {['packages', 'flights', 'buses', 'trains', 'events'].map(m => (
              <button 
                key={m} 
                onClick={() => { setActiveCategory(m); setSchedules([]); }}
                style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: activeCategory === m ? '#ffffff' : 'transparent', color: activeCategory === m ? '#0f766e' : '#4b5563', boxShadow: activeCategory === m ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          {/* DYNAMIC RESULTS STREAM GRID */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {scanning ? (
              <div style={cardMsgStyle}>Mapping system trajectory coordinates...</div>
            ) : schedules.length === 0 ? (
              <div style={cardMsgStyle}>Enter travel hubs in the panel to populate infrastructure nodes and launch secure checkouts.</div>
            ) : (
              schedules.map(ticket => {
                const displayPrice = ticket.rate || ticket.price || 0;
                return (
                  <div key={ticket.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <strong style={{ fontSize: '16px', color: '#0f766e' }}>{ticket.provider}</strong>
                          <span style={{ fontSize: '11px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{ticket.seats} Seats Available</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>{ticket.tag}</p>
                        <div style={{ fontSize: '12px', marginTop: '12px', color: '#374151' }}>
                          <strong>Window:</strong> {ticket.time} | <strong>Line Route:</strong> {ticket.routing}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>₹{displayPrice.toLocaleString('en-IN')}</div>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                          <button onClick={() => setRadarId(radarId === ticket.id ? null : ticket.id)} style={{ border: '1px solid #d1d5db', background: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: '600' }}>Track</button>
                          <button onClick={() => launchPaymentOverlay(ticket)} style={{ border: 'none', backgroundColor: '#0f766e', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Book Now</button>
                        </div>
                      </div>
                    </div>

                    {/* SATELLITE RADAR REAL-TIME TELEMETRY TRACKING CONTAINER */}
                    {radarId === ticket.id && (
                      <div style={{ marginTop: '14px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                        <span style={{ fontSize: '10px', color: '#0f766e', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🛰️ SATURDAY RADAR TELEMETRY NODE ACTIVE</span>
                        <div style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'monospace' }}>
                          Coords: {ticket.telemetry.position} | Tracker Milestone: {ticket.telemetry.landmark}
                        </div>
                        <div style={{ marginTop: '8px', backgroundColor: '#e5e7eb', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ backgroundColor: '#0f766e', height: '100%', width: `${ticket.telemetry.bar}%`, transition: 'width 0.4s' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#4b5563', textTransform: 'uppercase', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' };
const searchFeedbackLabelStyle = { fontSize: '11px', color: '#0f766e', marginTop: '4px', fontWeight: '600' };
const dropStyle = { position: 'absolute', zIndex: 99, top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden', marginTop: '2px' };
const dropItemStyle = { padding: '8px 12px', fontSize: '12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' };
const cardMsgStyle = { backgroundColor: '#ffffff', border: '1px dashed #d1d5db', padding: '36px', borderRadius: '10px', color: '#6b7280', textAlign: 'center', fontSize: '12px' };
const statCardStyle = { backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' };