// pages/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const travelFeatures = [
    { title: 'Summer River Holidays', icon: '🏊‍♂️', desc: 'Expertly curated swimming and riverside camping trips starting directly from Rajpura.' },
    { title: 'Flawless Transactions', icon: '💳', desc: 'Secure, instant booking payments backed by verified enterprise-grade security protocols.' },
    { title: '24/7 Route Assistance', icon: '🗺️', desc: 'Round-the-clock coordinator support to smoothly manage custom itinerary configurations.' }
  ];

  const featuredReviews = [
    {
      name: 'Rohan Sharma',
      location: 'Rajpura',
      rating: '★★★★★',
      comment: 'Gathered a group of 8 friends for the River Swimming Holiday. The private AC transport picked us up right from Rajpura hub. Completely stress-free arrangement, and the river campsite was pristine.'
    },
    {
      name: 'Priya Patel',
      location: 'Chandigarh',
      rating: '★★★★★',
      comment: 'The Premium Mountain Adventure completely exceeded expectations. The 4-star resort stay was highly luxurious, and the trekking guides knew the safest routes.'
    },
    {
      name: 'Amit Verma',
      location: 'Rajpura',
      rating: '★★★★★',
      comment: 'Booked a weekend family getaway layout. The coordination team handled the itinerary modifications perfectly when I requested an extra room allocation.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <Head>
        <title>SpotOnTrip | Premium Vacation & Adventure Planners</title>
        <meta name="description" content="Book pristine summer holiday packages and river swimming trips seamlessly from Rajpura." />
        <style>{`
          .nav-link { transition: color 0.2s ease; text-decoration: none; font-weight: 600; color: #475569; }
          .nav-link:hover { color: #0f766e; }
          .btn-hover { transition: all 0.2s ease; }
          .btn-hover:hover { background-color: #0d9488 !important; transform: translateY(-2px); }
          .btn-hover:active { transform: translateY(0); }
          .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .hover-card:hover { transform: translateY(-6px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
        `}</style>
      </Head>

      {/* Modern Fixed Header Navigation Bar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#0f766e', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
          SpotOnTrip
        </Link>
        
        <nav style={{ display: 'flex', gap: '32px', fontSize: '0.95rem' }}>
          <Link href="/" style={{ color: '#0f766e', fontWeight: '700' }} className="nav-link">Home</Link>
          <Link href="/packages" className="nav-link">Explore Packages</Link>
          <Link href="/booking" className="nav-link">My Bookings</Link>
          <Link href="/reviews" className="nav-link">Reviews</Link>
        </nav>

        <div>
          <Link href="/packages" className="btn-hover" style={{ textDecoration: 'none', backgroundColor: '#0f766e', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}>
            Book Now
          </Link>
        </div>
      </header>

      {/* Hero Showcase Area */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 20px', backgroundColor: '#f8fafc', backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 0)', backgroundSize: '24px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Welcome To SpotOnTrip
          </span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', color: '#0f172a', marginTop: '20px', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Your Next Adventure, <br />
            <span style={{ color: '#0f766e' }}>Perfected In One Click.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '640px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            Explore immersive weekend getaways, summer river excursions, and premium holiday packages. Beautiful interfaces powered by bulletproof payment gateways.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/packages" className="btn-hover" style={{ textDecoration: 'none', backgroundColor: '#0f766e', color: '#ffffff', padding: '16px 32px', borderRadius: '10px', fontSize: '1.05rem', fontWeight: '700', boxShadow: '0 4px 14px rgba(15, 118, 110, 0.3)' }}>
              View Holiday Packages
            </Link>
            <Link href="/booking" style={{ textDecoration: 'none', border: '1px solid #cbd5e1', color: '#334155', padding: '16px 32px', borderRadius: '10px', fontSize: '1.05rem', fontWeight: '600', backgroundColor: '#ffffff' }}>
              Track Existing Booking
            </Link>
          </div>
        </div>
      </section>

      {/* Core Operational Features Section */}
      <section style={{ padding: '90px 20px', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a' }}>Why Travelers Choose Us</h2>
          <p style={{ color: '#64748b', marginTop: '10px', fontSize: '1.05rem' }}>Premium service standards from departure to checkout arrival.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {travelFeatures.map((feat, index) => (
            <div key={index} className="hover-card" style={{ padding: '32px', borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{feat.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>{feat.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW INTEGRATED SOCIAL PROOF SECTION */}
      <section style={{ backgroundColor: '#f8fafc', padding: '90px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: '#0f766e', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Social Proof</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginTop: '6px', margin: 0 }}>What Our Adventurers Say</h2>
            </div>
            <Link href="/reviews" style={{ textDecoration: 'none', color: '#0f766e', fontWeight: '700', fontSize: '1rem', borderBottom: '2px solid #0f766e', paddingBottom: '4px' }}>
              Read All 450+ Reviews &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {featuredReviews.map((review, index) => (
              <div key={index} className="hover-card" style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#eab308', fontSize: '1rem', marginBottom: '14px', letterSpacing: '2px' }}>{review.rating}</div>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px 0', fontStyle: 'italic' }}>
                    "{review.comment}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0f766e', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700' }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: '700' }}>{review.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Traveler from {review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Engagement Banner */}
      <section style={{ margin: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', backgroundColor: '#0f766e', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: '#ffffff', boxShadow: '0 20px 25px -5px rgba(15, 118, 110, 0.15)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>Ready to beat the summer heat?</h2>
          <p style={{ color: '#ccfbf1', marginTop: '12px', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '500px', margin: '12px auto 32px auto' }}>
            Gather your friends for an unforgettable river escape trip. Stays, food, and security are fully coordinated.
          </p>
          <Link href="/packages" className="btn-hover" style={{ textDecoration: 'none', backgroundColor: '#ffffff', color: '#0f766e', padding: '14px 32px', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            Find Your Destination
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid #1e293b' }}>
        <p style={{ margin: 0 }}>&copy; 2026 SpotOnTrip. All rights reserved. Routes originating from Rajpura Hub Terminal.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
          <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>&bull;</span>
          <a href="mailto:support@spotontrip.com" style={{ color: '#64748b', textDecoration: 'none' }}>Help Center</a>
        </div>
      </footer>
    </div>
  );
}