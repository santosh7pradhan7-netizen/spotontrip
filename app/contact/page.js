// app/contact/page.js - CONTACT PAGE

import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form Placeholder */}
          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
              <input type="email" placeholder="Your Email" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
              <textarea placeholder="Your Message" rows="4" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
              <button type="submit" className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150">
                Submit Inquiry
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Details</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Address:</strong> 123 Travel Avenue, New Delhi, India</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> support@spotontrip.com</p>
              <p>We are available Mon-Fri, 9am to 6pm (IST).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;