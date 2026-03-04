import React from "react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold">
            INFRA-DRISHTI
          </h1>

          <p className="mt-4 text-gray-600">
            AI powered infrastructure monitoring platform.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-black text-white rounded">
              Explore Map
            </button>

            <button className="px-4 py-2 border rounded">
              How it Works
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="h-[400px] bg-gray-200 rounded flex items-center justify-center">
          Map Placeholder
        </div>

      </div>

    </div>
  );
};