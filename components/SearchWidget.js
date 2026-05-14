// components/SearchWidget.js
// FIX: Removed all unused imports (Calendar, Users, Briefcase, Repeat2) and unused variable (travelModes)

import { useState } from 'react';
import { Plane, Hotel } from 'lucide-react'; // Assuming you use lucide icons

export default function SearchWidget({ onSearch }) {
  const [activeTab, setActiveTab] = useState('flights');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'round-trip',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full">
      <div className="flex border-b border-gray-200 mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('flights')}
          className={`px-4 py-2 text-lg font-semibold transition ${
            activeTab === 'flights' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'
          }`}
        >
          <Plane className="inline w-5 h-5 mr-2" /> Flights
        </button>
        <button
          onClick={() => setActiveTab('hotels')}
          className={`px-4 py-2 text-lg font-semibold transition ${
            activeTab === 'hotels' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'
          }`}
        >
          <Hotel className="inline w-5 h-5 mr-2" /> Hotels
        </button>
      </div>

      <form onSubmit={handleSearchClick} className="space-y-6">
        {activeTab === 'flights' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Form Fields... (same as before) */}
            <input type="text" name="origin" placeholder="Origin" value={formData.origin} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
            <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        )}

        {/* ... (rest of the form remains the same) */}

        <button type="submit" className={`w-full font-extrabold py-4 rounded-lg text-lg transition duration-300 shadow-lg ${
            activeTab === 'flights' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white'
        }`}>
          Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </form>
    </div>
  );
}