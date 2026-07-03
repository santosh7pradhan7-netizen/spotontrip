// pages/404.js
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

export default function NotFound() {
  return (
    <SiteLayout>
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 48, margin: 0 }}>404</h1>
        <p style={{ opacity: 0.6, marginBottom: 24 }}>This page took a wrong turn.</p>
        <Link href="/" style={{
          background: 'linear-gradient(90deg,#10B981,#0EA5E9)', color: '#fff', padding: '10px 20px',
          borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
        }}>Back to home</Link>
      </div>
    </SiteLayout>
  );
}
