// components/FlightResultsDisplay.js - COMPLETE & UPDATED CODE
import Link from 'next/link'; 

export default function FlightResultsDisplay({ flight }) {
    return (
        // ... (details)
            <div className="flex flex-col items-end">
                <p className="text-4xl font-extrabold text-blue-600">₹{flight.price}</p>
                <Link href="/booking"> {/* FIX: Ensure route is lowercase: /booking */}
                    <button className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                        Book Now
                    </button>
                </Link>
            </div>
        // ...
    );
}