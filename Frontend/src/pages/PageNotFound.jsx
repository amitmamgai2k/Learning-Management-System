import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import HomeLayout from '../Layouts/HomeLayout';

const NotFound = () => {
  const navigate = useNavigate();

  return (

      <div className="min-h-[100vh] h-screen w-full fixed flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          {/* Error Illustration */}
          <div className="mb-8">
            <svg
              className="w-64 h-64 mx-auto text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="M8 8l8 8M16 8l-8 8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>

          </div>




        </div>
      </div>

  );
};

export default NotFound;