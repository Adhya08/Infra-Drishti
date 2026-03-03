import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { MapComponent } from "./components/MapComponent";
import { LandingPage } from "./pages/LandingPage";
import { mockAssets } from "./data/mockAssets";
import { Asset } from "./types";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"home" | "map">("home");
  const [assets] = useState<Asset[]>(mockAssets);

  const renderContent = () => {
    switch (currentTab) {
      case "map":
        return (
          <div className="w-full h-[calc(100vh-64px)]">
            <MapComponent assets={assets} />
          </div>
        );
      case "home":
      default:
        return (
          <LandingPage
            onExplore={() => setCurrentTab("map")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <div className="flex flex-grow">
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
        <main className="flex-grow">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
