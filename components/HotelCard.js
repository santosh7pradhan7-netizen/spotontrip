// components/HotelCard.js - COMPLETE & FINAL CODE
// import Link from 'next/link'; <-- REMOVED UNUSED IMPORT

// Component receives hotel data and an onSelect function to handle booking.
export function HotelCard({ hotel, onSelect }) {
    return (
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
            <div className="w-1/3 bg-gray-200">
                {/* Placeholder for hotel image */}
                <div className="h-full flex items-center justify-center text-sm text-gray-500">
                    Image Placeholder
                </div>
            </div>
            
            <div className="w-2/3 p-4 flex justify-between">
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-blue-800">{hotel.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{hotel.location}</p>
                    <div className="text-yellow-500 mb-4">
                        {hotel.rating} ⭐ Rating
                    </div>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                        {hotel.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <div className="text-right">
                        <p className="text-lg font-light text-gray-500">Price per night</p>
                        <p className="text-3xl font-bold text-green-600">₹{hotel.price}</p>
                    </div>
                    <button
                        onClick={onSelect}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        View Deal
                    </button>
                </div>
            </div>
        </div>
    );
}