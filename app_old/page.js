import Link from 'next/link';

export default function Home() {
  const hotels = [
    { id: 1, name: "Royal Orchid", location: "Bangalore", price: "₹4,500/night" },
    { id: 2, name: "Goa Shack", location: "Goa", price: "₹2,000/night" },
    { id: 3, name: "Himalayan Retreat", location: "Manali", price: "₹3,500/night" },
    { id: 4, name: "Desert Camp", location: "Jaisalmer", price: "₹5,000/night" },
    { id: 5, name: "City Lights Inn", location: "Mumbai", price: "₹6,000/night" },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to SpotOnTrip</h1>
      <p>Select a hotel to view details:</p>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{hotel.name}</h3>
            <p>📍 {hotel.location}</p>
            <p>💰 {hotel.price}</p>
            {/* This Link tells Next.js: "When clicked, go to /hotel/1, /hotel/2, etc." */}
            <Link href={`/hotel/${hotel.id}`}>
              <button style={{ 
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}