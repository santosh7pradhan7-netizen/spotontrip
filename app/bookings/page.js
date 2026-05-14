// app/bookings/page.js
// FIX: Removed unused state variables (bookingId, setBookingId)

export default function BookingStatusPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Booking Status Check</h1>
                <p className="mt-4 text-gray-600">Enter your booking ID to view details.</p>
                {/* Placeholder for actual input field */}
            </div>
        </div>
    );
}