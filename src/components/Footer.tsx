'use client';
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();

    // Example subscription logic
    if (email) {
      setMessage('Subscription successful! Thank you for subscribing.');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">Subscribe to Our Newsletter</h3>
        <form onSubmit={handleSubscription} className="flex justify-center space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-4 rounded-lg text-black w-1/2 md:w-1/3"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-all">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
      <div className="mt-10 text-center">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
