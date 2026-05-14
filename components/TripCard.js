// components/TripCard.js
'use client'; 

export function TripCard({ trip }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition duration-300 hover:shadow-xl hover:border-indigo-300">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          {trip.origin} → {trip.destination}
        </h2>
        <div className="text-xl font-bold text-gray-900">
          ₹{trip.price.toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-4">
        <div>
          <p className="font-medium text-gray-500">Airline</p>
          <p className="text-base font-medium">{trip.airline}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Departure</p>
          <p className="text-base">{trip.departureTime}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Arrival</p>
          <p className="text-base">{trip.arrivalTime}</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-150">
          Book This Flight
        </button>
      </div>
    </div>
  );
}