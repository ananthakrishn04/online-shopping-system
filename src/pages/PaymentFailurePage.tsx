import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
        <p className="mt-4 text-lg text-gray-500">
          We couldn't process your payment. Please try again.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate('/checkout')}
            className="inline-block bg-indigo-600 px-6 py-3 rounded-md text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-block bg-gray-200 px-6 py-3 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}