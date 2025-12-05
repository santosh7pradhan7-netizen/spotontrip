import Link from 'next/link';

export default function Home() {
  // Sample Data
  const hotels = [
    {
      id: 1,
      name: "Grand Luxury Hotel",
      location: "New York, USA",
      price: "$250",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: "$180",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Seaside Resort",
      location: "Miami, Florida",
      price: "$300",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      name: "Urban Boutique",
      location: "San Francisco, CA",
      price: "$220",
      rating: "4.6",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* 1. Vibrant Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          SpotOnTrip
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Discover luxury stays, cozy cabins, and seaside escapes at the best prices.
        </p>
        
        {/* Fake Search Bar for Visual Appeal */}
        <div className="bg-white p-2 rounded-full shadow-lg max-w-md mx-auto flex items-center">
          <input 
            type="text" 
            placeholder="Where do you want to go?" 
            className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </section>

      {/* 2. Hotel Grid Section */}
      <section className="max-w-7xl mx-auto p-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <Link 
              href={`/hotel/${hotel.id}`} 
              key={hotel.id} 
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                  ⭐ {hotel.rating}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {hotel.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  📍 {hotel.location}
                </p>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{hotel.price}</span>
                    <span className="text-gray-400 text-sm"> /night</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-400 text-sm">
        © 2025 SpotOnTrip. All rights reserved.
      </footer>
    </main>
  );
}