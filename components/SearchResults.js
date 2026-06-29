'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState('flight');
  const [loading, setLoading] = useState(true);
  
  // Dynamic application route states
  const [originInput, setOriginInput] = useState('New Delhi (DEL)');
  const [originCode, setOriginCode] = useState('DEL');
  
  const [destInput, setDestInput] = useState('Mumbai (BOM)');
  const [destCode, setDestCode] = useState('BOM');
  
  const [travelDate, setTravelDate] = useState('2026-06-01');

  // Interactive suggestion states
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const [searchData, setSearchData] = useState({ flights: [], trains: [], buses: [] });

  // References to keep track of typing timer IDs for debouncing
  const originTimerRef = useRef(null);
  const destTimerRef = useRef(null);

  // Core pipeline to query matching transit rows
  const executeSearchQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?origin=${originCode}&destination=${destCode}&date=${travelDate}&mode=all`);
      const json = await response.json();
      if (json.success && json.data) {
        setSearchData({
          flights: json.data.flights || [],
          trains: json.data.trains || [],
          buses: json.data.buses || []
        });
      }
    } catch (err) {
      console.error("Failed to load transport search matrix:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSearchQuery();
  }, [originCode, destCode]);

  // DEBOUNCED API HANDLER FOR ORIGIN INPUT
  const handleOriginChange = (val) => {
    setOriginInput(val);
    
    // Clear out any old pending keystroke timers immediately
    if (originTimerRef.current) clearTimeout(originTimerRef.current);

    if (val.trim().length < 2) {
      setOriginSuggestions([]);
      setShowOriginDropdown(false);
      return;
    }

    // Set a 400ms timer window. Fires only when the user finishes pausing their typing cadence
    originTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/locations?keyword=${encodeURIComponent(val.trim())}`);
        const json = await res.json();
        if (json.success && json.data) {
          setOriginSuggestions(json.data);
          setShowOriginDropdown(true);
        }
      } catch (err) {
        console.error("Error pulling origin autocomplete indices:", err);
      }
    }, 400);
  };

  // DEBOUNCED API HANDLER FOR DESTINATION INPUT
  const handleDestChange = (val) => {
    setDestInput(val);

    // Clear out any old pending keystroke timers immediately
    if (destTimerRef.current) clearTimeout(destTimerRef.current);

    if (val.trim().length < 2) {
      setDestSuggestions([]);
      setShowDestDropdown(false);
      return;
    }

    // Set a 400ms timer window. Fires only when the user finishes pausing their typing cadence
    destTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/locations?keyword=${encodeURIComponent(val.trim())}`);
        const json = await res.json();
        if (json.success && json.data) {
          setDestSuggestions(json.data);
          setShowDestDropdown(true);
        }
      } catch (err) {
        console.error("Error pulling destination autocomplete indices:", err);
      }
    }, 400);
  };

  const selectOriginCity = (city) => {
    setOriginInput(`${city.name} (${city.code})`);
    setOriginCode(city.code);
    setShowOriginDropdown(false);
  };

  const selectDestCity = (city) => {
    setDestInput(`${city.name} (${city.code})`);
    setDestCode(city.code);
    setShowDestDropdown(false);
  };

  const handleBookingCheckout = (item) => {
    const itemTitle = item.carrier || item.name || item.operator || 'Transit Ticket';
    const itemPrice = item.price;
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Spw4XJWqrxC66R';

    if (typeof window === 'undefined' || !window.Razorpay) {
      alert(`🔄 Payment pipeline ready! Initializing checkout wrapper sequence for ${itemTitle} (Amount: ₹${itemPrice}).`);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: itemPrice * 100,
      currency: 'INR',
      name: 'SpotOnTrip India',
      description: `${itemTitle} Booking Execution - ${item.id}`,
      handler: function (response) {
        alert(`🎉 Payment Successful! Reference ID: ${response.razorpay_payment_id}`);
      },
      prefill: { name: 'Santosh Pradhan', email: 'traveler@spotontrip.com', contact: '9999999999' },
      theme: { color: '#0066cc' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const currentList = activeTab === 'flight' ? searchData.flights : activeTab === 'train' ? searchData.trains : searchData.buses;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8fafc', color: '#1e293b' }}>
      
      {/* 1. COMPACT ROW AUTOCOMPLETE MODULE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 25 rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', marginBottom: '32px', alignItems: 'end' }}>
        
        {/* Departure Field */}
        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '6px' }}>From (City or Airport)</label>
          <input 
            type="text" 
            value={originInput} 
            onChange={(e) => handleOriginChange(e.target.value)}
            onFocus={() => setShowOriginDropdown(originSuggestions.length > 0)}
            style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
            placeholder="Type search keyword..."
          />
          {showOriginDropdown && originSuggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 999, marginTop: '5px', maxHeight: '200px', overflowY: 'auto' }}>
              {originSuggestions.map((city) => (
                <div key={city.code} onClick={() => selectOriginCity(city)} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <strong style={{ color: '#0f172a' }}>{city.name} ({city.code})</strong>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{city.context}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Arrival Field */}
        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '6px' }}>To (City or Airport)</label>
          <input 
            type="text" 
            value={destInput} 
            onChange={(e) => handleDestChange(e.target.value)}
            onFocus={() => setShowDestDropdown(destSuggestions.length > 0)}
            style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
            placeholder="Where to?"
          />
          {showDestDropdown && destSuggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 999, marginTop: '5px', maxHeight: '200px', overflowY: 'auto' }}>
              {destSuggestions.map((city) => (
                <div key={city.code} onClick={() => selectDestCity(city)} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <strong style={{ color: '#0f172a' }}>{city.name} ({city.code})</strong>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{city.context}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar Picker */}
        <div>
          <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '6px' }}>Travel Date</label>
          <input 
            type="date" 
            value={travelDate} 
            onChange={(e) => setTravelDate(e.target.value)}
            style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', fontWeight: '600', outline: 'none', boxSizing: 'border-box', color: '#334155' }}
          />
        </div>

        {/* Execution Trigger */}
        <div>
          <button onClick={executeSearchQuery} style={{ width: '100%', backgroundColor: '#0066cc', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 12px rgba(0,102,204,0.15)' }}>
            🔍 Search Routes
          </button>
        </div>
      </div>

      {/* 2. MODE NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab('flight')} style={{ padding: '10px 24px', cursor: 'pointer', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', backgroundColor: activeTab === 'flight' ? '#0066cc' : '#f1f5f9', color: activeTab === 'flight' ? '#ffffff' : '#475569' }}>
          ✈️ Flights ({searchData.flights.length})
        </button>
        <button onClick={() => setActiveTab('train')} style={{ padding: '10px 24px', cursor: 'pointer', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', backgroundColor: activeTab === 'train' ? '#0066cc' : '#f1f5f9', color: activeTab === 'train' ? '#ffffff' : '#475569' }}>
          🚂 Trains ({searchData.trains.length})
        </button>
        <button onClick={() => setActiveTab('bus')} style={{ padding: '10px 24px', cursor: 'pointer', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', backgroundColor: activeTab === 'bus' ? '#0066cc' : '#f1f5f9', color: activeTab === 'bus' ? '#ffffff' : '#475569' }}>
          🚌 Buses ({searchData.buses.length})
        </button>
      </div>

      {/* 3. CARD MATRIX HOUSING */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b', fontSize: '15px', fontWeight: '600' }}>
          ⏳ Scanning live transportation distribution grids for {originCode} ➡️ {destCode}...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
              No active itineraries available matching the criteria codes.
            </div>
          ) : (
            currentList.map((item) => (
              <div key={item.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', gap: '16px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700' }}>{item.carrier || item.name || item.operator}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>{item.flightNo || item.trainNo || item.type || 'Standard Route'}</span>
                    {item.rating && <span style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '6px' }}>★ {item.rating}</span>}
                  </div>
                </div>

                <div style={{ flex: '2 1 300px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{item.departure}</div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>{originCode}</div>
                  </div>
                  <div style={{ flexGrow: 1, textAlign: 'center', position: 'relative', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', minWidth: '80px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>{item.duration}</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{item.arrival}</div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>{destCode}</div>
                  </div>
                </div>

                <div style={{ flex: '1 1 150px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0066cc' }}>₹{item.price.toLocaleString('en-IN')}</div>
                  <button onClick={() => handleBookingCheckout(item)} style={{ backgroundColor: '#ff9900', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: '0.15s', boxShadow: '0 4px 12px rgba(255,153,0,0.15)' }}>Book Now</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}