export default async function handler(req, res) {
  // Handle the Search request from your website
  if (req.method === 'POST') {
    const { query, mode } = req.body;

    // This is where you would eventually call Amadeus, IRCTC, or redBus
    const mockData = [
      { id: '1', name: 'IndiGo', price: 4500, info: 'Non-stop • 2h 15m', keyword: 'airplane' },
      { id: '2', name: 'Air India', price: 5800, info: '1 Stop • 4h 05m', keyword: 'flight' },
      { id: '3', name: 'Vistara', price: 6200, info: 'Non-stop • 2h 10m', keyword: 'travel' }
    ];

    return res.status(200).json({ success: true, data: mockData });
  }

  // Handle browser visits (Direct URL check)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "Online", 
      message: "SpotOnTrip Travel API is active. Please use POST for searches." 
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}