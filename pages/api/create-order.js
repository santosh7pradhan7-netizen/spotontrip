// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys are not set in environment variables.');
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Missing amount value' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // amount is in rupees, Razorpay wants paise
      currency: currency || 'INR',
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);

  } catch (error) {
    console.error('create-order error:', error);
    return res.status(500).json({
      message: 'Could not create Razorpay order.',
      error: error.message,
    });
  }
}
