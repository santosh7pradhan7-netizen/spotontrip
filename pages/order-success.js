// pages/order-success.js - COMPLETE & UPDATED CODE
import Link from 'next/link'; // <-- ADD LINK IMPORT
import { useRouter } from 'next/router';

// NOTE: Assuming this file contains the success page logic.
// Please check line 32 in your file and ensure it is the link to the homepage.

export default function OrderSuccess() {
    const router = useRouter();
    const { orderId } = router.query;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg w-full">
                <div className="text-8xl mb-6 text-green-500">
                    🎉
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Booking Successful!
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Your payment was verified, and the booking has been confirmed.
                </p>

                {orderId && (
                    <div className="bg-green-50 p-4 rounded-lg mb-8 border border-green-300">
                        <p className="text-md font-medium text-gray-600">Confirmation ID:</p>
                        <p className="text-xl font-mono font-bold text-green-700 mt-1">
                            {orderId}
                        </p>
                    </div>
                )}
                
                <p className="text-md text-gray-600 mb-6">
                    A detailed itinerary has been sent to your email address.
                </p>

                <div className="mt-8">
                    {/* FIX: Replaced the unoptimized <a> tag with the Next.js <Link> component */}
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium text-lg border-b border-blue-600">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}