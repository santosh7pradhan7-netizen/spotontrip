// pages/contact.js
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LEGAL_CSS } from './privacy-policy';

export default function Contact() {
  return (
    <SiteLayout>
      <Head><title>Contact Us | SpotOnTrip</title></Head>
      <div className="legal">
        <h1>Contact Us</h1>
        <p style={{ fontSize: 14, color: '#334155', marginBottom: 20 }}>
          We're here to help with bookings, payments, and general questions.
        </p>
        <div className="contact-rows">
          <div className="contact-row"><Mail size={16} /> [santosh7pradhan7@gmail.com]</div>
          <div className="contact-row"><Phone size={16} /> [+91 8168116094]</div>
          <div className="contact-row"><MapPin size={16} /> [SONIPAT]</div>
        </div>
        <p className="legal-note">Business/legal name: [See and Live Travels]. Add your GSTIN here if registered.</p>
      </div>
      <style>{LEGAL_CSS}</style>
      <style>{`.contact-rows { display:flex; flex-direction:column; gap:12px; margin: 16px 0; }
        .contact-row { display:flex; align-items:center; gap:10px; font-size:14px; color:#0F172A; }`}</style>
    </SiteLayout>
  );
}
