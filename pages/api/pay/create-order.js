// /pages/api/create-order.js

import Razorpay from 'razorpay';

// Initializes the Razorpay instance using your keys from .env.local
const razorpay = new Razorpay({
  // Uses the Public Key ID and the Secret Key for API authentication
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // We hardcode the amount here, but in a real app, it would come from req.body
    const amountInPaise = 500 * 100; // ₹500.00 is 50000 paise

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, 
    };

    const order = await razorpay.orders.create(options);
    
    // Send the essential Order ID back to the frontend
    res.status(200).json({
      // 🚨 CORRECTION: We must use 'id' to match the frontend check!
      id: order.id, 
      currency: order.currency,
      amount: order.amount,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
    });

  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    // Send the error details back to the frontend for debugging
    res.status(500).json({ error: 'Failed to create Razorpay order', details: error.message });
  }
}