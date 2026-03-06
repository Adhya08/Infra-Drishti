import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Asset } from "./types";
import { mockAssets as initialAssets } from "./data/mockAssets";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [assets] = useState<Asset[]>(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div>
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      <main>
        <h2>{currentTab}</h2>
      </main>
    </div>
  );
};

export default App;
