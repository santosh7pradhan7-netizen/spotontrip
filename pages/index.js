// pages/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Plane, TrainFront, Bus, Hotel, Ticket, ChevronRight, ShieldCheck, Zap, IndianRupee } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SiteLayout from '../components/SiteLayout';

const SECTIONS = [
  { href: '/flights', label: 'Flights', desc: 'Live fares across India, powered by Amadeus.', icon: Plane, accent: '#FF6B35' },
  { href: '/trains', label: 'Trains', desc: 'Search routes and book your berth.', icon: TrainFront, accent: '#10B981' },
  { href: '/buses', label: 'Buses', desc: 'AC sleepers, seaters and Volvo multi-axle.', icon: Bus, accent: '#0EA5E9' },
  { href: '/hotels', label: 'Hotels', desc: 'Find a place to stay, any city.', icon: Hotel, accent: '#14B8A6' },
  { href: '/events', label: 'Events', desc: 'Concerts, sports and live shows.', icon: Ticket, accent: '#A855F7' },
];

export default function Home({ packages }) {
  return (
    <SiteLayout>
      <Head>
        <title>SpotOnTrip | Flights, Trains, Buses, Hotels &amp; Events</title>
        <meta name="description" content="Book flights, trains, buses, hotels and event tickets across India — live fares, instant UPI/card checkout." />
      </Head>

      <div className="sot-hero">
        <h1>Every way to move around India.<br />Spot on.</h1>
        <p>One place for flights, trains, buses, hotels and event tickets — live fares, instant UPI/card checkout.</p>
      </div>

      <div className="home-grid">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link href={s.href} key={s.href} className="home-card" style={{ '--accent': s.accent }}>
              <div className="home-card-icon" style={{ background: s.accent + '1A', color: s.accent }}><Icon size={22} /></div>
              <div className="home-card-title">{s.label}</div>
              <div className="home-card-desc">{s.desc}</div>
              <div className="home-card-go">Search <ChevronRight size={14} /></div>
            </Link>
          );
        })}
      </div>

      <div className="trust-row">
        <span><ShieldCheck size={14} /> Secure Razorpay checkout</span>
        <span><Zap size={14} /> Instant confirmation email</span>
        <span><IndianRupee size={14} /> UPI, cards &amp; netbanking</span>
      </div>

      {packages?.length > 0 && (
        <section className="pkg-section">
          <div className="pkg-head">
            <h2>Curated packages</h2>
            <Link href="/packages">See all <ChevronRight size={14} /></Link>
          </div>
          <div className="pkg-grid">
            {packages.slice(0, 3).map((p) => (
              <div className="pkg-card" key={p.id}>
                {p.image_url && <img src={p.image_url} alt={p.title} />}
                <div className="pkg-card-body">
                  <div className="pkg-card-title">{p.title}</div>
                  <div className="pkg-card-price">₹{Number(p.price).toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .home-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap:14px; margin-top: 8px; }
        .home-card { background:#fff; border-radius:16px; padding:18px; text-decoration:none; color:#0F172A; box-shadow: 0 6px 18px rgba(15,23,42,0.06); border: 1px solid rgba(15,23,42,0.05); transition: transform .15s ease; display:flex; flex-direction:column; gap:6px; }
        .home-card:hover { transform: translateY(-2px); }
        .home-card-icon { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:4px; }
        .home-card-title { font-family:'Rajdhani',sans-serif; font-weight:700; font-size:18px; }
        .home-card-desc { font-size:12.5px; opacity:0.62; line-height:1.4; flex:1; }
        .home-card-go { font-size:12px; font-weight:700; color: var(--accent); display:flex; align-items:center; gap:2px; margin-top:6px; }
        .trust-row { display:flex; flex-wrap:wrap; gap:18px; justify-content:center; margin: 28px 0 6px; font-size:12.5px; opacity:0.6; }
        .trust-row span { display:flex; align-items:center; gap:6px; }
        .pkg-section { margin-top: 40px; }
        .pkg-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .pkg-head h2 { font-family:'Rajdhani',sans-serif; font-size:20px; margin:0; }
        .pkg-head a { font-size:12px; font-weight:700; color:#10B981; text-decoration:none; display:flex; align-items:center; gap:2px; }
        .pkg-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap:14px; }
        .pkg-card { background:#fff; border-radius:14px; overflow:hidden; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        .pkg-card img { width:100%; height:120px; object-fit:cover; display:block; }
        .pkg-card-body { padding:12px 14px; }
        .pkg-card-title { font-weight:700; font-size:13.5px; margin-bottom:4px; }
        .pkg-card-price { font-size:13px; color:#10B981; font-weight:700; }
      `}</style>
    </SiteLayout>
  );
}

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase.from('packages').select('*').limit(6);
    if (error) throw error;
    return { props: { packages: data || [] } };
  } catch (e) {
    console.error('Supabase fetch failed:', e.message);
    return { props: { packages: [] } };
  }
}
