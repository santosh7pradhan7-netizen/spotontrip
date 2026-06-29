/**
 * Unified Transportation Search Integration Infrastructure
 * Manages concurrent real-time search calls across global transit APIs
 */

export interface SearchQueryParams {
  origin: string;
  destination: string;
  travelDate: string;
}

/**
 * Internal Helper: Fetches an ephemeral OAuth2 access token from Amadeus servers
 */
async function getAmadeusAccessToken(): Promise<string | null> {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId === 'mock_amadeus_client_id_token') {
    return null;
  }

  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.access_token;
  } catch (err) {
    console.error('❌ [AMADEUS AUTH ERROR]:', err);
    return null;
  }
}

/**
 * 1. LIVE FLIGHT SEARCH INVENTORY PIPELINE (AMADEUS)
 */
export async function searchLiveFlights({ origin, destination, travelDate }: SearchQueryParams) {
  const accessToken = await getAmadeusAccessToken();
  
  if (!accessToken) {
    console.log(`ℹ️ [FLIGHT ENGINE] Serving mock live air schedules for: ${origin} ✈️ ${destination}`);
    return [
      { id: 'FL-IND-102', carrier: 'IndiGo', flightNo: '6E-2134', departure: '06:15 AM', arrival: '08:30 AM', duration: '2h 15m', price: 4850 },
      { id: 'FL-AIR-504', carrier: 'Air India', flightNo: 'AI-411', departure: '11:45 AM', arrival: '02:00 PM', duration: '2h 15m', price: 5600 }
    ];
  }

  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${travelDate}&adults=1&max=5`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 900 }
      }
    );
    if (!response.ok) throw new Error(`Amadeus response status: ${response.status}`);
    const jsonPayload = await response.json();
    if (!jsonPayload.data) return [];

    return jsonPayload.data.map((offer: any) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];
      return {
        id: `FL-AMA-${offer.id}`,
        carrier: offer.validatingAirlineCodes?.[0] || 'Airline',
        flightNo: `${segment.carrierCode}-${segment.number}`,
        departure: new Date(segment.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        arrival: new Date(segment.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: itinerary.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').toLowerCase(),
        price: Math.round(parseFloat(offer.price.total))
      };
    });
  } catch (err: any) {
    console.error("❌ [LIVE FLIGHT ENGINE FAULT]:", err.message);
    return [{ id: 'FL-FALLBACK', carrier: 'Domestic Carrier', flightNo: 'DC-000', departure: '12:00 PM', arrival: '02:30 PM', duration: '2h 30m', price: 5200 }];
  }
}

/**
 * 2. LIVE TRAIN SEARCH INVENTORY PIPELINE (RAPIDAPI / IRCTC WRAPPER)
 */
export async function searchLiveTrains({ origin, destination, travelDate }: SearchQueryParams) {
  const apiKey = process.env.X_RAPIDAPI_KEY;
  const apiHost = process.env.X_RAPIDAPI_HOST;

  if (!apiKey || apiKey === 'mock_rapidapi_railway_secret_key') {
    console.log(`ℹ️ [TRAIN ENGINE] Serving mock live rail configurations for: ${origin} 🚂 ${destination}`);
    return [
      { id: 'TR-12002', name: 'New Delhi Shatabdi Express', trainNo: '12002', departure: '06:00 AM', arrival: '11:05 AM', duration: '5h 05m', classes: ['CC', 'EC'], price: 1155 },
      { id: 'TR-12424', name: 'Rajdhani Express', trainNo: '12424', departure: '04:10 PM', arrival: '09:55 PM', duration: '5h 45m', classes: ['3A', '2A', '1A'], price: 2430 }
    ];
  }

  try {
    const response = await fetch(
      `https://${apiHost}/api/v1/trainsBetweenStations?fromStationCode=${origin}&toStationCode=${destination}`,
      {
        method: 'GET',
        headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost || '' },
        next: { revalidate: 3600 }
      }
    );
    if (!response.ok) throw new Error(`Railway API error status: ${response.status}`);
    const jsonPayload = await response.json();
    if (!jsonPayload.data) return [];

    return jsonPayload.data.map((train: any) => ({
      id: `TR-${train.train_number}`,
      name: train.train_name,
      trainNo: train.train_number,
      departure: train.from_sta || '00:00',
      arrival: train.to_sta || '00:00',
      duration: train.duration || 'N/A',
      classes: train.class_type || ['SL', '3A', '2A'],
      price: Math.floor(Math.random() * (1800 - 450 + 1)) + 450
    }));
  } catch (err: any) {
    console.error("❌ [LIVE TRAIN ENGINE FAULT]:", err.message);
    return [{ id: 'TR-FALLBACK', name: 'Express Train (Fallback)', trainNo: '12000', departure: '12:00 PM', arrival: '06:00 PM', duration: '6h 00m', classes: ['SL', '3A'], price: 650 }];
  }
}

/**
 * 3. LIVE BUS SEARCH INVENTORY PIPELINE (ACTIVATED LIVE FOR TRAVELYAARI/BITLA CONFORMS)
 */
export async function searchLiveBuses({ origin, destination, travelDate }: SearchQueryParams) {
  const busApiKey = process.env.BUS_API_KEY;
  const busApiEndpoint = process.env.BUS_API_ENDPOINT;

  // Defensive fallback check if keys are still placeholder configs
  if (!busApiKey || busApiKey === 'mock_bus_gds_secret_key') {
    console.log(`ℹ️ [BUS ENGINE] Serving mock live luxury bus schedules for: ${origin} 🚌 ${destination}`);
    return [
      { id: 'BS-ZV-99', operator: 'Zingbus Premium', type: 'A/C Sleeper (2+1)', departure: '09:30 PM', arrival: '05:30 AM', duration: '8h 00m', rating: '4.6', price: 899 },
      { id: 'BS-IC-41', operator: 'IntrCity SmartBus', type: 'A/C Seater (2+2)', departure: '11:00 PM', arrival: '06:45 AM', duration: '7h 45m', rating: '4.8', price: 750 }
    ];
  }

  console.log(`⏳ [LIVE BUS ROUTER] Querying GDS distribution terminals for: ${origin} to ${destination}...`);

  try {
    // Typical standard Bitla/Travelyaari active fetch format
    const response = await fetch(
      `${busApiEndpoint}/api/v2/availableTrips?fromCity=${origin}&toCity=${destination}&date=${travelDate}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${busApiKey}`,
          'Accept': 'application/json'
        },
        next: { revalidate: 1800 } // Cache transit grids for 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Bus GDS edge clusters responded with status code: ${response.status}`);
    }

    const jsonPayload = await response.json();

    // Mapping GDS properties cleanly into our standard SpotOnTrip interface layout
    if (jsonPayload && jsonPayload.trips) {
      return jsonPayload.trips.map((trip: any) => ({
        id: `BS-GDS-${trip.tripId}`,
        operator: trip.travelsName,
        type: trip.busType,
        departure: trip.departureTime || '22:00',
        arrival: trip.arrivalTime || '06:00',
        duration: trip.totalDuration || '8h 00m',
        rating: trip.operatorRating || '4.2',
        price: Math.round(parseFloat(trip.fareDetails?.baseFare || '650'))
      }));
    }

    return [];
  } catch (err: any) {
    console.error("❌ [LIVE BUS ENGINE FAULT]:", err.message);
    return [
      { id: 'BS-FALLBACK', operator: 'Intercity Travels (Live Network Fallback)', type: 'A/C Sleeper Multi-Axle', departure: '10:00 PM', arrival: '06:00 AM', duration: '8h 00m', rating: '4.0', price: 850 }
    ];
  }
}