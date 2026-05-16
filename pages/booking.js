// pages/bookings.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Bookings() {
  // Mock data representing a successfully captured Razorpay transaction session
  const [activeBookings, setActiveBookings] = useState([
    {
      id: 'SOT-2026-8941',
      packageTitle: 'River Escape & Swimming Holiday',
      location: 'Near Rajpura',
      travelDate: 'June 20, 2026',
      guests: 4,
      amountPaid: 19996,
      paymentId: 'pay_Pxl92H7f41YLmc',
      status: 'confirmed', // confirmed -> processing -> ready
      step: 1, // Timeline index marker
      weather: { temp: '34°C', condition: 'Sunny & Warm', advice: 'Perfect conditions for river swimming!' }
    }
  ]);

  const [activeTab, setActiveTab] = useState('itinerary');

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>My Bookings | SpotOnTrip</title>
        <style>{`
          .nav-tab { transition: all 0.2s ease; cursor: pointer; }
          .nav-tab:hover { color: #0f766e !important; }
          .card-shadow { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); }
        `}</style>
      </Head>

      {/* Modern Dashboard Header Nav Panel */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link href="/packages" style={{ textDecoration: 'none', color: '#0f766e', fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
            SpotOnTrip
          </Link>
          <nav style={{ display: 'flex', gap: '20px', fontSize: '0.95rem', fontWeight: '600' }}>
            <Link href="/packages" style={{ textDecoration: 'none', color: '#64748b' }} className="nav-tab">Explore Packages</Link>
            <span style={{ color: '#0f766e', borderBottom: '2px solid #0f766e', paddingBottom: '4px' }}>My Bookings</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0f766e', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
            U
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>User Account</span>
        </div>
      </header>

      {/* Main Dashboard Workspace Content */}
      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Customer Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>Manage your booked trips, track departures, and review transactions.</p>
        </div>

        {activeBookings.length === 0 ? (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2e8f0' }} className="card-shadow">
            <h2 style={{ color: '#334155', fontSize: '1.4rem' }}>No bookings detected yet</h2>
            <p style={{ color: '#64748b', maxWidth: '400px', margin: '10px auto 24px auto', fontSize: '0.95rem', lineHeight: '1.5' }}>Ready to head out on your summer holiday? Choose a premium trip packages configuration to get started.</p>
            <Link href="/packages" style={{ backgroundColor: '#0f766e', color: '#ffffff', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', inlineBlock: 'true' }}>Book A Trip Now</Link>
          </div>
        ) : (
          activeBookings.map((booking) => (
            <div key={booking.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
              
              {/* Left Column Workspace Card Block */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }} className="card-shadow">
                {/* Trip Banner Overview Summary Header */}
                <div style={{ backgroundColor: '#f0fdfa', borderBottom: '1px solid #ccfbf1', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#0f766e', letterSpacing: '0.5px' }}>Booking Reference: {booking.id}</span>
                    <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '4px 0 0 0', fontWeight: '700' }}>{booking.packageTitle}</h2>
                  </div>
                  <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>
                    ● Payment Confirmed
                  </span>
                </div>

                {/* Dashboard Horizontal Section Tabs Navigation */}
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                  <button onClick={() => setActiveTab('itinerary')} style={{ flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: '600', color: activeTab === 'itinerary' ? '#0f766e' : '#64748b', borderBottom: activeTab === 'itinerary' ? '3px solid #0f766e' : 'none', cursor: 'pointer' }}>
                    🗺️ Trip Status Timeline
                  </button>
                  <button onClick={() => setActiveTab('invoice')} style={{ flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: '600', color: activeTab === 'invoice' ? '#0f766e' : '#64748b', borderBottom: activeTab === 'invoice' ? '3px solid #0f766e' : 'none', cursor: 'pointer' }}>
                    📄 Receipt & Invoice
                  </button>
                </div>

                {/* Tab Window Content Render Blocks */}
                <div style={{ padding: '30px' }}>
                  {activeTab === 'itinerary' && (
                    <div>
                      {/* Booking Tracker Horizontal Progress Journey Visualizer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '40px', padding: '0 10px' }}>
                        <div style={{ position: 'absolute', top: '15px', left: '40px', right: '40px', height: '3px', backgroundColor: '#e2e8f0', zIndex: 1 }}>
                          <div style={{ width: booking.step === 1 ? '50%' : booking.step === 2 ? '100%' : '0%', height: '100%', backgroundColor: '#0f766e' }}></div>
                        </div>

                        {/* Step Node 1 */}
                        <div style={{ zIndex: 2, textAlign: 'center', width: '90px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0f766e', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '0.85rem' }}>✓</div>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Paid</span>
                        </div>

                        {/* Step Node 2 */}
                        <div style={{ zIndex: 2, textAlign: 'center', width: '90px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: booking.step >= 1 ? '#0f766e' : '#ffffff', color: booking.step >= 1 ? '#ffffff' : '#94a3b8', border: booking.step >= 1 ? 'none' : '3px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            {booking.step > 1 ? '✓' : '2'}
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: booking.step >= 1 ? '#0f172a' : '#94a3b8' }}>Assigned</span>
                        </div>

                        {/* Step Node 3 */}
                        <div style={{ zIndex: 2, textAlign: 'center', width: '90px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: booking.step >= 2 ? '#0f766e' : '#ffffff', color: booking.step >= 2 ? '#ffffff' : '#94a3b8', border: booking.step >= 2 ? 'none' : '3px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '0.85rem' }}>3</div>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: booking.step >= 2 ? '#0f172a' : '#94a3b8' }}>Departure</span>
                        </div>
                      </div>

                      {/* Itinerary Summary Data Box */}
                      <div style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc' }}>
                        <h4 style={{ margin: '0 0 14px 0', color: '#1e293b', fontSize: '1rem', fontWeight: '700' }}>Trip Specifications</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                          <div><span style={{ color: '#64748b' }}>Departure Station:</span> <strong style={{ color: '#334155' }}>Rajpura Junction Hub</strong></div>
                          <div><span style={{ color: '#64748b' }}>Target Date:</span> <strong style={{ color: '#334155' }}>{booking.travelDate}</strong></div>
                          <div><span style={{ color: '#64748b' }}>Group Allocation:</span> <strong style={{ color: '#334155' }}>{booking.guests} Attendees Registered</strong></div>
                          <div><span style={{ color: '#64748b' }}>Stay Accommodation:</span> <strong style={{ color: '#334155' }}>Premium Riverside Campsite</strong></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'invoice' && (
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '16px' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>SpotOnTrip Invoice</h4>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Transaction Auth ID: {booking.paymentId}</span>
                        </div>
                        <button onClick={() => window.print()} style={{ height: '36px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', color: '#334155', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
                          🖨️ Print Receipt
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '10px', color: '#475569' }}>
                        <span>{booking.packageTitle} (x{booking.guests} guests)</span>
                        <span>₹{booking.amountPaid}.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '14px', color: '#475569' }}>
                        <span>SGST / CGST Tax Indexation (0.00%)</span>
                        <span style={{ color: '#16a34a' }}>Inclusive</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '14px', fontWeight: '700', fontSize: '1.1rem', color: '#0f172a' }}>
                        <span>Total Paid Capture</span>
                        <span style={{ color: '#0f766e' }}>₹{booking.amountPaid}.00</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Column Diagnostic Metrics Sidebar Dashboard Component */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Weather Matrix Widget Card Component */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }} className="card-shadow">
                  <h3 style={{ fontSize: '1rem', margin: '0 0 12px 0', color: '#1e293b', fontWeight: '700' }}>☀️ Summer Destination Weather</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2.5rem' }}>☀️</span>
                    <div>
                      <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', display: 'block' }}>{booking.weather.temp}</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>{booking.weather.condition}</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#0f766e', backgroundColor: '#f0fdfa', padding: '10px 14px', borderRadius: '8px', lineHeight: '1.4', fontWeight: '600' }}>
                    <strong>Travel Checklist Tip:</strong> {booking.weather.advice}
                  </p>
                </div>

                {/* Direct Action Help Center Sidebar Card Widget Component */}
                <div style={{ backgroundColor: '#0f766e', borderRadius: '16px', padding: '24px', color: '#ffffff' }} className="card-shadow">
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', fontWeight: '700' }}>Need Booking Assistance?</h3>
                  <p style={{ fontSize: '0.85rem', color: '#ccfbf1', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    Need to add more friends from Rajpura to your reservation group? Our help desk supports 24/7 route adjustment.
                  </p>
                  <a href="mailto:support@spotontrip.com" style={{ display: 'block', textClassName: 'none', textAlign: 'center', backgroundColor: '#ffffff', color: '#0f766e', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', textDecoration: 'none' }}>
                    Contact Support Desk
                  </a>
                </div>
              </div>

            </div>
          ))
        )}
      </main>
    </div>
  );
}