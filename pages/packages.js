git add .
    git commit -m "Complete packages UI with Razorpay integration"
    git push origin master
    ```
3.  **Redeploy** on Vercel once (just to be safe).

**Now, when you visit [www.spotontrip.com/packages](http://www.spotontrip.com/packages) and click the button, you should finally see the secure Razorpay payment shieldTo make the "Book Now" button fully functional, responsive, and connected to your new API path, here is the complete code for `pages/packages.js`.

I have optimized this for **SpotOnTrip** by adding the `Script` loader correctly and ensuring the frontend handles the Razorpay popup perfectly.

### The Complete `pages/packages.js`
```javascript
import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

const packages = [
  {
    id: 1,
    title: "Summer Trip: Rajpura to River",
    description: "A 10-minute scenic journey with friends to the best swimming spots.",
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
    setLoadingId(packageItem.id);

    try {
      // 1. Create the Order on our server
      const res = await fetch('/api/pay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: packageItem.price,
          currency: "INR" 
        }),
      });

      const orderData = await res.json();

      if (!res.ok) throw new Error(orderData.message || "Failed to create order");

      // 2. Initialize Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Key from Vercel
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SpotOnTrip",
        description: `Booking for ${packageItem.title}`,
        order_id: orderData.id,
        handler: function (response) {
          // Success Callback
          alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
          window.location.href = "/order-success";
        },
        prefill: {
          name: "Traveler Name",
          email: "traveler@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" }, // SpotOnTrip Blue
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
      });

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Could not initialize payment. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Packages | SpotOnTrip</title>
      </Head>

      
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"/>

      <Header/>

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

      <Footer/>
    </div>
  );
}