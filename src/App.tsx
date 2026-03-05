import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { MapComponent } from "./components/MapComponent";
import { LandingPage } from "./pages/LandingPage";
import { mockAssets } from "./data/mockAssets";
import { Asset } from "./types";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"home" | "map">("home");
  const [assets] = useState<Asset[]>(mockAssets);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />

      <div className="flex flex-grow relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />

        <main className="flex-grow overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
