import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head'; // Added for Razorpay script

// Component for the Travel Cards
function PackageCard({ name, duration, price, keyword, onBook }) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-500 bg-white">
      <img 
        src={`https://source.unsplash.com/random/400x300/?${keyword}`} 
        className="w-full h-64 object-cover" 
        alt={name}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 mb-3">{duration}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-extrabold text-cyan-600">₹{price.toLocaleString('en-IN')}</span>
          <button 
            onClick={() => onBook(price, name)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Search Function
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/travel/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchQuery, mode: 'flights' }),
    });
    const data = await response.json();
    setResults(data.data);
    setLoading(false);
  };

  // 2. Razorpay Payment Function
  const makePayment = async (amount, title) => {
    const res = await fetch('/api/pay/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount })
    });
    const order = await res.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter your key here
      amount: order.amount,
      currency: "INR",
      name: "SpotOnTrip",
      description: `Booking: ${title}`,
      order_id: order.id,
      handler: (response) => alert("Booking Successful! ID: " + response.razorpay_payment_id),
      theme: { color: "#0891b2" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>

      {/* Header & Hero Section (Keep your existing JSX here) */}

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto -mt-20 relative z-20 px-4">
        <form onSubmit={handleSearch} className="flex bg-white p-2 rounded-xl shadow-2xl border-t-4 border-cyan-600">
          <input
            type="text"
            className="flex-grow p-4 outline-none text-lg"
            placeholder="Search flights or destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-cyan-600 text-white px-8 py-4 rounded-lg font-bold">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {results.length > 0 ? (
            results.map((item) => (
              <PackageCard 
                key={item.id}
                name={item.name}
                duration={item.info}
                price={item.price}
                keyword={item.keyword}
                onBook={makePayment}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-400">Search to see real-time Indian travel options.</p>
          )}
        </div>
      </section>
    </div>
  );
}