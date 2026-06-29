// pages/api/locations.js

export default async function handler(req, res) {
  // Enforce GET method safety
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const keyword = (req.query.keyword || '').trim();

  // Guard clause for low string limits
  if (keyword.length < 3) {
    return res.status(200).json({ success: true, data: [] });
  }

  console.log(`📡 [SPOTONTRIP ENGINE]: Querying active network clusters for keyword: "${keyword}"`);

  // 1. MASTER REGIONAL DATABASE INDEX (Trains, Buses, Local Event Venues)
  const regionalHubIndex = [
    // Rail Terminals
    { code: "NDLS", name: "New Delhi Railway Station Junction", context: "Rail Terminal, Delhi" },
    { code: "NZM", name: "Hazrat Nizamuddin Railway Station", context: "Rail Terminal, Delhi" },
    { code: "ANVT", name: "Anand Vihar Terminal Hub", context: "Rail Terminal, Delhi" },
    { code: "LKO", name: "Lucknow Charbagh NR Junction", context: "Rail Terminal, Uttar Pradesh" },
    { code: "CDG-RL", name: "Chandigarh Junction Railway Hub", context: "Rail Terminal, Chandigarh" },
    { code: "PNBE", name: "Patna Junction Main Terminal", context: "Rail Terminal, Bihar" },
    { code: "HWH", name: "Howrah Railway Junction", context: "Rail Terminal, West Bengal" },

    // Intercity Bus Stand Nodes
    { code: "ISBT-KG", name: "Kashmere Gate Inter-State Bus Terminus", context: "Bus Hub, Delhi" },
    { code: "ISBT-A3", name: "Anand Vihar ISBT Hub", context: "Bus Hub, Delhi" },
    { code: "ISBT-S43", name: "Sector 43 Main Bus Station", context: "Bus Hub, Chandigarh" },
    { code: "MURTHAL", name: "Murthal Grand Highway Transit Canopy", context: "Bus Stop, Haryana" },
    { code: "SONIPAT-BS", name: "Sonipat Central Bus Stand", context: "Bus Hub, Sonipat" },

    // Premium Local Event Venues
    { code: "GURUGRAM-LV", name: "Leisure Valley Event Grounds", context: "Entertainment Arena, Gurugram" },
    { code: "JLN-STADIUM", name: "Jawaharlal Nehru Stadium Arena", context: "Concert Venue, Delhi" },
    { code: "TIMEWARP-Z", name: "TimeWarp Events & Expedition Zone", context: "Regional Venue, Sonipat" },
    { code: "AWADH-HAAT", name: "Awadh Shilpgram Culture Ground", context: "Festival Venue, Lucknow" }
  ];

  // Filter local data metrics
  const filteredRegional = regionalHubIndex.filter(hub => 
    hub.code.toLowerCase().includes(keyword.toLowerCase()) || 
    hub.name.toLowerCase().includes(keyword.toLowerCase()) || 
    hub.context.toLowerCase().includes(keyword.toLowerCase())
  );

  // 2. LIVE AIRPORT FLIGHT SEARCH (AeroDataBox RapidAPI Hook)
  let liveAirports = [];
  const apiKey = process.env.AERODATABOX_API_KEY;

  if (apiKey) {
    try {
      const apiResponse = await fetch(
        `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${encodeURIComponent(keyword)}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
          },
          signal: AbortSignal.timeout(1800) // Keep response windows fast
        }
      );

      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        if (Array.isArray(apiData)) {
          liveAirports = apiData.map(airport => ({
            code: airport.iata || airport.icao || "AIR",
            name: airport.name,
            context: `Aviation Hub, ${airport.municipalityName || airport.countryCode}`
          }));
        }
      }
    } catch (apiError) {
      console.warn("⚠️ [AERODATABOX CLUSTER]: Serving local system matrices fallback.", apiError.message);
    }
  }

  // 3. MERGE BALANCES INTO UNIFIED FEEDBACK DROPDOWN
  const unifiedLocations = [...filteredRegional, ...liveAirports];

  return res.status(200).json({ success: true, data: unifiedLocations });
}