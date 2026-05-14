import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 2. Initialize Razorpay with your Environment Variables
  // Make sure these are set in your Vercel Dashboard!
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const { amount, currency = "INR" } = req.body;

    // 3. Validation
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    // 4. Create Order Options
    // Note: Razorpay expects amount in PAISA (Amount * 100)
    const options = {
      amount: Math.round(amount * 100), 
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    // 5. Generate the Order
    const order = await razorpay.orders.create(options);

    // 6. Send the Order ID back to the frontend
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ 
      message: 'Could not create order', 
      error: error.message 
    });
  }
}