'use client';

import { useState, useEffect } from 'react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: string;
  pricePerNight: number;
  tags: string[];
}

export default function SpotOnTripPremiumDashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Modern Interactive Option States
  const [selectedCity, setSelectedCity] = useState<string>('Goa');
  const [timeline, setTimeline] = useState<string>('weekend'); // weekend, week, month
  const [tier, setTier] = useState<string>('luxury'); // luxury, boutique, eco

  useEffect(() => {
    async function syncSupplyMatrix() {
      setLoading(true);
      try {
        const res = await fetch(`/api/hotels/search?city=${encodeURIComponent(selectedCity)}`);
        const data = await res.json();
        if (data.success) setHotels(data.hotels);
      } catch (err) {
        console.error('Data Sync Failure:', err);
      } finally {
        setLoading(false);
      }
    }
    syncSupplyMatrix();
  }, [selectedCity, timeline, tier]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      
      {/* Header Shell */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-tight uppercase bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              SpotOnTrip
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/60">
              Live Supply Matrix
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Channels Online</span>
          </div>
        </div>
      </header>

      {/* Control Matrix Section */}
      <section className="bg-white border-b border-slate-200/60 px-6 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Grid Row 1: Destination Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">1. Select Target Destination</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'Goa', label: 'Goa Coastline', desc: 'Premium beachfront escapes & villas' },
                { id: 'Mumbai', label: 'Mumbai Metro', desc: 'High-end urban luxury stays' },
                { id: 'Delhi', label: 'Delhi Capital', desc: 'Heritage luxury & business suites' }
              ].map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 outline-none ${
                    selectedCity === city.id
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-900/10'
                      : 'border-slate-200/80 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-extrabold text-base tracking-tight">{city.label}</p>
                  <p className={`text-xs mt-1 font-medium ${selectedCity === city.id ? 'text-slate-300' : 'text-slate-400'}`}>
                    {city.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Parameter Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Timeline Filter Grid Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">2. Travel Timeline</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'weekend', label: 'Weekend', span: '3 Days / 2 Nights' },
                  { id: 'week', label: 'Full Week', span: '7 Days / 6 Nights' },
                  { id: 'month', label: 'Extended', span: 'Flexible Stay' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                      timeline === t.id
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-extrabold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:border-slate-300'
                    }`}
                  >
                    <p className="text-sm">{t.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{t.span}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation Tier Grid Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">3. Escape Class Tier</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'luxury', label: 'Ultra Luxury', icon: '💎' },
                  { id: 'boutique', label: 'Boutique', icon: '🎨' },
                  { id: 'eco', label: 'Eco Retreat', icon: '🌿' }
                ].map((tierOpt) => (
                  <button
                    key={tierOpt.id}
                    onClick={() => setTier(tierOpt.id)}
                    className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                      tier === tierOpt.id
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-extrabold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:border-slate-300'
                    }`}
                  >
                    <p className="text-lg mb-0.5">{tierOpt.icon}</p>
                    <p className="text-xs">{tierOpt.label}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Results View */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Available Live Allocations ({hotels.length})
            </h2>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">
              Showing {tier} options matching your {timeline} parameters in {selectedCity}.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-8 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Re-routing live supply buffers...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Visual Header Track */}
                <div className="relative overflow-hidden h-52 bg-slate-50">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300 ease-out" 
                  />
                  <div className="absolute top-4 left-4 flex gap-1">
                    {hotel.tags.map((tag, i) => (
                      <span key={i} className="bg-white/95 backdrop-blur-sm text-[9px] font-black uppercase tracking-wider text-slate-800 px-2.5 py-1 rounded-md shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-900/90 text-white px-2.5 py-1 rounded-md text-xs font-black shadow-sm flex items-center space-x-1">
                    <span>★</span> <span>{hotel.rating}</span>
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                      {hotel.location}
                    </p>
                  </div>

                  {/* Pricing and Action Hooks */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xl font-black tracking-tight text-slate-900">
                        ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                        Per Night Net Rate
                      </p>
                    </div>
                    <button className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm">
                      Select Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}