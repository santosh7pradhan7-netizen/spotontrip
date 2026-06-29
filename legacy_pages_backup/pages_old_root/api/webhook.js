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
    const secret = process.env.RAZORPAY_KEY_SECRET || 'STFV7KNHiEgjl0vo1cZ7tpQ2';
    
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

      console.log(`💳 Processing transaction details for Order: ${orderId}...`);

      // 1. Log transaction into your live Supabase table
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
          booking_status: 'success'
        }]);

      if (dbError) {
        console.error('Database logging error:', dbError.message);
        throw dbError;
      }

      // 2. Dispatch a beautiful confirmation email ticket instantly via Resend
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Your active live Resend API token key
            'Authorization': 'Bearer re_ehD8rXLQ_GMcdXiij4WBDJazy79emykBd' 
          },
          body: JSON.stringify({
            from: 'SpotOnTrip <onboarding@resend.dev>', // Free tier default sandbox sender email
            to: [customerEmail],
            subject: `✈️ Booking Confirmed: Your Itinerary for ${packageTitle}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #0f766e;">
                  <h1 style="color: #0f766e; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.5px;">SpotOnTrip</h1>
                  <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Your Adventure Coordinates Await</p>
                </div>
                
                <div style="padding: 30px 10px;">
                  <h2 style="color: #0f172a; margin-top: 0;">Pack Your Bags, ${customerName}! 🎉</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #334155;">Your transaction completed successfully, and your travel dates have been securely locked in with our Rajpura live departure routing network. Below are your booking confirmation records.</p>
                  
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #f1f5f9;">
                    <h3 style="margin-top: 0; color: #0f766e; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Booking Details</h3>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Selected Package:</strong> ${packageTitle}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Date of Departure:</strong> ${travelDate}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Total Guests Reserved:</strong> ${guests} ${guests === 1 ? 'Traveler' : 'Travelers'}</p>
                    <p style="margin: 8px 0; font-size: 15px;"><strong>Total Amount Paid:</strong> <span style="color: #16a34a; font-weight: 700;">₹${amountPaid}</span></p>
                  </div>

                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #f1f5f9; font-family: monospace; font-size: 13px; color: #64748b;">
                    <span style="display: block; margin-bottom: 4px;"><strong>Order ID:</strong> ${orderId}</span>
                    <span style="display: block;"><strong>Payment Gateway ID:</strong> ${paymentId}</span>
                  </div>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #94a3b8;">
                  <p style="margin: 0 0 5px 0;">If you have any questions regarding itinerary timings, contact operations at support@spotontrip.com</p>
                  <p style="margin: 0;">&copy; 2026 SpotOnTrip. All rights reserved.</p>
                </div>
              </div>
            `
          })
        });

        if (!emailResponse.ok) {
          const emailErrData = await emailResponse.text();
          console.error('Resend delivery processing roadblock:', emailErrData);
        } else {
          console.log(`✉️ Confirmation ticket successfully dispatched to ${customerEmail}`);
        }
      } catch (mailErr) {
        console.error('Email pipeline execution fault:', mailErr.message);
      }
    }

    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('Webhook fault:', err.message);
    return res.status(500).json({ message: 'Internal Server Sync Failure' });
  }
}