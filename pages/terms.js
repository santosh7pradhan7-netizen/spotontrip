// pages/terms.js
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import { LEGAL_CSS } from './privacy-policy';

export default function Terms() {
  return (
    <SiteLayout>
      <Head><title>Terms &amp; Conditions | SpotOnTrip</title></Head>
      <div className="legal">
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: [DATE]</p>

        <p>By using spotontrip.com ("the Site"), operated by [Your Company Name], you agree to these terms.</p>

        <h2>1. What we do</h2>
        <p>SpotOnTrip acts as a booking facilitator, connecting you with travel and event providers (airlines, railways, bus operators, hotels, event organisers). We are not the provider of the underlying travel or event service unless explicitly stated.</p>

        <h2>2. Bookings and payments</h2>
        <p>Prices shown are as quoted by the relevant provider or our systems at the time of search and may change until payment is completed. Payment is processed securely via Razorpay. A booking is only confirmed once payment is successfully verified.</p>

        <h2>3. Cancellations and refunds</h2>
        <p>Cancellation and refund terms depend on the specific provider's policy (airline, railway, bus operator, hotel, or event organiser) and are described at the time of booking where available. See our <a href="/refund-policy">Refund &amp; Cancellation Policy</a> for details.</p>

        <h2>4. User responsibilities</h2>
        <ul>
          <li>You must provide accurate passenger/traveller details at the time of booking.</li>
          <li>You are responsible for carrying valid identification as required by the travel provider.</li>
          <li>Misuse of the Site, including fraudulent bookings, may result in cancellation without refund.</li>
        </ul>

        <h2>5. Limitation of liability</h2>
        <p>SpotOnTrip is not liable for delays, cancellations, or service issues caused by third-party travel or event providers. Our liability, where applicable, is limited to the amount paid for the specific booking in question.</p>

        <h2>6. Governing law</h2>
        <p>These terms are governed by the laws of India, with courts in [Your City] having jurisdiction.</p>

        <h2>7. Contact</h2>
        <p>For questions about these terms, contact [support email].</p>

        <p className="legal-note">This is a starting template, not legal advice — have it reviewed by a lawyer familiar with Indian consumer protection and e-commerce rules before going live.</p>
      </div>
      <style>{LEGAL_CSS}</style>
    </SiteLayout>
  );
}
