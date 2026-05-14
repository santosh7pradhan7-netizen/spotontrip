// app/layout.js

import './globals.css'; 
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpotOnTrip - Book Flights, Hotels, and Packages',
  description: 'Your enhanced travel booking experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}