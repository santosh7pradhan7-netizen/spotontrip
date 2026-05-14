// /components/RazorpayPaymentButton.js

import { useState, useCallback } from 'react';
import { useRouter } from 'next/router'; // <-- ADDED: For Redirection

// --- ENV VARS ---
// The public ID is exposed to the client
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

// --- API ROUTES ---
const CREATE_ORDER_API = '/api/create-order';
const VERIFY_PAYMENT_API = '/api/verify-payment';

// --- COMPONENT START ---
export default function RazorpayPaymentButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // <-- ADDED: Router instance

  const displayRazorpay = useCallback(async () => {
    setLoading(true);

    // 1. Fetch Order ID from your server
    const orderResponse = await fetch(CREATE_ORDER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the amount to the backend
      body: JSON.stringify({
        amount: 5000, // Amount in paise (e.g., 5000 paise = ₹50.00)
      }),
    });

    const orderResult = await orderResponse.json();

    if (!orderResult.id) {
      alert("Failed to create order. See console for details.");
      setLoading(false);
      return;
    }

    // 2. Configure Razorpay Checkout options
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: orderResult.amount,
      currency: 'INR',
      name: 'Your Test Shop',
      description: 'Price Summary',
      image: 'https://example.com/logo.png',
      order_id: orderResult.id,
      handler: async function (response) {
        // --- 3. Payment Success, Initiate Server Verification ---
        try {
          const verifyResponse = await fetch(VERIFY_PAYMENT_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response), // Send payment ID, order ID, and signature
          });

          const verifyResult = await verifyResponse.json();

          if (verifyResult.isVerified) {
            // VERIFICATION SUCCESS: Redirect to a final page
            alert("Payment SUCCESS and VERIFIED! Redirecting to confirmation page.");
            router.push(`/order-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`);
            
          } else {
            // VERIFICATION FAILED: Critical security issue
            alert("Payment was successful, but VERIFICATION FAILED. Contact support.");
          }
        } catch (error) {
          console.error("Verification API Error:", error);
          alert("A network error occurred during verification.");
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9876543210',
      },
      theme: {
        color: '#61DAFB',
      },
      modal: {
        ondismiss: function() {
          console.log('Checkout modal closed by user');
        }
      }
    };

    // 4. Open Razorpay Checkout
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setLoading(false);
  }, [router]);

  // Ensure Razorpay script is loaded before the component renders
  // This is a minimal way to ensure the script is loaded, using Next.js <Script> is preferred
  if (typeof window !== 'undefined' && !window.Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }

  return (
    <button 
      onClick={displayRazorpay} 
      disabled={loading}
      style={{ 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer',
        backgroundColor: loading ? '#ccc' : '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      {loading ? 'Processing...' : 'Pay Now (₹50.00)'}
    </button>
  );
}