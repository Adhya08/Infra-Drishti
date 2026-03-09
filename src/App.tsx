import React, { useState } from 'react';

const App: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('home');

    return (
        <div>
            <h1>Infra-Drishti</h1>
            <button onClick={() => setCurrentTab('home')}>Home</button>
            <button onClick={() => setCurrentTab('map')}>Map</button>

            <div>
                {currentTab === 'home' && <p>Home Page</p>}
                {currentTab === 'map' && <p>Map Page</p>}
            </div>
        </div>
    );
};

export default App;