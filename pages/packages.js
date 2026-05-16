import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Header } from '../components/Header'; // FIX: Wrapped in curly braces to match named export
import Footer from '../components/Footer';

const packages = [
  {
    id: 1,
    title: "Summer Trip: Rajpura to River",
    description: "A scenic journey with friends to the best swimming spots near Rajpura.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Leh-Ladakh Adventure",
    description: "Explore the majestic mountains and serene lakes of the North.",
    price: 15999,
    image: "https://images.unsplash.com/photo-1581791534721-e599344297ad?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Goa Beach Party",
    description: "Unwind at the beaches with premium stays and water sports.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
  }
];

export default function PackagesPage() {
  const [loadingId, setLoadingId] = useState(null);

  const makePayment = async (packageItem) => {
    if (!window || !window.Razorpay) {
      alert("Razorpay SDK failed to load or is initializing. Please wait a second and try again.");
      return;
    }

    setLoadingId(packageItem.id);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: packageItem.price,
          currency: "INR" 
        }),
      });

      if (!res.ok) {
        const textError = await res.text();
        console.error("Server HTML Error Snippet:", textError.slice(0, 300));
        throw new Error(`Server returned status code ${res.status}. Check Vercel logs.`);
      }

      const orderData = await res.json();

      if (!orderData || !orderData.id) {
        throw new Error("Invalid order data returned from server backend.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SpotOnTrip",
        description: `Booking for ${packageItem.title}`,
        order_id: orderData.id,
        handler: function (response) {
          alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
          window.location.href = "/order-success";
        },
        prefill: {
          name: "Traveler Name",
          email: "traveler@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" }, 
      };

      const RazorpayInstance = window.Razorpay;
      const paymentObject = new RazorpayInstance(options);
      
      paymentObject.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Payment Step Exception:", error);
      alert(`Could not initialize payment: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* Added pt-16 to clear your header's "fixed" layout */}
      <Head>
        <title>Packages | SpotOnTrip</title>
      </Head>

      <Script 
        id="razorpay-checkout-js" 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="beforeInteractive"
      />

      <Header />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Exclusive Travel Packages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-100">
              <img src={pkg.image} alt={pkg.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{pkg.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">₹{pkg.price}</span>
                  <button
                    onClick={() => makePayment(pkg)}
                    disabled={loadingId === pkg.id}
                    className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
                      loadingId === pkg.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {loadingId === pkg.id ? 'Loading...' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}