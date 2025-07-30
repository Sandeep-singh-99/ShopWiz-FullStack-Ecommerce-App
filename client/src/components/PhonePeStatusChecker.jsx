import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PhonePeStatusChecker = () => {
  const { merchantTransactionId } = useParams();
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/payment/status/${merchantTransactionId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setStatus(response.data.status);
        } else {
          setStatus("FAILED");
        }
      } catch (error) {
        console.error("Status check failed:", error.message);
        setStatus("FAILED");
      } finally {
        setLoading(false);
      }
    };

    if (merchantTransactionId) {
      checkStatus();
    }
  }, [merchantTransactionId]);

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      {loading ? (
        <p>Checking payment status...</p>
      ) : (
        <p
          className={`text-lg ${
            status === "SUCCESS" ? "text-green-600" : "text-red-600"
          }`}
        >
          Payment {status === "SUCCESS" ? "Successful" : "Failed"}
        </p>
      )}
    </div>
  );
};

export default PhonePeStatusChecker;
