import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
        <p className="mt-4 text-lg text-gray-500">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-indigo-600 px-6 py-3 rounded-md text-white hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}