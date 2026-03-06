import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { MapComponent } from "./components/MapComponent";
import { AssetPanel } from "./components/AssetPanel";

import { LandingPage } from "./pages/LandingPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { SimulatorPage } from "./pages/SimulatorPage";
import { NewsPage } from "./pages/NewsPage";

import { Asset } from "./types";
import { mockAssets as initialAssets } from "./data/mockAssets";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [assets] = useState<Asset[]>(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (currentTab) {
      case "analysis":
        return <AnalysisPage />;
      case "news":
        return <NewsPage />;
      case "simulator":
        return <SimulatorPage isDarkMode={isDarkMode} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div>
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {renderContent()}
    </div>
  );
};

export default App;
