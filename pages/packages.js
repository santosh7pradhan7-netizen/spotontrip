// pages/packages.js
import React, { useState } from 'react';
import Head from 'next/head';

export default function Packages() {
  const [loading, setLoading] = useState(false);

  // 1. Array of package items (Adjust prices/details to fit your trip configurations)
  const packagesList = [
    { id: 'pkg-1', title: 'Weekend Gateway', price: 4999, description: 'All-inclusive trip from Rajpura with swimming and resort stay.' },
    { id: 'pkg-2', title: 'Summer Adventure', price: 8999, description: 'Premium adventure package including travel, guides, and meals.' }
  ];

  // 2. Main Payment Processing Script Handler
  const initializePayment = async (packagePrice, packageTitle) => {
    setLoading(true);

    try {
      // Step A: Request a fresh checkout token handshake from our working backend API
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: packagePrice, // The backend code multiplies this by 100 dynamically for paise
          currency: 'INR'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to establish backend payment handshake session.');
      }

      const orderData = await response.json();

      // Step B: Configure the client-side Razorpay configuration engine options block
      const options = {
        key: 'rzp_test_Spw4XJWqrxC66R', // Your valid Razorpay public Test Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SpotOnTrip',
        description: `Booking for ${packageTitle}`,
        image: 'https://www.spotontrip.com/favicon.ico', // Optional: link to your logo image file
        order_id: orderData.id, // The exact order ID string generated via our backend response
        
        // Step C: Handle post-authorization capture logic from the customer window interface
        handler: function (paymentResponse) {
          alert(`🎉 Payment Successful!\nPayment ID: ${paymentResponse.razorpay_payment_id}\nOrder ID: ${paymentResponse.razorpay_order_id}`);
          // You can redirect to a success landing route here: window.location.href = "/success";
        },
        prefill: {
          name: 'Traveler Name',
          email: 'traveler@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Corporate Office SpotOnTrip',
        },
        theme: {
          color: '#3b82f6', // Premium blue action color layout parameter matches standard clean styling
        },
      };

      // Step D: Construct the instance and launch the native payment overlay
      const rzpWindowInstance = new window.Razorpay(options);
      
      rzpWindowInstance.on('payment.failed', function (failedContext) {
        alert(`❌ Payment failed: ${failedContext.error.description}`);
      });

      rzpWindowInstance.open();

    } catch (err) {
      console.error('Client execution transaction breakdown:', err);
      alert('Initialization Error: Unable to communicate with the payment processor gateway right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Script injected into page metadata ensures checkout.js loads perfectly before execution */}
      <Head>
        <title>Packages | SpotOnTrip</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
      </Head>

      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '10px' }}>Explore Holiday Packages</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Secure your trip bookings cleanly with one click payments.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {packagesList.map((item) => (
          <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '8px' }}>{item.title}</h2>
            <p style={{ color: '#4b5563', minHeight: '60px', marginBottom: '16px', lineHeight: '1.5' }}>{item.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>₹{item.price}</span>
              <button
                onClick={() => initializePayment(item.price, item.title)}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease-in-out'
                }}
              >
                {loading ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}