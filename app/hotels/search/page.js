// app/hotels/page.js - HOTEL RESULTS PAGE

import React from 'react';
import Image from 'next/image';

const HotelResultsPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Hotel Search Results</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filter Placeholder */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">Map & Filters</h2>
          <p className="text-gray-600">Filter by price, amenities, and guest ratings.</p>
        </div>

        {/* Results List Placeholder */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700 font-medium rounded">
            Displaying the best hotels based on your check-in/out dates.
          </div>
          
          {/* Example Hotel Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg flex border hover:shadow-xl transition duration-200">
            <div className="w-1/3 h-48 relative rounded-lg overflow-hidden mr-4">
              <Image 
                src="https://images.unsplash.com/photo-1566073771259-d368d30e380a?q=80&w=2670&auto=format"
                alt="Hotel Photo"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-2/3 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">The Grand Luxury Suites</h3>
                <p className="text-yellow-500 text-lg">★★★★★</p>
                <p className="text-gray-600 text-sm mt-1">Central Location, Free Cancellation</p>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-500 line-through">₹ 15,000</p>
                <p className="text-3xl font-extrabold text-green-600">₹ 9,999</p>
                <p className="text-gray-500 text-xs">per night</p>
                <button className="mt-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                  View Deal
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HotelResultsPage;