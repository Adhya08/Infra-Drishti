import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar isOpen={isSidebarOpen} />

      <Navbar toggleSidebar={toggleSidebar} />

      <Hero />

    </div>
  );
}

export default App;
