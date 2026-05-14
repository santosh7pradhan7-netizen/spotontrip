// app/flights/page.js - FLIGHT RESULTS PAGE

import React from 'react';
import Image from 'next/image';

const FlightResultsPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Flight Search Results</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filter Placeholder */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">Filter Options</h2>
          <p className="text-gray-600">Apply filters for airlines, stops, and price range here.</p>
        </div>

        {/* Results List Placeholder */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 font-medium rounded">
            Displaying best flight options for your route.
          </div>
          
          {/* Example Flight Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border hover:shadow-xl transition duration-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">14:30 - 18:45</p>
              <p className="text-gray-600">DEL to BKK (1 Stop)</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-red-600">₹ 8,999</p>
              <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FlightResultsPage;