// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Reject anything that isn't a POST request safely
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 1. Force strict string serialization to neutralize Vercel environment streaming quirks
  const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();

  // 2. Validate availability before executing external handshake
  if (!keyId || !keySecret) {
    return res.status(500).json({ 
      message: 'Configuration Error: Keys are empty or unreadable by the serverless container.' 
    });
  }

  try {
    // 3. Initialize the instance with completely sanitized credentials
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Missing amount value' });
    }

    // 4. Set up order options ensuring amounts are strictly integers (paise)
    const options = {
      amount: Math.round(Number(amount) * 100), 
      currency: currency || 'INR',
      receipt: `order_rcpt_${Date.now()}`,
    };

    // 5. Await Razorpay transaction processing
    const order = await razorpay.orders.create(options);
    
    // Success response
    return res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay Handshake Error Details:", error);
    return res.status(500).json({ 
      message: 'Razorpay gateway refused validation over US serverless proxy.', 
      error: error.message 
    });
  }
}