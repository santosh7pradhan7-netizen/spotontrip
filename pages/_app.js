// pages/_app.js
import React from 'react';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://emrldtp.com/NjA2MDY1.js?t=606065"
        strategy="afterInteractive"
        data-cmp-ab="2"
      />
      <Component {...pageProps} />
    </>
  );
}