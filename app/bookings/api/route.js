// app/bookings/api/route.js - COMPLETE & UPDATED CODE
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

// DO NOT initialize Razorpay here, as keys won't be available during build-time.
// const razorpay = new Razorpay({...}); // <-- OLD, INCORRECT LOCATION

export async function POST(request) {
    // FIX: Initialize Razorpay INSIDE the handler function.
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    // Safety check for keys
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ message: "Server keys missing." }, { status: 500 });
    }

    try {
        const { amount, currency } = await request.json();

        const options = {
            amount: amount * 100, // amount in paisa
            currency: currency || 'INR',
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        return NextResponse.json({ message: "Error creating Razorpay order." }, { status: 500 });
    }
}