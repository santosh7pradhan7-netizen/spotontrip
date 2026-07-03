// pages/api/webhook.js
import crypto from 'crypto';
import { supabase } from '../../lib/supabaseClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // Use the DEDICATED webhook secret from your Razorpay dashboard
    // (Settings -> Webhooks), which is different from your API key secret.
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set.');
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const receivedSignature = req.headers['x-razorpay-signature'];

    if (expectedSignature !== receivedSignature) {
      console.error('Webhook signature mismatch.');
      return res.status(400).json({ message: 'Invalid signature.' });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;

      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const amountPaid = paymentEntity.amount / 100;
      const customerName = paymentEntity.notes?.customer_name || 'Valued Traveler';
      const customerEmail = paymentEntity.email;
      const customerPhone = paymentEntity.contact;
      const packageTitle = paymentEntity.notes?.package_title || 'Tour Package';
      const travelDate = paymentEntity.notes?.travel_date || new Date().toISOString().split('T')[0];
      const guests = paymentEntity.notes?.total_guests || 1;

      console.log(`Processing payment.captured for order ${orderId}`);

      const { error: dbError } = await supabase
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
          booking_status: 'success',
        }]);

      if (dbError) {
        console.error('Database logging error:', dbError.message);
        throw dbError;
      }

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'SpotOnTrip <onboarding@resend.dev>',
            to: [customerEmail],
            subject: `Booking confirmed: ${packageTitle}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #0f766e;">
                  <h1 style="color: #0f766e; margin: 0; font-size: 28px; font-weight: 800;">SpotOnTrip</h1>
                </div>
                <div style="padding: 30px 10px;">
                  <h2 style="color: #0f172a; margin-top: 0;">Hi ${customerName}, you're booked.</h2>
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #f1f5f9;">
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Package:</strong> ${packageTitle}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Date:</strong> ${travelDate}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Guests:</strong> ${guests}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Amount paid:</strong> ₹${amountPaid}</p>
                  </div>
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #f1f5f9; font-family: monospace; font-size: 13px; color: #64748b;">
                    <span style="display: block; margin-bottom: 4px;"><strong>Order ID:</strong> ${orderId}</span>
                    <span style="display: block;"><strong>Payment ID:</strong> ${paymentId}</span>
                  </div>
                </div>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #94a3b8;">
                  <p style="margin: 0;">Questions? support@spotontrip.com</p>
                </div>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Resend delivery error:', await emailResponse.text());
        }
      } catch (mailErr) {
        console.error('Email send failed:', mailErr.message);
      }
    }

    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
