// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Home({ initialPackages }) {
  const [activeTab, setActiveTab] = useState('packages'); // Default selection
  const [packagesList] = useState(initialPackages || []);

  // Quick categories configuration object for the dynamic UI Console
  const tabs = [
    { id: 'packages', label: '🏖️ Tour Packages' },
    { id: 'flights', label: '✈️ Flights' },
    { id: 'buses', label: '🚌 Bus Booking' },
    { id: 'trains', label: '🚊 Train Tickets' },
    { id: 'hotels', label: '🏨 Luxury Hotels' },
    { id: 'events', label: '🎟️ Local Events' }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>SpotOnTrip | Premium Local & Global Booking Logistics Hub</title>
        <meta name="description" content="Premium curated travel adventures, flights, buses, trains, hotels, and event ticket booking logistics departing from Rajpura." />
        <style>{`
          .tab-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
          .tab-btn:hover { background-color: rgba(15, 118, 110, 0.08); color: #0f766e; }
          .category-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .category-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08) !important; }
          .search-input { outline: none; border: 1px solid #cbd5e1; transition: border-color 0.2s; }
          .search-input:focus { border-color: #0f766e !important; box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1); }
        `}</style>
      </Head>

      {/* --- SECTION 1: LUXURY HERO SECTION WITH MULTI-MODAL BOOKING CONSOLE --- */}
      <div style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px'
      }}>
        
        {/* Absolute Floating Brand Nav */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#ffffff', margin: 0, fontSize: '1.6rem', fontWeight: '900', letterSpacing: '0.5px' }}>SpotOnTrip</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/packages" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>Explore Trips</Link>
            <Link href="/admin" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>🔐 Terminal Admin</Link>
          </div>
        </div>

        {/* Hero Copy */}
        <div style={{ textAlign: 'center', color: '#ffffff', marginBottom: '40px', maxWidth: '800px', marginTop: '40px' }}>
          <span style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Summer Vacation Season 2026
          </span>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginTop: '16px', marginBottom: '16px', lineHeight: '1.1' }}>Your Gateway to Flawless Logistics</h2>
          <p style={{ color: '#e2e8f0', fontSize: '1.25rem', fontWeight: '400', lineHeight: '1.6' }}>
            Seamlessly reserve customized tour routes, premium regional flights, point-to-point buses, luxury rail transit, stays, and festival events.
          </p>
        </div>

        {/* --- THE MASTER LOGISTICS PANEL CONSOLE --- */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '950px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', overflow: 'hidden' }}>
          
          {/* Categorized Tab Bar Switching Strip */}
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="tab-btn"
                style={{
                  flex: '1',
                  whiteSpace: 'nowrap',
                  padding: '16px 20px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ffffff' : 'transparent',
                  color: activeTab === tab.id ? '#0f766e' : '#64748b',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '3px solid #0f766e' : '3px solid transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* DYNAMIC CONSOLE INPUT INTERFACE PANELS */}
          <div style={{ padding: '24px' }}>
            <form onSubmit={(e) => { e.preventDefault(); alert(`${activeTab.toUpperCase()} inventory interface lookup loop initialized...`); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', alignItems: 'end' }}>
              
              {activeTab === 'packages' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Departure Station</label>
                    <input type="text" className="search-input" defaultValue="Rajpura Junction (RPJ)" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Target Destination</label>
                    <input type="text" className="search-input" placeholder="e.g. Rishikesh River Resort" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Travel Timeline</label>
                    <input type="date" className="search-input" style={{ width: '100%', padding: '11px', borderRadius: '8px', fontSize: '0.95rem', color: '#334155' }} />
                  </div>
                </>
              )}

              {activeTab === 'flights' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>From (Airport)</label>
                    <input type="text" className="search-input" placeholder="Origin Code (e.g. IXC)" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>To (Airport)</label>
                    <input type="text" className="search-input" placeholder="Destination (e.g. DEL)" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Class Selection</label>
                    <select className="search-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                      <option>Economy Comfort</option>
                      <option>Business Premium</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'buses' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Pickup Location</label>
                    <input type="text" className="search-input" defaultValue="Rajpura Bypass" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Drop Destination</label>
                    <input type="text" className="search-input" placeholder="City Terminal Hub" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Coach Class</label>
                    <select className="search-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                      <option>AC Sleeper Multi-Axle Volvo</option>
                      <option>Luxury Seater Scania</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'trains' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>From (Station)</label>
                    <input type="text" className="search-input" defaultValue="Rajpura Jn - RPJ" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>To (Station)</label>
                    <input type="text" className="search-input" placeholder="Station Name / Code" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Travel Class Tier</label>
                    <select className="search-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                      <option>AC First Class (1A)</option>
                      <option>AC 2 Tier (2A)</option>
                      <option>Vande Bharat Chair Car (CC)</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'hotels' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>City / Resort Zone</label>
                    <input type="text" className="search-input" placeholder="Where are you staying?" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Check In - Check Out</label>
                    <input type="text" className="search-input" placeholder="Select dates" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Room Occupancy</label>
                    <select className="search-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                      <option>1 Deluxe Suite Room, 2 Adults</option>
                      <option>2 Family Interconnected, 4 Adults</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'events' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>City Location</label>
                    <input type="text" className="search-input" defaultValue="Chandigarh Tricity" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Event Category</label>
                    <select className="search-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                      <option>Music Festivals & Concerts</option>
                      <option>Amusement & Theme Park Passes</option>
                      <option>Food & Camping Retreats</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Ticket Count</label>
                    <input type="number" className="search-input" defaultValue="1" min="1" style={{ width: '100%', padding: '11px', borderRadius: '8px', fontSize: '0.95rem' }} />
                  </div>
                </>
              )}

              <button type="submit" style={{ backgroundColor: '#0f766e', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)' }}>
                🔍 Search Open Inventory
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* --- SECTION 2: LIVE DYNAMIC TOUR COMBINATIONS SHOWCASE GRID --- */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span style={{ color: '#0f766e', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Selected Holiday Escapes</span>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', margin: '4px 0 0 0', color: '#0f172a' }}>Trending Seasonal Itineraries</h3>
          </div>
          <Link href="/packages" style={{ color: '#0f766e', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none', borderBottom: '2px solid #0f766e', paddingBottom: '2px' }}>
            View Full Inventory Matrix →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {packagesList.slice(0, 3).map((item) => (
            <div key={item.id} className="category-card" style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '220px' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', backdropFilter: 'blur(2px)' }}>🕒 {item.duration}</span>
              </div>
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#0f766e', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>📍 {item.location}</span>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginTop: '4px', marginBottom: '8px', fontWeight: '700' }}>{item.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>{item.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>₹{item.price}<small style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}> / head</small></span>
                  <Link href="/packages" style={{ backgroundColor: '#0f766e', color: '#ffffff', textDecoration: 'none', padding: '10px 18px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>Book Instantly</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: CORE PLATFORM LOGISTICS VALUE METRICS --- */}
      <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚡</div>
            <h5 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 8px 0', color: '#38bdf8' }}>Instant Verification API</h5>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>Every single slot booking triggers synchronous layout checks against live supply availability streams.</p>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛡️</div>
            <h5 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 8px 0', color: '#38bdf8' }}>Escrow Secure Shield</h5>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>Financial clearance paths execution handled safely using hardcoded Razorpay transaction channels.</p>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✉️</div>
            <h5 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 8px 0', color: '#38bdf8' }}>Automated Micro-Receipts</h5>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>The moment a transaction captures, webhooks dispatch real-time digital entry invoices straight to email inboxes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Read inventory metrics straight from Supabase dynamically for deployment generation
export async function getServerSideProps() {
  try {
    const { data: packages, error } = await supabase
      .from('packages')
      .select('*');

    if (error) throw error;

    return {
      props: {
        initialPackages: packages || [],
      },
    };
  } catch (e) {
    console.error('Server side home rendering routing handling error:', e);
    return {
      props: {
        initialPackages: [],
      },
    };
  }
}