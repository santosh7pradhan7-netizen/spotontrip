// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Home({ initialPackages }) {
  const [activeTab, setActiveTab] = useState('packages'); 
  const [packagesList] = useState(initialPackages || []);

  // --- INTEGRATION STATES ---
  const [hotelSearchCity, setHotelSearchCity] = useState('Goa');
  const [liveHotels, setLiveHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [hasSearchedHotels, setHasSearchedHotels] = useState(false);

  const tabs = [
    { id: 'packages', label: '🏖️ Tour Packages' },
    { id: 'flights', label: '✈️ Flights' },
    { id: 'buses', label: '🚌 Bus Booking' },
    { id: 'trains', label: '🚊 Train Tickets' },
    { id: 'hotels', label: '🏨 Luxury Hotels' },
    { id: 'events', label: '🎟️ Local Events' }
  ];

  // Separate Dynamic Handler for the Luxury Hotels stream
  const handleHotelSearch = async (e) => {
    e.preventDefault();
    setLoadingHotels(true);
    setHasSearchedHotels(true);
    try {
      const res = await fetch(`/api/search-hotels?city=${encodeURIComponent(hotelSearchCity)}`);
      if (res.ok) {
        const data = await res.json();
        setLiveHotels(data);
      }
    } catch (err) {
      console.error("Live hotel connection channel error:", err);
    } finally {
      setLoadingHotels(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif', color: '#111827' }}>
      <Head>
        <title>SpotOnTrip | Premium Curated Logistics & Escapes</title>
        <meta name="description" content="Premium curated travel adventures, flights, buses, trains, hotels, and event ticket booking logistics departing from Rajpura." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          .tab-btn { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
          .tab-btn:hover { background-color: #f1f5f1; color: #0f766e; }
          .package-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid #e9e7e1; }
          .package-card:hover { transform: translateY(-6px); box-shadow: 0 20px 35px -10px rgba(15, 118, 110, 0.08) !important; border-color: #0f766e; }
          .search-input { outline: none; border: 1px solid #dcdad2; transition: all 0.2s ease; background-color: #ffffff; color: #0e2a1b; font-weight: 600; }
          .search-input:focus { border-color: #0f766e !important; box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.08); background-color: #ffffff; }
        `}</style>
      </Head>

      {/* --- SECTION 1: LUXURY HERO HEADER BACKGROUND --- */}
      <div style={heroWrapperStyle}>
        
        {/* Floating Premium Nav Bar */}
        <nav style={navBarStyle}>
          <h1 style={logoStyle}>SpotOnTrip <span style={{ fontSize: '13px', fontStyle: 'italic', color: '#14b8a6', fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '0' }}>escapes</span></h1>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <Link href="/packages" style={navLinkStyle}>Explore Trips</Link>
            <Link href="/admin" style={adminLinkStyle}>🔐 Terminal Admin</Link>
          </div>
        </nav>

        {/* Core Hero Copy Restored */}
        <div style={heroCenterContainerStyle}>
          <span style={heroTagStyle}>Summer Vacation Season 2026</span>
          <h2 style={heroHeadingStyle}>Your Gateway to Flawless Logistics</h2>
          <p style={heroSubheadingStyle}>
            Seamlessly reserve customized tour routes, premium regional flights, point-to-point buses, luxury rail transit, stays, and festival events.
          </p>
        </div>

        {/* --- THE MASTER LOGISTICS PANEL CONSOLE (ELEVATED DESIGN) --- */}
        <div style={consoleCardWrapperStyle}>
          
          {/* Categorized Tab Bar Strip */}
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #e9e7e1', backgroundColor: '#fcfbf7', padding: '4px 4px 0 4px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="tab-btn"
                style={{
                  flex: '1',
                  whiteSpace: 'nowrap',
                  padding: '18px 24px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ffffff' : 'transparent',
                  color: activeTab === tab.id ? '#0f766e' : '#6b7280',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderRadius: activeTab === tab.id ? '8px 8px 0 0' : '0',
                  borderBottom: activeTab === tab.id ? '3px solid #0f766e' : '3px solid transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* INPUT FORM CHANNELS */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'hotels' ? (
              /* SMOOTH INTEGRATED HOTEL OPTION GRID TRIGGER FORM */
              <form onSubmit={handleHotelSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'end' }}>
                <div>
                  <label style={inputLabelStyle}>City / Resort Zone</label>
                  <select 
                    value={hotelSearchCity} 
                    onChange={(e) => setHotelSearchCity(e.target.value)}
                    className="search-input" 
                    style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px', cursor: 'pointer' }}
                  >
                    <option value="Goa">Goa Coastline</option>
                    <option value="Mumbai">Mumbai Metro</option>
                    <option value="Delhi">Delhi Capital</option>
                  </select>
                </div>
                <div>
                  <label style={inputLabelStyle}>Check In - Check Out</label>
                  <input type="text" className="search-input" defaultValue="10 Jul - 15 Jul 2026" style={inputElementStyle} />
                </div>
                <div>
                  <label style={inputLabelStyle}>Room Occupancy</label>
                  <select className="search-input" style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px' }}>
                    <option value="Deluxe Room">1 Deluxe Suite, 2 Adults</option>
                    <option value="Family Suite">2 Family Suite, 4 Adults</option>
                  </select>
                </div>
                <button type="submit" style={searchSubmitButtonStyle}>
                  {loadingHotels ? '🔄 Syncing Feeds...' : '🔍 Search Live Inventory'}
                </button>
              </form>
            ) : (
              /* RESTORED PREVIOUS ROUTING FOR CONVENTIONAL TABS */
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const fromVal = e.target.elements[0]?.value || '';
                  const toVal = e.target.elements[1]?.value || '';
                  const dateOrTierVal = e.target.elements[2]?.value || '';
                  window.location.href = `/search?category=${activeTab}&from=${encodeURIComponent(fromVal)}&to=${encodeURIComponent(toVal)}&date=${encodeURIComponent(dateOrTierVal)}&tier=${encodeURIComponent(dateOrTierVal)}`;
                }} 
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'end' }}
              >
                {activeTab === 'packages' && (
                  <>
                    <div>
                      <label style={inputLabelStyle}>Departure Station</label>
                      <input type="text" className="search-input" defaultValue="Rajpura Junction (RPJ)" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Target Destination</label>
                      <input type="text" className="search-input" placeholder="e.g. Rishikesh River Resort" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Travel Timeline</label>
                      <input type="date" className="search-input" style={inputElementStyle} />
                    </div>
                  </>
                )}

                {activeTab === 'flights' && (
                  <>
                    <div>
                      <label style={inputLabelStyle}>From (Airport)</label>
                      <input type="text" className="search-input" placeholder="Origin Code (e.g. IXC)" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>To (Airport)</label>
                      <input type="text" className="search-input" placeholder="Destination (e.g. DEL)" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Class Selection</label>
                      <select className="search-input" style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px' }}>
                        <option value="Economy">Economy Comfort</option>
                        <option value="Business">Business Premium</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'buses' && (
                  <>
                    <div>
                      <label style={inputLabelStyle}>Pickup Location</label>
                      <input type="text" className="search-input" defaultValue="Rajpura Bypass" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Drop Destination</label>
                      <input type="text" className="search-input" placeholder="City Terminal Hub" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Coach Class</label>
                      <select className="search-input" style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px' }}>
                        <option value="AC Sleeper">AC Sleeper Volvo</option>
                        <option value="Luxury Seater">Luxury Seater Scania</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'trains' && (
                  <>
                    <div>
                      <label style={inputLabelStyle}>From (Station)</label>
                      <input type="text" className="search-input" defaultValue="Rajpura Jn - RPJ" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>To (Station)</label>
                      <input type="text" className="search-input" placeholder="Station Name / Code" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Travel Class Tier</label>
                      <select className="search-input" style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px' }}>
                        <option value="1A">AC First Class (1A)</option>
                        <option value="2A">AC 2 Tier (2A)</option>
                        <option value="CC">Vande Bharat (CC)</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'events' && (
                  <>
                    <div>
                      <label style={inputLabelStyle}>City Location</label>
                      <input type="text" className="search-input" defaultValue="Chandigarh Tricity" style={inputElementStyle} />
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Event Category</label>
                      <select className="search-input" style={{ ...inputElementStyle, backgroundColor: '#fff', height: '47px' }}>
                        <option value="Music Festivals">Music Festivals & Concerts</option>
                        <option value="Amusement Parks">Amusement Park Passes</option>
                        <option value="Food Retreats">Food & Camping Retreats</option>
                      </select>
                    </div>
                    <div>
                      <label style={inputLabelStyle}>Ticket Count</label>
                      <input type="number" className="search-input" defaultValue="1" min="1" style={inputElementStyle} />
                    </div>
                  </>
                )}

                <button type="submit" style={searchSubmitButtonStyle}>
                  🔍 Search Open Inventory
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* --- LIVE INTERACTIVE RESULTS DISPLAY AND DEFAULT MARGIN SHOWCASE --- */}
      <div style={{ maxWidth: '1200px', margin: '100px auto 80px auto', padding: '0 24px' }}>
        
        {/* HOTEL LIVE RESULT GRID SECTION OR DEFAULT TOUR MATRIX */}
        {activeTab === 'hotels' && hasSearchedHotels ? (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ color: '#0f766e', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '4px' }}>
                Verified Room Allotments
              </span>
              <h3 style={{ fontSize: '2.4rem', fontWeight: '700', margin: '0', color: '#0e2a1b', fontFamily: '"Playfair Display", serif' }}>
                Available Stays in {hotelSearchCity}
              </h3>
            </div>

            {loadingHotels ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#0f766e', fontWeight: '700' }}>
                🔄 Synchronizing live logistics paths from distribution hubs...
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
                {liveHotels.map((hotel) => (
                  <div key={hotel.id} className="package-card" style={packageCardElementStyle}>
                    <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                      <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
                        {hotel.tags?.map((tag, idx) => (
                          <span key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#0e2a1b', padding: '4px 10px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span style={packageDurationBadgeStyle}>★ {hotel.rating} Rating</span>
                    </div>
                    <div style={packageCardBodyStyle}>
                      <div>
                        <span style={packageLocLabelStyle}>📍 {hotel.location}</span>
                        <h4 style={packageCardTitleStyle}>{hotel.name}</h4>
                        <p style={packageCardDescStyle}>Premium dynamic room allotment directly mapped from global distribution partners.</p>
                      </div>
                      <div style={packageCardFooterStyle}>
                        <span style={packageCardPriceStyle}>₹{hotel.pricePerNight.toLocaleString('en-IN')}<small style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '400' }}> / night</small></span>
                        <Link href={`/booking?id=${hotel.id}&type=hotel&price=${hotel.pricePerNight}`} style={packageCardButtonStyle}>Book Instantly</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* TRADITIONAL RESTORED SELECTION GRID FOR ALL OTHER CHANNELS */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <span style={{ color: '#0f766e', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '4px' }}>Top Selected Holiday Escapes</span>
                <h3 style={{ fontSize: '2.4rem', fontWeight: '700', margin: '0', color: '#0e2a1b', fontFamily: '"Playfair Display", serif' }}>Trending Seasonal Itineraries</h3>
              </div>
              <Link href="/packages" style={inventoryLinkTriggerStyle}>
                View Full Inventory Matrix →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
              {packagesList.length === 0 ? (
                [
                  { id: "mock-1", title: "Rishikesh Luxury River Canopy Resort", location: "Rishikesh, Uttarakhand", duration: "4 Days, 3 Nights", price: "14,500", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", desc: "Premium river-facing luxury suites containing private beach camp accesses and guided whitewater rapids." },
                  { id: "mock-2", title: "Manali Alpine Sanctuary Cottage Stay", location: "Manali, Himachal", duration: "5 Days, 4 Nights", price: "18,200", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80", desc: "Breathtaking snow-peaks terrace cottages equipped with customized paragliding launch pads." },
                  { id: "mock-3", title: "Thar Desert Royal Luxury Tent Camping", location: "Jaisalmer, Rajasthan", duration: "3 Days, 2 Nights", price: "11,900", img: "https://images.unsplash.com/photo-1473116763269-255f74e7e6d0?auto=format&fit=crop&w=600&q=80", desc: "Curated dunes expeditions complete with traditional heritage evening folk setups." }
                ].map(item => (
                  <div key={item.id} className="package-card" style={packageCardElementStyle}>
                    <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={packageDurationBadgeStyle}>🕒 {item.duration}</span>
                    </div>
                    <div style={packageCardBodyStyle}>
                      <div>
                        <span style={packageLocLabelStyle}>📍 {item.location}</span>
                        <h4 style={packageCardTitleStyle}>{item.title}</h4>
                        <p style={packageCardDescStyle}>{item.desc}</p>
                      </div>
                      <div style={packageCardFooterStyle}>
                        <span style={packageCardPriceStyle}>₹{item.price}<small style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '400' }}> / head</small></span>
                        <Link href="/packages" style={packageCardButtonStyle}>Book Instantly</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                packagesList.slice(0, 3).map((item) => (
                  <div key={item.id} className="package-card" style={packageCardElementStyle}>
                    <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={packageDurationBadgeStyle}>🕒 {item.duration}</span>
                    </div>
                    <div style={packageCardBodyStyle}>
                      <div>
                        <span style={packageLocLabelStyle}>📍 {item.location}</span>
                        <h4 style={packageCardTitleStyle}>{item.title}</h4>
                        <p style={packageCardDescStyle}>{item.description}</p>
                      </div>
                      <div style={packageCardFooterStyle}>
                        <span style={packageCardPriceStyle}>₹{item.price}<small style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '400' }}> / head</small></span>
                        <Link href="/packages" style={packageCardButtonStyle}>Book Instantly</Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- SECTION 3: CORE PLATFORM VALUE METRICS --- */}
      <div style={{ backgroundColor: '#0e2a1b', color: '#ffffff', padding: '90px 24px', borderTop: '4px solid #14b8a6' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.6rem', marginBottom: '16px' }}>⚡</div>
            <h5 style={metricTitleStyle}>Instant Verification API</h5>
            <p style={metricDescStyle}>Every single slot booking triggers synchronous layout checks against live supply availability streams.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.6rem', marginBottom: '16px' }}>🛡️</div>
            <h5 style={metricTitleStyle}>Escrow Secure Shield</h5>
            <p style={metricDescStyle}>Financial clearance paths execution handled safely using hardcoded Razorpay transaction channels.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.6rem', marginBottom: '16px' }}>✉️</div>
            <h5 style={metricTitleStyle}>Automated Micro-Receipts</h5>
            <p style={metricDescStyle}>The moment a transaction captures, webhooks dispatch real-time digital entry invoices straight to email inboxes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// THEMED SYSTEM DESIGN OBJECTS
const heroWrapperStyle = {
  position: 'relative', 
  minHeight: '85vh', 
  backgroundImage: 'linear-gradient(rgba(14, 42, 27, 0.45), rgba(14, 42, 27, 0.75)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")', 
  backgroundSize: 'cover', 
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '120px 20px 80px 20px'
};

const navBarStyle = {
  position: 'absolute', top: 0, left: 0, right: 0, padding: '28px 40px', display: 'flex', justifyXontent: 'space-between', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', zIndex: 10
};

const logoStyle = {
  color: '#ffffff', margin: 0, fontSize: '1.75rem', fontWeight: '800', fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em'
};

const navLinkStyle = {
  color: '#ffffff', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', letterSpacing: '0.02em'
};

const adminLinkStyle = {
  color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '6px', backdropFilter: 'blur(4px)'
};

const heroCenterContainerStyle = {
  textAlign: 'center', color: '#ffffff', marginBottom: '44px', maxWidth: '780px'
};

const heroTagStyle = {
  backgroundColor: 'rgba(20, 184, 166, 0.25)', color: '#2dd4bf', padding: '6px 18px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', border: '1px solid rgba(45,212,191,0.3)'
};

const heroHeadingStyle = {
  fontSize: '3.6rem', fontWeight: '700', marginTop: '20px', marginBottom: '18px', lineHeight: '1.15', fontFamily: '"Playfair Display", serif'
};

const heroSubheadingStyle = {
  color: '#f0fdfa', fontSize: '1.2rem', fontWeight: '400', lineHeight: '1.65', opacity: '0.95'
};

const consoleCardWrapperStyle = {
  backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '960px', boxShadow: '0 30px 60px -15px rgba(14, 42, 27, 0.35)', overflow: 'hidden', border: '1px solid #e9e7e1'
};

const inputLabelStyle = {
  display: 'block', fontSize: '0.72rem', fontWeight: '800', color: '#4b5563', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
};

const inputElementStyle = {
  width: '100%', padding: '13px 14px', borderRadius: '6px', fontSize: '0.92rem'
};

const searchSubmitButtonStyle = {
  backgroundColor: '#0f766e', color: '#ffffff', border: 'none', padding: '14px 24px', borderRadius: '6px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 6px 20px rgba(15, 118, 110, 0.25)', height: '47px', width: '100%'
};

const inventoryLinkTriggerStyle = {
  color: '#0f766e', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none', borderBottom: '2px solid #0f766e', paddingBottom: '3px', letterSpacing: '0.01em'
};

const packageCardElementStyle = {
  backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(14,42,27,0.01)', display: 'flex', flexDirection: 'column'
};

const packageDurationBadgeStyle = {
  position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(14, 42, 27, 0.85)', color: '#ffffff', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', backdropFilter: 'blur(4px)'
};

const packageCardBodyStyle = {
  padding: '26px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyXontent: 'space-between', justifyContent: 'space-between'
};

const packageLocLabelStyle = {
  color: '#0f766e', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px'
};

const packageCardTitleStyle = {
  fontSize: '1.35rem', color: '#0e2a1b', marginTop: '6px', marginBottom: '10px', fontWeight: '700', fontFamily: '"Playfair Display", serif'
};

const packageCardDescStyle = {
  color: '#4b5563', fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 24px 0'
};

const packageCardFooterStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f2ee', paddingTop: '18px'
};

const packageCardPriceStyle = {
  fontSize: '1.55rem', fontWeight: '800', color: '#0e2a1b'
};

const packageCardButtonStyle = {
  backgroundColor: '#0f766e', color: '#ffffff', textDecoration: 'none', padding: '11px 20px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(15,118,110,0.15)'
};

const metricTitleStyle = {
  fontSize: '1.2rem', fontWeight: '700', margin: '0 0 10px 0', color: '#2dd4bf', letterSpacing: '-0.01em'
};

const metricDescStyle = {
  color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.65', margin: 0, opacity: '0.9'
};

export async function getServerSideProps() {
  try {
    const { data: packages, error } = await supabase.from('packages').select('*');
    if (error) throw error;
    return { props: { initialPackages: packages || [] } };
  } catch (e) {
    console.error('Server side database fetch bypass loop:', e.message);
    return { props: { initialPackages: [] } };
  }
}