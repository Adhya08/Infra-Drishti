import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { mockAssets as initialAssets } from './data/mockAssets';
import { Asset } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  return (
    <div>
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <LandingPage />
    </div>
  );
};

export default App;
