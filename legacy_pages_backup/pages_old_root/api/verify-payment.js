// pages/api/verify-payment.js
import crypto from 'crypto';

// Replace your Razorpay key secret here (from your .env.local file)
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export default async function verifyPayment(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { orderId, paymentId, signature } = req.body;

        if (!RAZORPAY_KEY_SECRET) {
            console.error("RAZORPAY_KEY_SECRET not set.");
            return res.status(500).json({ message: 'Server configuration error.' });
        }

        // 1. Concatenate the Order ID and Payment ID
        const generatedSignature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        // 2. Compare the generated signature with the signature received from the client
        const isSignatureValid = generatedSignature === signature;

        if (isSignatureValid) {
            // The signature is valid. Payment is genuine.
            // In a real scenario, you would now:
            // 1. Update the database record for this order/booking to 'Confirmed'.
            // 2. Trigger the final booking API call (e.g., flight/hotel booking).
            // 3. Send a confirmation email.
            
            return res.status(200).json({ 
                success: true, 
                message: 'Payment verified successfully.',
                paymentId: paymentId
            });
        } else {
            // Signature mismatch - payment is potentially tampered with or failed verification.
            return res.status(400).json({ 
                success: false, 
                message: 'Payment verification failed: Signature mismatch.' 
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}