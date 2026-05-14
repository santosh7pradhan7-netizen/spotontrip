// components/SearchForm.js (This goes beyond the simple SearchBox)

import React from 'react';
import { Plane, Calendar, Users, MapPin } from 'lucide-react';

export default function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Flight Search Initiated!');
    // Real logic would involve collecting all form data and navigating to the results page.
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-2xl max-w-4xl mx-auto transform -translate-y-16">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Input Row 1: Origin and Destination */}
        <div className="flex space-x-4">
          <InputGroup icon={MapPin} label="Origin" placeholder="City or Airport" />
          <InputGroup icon={MapPin} label="Destination" placeholder="City or Airport" />
        </div>

        {/* Input Row 2: Dates and Passengers */}
        <div className="flex space-x-4">
          <InputGroup icon={Calendar} label="Departure Date" type="date" placeholder="" />
          <InputGroup icon={Calendar} label="Return Date" type="date" placeholder="" />
          <InputGroup icon={Users} label="Passengers" type="number" placeholder="1" defaultValue="1" />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <Plane className="w-6 h-6 rotate-45" />
          <span>Search Flights</span>
        </button>
      </form>
    </div>
  );
}

// Reusable Sub-Component for clean inputs
const InputGroup = ({ icon: Icon, label, ...props }) => (
  <div className="flex-1">
    <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        {...props}
        className="w-full py-3 pl-10 pr-4 text-gray-800 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />
    </div>
  </div>
);