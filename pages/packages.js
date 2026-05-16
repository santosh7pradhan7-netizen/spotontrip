// pages/packages.js
import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient'; // Bridges your active Supabase client settings

// The data array is cleanly injected into the component props pool at runtime
export default function Packages({ initialPackages }) {
  const [packagesList] = useState(initialPackages || []);
  const [loading, setLoading] = useState(false);
  
  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Form State Management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: 1
  });

  // Open modal for specific package
  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData({ fullName: '', email: '', phone: '', travelDate: '', guests: 1 });
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate Dynamic Total Price based on number of guests
  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.price * Number(formData.guests);
  };

  // Form Submission & Razorpay Gateway Integration
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation safety check
    if (!formData.fullName || !formData.email || !formData.phone || !formData.travelDate) {
      alert('Please fill out all fields before proceeding to payment.');
      return;
    }

    setLoading(true);
    const finalCalculatedAmount = calculateTotal();

    try {
      // Step 1: Request fresh payment payload from our working backend API
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: finalCalculatedAmount, // Sends total adjusted price dynamically
          currency: 'INR' 
        }),
      });

      if (!response.ok) throw new Error('Failed backend payment handshake.');
      const orderData = await response.json();

      // Step 2: Configure Razorpay client setup with dynamic user parameters
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Spw4XJWqrxC66R', 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SpotOnTrip',
        description: `Booking: ${selectedPackage.title} (${formData.guests} Guests)`,
        image: 'https://www.spotontrip.com/favicon.ico', 
        order_id: orderData.id, 
        handler: function (paymentResponse) {
          closeBookingModal();
          alert(`🎉 Booking Confirmed Successfully!\nPayment ID: ${paymentResponse.razorpay_payment_id}\nPackage: ${selectedPackage.title}\nGuests: ${formData.guests}`);
        },
        prefill: { 
          name: formData.fullName, 
          email: formData.email,   
          contact: formData.phone  
        },
        notes: {
          travel_date: formData.travelDate,
          total_guests: formData.guests
        },
        theme: { color: '#0f766e' },
      };

      const rzpWindowInstance = new window.Razorpay(options);
      rzpWindowInstance.open();
    } catch (err) {
      console.error(err);
      alert('Initialization Error: Unable to communicate with Razorpay right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
      <Head>
        <title>Premium Travel Packages | SpotOnTrip</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
        <style>{`
          .package-card { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
          .package-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important; }
          .btn-action { transition: background-color 0.2s ease, transform 0.1s ease; }
          .btn-action:hover { background-color: #0d9488 !important; }
          .btn-action:active { transform: scale(0.98); }
          .modal-overlay { animation: fadeIn 0.2s ease-out forwards; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </Head>

      {/* Hero Banner Header */}
      <div style={{ backgroundColor: '#0f766e', color: '#ffffff', padding: '80px 20px', textAlign: 'center' }}>
        <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>
          Summer Vacation 2026
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '15px', marginBottom: '15px' }}>Find Your Perfect Holiday</h1>
        <p style={{ color: '#ccfbf1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Curated travel adventures departing from Rajpura. Powered by live inventory configurations.
        </p>
      </div>

      {/* Main Packages Display Grid */}
      <div style={{ maxWidth: '1140px', margin: '-40px auto 0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
        {packagesList.map((item) => (
          <div key={item.id} className="package-card" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#ffffff', color: '#111827', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>{item.tag}</span>
              <span style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'rgba(15, 118, 110, 0.9)', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>🕒 {item.duration}</span>
            </div>

            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#0f766e', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>📍 {item.location}</span>
              <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginTop: '6px', marginBottom: '12px', fontWeight: '700' }}>{item.title}</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{item.description}</p>

              <div style={{ marginBottom: '25px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                {item.features && item.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '0.9rem', color: '#334155' }}>
                    <span style={{ color: '#0d9488', marginRight: '10px', fontWeight: 'bold' }}>✓</span>{feature}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                <div>
                  {item.original_price && <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', display: 'block' }}>₹{item.original_price}</span>}
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>₹{item.price} <small style={{ fontSize: '0.8rem', fontWeight: '400', color: '#64748b' }}>/ person</small></span>
                </div>
                <button onClick={() => openBookingModal(item)} className="btn-action" style={{ backgroundColor: '#0f766e', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Interactive Booking Form Modal Overlay Layer */}
      {isModalOpen && selectedPackage && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
            
            {/* Modal Header */}
            <div style={{ backgroundColor: '#0f766e', padding: '24px', color: '#ffffff', position: 'relative' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>Confirm Your Itinerary</h3>
              <p style={{ color: '#ccfbf1', fontSize: '0.85rem', margin: '4px 0 0 0' }}>{selectedPackage.title}</p>
              <button onClick={closeBookingModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#ffffff', fontSize: '1.5rem', cursor: 'pointer', opacity: 0.8 }}>&times;</button>
            </div>

            {/* Modal Content / Form Block */}
            <form onSubmit={handleBookingSubmit} style={{ padding: '28px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@example.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Date of Travel</label>
                  <input type="date" name="travelDate" required value={formData.travelDate} onChange={handleInputChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', color: '#334155' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Number of Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleInputChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#ffffff' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Live Price Breakdown Calculations Layout Box */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.9rem', marginBottom: '6px' }}>
                  <span>Base Fare ({formData.guests} x ₹{selectedPackage.price})</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>
                  <span>Convenience & Tax</span>
                  <span style={{ color: '#16a34a', fontWeight: '600' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontWeight: '700', color: '#0f172a', fontSize: '1.1rem' }}>
                  <span>Total Payable Amount</span>
                  <span style={{ color: '#0f766e' }}>₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <button type="button" onClick={closeBookingModal} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#64748b', fontWeight: '600', backgroundColor: '#ffffff', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-action" style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: loading ? '#94a3b8' : '#0f766e', color: '#ffffff', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(15, 118, 110, 0.2)' }}>
                  {loading ? 'Processing Securely...' : 'Proceed to Checkout'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

// Next.js Server Side props layer pulls directly from Supabase upon every single request
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
    console.error('Database connection handling error:', e);
    return {
      props: {
        initialPackages: [],
      },
    };
  }
}