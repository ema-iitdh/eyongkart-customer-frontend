import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myorder");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex  flex-col items-center justify-center mt-36 p-4">
      {/* Animated checkmark container */}
      <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pop shadow-lg flex items-center justify-center">
        <div className="w-5 h-10 border-t-0 border-l-0 border-r-4 border-b-4 border-white transform rotate-45 animate-draw"></div>
      </div>

      <p className="mt-4 text-xl font-semibold text-green-800">
        Order Confirmed!
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Thank you for your purchase. Your order will be processed shortly.
      </p>

      <div className="w-2/3 mt-4 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
    </div>
  );
};

export default OrderConfirmation;
