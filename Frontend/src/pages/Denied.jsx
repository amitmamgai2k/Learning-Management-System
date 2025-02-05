import React from "react";
import { useNavigate } from "react-router-dom";

function Denied() {
    const Navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-700 mt-4">You do not have permission to view this page.</p>
        <button className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600" onClick={()=>Navigate(-1)}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Denied;
