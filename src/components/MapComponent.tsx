
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Asset } from '../types';
import {
    Search,
    Maximize,
    ChevronLeft,
    Map as MapIcon,
    Globe,
    Navigation,
    ChevronRight
} from 'lucide-react';

interface MapComponentProps {
    assets: Asset[];
    selectedAsset: Asset | null;
    onSelectAsset: (asset: Asset | null) => void;
    riskMultiplier?: number;
    onSearchInfrastructure?: (query: string) => void;
    isSearching?: boolean;
    isDarkMode?: boolean;
}

declare const L: any;

export const MapComponent: React.FC<MapComponentProps> = ({
    assets,
    selectedAsset,
    onSelectAsset,
    riskMultiplier = 1,
    onSearchInfrastructure,
    isSearching = false,
    isDarkMode = false
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const baseLayersRef = useRef<any>({});
    const markersRef = useRef<Map<string, any>>(new Map());
    const highlightCircleRef = useRef<any>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [terminalSearch, setTerminalSearch] = useState('');
    const [sortOrder, setSortOrder] = useState<'risk' | 'age'>('risk');
    const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
    const [activeFilter, setActiveFilter] = useState<'All' | 'Bridge' | 'Road' | 'Tunnel' | 'Flyover'>('All');
    const [showHUD, setShowHUD] = useState(true);
    const [mapBounds, setMapBounds] = useState<any>(null);

    const getRiskColor = (score: number) => {
        const scaledScore = Math.min(100, score * riskMultiplier);
        if (isDarkMode) {
            if (scaledScore > 75) return '#f8fafc'; // White
            if (scaledScore > 50) return '#94a3b8'; // Slate 400
            if (scaledScore > 25) return '#475569'; // Slate 600
            return '#1e293b'; // Slate 800
        } else {
            if (scaledScore > 75) return '#0f172a'; // Slate 900
            if (scaledScore > 50) return '#475569'; // Slate 600
            if (scaledScore > 25) return '#94a3b8'; // Slate 400
            return '#e2e8f0'; // Slate 200
        }
    };

    const createPulsingIcon = (color: string, isCritical: boolean) => {
        return L.divIcon({
            className: 'custom-div-icon',
            html: `
        <div class="relative flex items-center justify-center">
          ${isCritical ? `<div class="absolute w-8 h-8 rounded-full animate-ping opacity-25" style="background-color: ${color}"></div>` : ''}
          <div class="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-lg transition-transform hover:scale-125" style="background-color: ${color}"></div>
        </div>
      `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    const filteredAssets = useMemo(() => {
        return activeFilter === 'All'
            ? assets
            : assets.filter(a => a.type === activeFilter);
    }, [assets, activeFilter]);

    const terminalAssets = useMemo(() => {
        let list = [...assets]
            .filter(a => (activeFilter === 'All' || a.type === activeFilter))
            .filter(a => a.name.toLowerCase().includes(terminalSearch.toLowerCase()) || a.zone.toLowerCase().includes(terminalSearch.toLowerCase()));

        if (sortOrder === 'risk') {
            list.sort((a, b) => (b.riskScore * riskMultiplier) - (a.riskScore * riskMultiplier));
        } else {
            list.sort((a, b) => b.age - a.age);
        }

        return list;
    }, [assets, activeFilter, terminalSearch, sortOrder, riskMultiplier]);

    const stats = useMemo(() => {
        const total = assets.length;
        const critical = assets.filter(a => a.riskScore * riskMultiplier > 75).length;
        const monitoring = assets.filter(a => a.riskScore * riskMultiplier > 40 && a.riskScore * riskMultiplier <= 75).length;
        return { total, critical, monitoring };
    }, [assets, riskMultiplier]);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        mapRef.current = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false,
            worldCopyJump: true
        }).setView([22.5937, 78.9629], 5);

        baseLayersRef.current.streets = L.tileLayer(
            isDarkMode
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            { subdomains: 'abcd', maxZoom: 20 }
        );

        baseLayersRef.current.satellite = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            { maxZoom: 19 }
        );

        baseLayersRef.current.streets.addTo(mapRef.current);
        L.control.zoom({ position: 'topright' }).addTo(mapRef.current);

        mapRef.current.on('moveend', () => {
            setMapBounds(mapRef.current.getBounds());
        });

        // Initial bounds
        setMapBounds(mapRef.current.getBounds());

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            Object.values(baseLayersRef.current).forEach((layer: any) => layer.remove());

            if (mapType === 'satellite') {
                baseLayersRef.current.satellite.addTo(mapRef.current);
            } else {
                const url = isDarkMode
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
                baseLayersRef.current.streets.setUrl(url);
                baseLayersRef.current.streets.addTo(mapRef.current);
            }
        }
    }, [isDarkMode, mapType]);

    useEffect(() => {
        if (!mapRef.current) return;

        const currentVisibleAssets = filteredAssets.filter(asset => {
            if (!mapBounds) return true;
            return mapBounds.contains(asset.coordinates);
        });

        const currentVisibleIds = new Set(currentVisibleAssets.map(a => a.id));

        // Remove markers no longer in view or filtered out
        markersRef.current.forEach((marker, id) => {
            if (!currentVisibleIds.has(id)) {
                marker.remove();
                markersRef.current.delete(id);
            }
        });

        // Add or update markers in view
        currentVisibleAssets.forEach(asset => {
            const color = getRiskColor(asset.riskScore);
            const isCritical = (asset.riskScore * riskMultiplier) > 70;
            let marker = markersRef.current.get(asset.id);

            if (!marker) {
                marker = L.marker(asset.coordinates, {
                    icon: createPulsingIcon(color, isCritical),
                    riseOnHover: true
                }).addTo(mapRef.current);

                marker.on('click', (e: any) => {
                    onSelectAsset(asset);
                    L.DomEvent.stopPropagation(e);
                });
                markersRef.current.set(asset.id, marker);
            } else {
                const currentIcon = marker.options.icon;
                // Only update icon if color or criticality changed to save cycles
                marker.setIcon(createPulsingIcon(color, isCritical));
            }

            marker.bindTooltip(`
        <div class="p-3 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 min-w-[140px] animate-in fade-in zoom-in duration-200">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2 h-2 rounded-full" style="background-color: ${color}"></div>
            <div class="font-black text-white text-[10px] uppercase tracking-tighter truncate">${asset.name}</div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[8px] text-slate-400 uppercase font-black tracking-widest">${asset.type}</span>
            <span class="text-[10px] font-black" style="color: ${color}">${Math.round(asset.riskScore * riskMultiplier)}% RISK</span>
          </div>
        </div>
      `, { direction: 'top', offset: [0, -15], opacity: 1, className: 'custom-tooltip' });
        });
    }, [filteredAssets, riskMultiplier, isDarkMode, mapBounds]);

    useEffect(() => {
        if (selectedAsset && mapRef.current) {
            mapRef.current.flyTo(selectedAsset.coordinates, 15, { duration: 1.5 });

            if (highlightCircleRef.current) highlightCircleRef.current.remove();
            highlightCircleRef.current = L.circle(selectedAsset.coordinates, {
                color: getRiskColor(selectedAsset.riskScore),
                fillColor: getRiskColor(selectedAsset.riskScore),
                fillOpacity: 0.1,
                radius: 200,
                weight: 1.5,
                dashArray: '4, 4'
            }).addTo(mapRef.current);
        } else {
            if (highlightCircleRef.current) highlightCircleRef.current.remove();
        }
    }, [selectedAsset]);

    const controlShiftClass = selectedAsset ? 'sm:mr-[450px]' : '';

    return (
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* DIAGNOSTIC SCAN OVERLAY */}
            <div className="absolute inset-0 pointer-events-none z-[500] opacity-10 overflow-hidden">
                <div className="w-full h-1 bg-slate-400 dark:bg-white blur-sm animate-scan"></div>
            </div>

            {/* Search Bar HUD */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[600] pointer-events-none w-full max-w-xl px-4 flex flex-col items-center gap-3">
                <div className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-1 w-full pointer-events-auto transition-all duration-500 ${selectedAsset ? 'lg:-translate-x-[225px]' : ''}`}>
                    <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim() && onSearchInfrastructure) onSearchInfrastructure(searchQuery); }} className="relative flex items-center">
                        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Query national structural database..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent pl-12 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
                        />
                    </form>
                </div>

                <div className={`flex gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-1 rounded-xl shadow-lg border border-slate-200/30 dark:border-slate-800/30 pointer-events-auto transition-all duration-500 ${selectedAsset ? 'lg:-translate-x-[225px]' : ''}`}>
                    {['All', 'Bridge', 'Road', 'Tunnel', 'Flyover'].map((filter: any) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* RESTORED HIGH-DENSITY STRUCTURAL HEALTH TERMINAL */}
            <div className={`absolute left-6 top-24 bottom-6 z-[600] w-[24rem] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showHUD ? 'translate-x-0 opacity-100' : '-translate-x-[calc(100%+24px)] opacity-0'} pointer-events-none flex flex-col`}>
                <div className="flex-grow bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[1.5rem] shadow-2xl border border-slate-700/50 flex flex-col pointer-events-auto overflow-hidden">

                    <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-slate-500 rounded-full"></div>
                            <div>
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-none mb-1">Structural Health Terminal</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Diagnostic Overlay v4.0</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => mapRef.current?.setView([22.5937, 78.9629], 5)}
                                className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                                title="Recenter Map"
                            >
                                <Maximize className="w-4 h-4" />
                            </button>
                            <button onClick={() => setShowHUD(false)} className="p-2 bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex items-center gap-4 overflow-x-auto no-scrollbar">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Nodes</span>
                            <span className="text-sm font-black text-white">{stats.total}</span>
                        </div>
                        <div className="h-6 w-px bg-slate-800"></div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest mb-1">Critical</span>
                            <span className="text-sm font-black text-red-500">{stats.critical}</span>
                        </div>
                        <div className="h-6 w-px bg-slate-800"></div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">Monitor</span>
                            <span className="text-sm font-black text-amber-500">{stats.monitoring}</span>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search registry index..."
                                value={terminalSearch}
                                onChange={(e) => setTerminalSearch(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-[11px] font-bold text-white placeholder:text-slate-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button
                                onClick={() => setSortOrder(sortOrder === 'risk' ? 'age' : 'risk')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-slate-400 bg-slate-900 px-2 py-1 rounded shadow-sm border border-slate-700"
                            >
                                {sortOrder === 'risk' ? 'Sort: Risk' : 'Sort: Age'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto px-4 py-4 space-y-2 no-scrollbar bg-slate-900/20">
                        {terminalAssets.map(asset => {
                            const risk = Math.round(asset.riskScore * riskMultiplier);
                            const color = getRiskColor(asset.riskScore);
                            const isSelected = selectedAsset?.id === asset.id;

                            return (
                                <button
                                    key={asset.id}
                                    onClick={() => onSelectAsset(asset)}
                                    className={`w-full group relative text-left p-4 rounded-xl border transition-all duration-300 ${isSelected
                                        ? 'bg-slate-100 dark:bg-white border-slate-200 dark:border-white shadow-xl z-10 translate-x-1'
                                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 hover:translate-x-1'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-900/10 text-slate-900' : 'bg-slate-900 text-slate-400'}`}>
                                                {asset.type}
                                            </span>
                                            <span className={`text-[8px] font-bold uppercase ${isSelected ? 'text-slate-500' : 'text-slate-500'}`}>
                                                {asset.zone}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-black ${isSelected ? 'text-slate-900' : ''}`} style={!isSelected ? { color } : {}}>
                                                {risk}%
                                            </span>
                                        </div>
                                    </div>

                                    <h4 className={`text-[11px] font-black mb-2 truncate ${isSelected ? 'text-slate-900' : 'text-slate-200'}`}>{asset.name}</h4>

                                    {/* Telemetry Micro-Indicators */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-[8px] font-bold uppercase tracking-tighter ${isSelected ? 'text-slate-500' : 'text-slate-500'}`}>S</span>
                                            <div className="w-8 h-1 bg-slate-950 rounded-full overflow-hidden">
                                                <div className={`h-full ${asset.telemetry.stress > 40 ? 'bg-slate-400' : 'bg-slate-600'}`} style={{ width: `${(asset.telemetry.stress / 80) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-[8px] font-bold uppercase tracking-tighter ${isSelected ? 'text-slate-500' : 'text-slate-500'}`}>T</span>
                                            <div className="w-8 h-1 bg-slate-950 rounded-full overflow-hidden">
                                                <div className={`h-full ${asset.telemetry.strain > 100 ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ width: `${(asset.telemetry.strain / 200) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-[8px] font-bold uppercase tracking-tighter ${isSelected ? 'text-slate-500' : 'text-slate-500'}`}>L</span>
                                            <div className="w-8 h-1 bg-slate-950 rounded-full overflow-hidden">
                                                <div className={`h-full ${asset.loadFactor > 8 ? 'bg-slate-300' : 'bg-white'}`} style={{ width: `${asset.loadFactor * 10}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {risk > 70 && !isSelected && (
                                        <div className="absolute right-4 bottom-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Diagnostic Mode</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Automated Structural Scan</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-75"></div>
                            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Control Cluster */}
            <div className={`absolute top-24 right-8 z-[600] flex flex-col gap-3 pointer-events-auto items-end transition-all duration-700 ${controlShiftClass}`}>
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-1 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-1">
                    <button onClick={() => setMapType('streets')} className={`p-3 rounded-xl transition-all ${mapType === 'streets' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        <MapIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setMapType('satellite')} className={`p-3 rounded-xl transition-all ${mapType === 'satellite' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        <Globe className="w-5 h-5" />
                    </button>
                </div>
                <button
                    onClick={() => { if (navigator.geolocation) navigator.geolocation.getCurrentPosition(p => mapRef.current.flyTo([p.coords.latitude, p.coords.longitude], 12)) }}
                    className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 text-slate-900 dark:text-white hover:scale-110 active:scale-95 transition-all"
                >
                    <Navigation className="w-6 h-6 rotate-45" />
                </button>
            </div>

            {!showHUD && (
                <button onClick={() => setShowHUD(true)} className="absolute left-6 top-32 z-[600] bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-slate-700 text-white hover:scale-110 transition-all">
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            <style>{`
        .leaflet-container { font-family: 'Inter', sans-serif; cursor: crosshair !important; background: #f8fafc !important; }
        .dark .leaflet-container { background: #020617 !important; }
        .custom-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        .custom-tooltip::before { display: none !important; }
        .custom-div-icon { background: transparent !important; border: none !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
        </div>
    );
};
