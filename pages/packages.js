// pages/packages.js
import React, { useState } from 'react';
import Head from 'next/head';

export default function Packages() {
  const [loading, setLoading] = useState(false);

  // Premium, detailed packages array with images and trip details
  const packagesList = [
    { 
      id: 'pkg-1', 
      title: 'River Escape & Swimming Holiday', 
      tag: '🔥 Best Seller',
      price: 4999, 
      originalPrice: 6499,
      duration: '2 Days / 1 Night',
      location: 'Near Rajpura',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80', // Beautiful river/travel image
      description: 'The ultimate summer getaway. Cool off with your friends in crystal clear river waters, enjoy riverside camps, and a full barbecue dinner.',
      features: ['Private AC Travel from Rajpura', 'Riverside Camping Stay', 'Guided Swimming Session', 'All Meals Included']
    },
    { 
      id: 'pkg-2', 
      title: 'Premium Mountain Adventure', 
      tag: '✨ Trending',
      price: 8999, 
      originalPrice: 11999,
      duration: '4 Days / 3 Nights',
      location: 'Himachal Heights',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', // Beautiful mountain image
      description: 'Escape the summer heat entirely. Explore high-altitude viewpoints, guided trekking trails, and enjoy premium luxury resort hospitality.',
      features: ['Luxury Volvo Transfers', '4-Star Resort Stay', 'Trekking & Paragliding', 'Buffet Breakfast & Dinner']
    }
  ];

  const initializePayment = async (packagePrice, packageTitle) => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: packagePrice, currency: 'INR' }),
      });

      if (!response.ok) throw new Error('Failed backend payment handshake.');
      const orderData = await response.json();

      const options = {
        key: 'rzp_test_Spw4XJWqrxC66R', 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SpotOnTrip',
        description: `Booking for ${packageTitle}`,
        image: 'https://www.spotontrip.com/favicon.ico', 
        order_id: orderData.id, 
        handler: function (paymentResponse) {
          alert(`🎉 Payment Successful!\nPayment ID: ${paymentResponse.razorpay_payment_id}`);
        },
        prefill: { name: 'Traveler Name', email: 'traveler@example.com', contact: '9999999999' },
        theme: { color: '#0f766e' }, // Deep elegant teal to match premium design
      };

      const rzpWindowInstance = new window.Razorpay(options);
      rzpWindowInstance.open();
    } catch (err) {
      console.error(err);
      alert('Initialization Error: Unable to launch gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      <Head>
        <title>Premium Travel Packages | SpotOnTrip</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
        {/* Injecting CSS variables and global hover transition animations cleanly */}
        <style>{`
          .package-card {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          }
          .package-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          }
          .btn-book {
            transition: background-color 0.2s ease, transform 0.1s ease;
          }
          .btn-book:hover {
            background-color: #0d9488 !important;
          }
          .btn-book:active {
            transform: scale(0.98);
          }
        `}</style>
      </Head>

      {/* Hero Banner Header Section */}
      <div style={{ backgroundColor: '#0f766e', color: '#ffffff', padding: '80px 20px', textAlign: 'center' }}>
        <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Summer Vacation 2026
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '15px', marginBottom: '15px', letterSpacing: '-0.5px' }}>
          Find Your Perfect Holiday
        </h1>
        <p style={{ color: '#ccfbf1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Unmatched travel experiences curated from Rajpura. Handpicked stays, clean transfers, and flawless booking gateways.
        </p>
      </div>

      {/* Main Container Grid */}
      <div style={{ maxWidth: '1140px', margin: '-40px auto 0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
        {packagesList.map((item) => (
          <div 
            key={item.id} 
            className="package-card" 
            style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          >
            {/* Package Image Area with Badges */}
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Floating Status Tag */}
              <span style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#ffffff', color: '#111827', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {item.tag}
              </span>
              {/* Duration Tag */}
              <span style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'rgba(15, 118, 110, 0.9)', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                🕒 {item.duration}
              </span>
            </div>

            {/* Content Area */}
            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#0f766e', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📍 {item.location}
              </span>
              <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginTop: '6px', marginBottom: '12px', fontWeight: '700', lineHeight: '1.3' }}>
                {item.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                {item.description}
              </p>

              {/* Package Features List Checkmarks */}
              <div style={{ marginBottom: '25px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                {item.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '0.9rem', color: '#334155' }}>
                    <span style={{ color: '#0d9488', marginRight: '10px', fontWeight: 'bold' }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Pricing & CTA Button Footer Layer */}
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', display: 'block', marginBottom: '-2px' }}>
                    ₹{item.originalPrice}
                  </span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
                    ₹{item.price}
                  </span>
                </div>

                <button
                  onClick={() => initializePayment(item.price, item.title)}
                  disabled={loading}
                  className="btn-book"
                  style={{
                    backgroundColor: loading ? '#94a3b8' : '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(15, 118, 110, 0.2)',
                  }}
                >
                  {loading ? 'Securing...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}