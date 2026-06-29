import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
// Falls back to a mock string for local development safety
const resendApiKey = process.env.RESEND_API_KEY || 're_mock_key';
const resend = new Resend(resendApiKey);

interface SendBookingEmailProps {
  toEmail: string;
  bookingId: string;
}

/**
 * Dispatches a gorgeous transactional confirmation email to travelers
 */
export async function sendBookingConfirmationEmail({ toEmail, bookingId }: SendBookingEmailProps) {
  console.log(`⏳ [EMAIL ENGINE] Preparing confirmation itinerary email for: ${toEmail}`);

  // Fallback check for local development without an active API key
  if (resendApiKey === 're_mock_key') {
    console.log(`\n==================================================`);
    console.log(`✉️  [MOCK EMAIL DISPATCHED SUCCESSFULLY]`);
    console.log(`FROM    : SpotOnTrip <onboarding@resend.dev>`);
    console.log(`TO      : ${toEmail}`);
    console.log(`SUBJECT : ✈️ Your SpotOnTrip Booking is Confirmed! (${bookingId})`);
    console.log(`BODY    : Thank you for booking with us! Your trip reference`);
    console.log(`          is ${bookingId}. Your digital itinerary is ready.`);
    console.log(`==================================================\n`);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'SpotOnTrip <onboarding@resend.dev>', // Resend provides this default domain for testing
      to: [toEmail],
      subject: `✈️ Your SpotOnTrip Booking is Confirmed! (${bookingId})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #0066cc; text-align: center;">Pack Your Bags! 🎒</h2>
          <p>Hello Traveler,</p>
          <p>Your payment was successfully processed and your booking has been officially secured.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <strong>Booking Reference ID:</strong> ${bookingId}<br>
            <strong>Status:</strong> Confirmed & Paid
          </div>
          <p>Log into your SpotOnTrip dashboard anytime to view your complete travel itinerary, vouchers, and hotel details.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666; text-align: center;">Thank you for choosing SpotOnTrip! Have an incredible journey.</p>
        </div>
      `,
    });

    if (error) {
      console.error(`❌ [RESEND API ERROR] Failed to deliver email:`, error.message);
      return { success: false, error: error.message };
    }

    console.log(`✅ [EMAIL SUCCESS] Confirmation message sent via Resend. ID: ${data?.id}`);
    return { success: true, id: data?.id };

  } catch (catchErr: any) {
    console.error(`❌ [EMAIL CRITICAL FAILURE] Engine crash:`, catchErr.message);
    return { success: false, error: catchErr.message };
  }
}