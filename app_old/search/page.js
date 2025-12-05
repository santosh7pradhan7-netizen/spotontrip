import Link from 'next/link';

export default function Search() {
  // In a real app, these would come from a database based on the search term
  const results = [
    { id: 1, name: "Luxury Palace", price: "$200", location: "New York" },
    { id: 3, name: "Mountain Retreat", price: "$120", location: "Aspen" },
    { id: 5, name: "Desert Oasis", price: "$180", location: "Dubai" }
  ];

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      {/* List of Results */}
      <div className="space-y-4">
        {results.map((hotel) => (
          <div key={hotel.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white">
            <div>
              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold text-xl">{hotel.price}</p>
              <Link href={`/hotel/${hotel.id}`}>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Deal
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Back Home Button */}
      <div className="mt-8">
        <Link href="/" className="text-gray-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}