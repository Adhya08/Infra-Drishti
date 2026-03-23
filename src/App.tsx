
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MapComponent } from './components/MapComponent';
import { AssetPanel } from './components/AssetPanel';
import { LandingPage } from './pages/LandingPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { GovPortalPage } from './pages/GovPortalPage';
import { InitiativesPage } from './pages/InitiativesPage';
import { ReportPage } from './pages/ReportPage';
import { NewsPage } from './pages/NewsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AIChatbot } from './components/AIChatbot';
import { mockAssets as initialAssets } from './data/mockAssets';
import { Asset } from './types';
import { db } from './data/database';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const [isSearching, setIsSearching] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Locate significant Indian infrastructure assets matching: "${query}".`,
                config: { tools: [{ googleMaps: {} }] },
            });

            const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (chunks && chunks.length > 0) {
                const newAssets: Asset[] = [];
                chunks.forEach((chunk: any, index: number) => {
                    if (chunk.maps) {
                        newAssets.push({
                            id: `ai-${Date.now()}-${index}`,
                            name: chunk.maps.title || "Discovered Infra",
                            type: 'Road',
                            coordinates: [20.5937, 78.9629],
                            riskScore: 25,
                            age: 5,
                            lastMaintenance: '2023-12-01',
                            loadFactor: 7.5,
                            climateImpact: 6.0,
                            description: `AI-grounded infrastructure discovery via Google Maps.`,
                            zone: 'Pan-India',
                            timeline: [],
                            telemetry: { stress: 10, strain: 50, loadCapacity: 100000, vibrationFrequency: 4.5 }
                        });
                    }
                });
                if (newAssets.length > 0) {
                    setAssets(prev => [...prev, ...newAssets]);
                    setSelectedAsset(newAssets[0]);
                    setCurrentTab('map');
                }
            }
        } catch (e) { console.error(e); } finally { setIsSearching(false); }
    };

    const renderContent = () => {
        const user = db.getCurrentUser();

        return (
            <div key={currentTab} className="page-enter">
                {(() => {
                    switch (currentTab) {
                        case 'home': return <LandingPage onExplore={() => setCurrentTab('map')} onHowItWorks={() => setCurrentTab('analysis')} isDarkMode={isDarkMode} />;
                        case 'map': return (
                            <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
                                <MapComponent assets={assets} selectedAsset={selectedAsset} onSelectAsset={setSelectedAsset} onSearchInfrastructure={handleSearch} isSearching={isSearching} isDarkMode={isDarkMode} />
                                <AssetPanel asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
                            </div>
                        );
                        case 'analysis': return <AnalysisPage />;
                        case 'news': return <NewsPage />;
                        case 'gov': return <GovPortalPage onSelectAsset={(a) => { setSelectedAsset(a); setCurrentTab('map'); }} />;
                        case 'login': return <LoginPage onLoginSuccess={(u) => setCurrentTab(u.role === 'admin' ? 'admin' : 'home')} />;
                        case 'admin': return user?.role === 'admin' ? <AdminDashboardPage /> : <LoginPage onLoginSuccess={() => setCurrentTab('admin')} />;
                        case 'initiatives': return <InitiativesPage />;
                        case 'simulator': return <SimulatorPage isDarkMode={isDarkMode} />;
                        case 'report': return <ReportPage />;
                        default: return <LandingPage onExplore={() => setCurrentTab('map')} onHowItWorks={() => setCurrentTab('analysis')} isDarkMode={isDarkMode} />;
                    }
                })()}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-500">
            <Navbar currentTab={currentTab} onTabChange={setCurrentTab} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onToggleSidebar={() => setIsSidebarOpen(true)} />
            <div className="flex flex-grow relative">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} currentTab={currentTab} onTabChange={setCurrentTab} />
                <main className="flex-grow overflow-hidden">{renderContent()}</main>
            </div>
            <AIChatbot isSidebarOpen={isSidebarOpen} selectedAsset={selectedAsset} />
            {['home', 'analysis', 'news', 'initiatives', 'report', 'gov'].includes(currentTab) && (
                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 animate-fade-in delay-700">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-sm text-slate-500 uppercase tracking-widest font-black">INFRA-DRISHTI © 2026</p>
                    </div>
                </footer>
            )}
        </div>
    );
};



export default App;
