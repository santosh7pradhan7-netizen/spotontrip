// pages/admin.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'packages'
  
  // Data States
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Editing State for Packages
  const [editingPackage, setEditingPackage] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: 0, description: '' });

  // Simple, reliable PIN check for secure dashboard protection
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPin === '8888') { // You can change '8888' to any 4-digit PIN you prefer!
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      alert('❌ Invalid Administrative Access PIN. Please try again.');
    }
  };

  // Fetch live rows from both tables in Supabase
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
        
      const { data: packagesData } = await supabase
        .from('packages')
        .select('*')
        .order('id', { ascending: true });

      setBookings(bookingsData || []);
      setPackages(packagesData || []);
    } catch (err) {
      console.error('Error fetching admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Open the price editing module
  const startEditing = (pkg) => {
    setEditingPackage(pkg.id);
    setEditForm({ title: pkg.title, price: pkg.price, description: pkg.description });
  };

  // Save the updated package data back to the live Supabase database engine
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('packages')
        .update({
          title: editForm.title,
          price: Number(editForm.price),
          description: editForm.description
        })
        .eq('id', editingPackage);

      if (error) throw error;
      
      alert('🎉 Package updated successfully on live website!');
      setEditingPackage(null);
      fetchDashboardData(); // Refresh list live
    } catch (err) {
      alert('Error updating package rows: ' + err.message);
    }
  };

  // Calculate high-level financial summary statistics
  const totalRevenue = bookings.reduce((sum, item) => sum + (item.amount_paid || 0), 0);
  const totalTickets = bookings.reduce((sum, item) => sum + (item.guests || 0), 0);

  // --- RENDERING GATE 1: Security Login Screen ---
  if (!isAuthenticated) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
        <Head><title>Admin Gateway Access | SpotOnTrip</title></Head>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔐</div>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>SpotOnTrip Panel</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>Enter secure passcode to view transaction analytics.</p>
          <input 
            type="password" 
            placeholder="Enter 4-Digit Admin PIN" 
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '6px', marginBottom: '20px', outline: 'none' }}
          />
          <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#0f766e', color: '#ffffff', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
            Verify Passcode
          </button>
        </form>
      </div>
    );
  }

  // --- RENDERING GATE 2: Full Dashboard Panel ---
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <Head><title>Admin Operations Center | SpotOnTrip</title></Head>
      
      {/* Top Navigation Bar */}
      <nav style={{ backgroundColor: '#0f766e', color: '#ffffff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800', letterSpacing: '0.5px' }}>SPOTONTRIP HQ</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('bookings')} style={{ backgroundColor: activeTab === 'bookings' ? '#ffffff' : 'transparent', color: activeTab === 'bookings' ? '#0f766e' : '#ffffff', border: '1px solid #ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
            📥 Customer Bookings ({bookings.length})
          </button>
          <button onClick={() => setActiveTab('packages')} style={{ backgroundColor: activeTab === 'packages' ? '#ffffff' : 'transparent', color: activeTab === 'packages' ? '#0f766e' : '#ffffff', border: '1px solid #ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
            🏷️ Live Inventory Pricing
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Summary Metric Scoreboard Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '6px solid #0f766e' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Total Gross Billings</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '6px 0 0 0', color: '#0f172a' }}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '6px solid #3b82f6' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Confirmed Checkout Orders</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '6px 0 0 0', color: '#0f172a' }}>{bookings.length} Bookings</h3>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '6px solid #10b981' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Total Travelers Hosted</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '6px 0 0 0', color: '#0f172a' }}>{totalTickets} Guests</h3>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>Loading synchronized database matrix nodes...</p>
        ) : activeTab === 'bookings' ? (
          
          // --- TAB PANEL 1: Bookings Audit Table ---
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Incoming Booking Ledger</h3>
            </div>
            {bookings.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No successful bookings recorded yet. Ready to catch webhook triggers!</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}>
                      <th style={{ padding: '16px' }}>Customer Info</th>
                      <th style={{ padding: '16px' }}>Selected Tour</th>
                      <th style={{ padding: '16px' }}>Date & Guests</th>
                      <th style={{ padding: '16px' }}>Amount Paid</th>
                      <th style={{ padding: '16px' }}>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                        <td style={{ padding: '16px' }}>
                          <strong style={{ color: '#0f172a', display: 'block' }}>{b.customer_name}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>{b.customer_email}</span>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>📞 {b.customer_phone}</span>
                        </td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#0f766e' }}>{b.package_title}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ display: 'block' }}>📅 {b.travel_date}</span>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>👥 {b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}</span>
                        </td>
                        <td style={{ padding: '16px', fontWeight: '700', color: '#16a34a' }}>₹{b.amount_paid}</td>
                        <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b' }}>
                          <span style={{ display: 'block' }}>Ord: {b.order_id}</span>
                          <span style={{ display: 'block' }}>Pay: {b.payment_id}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          
          // --- TAB PANEL 2: Inventory Price Manager ---
          <div style={{ display: 'grid', gridTemplateColumns: editingPackage ? '2fr 1fr' : '1fr', gap: '30px' }}>
            
            {/* Packages Grid */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', fontWeight: '700' }}>Active Holiday Packages</h3>
              {packages.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', padding: '20px 0', gap: '20px' }}>
                  <div style={{ maxWidth: '70%' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#0f172a' }}>{p.title} <span style={{ fontSize: '0.75rem', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', verticalAlign: 'middle' }}>{p.id}</span></h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>{p.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f766e', display: 'block' }}>₹{p.price}</span>
                    <button onClick={() => startEditing(p)} style={{ marginTop: '8px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.1s' }}>
                      ✏️ Edit Package
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide-out Edit Form Panel */}
            {editingPackage && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px', height: 'fit-content', border: '1px solid #cbd5e1' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#0f766e' }}>Update Details</h3>
                <form onSubmit={handleUpdatePackage}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Package Title</label>
                    <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Live Display Price (₹)</label>
                    <input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: '700' }} required />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Public Description</label>
                    <textarea rows="4" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', lineHeight: '1.4', resize: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setEditingPackage(null)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" style={{ flex: 2, padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#0f766e', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}