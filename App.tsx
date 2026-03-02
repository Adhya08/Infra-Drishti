import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div>
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <LandingPage />
    </div>
  );
};

export default App;
