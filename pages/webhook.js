// pages/api/webhook.js
import crypto from 'crypto';
import { supabase } from '../../lib/supabaseClient';

// Disable standard body parsers so we can process raw webhook signatures securely
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper stream converter to read the raw request signature arriving from Razorpay
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const secret = process.env.RAZORPAY_KEY_SECRET || 'STFV7KNHiEgjl0vo1cZ7tpQ2'; // Active secret key reference
    
    // Validate that this request genuine, un-tampered, and came straight from Razorpay
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const receivedSignature = req.headers['x-razorpay-signature'];

    if (expectedSignature !== receivedSignature) {
      console.error('❌ Webhook Security Intercept: Signature mismatch.');
      return res.status(400).json({ message: 'Unauthorized execution attempt.' });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // Listen strictly for successfully captured transaction events
    if (event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const amountPaid = paymentEntity.amount / 100; // Convert paise values back into rupees
      const customerName = paymentEntity.notes?.customer_name || 'Traveler';
      const customerEmail = paymentEntity.email;
      const customerPhone = paymentEntity.contact;
      const packageTitle = paymentEntity.notes?.package_title || 'Tour Package';
      const travelDate = paymentEntity.notes?.travel_date || new Date().toISOString().split('T')[0];
      const guests = paymentEntity.notes?.total_guests || 1;

      console.log(`💳 Received successful payment for Order: ${orderId}. Storing row...`);

      // Write booking details straight to your live database records
      const { error } = await supabase
        .from('bookings')
        .insert([{
          order_id: orderId,
          payment_id: paymentId,
          package_title: packageTitle,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          travel_date: travelDate,
          guests: parseInt(guests),
          amount_paid: amountPaid,
          booking_status: 'success'
        }]);

      if (error) {
        console.error('Database write compilation error:', error.message);
        throw error;
      }

      console.log('🎉 Automated booking ledger insertion completed successfully.');
    }

    // Always reply with a clean 200 OK to stop Razorpay from retrying the event
    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('Webhook processing execution fault:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}