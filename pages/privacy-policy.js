// pages/privacy-policy.js
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

export default function PrivacyPolicy() {
  return (
    <SiteLayout>
      <Head><title>Privacy Policy | SpotOnTrip</title></Head>
      <div className="legal">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: [DATE]</p>

        <p>[Your Company Name] ("SpotOnTrip", "we", "us") operates spotontrip.com. This policy explains what information we collect, how we use it, and your choices.</p>

        <h2>1. Information we collect</h2>
        <ul>
          <li>Contact details you provide when booking: name, email, phone number.</li>
          <li>Payment information is collected and processed directly by our payment partner, Razorpay — we do not store your card, UPI, or bank details on our servers.</li>
          <li>Booking details: travel dates, routes, passenger counts.</li>
          <li>Basic usage data (pages visited, device/browser type) for improving the site.</li>
        </ul>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To process and confirm your bookings.</li>
          <li>To send booking confirmations and updates by email.</li>
          <li>To provide customer support.</li>
          <li>To comply with legal and regulatory requirements.</li>
        </ul>

        <h2>3. Sharing of information</h2>
        <p>We share necessary booking details with the relevant travel or event provider (airline, railway, bus operator, hotel, event organiser) to fulfil your booking, and payment details directly with Razorpay to process payment. We do not sell your personal information to third parties.</p>

        <h2>4. Data retention</h2>
        <p>We retain booking records as required for customer support, accounting, and legal compliance purposes.</p>

        <h2>5. Your rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at [support email].</p>

        <h2>6. Contact us</h2>
        <p>Questions about this policy can be sent to [support email] or [support phone].</p>

        <p className="legal-note">This is a starting template, not legal advice — please have it reviewed against India's Digital Personal Data Protection Act (DPDPA) requirements before going live.</p>
      </div>
      <style>{LEGAL_CSS}</style>
    </SiteLayout>
  );
}

export const LEGAL_CSS = `
  .legal { max-width: 720px; margin: 0 auto; background:#fff; border-radius:16px; padding: 32px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
  .legal h1 { font-family:'Rajdhani',sans-serif; font-size:28px; margin: 0 0 4px; }
  .legal-updated { font-size:12px; opacity:0.5; margin-bottom: 20px; }
  .legal h2 { font-size:16px; margin: 24px 0 8px; }
  .legal p, .legal li { font-size: 14px; line-height: 1.6; color: #334155; }
  .legal ul { padding-left: 20px; }
  .legal-note { margin-top: 28px; font-size: 12px; opacity: 0.6; font-style: italic; }
`;
