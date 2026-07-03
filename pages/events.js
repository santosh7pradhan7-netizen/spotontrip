// pages/events.js
import { useState } from 'react';
import Head from 'next/head';
import { Ticket, ChevronRight, Activity } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import BookingModal from '../components/BookingModal';

const EVENTS = [
  { id: 'ev1', title: 'Live in Concert — Mumbai', venue: 'DY Patil Stadium, Mumbai', date: '2026-08-14', price: 2499 },
  { id: 'ev2', title: 'Stand-up Comedy Night', venue: 'JLN Stadium, Delhi', date: '2026-07-20', price: 999 },
  { id: 'ev3', title: 'IPL Match Night', venue: 'Chinnaswamy Stadium, Bengaluru', date: '2026-09-02', price: 3499 },
  { id: 'ev4', title: 'Beach Music Festival', venue: 'Vagator Beach, Goa', date: '2026-12-28', price: 4999 },
];
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function Events() {
  const [selected, setSelected] = useState(null);
  return (
    <SiteLayout>
      <Head><title>Events | SpotOnTrip</title></Head>
      <div className="sot-hero">
        <h1>Concerts, sports &amp; shows</h1>
        <p>Event ticketing is not connected to a live provider yet — this catalogue is for demonstration.</p>
      </div>

      <div className="sot-results">
        <div className="sot-results-head">
          <span>{EVENTS.length} events</span>
          <span className="sot-live-tag is-demo"><Activity size={12} /> Demo data — no event ticketing API connected</span>
        </div>
        {EVENTS.map((e) => (
          <div className="sot-row" key={e.id}>
            <div className="sot-row-icon" style={{ background: '#A855F722', color: '#A855F7' }}><Ticket size={18} /></div>
            <div className="sot-row-main">
              <div className="sot-row-title">{e.title}</div>
              <div className="sot-row-sub">{e.venue} · {e.date}</div>
            </div>
            <div className="sot-row-action">
              <span className="sot-price">{inr(e.price)}</span>
              <button onClick={() => setSelected(e)}>Select <ChevronRight size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {selected && <BookingModal title={selected.title} amount={selected.price} onClose={() => setSelected(null)} />}
    </SiteLayout>
  );
}
