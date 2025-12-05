"use client"; // This tells Next.js this component uses interactive features
import { useState } from 'react';
import Link from 'next/link';

export default function SearchBox() {
  // These "States" are like small memory boxes to hold what you type
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  return (
    <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '12px', maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Where is your next adventure?</h3>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        
        {/* FROM INPUT */}
        <input 
          type="text" 
          placeholder="From (e.g. Goa)" 
          style={{ flex: 1, padding: '10px' }} 
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)} // updates the memory box
        />
        
        {/* TO INPUT */}
        <input 
          type="text" 
          placeholder="To (e.g. London)" 
          style={{ flex: 1, padding: '10px' }} 
          value={toCity}
          onChange={(e) => setToCity(e.target.value)} // updates the memory box
        />
        
        <input type="date" style={{ padding: '10px' }} />
      </div>

      {/* The Link now dynamically adds your cities to the URL */}
      <Link href={`/search?from=${fromCity}&to=${toCity}`}>
        <button style={{ marginTop: '20px', width: '100%', padding: '15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Search Flights
        </button>
      </Link>
    </div>
  );
}