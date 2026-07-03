// pages/api/user-bookings.js
import { supabase } from '../../lib/supabaseClient';

// NOTE: this returns recent bookings, optionally filtered by ?email=.
// It does NOT check who is logged in — there's no auth system yet, so anyone
// who knows an email can see that email's bookings. Fine for launch/testing;
// add real auth (Supabase Auth is already in your stack) before relying on
// this for private data at scale.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(50);
    if (req.query.email) {
      query = query.eq('customer_email', req.query.email);
    }
    const { data, error } = await query;
    if (error) throw error;

    // booking.js expects each item to have a `status` field
    const mapped = (data || []).map((b) => ({
      ...b,
      status: b.booking_status || 'success',
    }));

    return res.status(200).json({ success: true, data: mapped });
  } catch (error) {
    console.error('user-bookings error:', error.message);
    return res.status(500).json({ success: false, message: error.message, data: [] });
  }
}
