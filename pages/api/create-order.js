// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // 1. Enforce strict POST request security
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 2. Force strict string typecasting to neutralize Vercel environment streaming quirks
  const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();

  // 3. Fail early if keys are missing in the serverless environment container
  if (!keyId || !keySecret) {
    console.error("CRITICAL CONFIGURATION ERROR: Razorpay keys are missing or unreadable in Vercel settings.");
    return res.status(500).json({ 
      message: 'Server Configuration Error: API keys are unreadable by the cloud environment.' 
    });
  }

  try {
    // 4. Initialize Razorpay instance with sanitized credentials and custom headers
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
      headers: {
        'User-Agent': 'Mozilla/5.0 (SpotOnTrip Serverless Engine)',
        'Content-Type': 'application/json'
      }
    });

    const { amount, currency } = req.body;

    // 5. Assert data payload sanity
    if (!amount) {
      return res.status(400).json({ message: 'Missing amount value from frontend payload' });
    }

    // 6. Set up order configuration options (Razorpay expects amounts strictly in paise)
    const options = {
      amount: Math.round(Number(amount) * 100), 
      currency: currency || 'INR',
      receipt: `order_rcpt_${Date.now()}`,
    };

    // 7. Execute transaction handshake with Razorpay servers
    const order = await razorpay.orders.create(options);
    
    // 8. Return pure JSON data back to the client
    return res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay Handshake Exception Details:", error);
    return res.status(500).json({ 
      message: 'Razorpay gateway integration error.', 
      error: error.message 
    });
  }
}