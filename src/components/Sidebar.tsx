import React from 'react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white border-r border-slate-200
          z-50
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <Logo size={28} />

            <div className="ml-3">
              <span className="block text-xs font-bold text-blue-600 uppercase tracking-widest">
                Drishti Core
              </span>
              <span className="block text-sm font-bold text-slate-900">
                Command Center
              </span>
            </div>

            <button
              onClick={onClose}
              className="ml-auto p-2 text-slate-500 hover:text-slate-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Placeholder Content */}
          <div className="flex-1 p-6 text-sm text-slate-500">
            Sidebar content will go here.
          </div>

        </div>
      </aside>
    </>
  );
};
