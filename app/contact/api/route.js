// app/contact/api/route.js

import { NextResponse } from 'next/server';

/**
 * Handle POST request for the Contact Us form submission.
 * * @param {Request} request The incoming HTTP request object.
 */
export async function POST(request) {
  try {
    // 1. Parse the request body
    const contactData = await request.json();

    // 2. Basic Server-Side Validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      return NextResponse.json(
        { message: 'Missing required fields: Name, Email, and Message are required.' },
        { status: 400 } // 400 Bad Request
      );
    }
    
    // 3. Email Sending Logic Simulation (Placeholder)
    
    // TODO: In a real application, this would include:
    // a) Validate email format.
    // b) Integrate with a third-party email service (e.g., SendGrid, AWS SES) 
    //    to send the contact email to the SpotOnTrip support team.
    // c) Optionally, save the inquiry to a CRM or database.

    console.log(`New contact submission from ${contactData.name} (${contactData.email}). Subject: ${contactData.subject}`);

    // Simulate delay for email sending process
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // 4. Return Success Response
    return NextResponse.json(
      { 
        message: 'Your message has been received. We will respond shortly.',
      },
      { status: 200 } // 200 OK
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { message: 'Internal server error during message submission.' },
      { status: 500 }
    );
  }
}