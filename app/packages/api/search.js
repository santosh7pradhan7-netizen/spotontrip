// app/packages/search/page.js
'use client'; 

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // App Router hooks

// --- Placeholder Mock Package Data ---
const MOCK_PACKAGES = [
  { id: 301, name: 'Himalayan Trekking & Culture', theme: 'Adventure', duration: '12 Days', price: 95000, rating: 4.8, type: 'Group', keyword: 'himalaya,trekking' },
  { id: 302, name: 'Romantic Bali Getaway', theme: 'Relaxation', duration: '7 Days', price: 135000, rating: 4.9, type: 'Private', keyword: 'bali,beach,villa' },
  { id: 303, name: 'Desert Safari & History', theme: 'Adventure', duration: '5 Days', price: 62000, rating: 4.2, type: 'Group', keyword: 'desert,camel,history' },
  { id: 304, name: 'European Grand Tour', theme: 'Culture', duration: '21 Days', price: 280000, rating: 4.6, type: 'Group', keyword: 'europe,cities' },
];

const getPackageImage = (keyword) => `https://source.unsplash.com/random/400x250/?${keyword}`;

// --- Component for an Individual Package Result ---
function PackageCard({ pkg }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const starArray = [];
    for (let i = 0; i < fullStars; i++) {
      starArray.push('⭐');
    }
    return starArray.join('');
  };
    
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col md:flex-row mb-6 overflow-hidden border border-gray-200">
      
      {/* Image Column */}
      <div className="md:w-1/3 flex-shrink-0">
        <img 
          src={getPackageImage(pkg.keyword)} 
          alt={pkg.name} 
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      {/* Details Column */}
      <div className="p-5 flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
        <p className="text-sm text-cyan-600 font-semibold mb-2">{pkg.duration} | {pkg.theme}</p>
        
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <span className="text-yellow-500 mr-2">{renderStars(pkg.rating)}</span>
          <span>{pkg.rating} / 5</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">{pkg.type} Tour</span>
        </div>
        
        {/* Features/Summary */}
        <p className="text-gray-600 text-sm">Includes Flights, 4-star lodging, local guide, and all major transfers.</p>
      </div>

      {/* Price/Booking Column */}
      <div className="md:w-1/4 p-5 md:border-l border-gray-100 flex flex-col justify-center items-end bg-cyan-50/50 md:bg-white">
        <span className="text-lg text-gray-600">Total Package Price</span>
        <span className="text-4xl font-extrabold text-indigo-600 mb-3">₹{pkg.price.toLocaleString('en-IN')}</span>
        <Link href={`/packages/book?packageId=${pkg.id}`} passHref>
            <span className="bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition shadow-md cursor-pointer">
              View Details
            </span>
        </Link>
      </div>
    </div>
  );
}


export default function PackageSearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || ''; // Read the 'q' parameter
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); // Initial state is true

  // Fetch data effect (simulated)
  useEffect(() => {
    // FIX: Removed synchronous setLoading(true)
    
    // Simulate filtering or fetching based on the query
    const filtered = searchQuery
      ? MOCK_PACKAGES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.theme.toLowerCase().includes(searchQuery.toLowerCase()))
      : MOCK_PACKAGES;

    setTimeout(() => {
      setPackages(filtered);
      setLoading(false);
    }, 1000);
    
  }, [searchQuery]);


  const resultTitle = searchQuery ? `Packages matching "${searchQuery}"` : 'All Available Packages';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. Header/Navigation (Same) */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="text-4xl font-black text-indigo-600 tracking-tighter">SpotOnTrip</Link>
          <button className="text-indigo-600 hover:text-indigo-800 font-semibold" onClick={() => router.back()}>
             ← Modify Search
          </button>
        </div>
      </header>
      
      {/* ... (rest of the JSX remains the same) */}
      <div className="bg-cyan-600 text-white py-4 shadow-xl mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">{resultTitle}</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-full sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Filter Packages</h2>
            
            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Package Theme</h3>
                <label className="flex items-center space-x-2 text-gray-700"><input type="checkbox" className="rounded text-cyan-600" /><span>Adventure</span></label>
                <label className="flex items-center space-x-2 text-gray-700"><input type="checkbox" className="rounded text-cyan-600" /><span>Relaxation</span></label>
                <label className="flex items-center space-x-2 text-gray-700"><input type="checkbox" className="rounded text-cyan-600" /><span>Culture</span></label>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Budget</h3>
                <p className="text-cyan-600 font-bold">₹50,000 - ₹300,000</p>
                <div className="h-2 bg-gray-200 rounded-full mt-2"></div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <label className="flex items-center space-x-2 text-gray-700"><input type="checkbox" className="rounded text-cyan-600" /><span>Short (1-7 Days)</span></label>
                <label className="flex items-center space-x-2 text-gray-700"><input type="checkbox" className="rounded text-cyan-600" /><span>Long (8+ Days)</span></label>
            </div>

          </aside>

          <section className="lg:col-span-3">
            {loading ? (
              <p className="text-center text-xl text-gray-600 p-10 bg-white rounded-xl shadow-lg">
                Searching for your dream package...
              </p>
            ) : (
              <>
                <div className="mb-6 text-gray-700 font-medium">
                  Showing **{packages.length}** results
                </div>
                {packages.length > 0 ? (
                    packages.map(pkg => (
                      <PackageCard key={pkg.id} pkg={pkg} />
                    ))
                ) : (
                     <div className="text-center text-xl text-gray-600 p-10 bg-white rounded-xl shadow-lg">
                        No packages found matching your criteria. Try a broader search!
                    </div>
                )}
              </>
            )}
          </section>

        </div>
      </main>

      {/* 4. Footer (Same as other pages) */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          &copy; {new Date().getFullYear()} SpotOnTrip. All rights reserved.
        </div>
      </footer>
    </div>
  );
}