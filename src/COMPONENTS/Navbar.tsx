import React from 'react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Section */}
          <div 
            className="text-xl font-bold tracking-tight cursor-pointer"
            onClick={() => onTabChange('home')}
          >
            INFRA-DRISHTI
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-6">
            <button
              onClick={() => onTabChange('home')}
              className={`text-sm font-medium transition-colors ${
                currentTab === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
