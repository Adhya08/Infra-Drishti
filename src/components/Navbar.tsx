
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { db, User } from '../data/database';
import { Menu, Moon, Sun, X, LogOut, User as UserIcon, Bell } from 'lucide-react';

interface NavItemProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${active
            ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
    >
        {label}
    </button>
);

interface NavbarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, isDarkMode, toggleTheme, onToggleSidebar }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(db.getCurrentUser());
        const handleStorage = () => setUser(db.getCurrentUser());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [currentTab]);

    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'map', label: 'Risk Map' },
        { id: 'news', label: 'News Feed' },
        { id: 'simulator', label: 'Simulator' },
        { id: 'report', label: 'Report' },
        ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Dashboard' }] : [])
    ];

    const handleLogout = () => {
        db.setCurrentUser(null);
        setUser(null);
        onTabChange('home');
    };

    return (
        <nav className="sticky top-0 z-[1100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={onToggleSidebar}
                            className="mr-4 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div
                            className="flex-shrink-0 flex items-center cursor-pointer group"
                            onClick={() => onTabChange('home')}
                        >
                            <Logo size={36} className="mr-3 transition-transform group-hover:scale-110" />
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter hidden sm:block uppercase leading-none">INFRA-DRISHTI</span>
                                <span className="text-[9px] font-bold text-slate-500 hidden sm:block tracking-widest uppercase">Sentinel Systems</span>
                            </div>
                        </div>
                        <div className="hidden lg:ml-8 lg:flex lg:space-x-2">
                            {tabs.map(tab => (
                                <NavItem
                                    key={tab.id}
                                    label={tab.label}
                                    active={currentTab === tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-slate-900 dark:bg-white rounded-full border-2 border-white dark:border-slate-950"></span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{user.name}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onTabChange('login')}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                <UserIcon className="w-4 h-4" />
                                <span>Admin Login</span>
                            </button>
                        )}
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-400">
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { onTabChange(tab.id); setIsMobileMenuOpen(false); }}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold ${currentTab === tab.id
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                                    : 'text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            {!user && (
                                <button
                                    onClick={() => { onTabChange('login'); setIsMobileMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    Admin Access
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
