import React, { useState } from 'react';

export default function MyBookingsPage() {
  const [filter, setFilter] = useState('all');

  const staticBookings = [
    {
      id: "BK-2026-8812",
      origin: "DEL",
      destination: "BOM",
      carrier: "IndiGo",
      flight_no: "6E-2411",
      departure_time: "06:15 AM",
      arrival_time: "08:30 AM",
      travel_date: "2026-06-15",
      price: 4850,
      status: "confirmed",
      payment_id: "pay_RzpLive99421x"
    },
    {
      id: "BK-2026-0419",
      origin: "DEL",
      destination: "IXC",
      carrier: "Shatabdi Express",
      flight_no: "12002",
      departure_time: "06:00 AM",
      arrival_time: "11:40 AM",
      travel_date: "2026-07-02",
      price: 1250,
      status: "confirmed",
      payment_id: "pay_RzpLive44129z"
    },
    {
      id: "BK-2026-1104",
      origin: "DEL",
      destination: "PVG",
      carrier: "Air India",
      flight_no: "AI-348",
      departure_time: "11:15 PM",
      arrival_time: "08:45 AM",
      travel_date: "2026-08-20",
      price: 24500,
      status: "pending",
      payment_id: "pay_RzpPending552"
    }
  ];

  const filteredBookings = staticBookings.filter(b => {
    if (filter === 'all') return true;
    return b.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px' }}>
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/dashboard" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: '900', color: '#0066cc', letterSpacing: '-0.02em' }}>
            SpotOnTrip
          </a>
          <span style={{ color: '#cbd5e1' }}>/</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#475569' }}>My Bookings</span>
        </div>
        <a href="/dashboard" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: '700', color: '#0066cc', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '8px' }}>
          ← Back to Search
        </a>
      </nav>

      <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>Your Travel Ledger</h1>
            <p style={{ margin: '0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Track live confirmation statuses, active itineraries, and digital payment receipts.</p>
          </div>

          <div style={{ display: 'flex', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '8px', gap: '4px' }}>
            {['all', 'confirmed', 'pending'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  backgroundColor: filter === type ? '#ffffff' : 'transparent',
                  color: filter === type ? '#0f172a' : '#64748b',
                  boxShadow: filter === type ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredBookings.map((booking) => (
            <div key={booking.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Booking ID:</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginLeft: '6px', fontFamily: 'monospace' }}>{booking.id}</span>
                </div>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  textTransform: 'uppercase', 
                  padding: '4px 10px', 
                  borderRadius: '9999px',
                  backgroundColor: booking.status === 'confirmed' ? '#d1fae5' : '#fef3c7',
                  color: booking.status === 'confirmed' ? '#065f46' : '#92400e'
                }}>
                  ● {booking.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{booking.origin}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '2px' }}>{booking.departure_time}</div>
                  </div>

                  <div style={{ textAlign: 'center', minWidth: '100px', position: 'relative' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#0066cc', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '4px' }}>
                      {booking.carrier}
                    </div>
                    <div style={{ height: '2px', backgroundColor: '#cbd5e1', width: '100%', position: 'absolute', top: '70%', zIndex: '1' }}></div>
                    <div style={{ position: 'relative', zIndex: '2', backgroundColor: '#ffffff', display: 'inline-block', padding: '0 6px', fontSize: '12px', color: '#94a3b8', transform: 'translateY(4px)' }}>✈️</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{booking.destination}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '2px' }}>{booking.arrival_time}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '32px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Date of Travel</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginTop: '4px' }}>
                      {booking.travel_date}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Amount Charged</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>₹{booking.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {booking.payment_id && (
                <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                  <span>Gateway Receipt ID: <strong style={{ color: '#475569', fontFamily: 'monospace' }}>{booking.payment_id}</strong></span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Verified via Razorpay Secure</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}