// pages/flights.js
// Sends visitors straight to the SpotOnTrip White Label (live fares).

const WL_BASE = 'https://flights.spotontrip.com';

// Default route shown when someone clicks "Flights".
// Visitors can change it on the White Label's own search form.
const DEFAULT_FROM = 'DEL';
const DEFAULT_TO = 'BOM';

// true  = open live fares for the default route, dated tomorrow
// false = open the White Label's empty search page
const OPEN_WITH_SEARCH = true;

export async function getServerSideProps() {
  let destination = WL_BASE;

  if (OPEN_WITH_SEARCH) {
    // Tomorrow's date in Indian time (IST = UTC + 5:30), as DDMM
    const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    ist.setUTCDate(ist.getUTCDate() + 1);
    const dd = String(ist.getUTCDate()).padStart(2, '0');
    const mm = String(ist.getUTCMonth() + 1).padStart(2, '0');
    destination = `${WL_BASE}/?flightSearch=${DEFAULT_FROM}${dd}${mm}${DEFAULT_TO}1`;
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

export default function Flights() {
  return null;
}