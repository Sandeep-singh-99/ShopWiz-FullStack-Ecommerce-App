import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">We couldn't process your payment. Please try again.</p>
        <Link 
          to="/cart" 
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;