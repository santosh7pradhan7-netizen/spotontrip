// components/Layout.js

import React from 'react';
import Head from 'next/head'; // Used for title/meta tags

// This component provides a guaranteed centered wrapper
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>SpotOnTrip - Travel and Flight Booking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* This is the fixed layout container. 
        It uses a modern centered div approach:
        - width: 100% of the screen
        - max-width: 1400px (or any max size you like)
        - margin: 0 auto (guaranteed centering on fixed/max width content)
      */}
      <div className="w-full mx-auto" style={{ maxWidth: '1400px' }}>
        {children}
      </div>
    </>
  );
}