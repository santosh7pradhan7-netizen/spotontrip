// components/Footer.js - FINAL CODE FIX

'use client'; 

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">SpotOnTrip</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition duration-150 text-sm">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition duration-150 text-sm">Careers</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-white transition duration-150 text-sm">Press</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition duration-150 text-sm">Blog</Link></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition duration-150 text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition duration-150 text-sm">FAQ</Link></li>
              <li><Link href="/help-center" className="text-gray-400 hover:text-white transition duration-150 text-sm">Help Center</Link></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition duration-150 text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition duration-150 text-sm">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="text-gray-400 hover:text-white transition duration-150 text-sm">Sitemap</Link></li>
            </ul>
          </div>
          {/* Column 4 - Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Connect</h3>
            {/* Note: Ensure you install and use a library like react-icons or use simple text/SVG for icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SpotOnTrip. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;