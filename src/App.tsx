import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { MapComponent } from "./components/MapComponent";
import { AssetPanel } from "./components/AssetPanel";
import { AIChatbot } from "./components/AIChatbot";

import { LandingPage } from "./pages/LandingPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { SimulatorPage } from "./pages/SimulatorPage";
import { NewsPage } from "./pages/NewsPage";

import { Asset } from "./types";
import { mockAssets as initialAssets } from "./data/mockAssets";

import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSearch = async (query: string) => {
    setIsSearching(true);

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Locate significant Indian infrastructure assets matching: "${query}".`,
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case "analysis":
        return <AnalysisPage />;
      case "news":
        return <NewsPage />;
      case "simulator":
        return <SimulatorPage isDarkMode={isDarkMode} />;
      case "map":
        return (
          <>
            <MapComponent
              assets={assets}
              selectedAsset={selectedAsset}
              onSelectAsset={setSelectedAsset}
              onSearchInfrastructure={handleSearch}
              isSearching={isSearching}
              isDarkMode={isDarkMode}
            />
            <AssetPanel
              asset={selectedAsset}
              onClose={() => setSelectedAsset(null)}
            />
          </>
        );
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

      <AIChatbot
        isSidebarOpen={isSidebarOpen}
        selectedAsset={selectedAsset}
      />
    </div>
  );
};

export default App;
