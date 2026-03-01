
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'color';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, variant = 'color' }) => {
  const getColors = () => {
    switch (variant) {
      case 'light': return { primary: '#fff', secondary: 'rgba(255,255,255,0.7)', accent: '#60a5fa' };
      case 'dark': return { primary: '#0f172a', secondary: '#475569', accent: '#2563eb' };
      default: return { primary: '#2563eb', secondary: '#64748b', accent: '#3b82f6' };
    }
  };

  const colors = getColors();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Eye Shape (Drishti) */}
      <path 
        d="M10 50C10 50 25 20 50 20C75 20 90 50 90 50C90 50 75 80 50 80C25 80 10 50 10 50Z" 
        stroke="currentColor" 
        strokeWidth="4" 
        className="text-slate-800 dark:text-blue-500"
      />
      
      {/* Infrastructure Element: Bridge Arch */}
      <path 
        d="M30 65C30 45 40 35 50 35C60 35 70 45 70 65" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
        className="text-blue-600 dark:text-white"
      />
      
      {/* Global Resilience Arc */}
      <circle 
        cx="50" 
        cy="50" 
        r="8" 
        fill="currentColor"
        className="text-blue-500 animate-pulse"
      />
      
      {/* Scanning Beam (Drishti Focus) */}
      <path 
        d="M50 20V10M50 90V80M10 50H2M98 50H90" 
        stroke="currentColor" 
        strokeWidth="2" 
        className="text-blue-400 opacity-50"
      />
      
      {/* Grid Lines (Digital Twin Concept) */}
      <path 
        d="M35 25L45 35M65 25L55 35M35 75L45 65M65 75L55 65" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="text-slate-300 dark:text-slate-700"
      />
    </svg>
  );
};
