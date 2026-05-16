// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TEMPORARY DIAGNOSTIC TEST: Hardcoding keys directly to bypass Vercel Env Sync
    const razorpay = new Razorpay({
      key_id: rzp_test_Spw4XJWqrxC66R       // e.g., 'rzp_test_xxxxxxxxx'
      key_secret: Inzt0IAKyI8ZolLaaKR0XOC3 // e.g., 'xxxxxxxxxxxxxxxxxxxx'
    });

    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Missing amount value' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), 
      currency: currency || 'INR',
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);

  } catch (error) {
    console.error("Diagnostic Run Error:", error);
    return res.status(500).json({ 
      message: 'Razorpay rejected these explicit hardcoded keys.', 
      error: error.message 
    });
  }
}