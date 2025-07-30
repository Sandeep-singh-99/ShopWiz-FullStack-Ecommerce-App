import React from "react";
import axios from "axios";

const PhonePePaymentButton = ({
  amount,
  cartItems,
  onPaymentStart,
  disabled,
}) => {
  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/initiate`,
        {
          amount,
          cartItems: cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        onPaymentStart(response.data.redirectUrl);
      } else {
        throw new Error(response.data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert(
        `Failed to initiate payment: ${error.message}. Please ensure you're logged in and try again.`
      );
    }
  };

  return (
    <button
      onClick={initiatePayment}
      disabled={disabled}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 w-full"
    >
      Pay with PhonePe ({amount.toLocaleString()} INR)
    </button>
  );
};

export default PhonePePaymentButton;
