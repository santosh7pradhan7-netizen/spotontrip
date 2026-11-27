// pages/flights.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const WL_BASE = 'https://flights.spotontrip.com';
const DEFAULT_FROM = 'DEL';
const DEFAULT_TO = 'BOM';

// Tomorrow's date in Indian time (IST = UTC + 5:30), as YYYY-MM-DD
export async function getServerSideProps() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  ist.setUTCDate(ist.getUTCDate() + 1);
  const tomorrow = ist.toISOString().slice(0, 10);
  return { props: { tomorrow } };
}

export default function Flights({ tomorrow }) {
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);
  const [date, setDate] = useState(tomorrow);
  const [error, setError] = useState('');

  function openWhiteLabel(url) {
    // New tab: your site stays open in this tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleSearch(e) {
    e.preventDefault();
    const f = from.trim().toUpperCase();
    const t = to.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(f) || !/^[A-Z]{3}$/.test(t)) {
      setError('Please enter 3-letter airport codes, e.g. DEL and BOM.');
      return;
    }
    if (f === t) {
      setError('From and To airports must be different.');
      return;
    }
    if (!date) {
      setError('Please choose a travel date.');
      return;
    }
    setError('');

    // Same format as before: FROM + DDMM + TO + passengers
    const [, mm, dd] = date.split('-');
    openWhiteLabel(`${WL_BASE}/?flightSearch=${f}${dd}${mm}${t}1`);
  }

  return (
    <>
      <Head>
        <title>Book Flights | SpotOnTrip</title>
        <meta
          name="description"
          content="Search and compare flight fares with SpotOnTrip."
        />
      </Head>

      {/* Header: logo + back button */}
      <header style={styles.header}>
        <Link href="/" style={styles.logoLink}>
          {/* Put your logo file at /public/logo.png */}
          <img src="/logo.png" alt="SpotOnTrip" style={styles.logo} />
        </Link>
        <Link href="/" style={styles.backBtn}>
          ← Back to SpotOnTrip
        </Link>
      </header>

      <main style={styles.main}>
        <h1 style={styles.h1}>Find your flight</h1>
        <p style={styles.sub}>
          Compare live fares. Results open in a new tab, so you can come back
          to SpotOnTrip anytime.
        </p>

        <form onSubmit={handleSearch} style={styles.form}>
          <label style={styles.label}>
            From
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              maxLength={3}
              placeholder="DEL"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            To
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              maxLength={3}
              placeholder="BOM"
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Date
            <input
              type="date"
              value={date}
              min={tomorrow}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.searchBtn}>
            Search flights
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.alt}>
          Prefer the full search page?{' '}
          <a href={WL_BASE} target="_blank" rel="noopener noreferrer">
            Open flight search
          </a>
        </p>
      </main>
    </>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #e5e7eb',
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logoLink: { display: 'inline-flex', alignItems: 'center' },
  logo: { height: 40, width: 'auto' },
  backBtn: {
    padding: '8px 14px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    textDecoration: 'none',
    color: '#111827',
    fontSize: 14,
  },
  main: { maxWidth: 720, margin: '0 auto', padding: '32px 20px' },
  h1: { fontSize: 28, margin: '0 0 8px' },
  sub: { color: '#4b5563', margin: '0 0 24px' },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'flex-end',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: 13,
    color: '#374151',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    minWidth: 110,
  },
  searchBtn: {
    padding: '11px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  },
  error: { color: '#b91c1c', marginTop: 12 },
  alt: { marginTop: 24, color: '#4b5563', fontSize: 14 },
};