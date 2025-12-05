import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', alignItems: 'center', backgroundColor: 'white' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#0070f3' }}>SpotOnTrip</Link>
      </div>
      <div>
        <Link href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link href="/about" style={{ textDecoration: 'none', color: '#333' }}>About Us</Link>
      </div>
    </nav>
  );
}