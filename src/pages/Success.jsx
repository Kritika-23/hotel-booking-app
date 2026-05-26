import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiBase";

const Success = () => {
  const [searchParams] = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const bookingId = searchParams.get("bookingId");

        if (!bookingId) {
          console.log("No bookingId found in URL");
          return;
        }

        // prevent double call
        if (called.current) return;
        called.current = true;

        console.log("Verifying payment for booking:", bookingId);

        const { data } = await axios.post(
          `${API_BASE_URL}/api/payment/verify-payment`,
          { bookingId }
        );

        
      } catch (error) {
        console.log(
          "Payment verification failed:",
          error.response?.data || error.message
        );
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Your booking has been confirmed successfully.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/my-bookings"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition"
          >
            Go To My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
