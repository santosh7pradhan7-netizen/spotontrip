// app/page.js - HOMEPAGE

'use client'; 

import { useState } from 'react'; 
import FlightSearchForm from '../components/FlightSearchForm';
import HotelSearchForm from '../components/HotelSearchForm';
import Image from 'next/image';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="relative min-h-[75vh] flex flex-col justify-center items-center">
      {/* Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1542456637-b2f763f91048?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Travel background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="z-0"
      />
      
      {/* Content Container */}
      <div className="z-10 w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Book Your Adventure
        </h1>

        {/* Search Tab Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {['flights', 'hotels'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 text-xl font-bold capitalize transition duration-150 ease-in-out ${
                  activeTab === tab 
                    ? 'text-blue-600 border-b-4 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Forms */}
          <div className="space-y-6">
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'hotels' && <HotelSearchForm />}
          </div>
        </div>
      </div>
    </div>
  );
}