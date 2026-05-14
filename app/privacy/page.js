'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At SpotOnTrip, we value your privacy. This policy outlines how we collect, use, and protect your personal information.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect data like your name, email, and booking details when you use our services.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
        <p className="text-gray-700 mb-4">
          Your information helps us process bookings, improve our site, and send personalized offers.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
        <p className="text-gray-700 mb-6">
          We use encryption and secure servers to protect your data. We never sell your information to third parties.
        </p>
        <p className="text-gray-700 mb-6">
          For full details, contact us at privacy@spotontrip.com.
        </p>
        <Link href="/" className="text-indigo-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}