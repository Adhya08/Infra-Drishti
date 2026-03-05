
import React, { useEffect } from 'react';
import { Logo } from './Logo';
import {
    Home,
    Map as MapIcon,
    Activity,
    Newspaper,
    Building2,
    Zap,
    BarChart3,
    FileText,
    X,
    FileDown,
    Key,
    ChevronRight,
    Settings,
    ShieldAlert
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentTab: string;
    onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentTab, onTabChange }) => {
    // Handle ESC key to close sidebar
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const menuItems = [
        { id: 'home', label: 'Dashboard Home', icon: Home },
        { id: 'map', label: 'Risk Command Center', icon: MapIcon },
        { id: 'analysis', label: 'Engineering Methodology', icon: Activity },
        { id: 'news', label: 'News Feed', icon: Newspaper },
        { id: 'gov', label: 'Infrastructure Oversight', icon: Building2 },
        { id: 'initiatives', label: 'Govt. Initiatives', icon: Zap },
        { id: 'simulator', label: 'Predictive Simulator', icon: BarChart3 },
        { id: 'report', label: 'File Structural Report', icon: FileText },
    ];

    const dataLayers = [
        { label: 'Seismic Activity', color: 'bg-slate-400', status: 'Live', icon: Activity },
        { label: 'Flood Risk (Monsoon)', color: 'bg-slate-600', status: 'Monitoring', icon: ShieldAlert },
        { label: 'Heavy Traffic Corridors', color: 'bg-slate-800', status: 'Peak', icon: Activity },
        { label: 'Maintenance Zones', color: 'bg-slate-950', status: 'Active', icon: Settings },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1150] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-[1200] transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <Logo size={36} className="transition-transform group-hover:rotate-12 duration-500" />
                        <div className="ml-3">
                            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">Drishti Core</span>
                            <span className="block text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Command Center</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-auto p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow py-8 px-5 space-y-1 overflow-y-auto no-scrollbar">
                        <div className="px-4 mb-4 flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Global Operations</p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[8px] font-bold text-slate-500 uppercase">Live Ops</span>
                                <span className="flex h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse"></span>
                            </div>
                        </div>

                        <div className="space-y-1.5 pl-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => { onTabChange(item.id); onClose(); }}
                                        className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-500 group relative overflow-hidden ${currentTab === item.id
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xl translate-x-2'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white hover:translate-x-2'
                                            }`}
                                    >
                                        <div className={`mr-4 p-2 rounded-xl transition-all duration-500 ${currentTab === item.id ? 'bg-white/10 ring-1 ring-white/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:rotate-6'}`}>
                                            <Icon className={`w-4 h-4 transition-all duration-500 ${currentTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                                        </div>
                                        <span className="relative z-10">{item.label}</span>
                                        {currentTab === item.id && (
                                            <div className="absolute right-4 animate-in fade-in slide-in-from-left-2 duration-700">
                                                <ChevronRight className="w-4 h-4 opacity-50" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-10 pb-2">
                            <div className="px-4 mb-4 flex items-center justify-between">
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Asset Telemetry</p>
                                <button className="text-[9px] font-bold text-slate-500 uppercase hover:text-slate-900 dark:hover:text-white transition-colors">Configure</button>
                            </div>
                            <div className="space-y-2 px-1">
                                {dataLayers.map((layer) => (
                                    <div key={layer.label} className={`flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all cursor-pointer group`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2.5 h-2.5 rounded-full ${layer.color} shadow-[0_0_12px_currentColor] animate-pulse`}></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-none mb-1.5 transition-colors group-hover:text-slate-950 dark:group-hover:text-white">{layer.label}</p>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em]">{layer.status}</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer scale-90 origin-right">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-10 h-5.5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all duration-300 peer-checked:bg-slate-900 dark:peer-checked:bg-slate-100 shadow-inner"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 pb-6">
                            <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4">Export & Integration</p>
                            <div className="space-y-1.5 pl-1">
                                <button className="w-full flex items-center px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white transition-all group">
                                    <div className="mr-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                                        <FileDown className="w-4 h-4" />
                                    </div>
                                    System Health Manifest
                                </button>
                                <button className="w-full flex items-center px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white transition-all group">
                                    <div className="mr-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                                        <Key className="w-4 h-4" />
                                    </div>
                                    Security Vault Access
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-xl">
                        <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 shadow-sm hover:shadow-md">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <span className="text-white dark:text-slate-900 font-black text-sm">AS</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate group-hover:text-slate-500 transition-colors">Anand S.</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">Nodal Officer • NDH-44</p>
                            </div>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
