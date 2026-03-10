import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

const App: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <Navbar onTabChange={setCurrentTab} onToggleSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main>
                {currentTab === 'home' && <p>Home Page</p>}
                {currentTab === 'map' && <p>Map Page</p>}
            </main>
        </div>
    );
};

export default App;