// pages/search.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SearchResults() {
  const router = useRouter();
  const { category, from, to, date, tier } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Simulated premium live-routing database data generator
  useEffect(() => {
    if (!router.isReady) return;
    
    setLoading(true);
    // Mimic network handshake latency delay
    const timer = setTimeout(() => {
      const activeCategory = category || 'buses';
      let mockData = [];

      if (activeCategory === 'flights') {
        mockData = [
          { id: 'fl-101', provider: 'IndiGo Premium', route: `${from || 'IXC'} ➔ ${to || 'DEL'}`, time: '07:30 AM - 08:35 AM', price: 3499, duration: '1h 05m', tag: '⚡ Non-Stop' },
          { id: 'fl-102', provider: 'Air India Comfort', route: `${from || 'IXC'} ➔ ${to || 'DEL'}`, time: '02:15 PM - 03:30 PM', price: 4200, duration: '1h 15m', tag: '💎 Free Meals' }
        ];
      } else if (activeCategory === 'buses') {
        mockData = [
          { id: 'bs-201', provider: 'Zingbus Luxury Scania', route: `${from || 'Rajpura'} ➔ ${to || 'Manali'}`, time: '09:45 PM - 06:15 AM', price: 1199, duration: '8h 30m', tag: '😴 AC Sleeper' },
          { id: 'bs-202', provider: 'Indo Canadian Multi-Axle', route: `${from || 'Rajpura'} ➔ ${to || 'Delhi IGI'}`, time: '04:00 AM - 09:15 AM', price: 950, duration: '5h 15m', tag: '🌟 Top Rated' }
        ];
      } else if (activeCategory === 'trains') {
        mockData = [
          { id: 'tr-301', provider: 'Vande Bharat Express (22448)', route: `${from || 'RPJ'} ➔ ${to || 'NDLS'}`, time: '08:02 AM - 11:05 AM', price: 890, duration: '3h 03m', tag: '🚄 Chair Car (CC)' },
          { id: 'tr-302', provider: 'Paschim Deluxe Express (12926)', route: `${from || 'RPJ'} ➔ ${to || 'MMCT'}`, time: '11:20 AM - 02:40 PM', price: 1450, duration: '27h 20m', tag: '🛌 2nd AC (2A)' }
        ];
      } else if (activeCategory === 'hotels') {
        mockData = [
          { id: 'ht-401', provider: 'The Grand Vista Resort', route: `Zone: ${from || 'Himachal Valley'}`, time: 'Check-In: 12:00 PM', price: 5499, duration: 'Per Night / Suite', tag: '🏊 Swimming Pool' },
          { id: 'ht-402', provider: 'Royal Heritage Luxury Stay', route: `Zone: ${from || 'Shimla Mall'}`, time: 'Check-In: 01:00 PM', price: 7200, duration: 'Per Night / Deluxe', tag: '🏔️ Mountain View' }
        ];
      } else {
        mockData = [
          { id: 'ev-501', provider: 'Sunburn Arena Tricity Festival', route: `Venue: Sector 34 Ground`, time: 'Gates Open: 04:00 PM', price: 1999, duration: 'General Admission Ticket', tag: '🔥 Selling Fast' }
        ];
      }

      setResults(mockData);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [router.isReady, category, from, to]);

  const triggerInstantCheckout = (item) => {
    setSelectedItem(item);
    // Interface directly with the Razorpay window parameters
    if (typeof window !== 'undefined' && window.Razorpay) {
      const options = {
        key: 'rzp_test_Spw4XJWqrxC66R', // Pasted reliable build key bypass
        amount: item.price * 100,
        currency: 'INR',
        name: 'SpotOnTrip Logistics',
        description: `${category?.toUpperCase()} Booking: ${item.provider}`,
        image: 'https://www.spotontrip.com/favicon.ico',
        handler: function (response) {
          alert(`🎉 Ticket Booked Successfully!\nPayment ID: ${response.razorpay_payment_id}\nBooking Ref: ${item.id}`);
        },
        theme: { color: '#0f766e' }
      };
      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>
      <Head>
        <title>Live Search Configurations | SpotOnTrip</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
      </Head>

      {/* Navigation Top Ribbon */}
      <div style={{ backgroundColor: '#0f766e', color: '#ffffff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 onClick={() => router.push('/')} style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0, cursor: 'pointer' }}>SpotOnTrip</h1>
        <span style={{ fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', fontWeight: '700' }}>
          🔍 {category || 'Logistics'} Search Panel
        </span>
      </div>

      {/* Query Display Strip */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '24px', color: '#64748b', fontSize: '0.9rem' }}>
          <div><strong>Route:</strong> <span style={{ color: '#0f172a' }}>{from || 'Default Departure'} ➔ {to || 'Open Terminal'}</span></div>
          {date && <div><strong>Timeline Date:</strong> <span style={{ color: '#0f172a' }}>{date}</span></div>}
          {tier && <div><strong>Selected Class:</strong> <span style={{ color: '#0f172a' }}>{tier}</span></div>}
        </div>
      </div>

      {/* Search Results Main Display Area */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>🔄</div>
            <p style={{ color: '#64748b', marginTop: '12px', fontWeight: '500' }}>Querying active regional logistical supply chains...</p>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
              Available Open Seating Enclosures ({results.length})
            </h3>
            
            {results.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div>
                  <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>{item.tag}</span>
                  <h4 style={{ margin: '8px 0 4px 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' }}>{item.provider}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>🗺️ {item.route} | <span style={{ color: '#0f766e', fontWeight: '500' }}>🕒 {item.time}</span></p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px', textAlign: 'right' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>{item.duration}</span>
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>₹{item.price}</span>
                  </div>
                  <button onClick={() => triggerInstantCheckout(item)} style={{ backgroundColor: '#0f766e', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 10px rgba(15, 118, 110, 0.2)' }}>
                    Instant Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}