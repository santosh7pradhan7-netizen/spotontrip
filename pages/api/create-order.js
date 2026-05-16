// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 1. Log checking to see if Vercel is actually passing strings or undefined values
  console.log("Checking Backend Environment Keys...");
  console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);
  console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);

  // 2. Fail early if keys are missing inside the serverless function environment
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ 
      message: 'Server Environment Error: Keys are missing or incorrectly named in Vercel settings.' 
    });
  }

  try {
    // 3. Initialize Razorpay inside the handler using the clean environment strings
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
    });

    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Amount parameter is missing from frontend request' });
    }

    const options = {
      amount: Math.round(parseFloat(amount) * 100), // Secure conversion handling decimals cleanly
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Order created successfully!
    return res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay SDK Internal Response Error:", error);
    return res.status(500).json({ 
      message: 'Razorpay rejected the API keys provided.', 
      error: error.message 
    });
  }
}