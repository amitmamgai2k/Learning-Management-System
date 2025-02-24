import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentFail() {
  const navigate = useNavigate();

  // Optional: Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Replace the src below with the path/URL of your fail icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
          alt="Fail Icon"
          className="mx-auto mb-6 w-16 h-16"
        />

        <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
        <p className="text-gray-700 mb-2">Something went wrong.</p>
        <p className="text-gray-500 mb-8">
          We couldn't process your payment. <br />
          You will be redirected to the home page shortly, <br />
          or click the button below to return now.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default PaymentFail;
