// components/SearchBox.js (Updated for Travel Destination Search)

import { MapPin } from 'lucide-react';
import React, { useState } from 'react';

export default function SearchBox() {
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      // Logic to search for a destination (e.g., /search?dest=Paris)
      console.log('Searching for destination:', destination); 
      setDestination(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Where do you want to go? (City, Airport, or Country)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full py-2 pl-12 pr-4 text-base text-gray-800 border border-blue-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-sm"
      />
      
      {/* Map Pin Icon */}
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
      
      {/* Submit Button (Hidden, as Enter is used, but good practice) */}
      <button 
        type="submit" 
        aria-label="Search Destination"
        className="hidden" // Hiding the button, relying on 'Enter' key press
      />
    </form>
  );
}