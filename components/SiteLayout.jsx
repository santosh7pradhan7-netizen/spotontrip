// components/SiteLayout.jsx
import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/flights', label: 'Flights' },
  { href: '/trains', label: 'Trains' },
  { href: '/buses', label: 'Buses' },
  { href: '/hotels', label: 'Hotels' },
  { href: '/events', label: 'Events' },
];

export default function SiteLayout({ children }) {
  return (
    <div className="sot-app">
      <style>{CSS}</style>
      <header className="sot-header">
        <Link href="/" className="sot-brand">Spot<span>OnTrip</span></Link>
        <nav className="sot-nav">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
      </header>
      <main className="sot-main">{children}</main>
      <footer className="sot-footer">
        <span>© {new Date().getFullYear()} SpotOnTrip</span>
        <span className="sot-footer-links">
          <Link href="/contact">Contact</Link> · <Link href="/privacy-policy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/refund-policy">Refunds</Link> · <Link href="/booking">My Bookings</Link>
        </span>
      </footer>
    </div>
  );
}

export const CSS = `
* { box-sizing: border-box; }
.sot-app { font-family: 'Inter', -apple-system, sans-serif; min-height:100vh; background: linear-gradient(180deg,#EAF7F1 0%,#E7F3FB 100%); color:#0F172A; }
.sot-header { display:flex; align-items:center; justify-content:space-between; padding:16px 28px; background:rgba(255,255,255,0.7); backdrop-filter: blur(6px); position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(15,23,42,0.06); }
.sot-brand { font-family:'Rajdhani',sans-serif; font-weight:700; font-size:20px; text-decoration:none; color:#0F172A; }
.sot-brand span { color:#10B981; }
.sot-nav { display:flex; gap:20px; flex-wrap:wrap; }
.sot-nav a { color:#0F172A; text-decoration:none; font-size:13px; font-weight:600; opacity:0.7; }
.sot-nav a:hover { opacity:1; color:#0EA5E9; }
.sot-main { max-width:960px; margin:0 auto; padding: 28px 20px 60px; }
.sot-footer { display:flex; justify-content:space-between; padding:18px 28px; font-size:12px; opacity:0.55; flex-wrap:wrap; gap:8px; }
.sot-footer-links a { color:#0F172A; text-decoration:none; margin: 0 2px; }

.sot-hero { text-align:center; padding: 10px 10px 26px; }
.sot-hero h1 { font-family:'Rajdhani',sans-serif; font-size:30px; font-weight:700; margin:0 0 8px; color:#0F172A; }
.sot-hero p { opacity:0.65; max-width:480px; margin:0 auto; }

.sot-search-card { background:#fff; border-radius:16px; padding:18px; display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end; box-shadow: 0 8px 24px rgba(15,23,42,0.06); }
.sot-field { display:flex; flex-direction:column; gap:5px; flex:1; min-width:130px; }
.sot-field-label { font-size:11px; text-transform:uppercase; opacity:0.55; font-weight:700; letter-spacing:0.3px; }
.sot-field select, .sot-field input { border:1.5px solid rgba(15,23,42,0.12); border-radius:8px; padding:9px 10px; font-size:14px; background:#F8FAFC; color:#0F172A; }
.sot-swap { border:1.5px solid rgba(15,23,42,0.12); background:#F8FAFC; border-radius:8px; padding:9px; cursor:pointer; }
.sot-search-btn { background: linear-gradient(90deg,#10B981,#0EA5E9); color:#fff; border:none; border-radius:8px; padding:12px 22px; font-weight:700; cursor:pointer; }
.sot-search-btn:disabled { opacity:0.7; }

.sot-results { margin-top:22px; display:flex; flex-direction:column; gap:10px; }
.sot-results-head { display:flex; justify-content:space-between; align-items:center; font-size:12px; opacity:0.65; padding:0 4px; }
.sot-live-tag { display:flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-weight:700; }
.sot-live-tag.is-live { color:#10B981; background:rgba(16,185,129,0.12); }
.sot-live-tag.is-demo { color:#D97706; background:rgba(217,119,6,0.12); }
.sot-empty { opacity:0.5; text-align:center; padding: 30px; }

.sot-row { background:#fff; border:1px solid rgba(15,23,42,0.06); border-radius:14px; padding:14px 16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; box-shadow: 0 2px 8px rgba(15,23,42,0.04); }
.sot-row-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.sot-row-main { min-width:140px; flex:1; }
.sot-row-title { font-weight:700; font-size:14px; }
.sot-row-sub { font-size:12px; opacity:0.6; }
.sot-row-time { display:flex; align-items:center; gap:8px; font-size:13px; opacity:0.8; }
.sot-row-action { display:flex; align-items:center; gap:12px; }
.sot-price { font-weight:700; font-size:14px; }
.sot-row-action button { background: linear-gradient(90deg,#10B981,#0EA5E9); color:#fff; border:none; padding:8px 14px; border-radius:8px; font-size:12px; font-weight:700; display:flex; align-items:center; gap:4px; cursor:pointer; }

.sot-modal-backdrop { position:fixed; inset:0; background:rgba(15,23,42,0.55); display:flex; align-items:center; justify-content:center; z-index:100; padding:16px; }
.sot-modal { background:#fff; color:#0F172A; border-radius:18px; padding:26px; width:100%; max-width:400px; position:relative; display:flex; flex-direction:column; gap:10px; }
.sot-modal h3 { font-family:'Rajdhani',sans-serif; font-size:22px; margin:0; }
.sot-modal-sub { font-size:12px; opacity:0.6; margin:0 0 6px; }
.sot-modal input { border:1.5px solid rgba(15,23,42,0.12); border-radius:8px; padding:10px; font-size:14px; }
.sot-modal-close { position:absolute; top:14px; right:14px; background:#F1F5F9; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; }
.sot-primary-btn { background: linear-gradient(90deg,#10B981,#0EA5E9); color:#fff; border:none; padding:13px; border-radius:10px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; margin-top:6px; }
.sot-primary-btn:disabled { opacity:0.5; }
.sot-processing { display:flex; flex-direction:column; align-items:center; text-align:center; gap:10px; padding: 20px 0; }
.sot-spinner { width:30px; height:30px; border:3px solid rgba(16,185,129,0.2); border-top-color:#10B981; border-radius:50%; animation: sot-spin 0.7s linear infinite; }
@keyframes sot-spin { to { transform: rotate(360deg); } }
.sot-confirm { display:flex; flex-direction:column; align-items:center; text-align:center; gap:4px; }
.sot-ticket { width:100%; background:#F8FAFC; border-radius:12px; padding:14px; margin:12px 0; }
.sot-ticket-row { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
`;
