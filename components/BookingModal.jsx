// components/BookingModal.jsx
import { useState } from 'react';
import { CheckCircle2, X, ShieldCheck, AlertTriangle } from 'lucide-react';

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
const pnr = () => Array.from({ length: 10 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

// title/amount: pass the display title and the amount in RUPEES.
export default function BookingModal({ title, amount, onClose }) {
  const [step, setStep] = useState('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [booking, setBooking] = useState(null);

  const validDetails = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 10;

  const pay = async () => {
    setErrorMsg('');
    setStep('processing');
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR' }), // amount is in RUPEES; create-order.js converts to paise
      });
      const order = await orderRes.json();
      if (!order.id) throw new Error(order.message || 'Could not create order');

      if (!window.Razorpay) throw new Error('Payment SDK not loaded yet — please retry in a moment.');

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        order_id: order.id,
        name: 'SpotOnTrip',
        description: title,
        prefill: { name, email, contact: phone },
        theme: { color: '#10B981' },
        notes: { customer_name: name, package_title: title, travel_date: new Date().toISOString().slice(0, 10), total_guests: 1 },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verify = await verifyRes.json();
            if (!verify.success) throw new Error('signature check failed');
            setBooking({ id: pnr(), paymentId: response.razorpay_payment_id, amount });
            setStep('done');
          } catch (err) {
            setErrorMsg('Payment went through, but verification failed. Save this payment ID and contact support: ' + response.razorpay_payment_id);
            setStep('error');
          }
        },
        modal: { ondismiss: () => setStep('details') },
      });
      rzp.on('payment.failed', (resp) => {
        setErrorMsg('Payment failed: ' + (resp.error?.description || 'please try again.'));
        setStep('error');
      });
      rzp.open();
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
      setStep('error');
    }
  };

  return (
    <div className="sot-modal-backdrop" onClick={(e) => e.target === e.currentTarget && step !== 'processing' && onClose()}>
      <div className="sot-modal">
        <button className="sot-modal-close" onClick={onClose}><X size={18} /></button>

        {step === 'details' && (
          <>
            <h3>Your details</h3>
            <p className="sot-modal-sub">{title} — {inr(amount)}</p>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email (for your confirmation)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button className="sot-primary-btn" disabled={!validDetails} onClick={pay}>
              <ShieldCheck size={16} /> Pay {inr(amount)}
            </button>
          </>
        )}

        {step === 'processing' && <div className="sot-processing"><div className="sot-spinner" /><p>Opening secure checkout…</p></div>}

        {step === 'error' && (
          <div className="sot-processing">
            <AlertTriangle size={32} color="#DC2626" />
            <p>{errorMsg}</p>
            <button className="sot-primary-btn" onClick={() => setStep('details')}>Try again</button>
          </div>
        )}

        {step === 'done' && booking && (
          <div className="sot-confirm">
            <CheckCircle2 size={40} color="#10B981" />
            <h3>Payment received</h3>
            <p className="sot-modal-sub">A confirmation email is on its way to {email}.</p>
            <div className="sot-ticket">
              <div className="sot-ticket-row"><span>Reference</span><b>{booking.id}</b></div>
              <div className="sot-ticket-row"><span>Payment ID</span><b>{booking.paymentId}</b></div>
              <div className="sot-ticket-row"><span>Amount</span><b>{inr(booking.amount)}</b></div>
            </div>
            <button className="sot-primary-btn" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
