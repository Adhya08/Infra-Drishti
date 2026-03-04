//landing page
import React from "react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 p-10">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold">
            INFRA-DRISHTI
          </h1>

          <p className="mt-4 text-gray-600">
            AI powered infrastructure monitoring platform.
          </p>
        </div>

        {/* Right Side */}
        <div>
          Map Section
        </div>

      </div>

    </div>
  );
};