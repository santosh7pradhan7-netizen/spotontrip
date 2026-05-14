// components/FlightSearchForm.js - FINAL CODE FIX

'use client'; 

import React, { useState } from 'react';

const FlightSearchForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [tripType, setTripType] = useState('Round Trip');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ from, to, date, tripType });
    // This would typically navigate to /flights?searchParams
    alert(`Searching ${tripType} flights from ${from} to ${to} on ${date}...`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Trip Type Selector */}
      <div className="mb-6 flex space-x-4 text-lg font-medium">
        {['Round Trip', 'One Way', 'Multi-City'].map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`pb-1 transition duration-150 ${
              tripType === type ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* From Field */}
        <div className="md:col-span-1">
          <label htmlFor="from" className="block text-xs font-semibold text-gray-500 mb-1">From</label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            placeholder="Departure City"
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* To Field */}
        <div className="md:col-span-1">
          <label htmlFor="to" className="block text-xs font-semibold text-gray-500 mb-1">To</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            placeholder="Arrival City"
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* Date Field */}
        <div className="md:col-span-1">
          <label htmlFor="date" className="block text-xs font-semibold text-gray-500 mb-1">Departure Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>
        
        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none transition duration-150"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;