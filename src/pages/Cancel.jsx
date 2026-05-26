import React from "react";

const Cancel = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-red-100 p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-700">
          Your payment was not completed.
        </p>
      </div>
    </div>
  );
};

export default Cancel;