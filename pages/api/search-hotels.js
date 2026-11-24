// pages/api/search-hotels.js
// Real hotel search is not connected yet, so this returns no results
// instead of showing invented hotels, prices or ratings.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(200).json([]);
}