import React from "react";
import { MapComponent } from "../components/MapComponent";
import { Logo } from "../components/Logo";

interface LandingPageProps {
  onExplore: () => void;
  onHowItWorks: () => void;
  isDarkMode?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplore,
  onHowItWorks,
  isDarkMode = false
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      {/* Container */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">

        {/* Left Side */}
        <div>

          <div className="flex items-center gap-2 mb-4">
            <Logo size={20} />
            <span className="font-semibold text-blue-600">
              Smart Cities Infrastructure
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            INFRA-DRISHTI
          </h1>

          <p className="mt-4 text-gray-600">
            AI powered infrastructure monitoring platform.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={onExplore}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Explore Map
            </button>

            <button
              onClick={onHowItWorks}
              className="px-4 py-2 border rounded"
            >
              How it Works
            </button>
          </div>

        </div>

        {/* Map Section */}
        <div className="h-[400px] rounded overflow-hidden">
          <MapComponent
            assets={[]}
            selectedAsset={null}
            onSelectAsset={() => {}}
            isDarkMode={isDarkMode}
          />
        </div>

      </div>

    </div>
  );
};
