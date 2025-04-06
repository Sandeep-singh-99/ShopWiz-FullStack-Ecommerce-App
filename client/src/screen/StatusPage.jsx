import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const StatusPage = () => {
  const { merchantTransactionId: paramTransactionId } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking');

  const queryParams = new URLSearchParams(location.search);
  const queryTransactionId = queryParams.get('transactionId');
  const transactionId = paramTransactionId || queryTransactionId;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!transactionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/payment/status/${transactionId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setStatus('success');
          setTimeout(() => {
            navigate('/payment-success');
          }, 2000);
        } else {
          setStatus('failed');
          setTimeout(() => {
            navigate('/payment-failed');
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    if (transactionId) {
      checkPaymentStatus();
    } else {
      setStatus('error');
    }
  }, [transactionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Status</h2>

        {status === 'checking' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking payment status...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center text-green-600">
            <p className="text-xl mb-2">Payment Successful!</p>
            <p className="text-gray-600">Redirecting to order confirmation...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center text-red-600">
            <p className="text-xl mb-2">Payment Failed</p>
            <p className="text-gray-600">Redirecting back to checkout...</p>
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Return to Cart
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center text-red-600">
            <p className="text-xl mb-2">Error Checking Payment</p>
            <p className="text-gray-600">Invalid or missing transaction ID</p>
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Return to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPage;