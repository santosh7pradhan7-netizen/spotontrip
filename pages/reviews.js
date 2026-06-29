// pages/reviews.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Reviews() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Premium curated social proof dataset tracking trip types
  const reviewsData = [
    {
      id: 1,
      name: 'Rohan Sharma',
      location: 'Rajpura',
      tripType: 'river',
      rating: 5,
      date: 'July 2025',
      avatar: 'R',
      comment: 'Gathered a group of 8 friends for the River Swimming Holiday. The private AC transport picked us up right from Rajpura hub. Completely stress-free arrangement, and the river campsite was pristine. Razorpay checkout was seamless too!',
    },
    {
      id: 2,
      name: 'Priya Patel',
      location: 'Chandigarh',
      tripType: 'adventure',
      rating: 5,
      date: 'August 2025',
      avatar: 'P',
      comment: 'The Premium Mountain Adventure completely exceeded expectations. The 4-star resort stay was highly luxurious, and the trekking guides knew the safest routes. Best vacation booking platform I have used this year.',
    },
    {
      id: 3,
      name: 'Amit Verma',
      location: 'Rajpura',
      tripType: 'family',
      rating: 4,
      date: 'October 2025',
      avatar: 'A',
      comment: 'Booked a weekend family getaway layout. The coordination team handled the itinerary modifications perfectly when I requested an extra room allocation. Highly recommend SpotOnTrip for group travelers.',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      location: 'Ambala',
      tripType: 'river',
      rating: 5,
      date: 'June 2025',
      avatar: 'S',
      comment: 'Perfect weather guidance! The dashboard layout showed live weather checklists before our departure. Getting out into the cool river waters during peak summer heat with full catering included was incredible.',
    }
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviewsData 
    : reviewsData.filter(r => r.tripType === selectedFilter);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <Head>
        <title>Customer Testimonials & Reviews | SpotOnTrip</title>
        <style>{`
          .filter-chip { transition: all 0.2s ease; cursor: pointer; border: 1px solid #e2e8f0; }
          .filter-chip:hover { border-color: #0f766e; color: #0f766e; }
          .review-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .review-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
          .nav-link { transition: color 0.2s ease; text-decoration: none; font-weight: 600; color: #475569; }
          .nav-link:hover { color: #0f766e; }
        `}</style>
      </Head>

      {/* Global Navigation Header Header Integration Linkage */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#0f766e', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
          SpotOnTrip
        </Link>
        <nav style={{ display: 'flex', gap: '32px', fontSize: '0.95rem' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/packages" className="nav-link">Explore Packages</Link>
          <Link href="/booking" className="nav-link">My Bookings</Link>
        </nav>
        <div>
          <Link href="/packages" style={{ textDecoration: 'none', backgroundColor: '#0f766e', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}>
            Book Now
          </Link>
        </div>
      </header>

      {/* Social Proof Hero Scoring Header Dashboard Area */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#0f766e', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Verified Social Proof Feedback
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginTop: '10px', marginBottom: '20px' }}>
            Trusted by Thousands of Adventurers
          </h1>
          
          {/* Dynamic Core Average Rating Visual Board Layout Box */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', backgroundColor: '#f8fafc', padding: '20px 40px', borderRadius: '16px', width: 'fit-content', margin: '0 auto' }}>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a' }}>4.9</span>
              <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '600' }}> / 5.0</span>
            </div>
            <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '24px', textAlign: 'left' }}>
              <div style={{ color: '#eab308', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', display: 'block', marginTop: '4px' }}>
                Based on 450+ verified Rajpura passenger checkouts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips Control Menu Selection Layer */}
      <main style={{ maxWidth: '1140px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: '🌍 All Reviews' },
            { id: 'river', label: '🏊‍♂️ River Swimming Holidays' },
            { id: 'adventure', label: '🏔️ Mountain Adventures' },
            { id: 'family', label: '👨‍👩‍👧‍👦 Family Stay Packages' }
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setSelectedFilter(chip.id)}
              className="filter-chip"
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '0.9rem',
                fontWeight: '600',
                backgroundColor: selectedFilter === chip.id ? '#0f766e' : '#ffffff',
                color: selectedFilter === chip.id ? '#ffffff' : '#475569',
                border: selectedFilter === chip.id ? '1px solid #0f766e' : '1px solid #e2e8f0',
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Testimonials Masonry Metric Grid Cards Render Layer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="review-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Star Row Validation Parameter Markup Row Layout */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ color: '#eab308', fontSize: '1rem', letterSpacing: '1px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>{review.date}</span>
                </div>
                
                {/* Review Text Body Paragraph Context block */}
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px 0', fontStyle: 'italic' }}>
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio Footer Component Area */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0f766e', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700', fontSize: '1rem' }}>
                  {review.avatar}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>{review.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Passenger from {review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Persistent Call-to-Action Closing Strip Layout Section */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '60px 20px', textAlign: 'center', marginTop: '80px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Ready to experience it yourself?</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '8px', marginBottom: '24px' }}>Book your trip in less than 60 seconds with premium verification keys configuration tools.</p>
        <Link href="/packages" style={{ textDecoration: 'none', backgroundColor: '#0f766e', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', display: 'inline-block' }}>
          Explore Vacation Packages
        </Link>
      </section>
    </div>
  );
}