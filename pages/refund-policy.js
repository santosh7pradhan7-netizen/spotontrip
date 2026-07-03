// pages/refund-policy.js
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import { LEGAL_CSS } from './privacy-policy';

export default function RefundPolicy() {
  return (
    <SiteLayout>
      <Head><title>Refund &amp; Cancellation Policy | SpotOnTrip</title></Head>
      <div className="legal">
        <h1>Refund &amp; Cancellation Policy</h1>
        <p className="legal-updated">Last updated: [DATE]</p>

        <p>This policy explains how cancellations and refunds are handled for bookings made on spotontrip.com.</p>

        <h2>1. Flights, trains, and buses</h2>
        <p>Cancellation charges and refund eligibility follow the respective airline's, railway's, or bus operator's own policy at the time of booking. Where a provider issues a refund, we will process it back to your original payment method within [X] business days of receiving it.</p>

        <h2>2. Hotels</h2>
        <p>Refund eligibility depends on the specific property's cancellation policy shown at the time of booking (e.g. free cancellation window, non-refundable rate).</p>

        <h2>3. Events</h2>
        <p>Event tickets are generally non-refundable once booked, except where an event is cancelled or rescheduled by the organiser, in which case our standard refund process applies.</p>

        <h2>4. How to request a cancellation</h2>
        <p>Contact us at [support email] or [support phone] with your booking reference (PNR/order ID). We will confirm the applicable cancellation charge, if any, before processing.</p>

        <h2>5. Refund timelines</h2>
        <p>Once a refund is approved, it is initiated via Razorpay to your original payment method. Depending on your bank, it may take 5–10 business days to reflect.</p>

        <h2>6. Failed or duplicate payments</h2>
        <p>If you were charged but did not receive a booking confirmation, contact us with your payment ID and we will investigate and refund any duplicate or failed transaction.</p>

        <p className="legal-note">This is a starting template — fill in your actual processing timelines and contact details, and confirm the specific cancellation terms of each provider you integrate with.</p>
      </div>
      <style>{LEGAL_CSS}</style>
    </SiteLayout>
  );
}
