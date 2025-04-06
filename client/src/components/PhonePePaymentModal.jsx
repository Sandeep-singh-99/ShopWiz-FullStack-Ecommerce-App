import React, { useEffect } from "react";

const PhonePePaymentModal = ({ isOpen, onClose, redirectUrl }) => {
  useEffect(() => {
    if (isOpen && redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, redirectUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">Redirecting to PhonePe...</p>
        <p className="text-sm text-gray-600 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
};

export default PhonePePaymentModal;
