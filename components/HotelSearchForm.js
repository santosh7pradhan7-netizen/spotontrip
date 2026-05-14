// components/HotelSearchForm.js - FINAL CODE FIX

'use client'; 

import React, { useState } from 'react';

const HotelSearchForm = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, checkIn, checkOut, rooms });
    // This would typically navigate to /hotels?searchParams
    alert(`Searching for ${rooms} room(s) in ${location}...`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Field */}
        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="City, Area, or Property Name"
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* Check-in Field */}
        <div className="md:col-span-1">
          <label htmlFor="checkIn" className="block text-xs font-semibold text-gray-500 mb-1">Check-in</label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* Check-out Field */}
        <div className="md:col-span-1">
          <label htmlFor="checkOut" className="block text-xs font-semibold text-gray-500 mb-1">Check-out</label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="w-full border-b border-gray-300 py-2 px-1 focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>
      </div>

      {/* Guests Field - Added for completeness */}
      <div className="pt-2">
        <label htmlFor="rooms" className="block text-xs font-semibold text-gray-500 mb-1">Rooms</label>
        <input
          type="number"
          id="rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          min="1"
          required
          className="mt-1 block max-w-xs border border-gray-300 py-2 px-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>


      {/* Search Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none transition duration-150"
        >
          Search Hotels
        </button>
      </div>
    </form>
  );
};

export default HotelSearchForm;