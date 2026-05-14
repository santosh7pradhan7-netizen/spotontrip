// components/TripSearchForm.js
'use client';

import { useState } from 'react';

export function TripSearchForm({ onSubmit }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!origin || !destination) {
      setError('Both origin and destination fields are required.');
      return;
    }

    // Call the parent handler function
    onSubmit({ origin, destination });
  };

  // --- Mock Airport Options (use real data in a production app) ---
  const cities = ['Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Origin Input */}
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
            Origin
          </label>
          <select
            id="origin"
            name="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="" disabled>Select Starting City</option>
            {cities.map((city) => (
              <option key={city} value={city.toUpperCase()}>
                {city} ({city.substring(0, 3).toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Destination Input */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <select
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="" disabled>Select Destination City</option>
            {cities.map((city) => (
              <option key={city} value={city.toUpperCase()}>
                {city} ({city.substring(0, 3).toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Search Flights
      </button>
    </form>
  );
}