
import React from 'react';

export const OpenSourcePage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Open Infrastructure, Open Code.</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    We believe the tools that manage public resources should be owned by the public.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub Repository
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Access the full source code for the frontend, backend prediction engine,
                        and data processing pipelines. We welcome contributions from civic-minded developers.
                    </p>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">pid-predictor-core</span>
                            <span className="text-xs font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded">Model</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">pid-dashboard-ui</span>
                            <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded">Frontend</span>
                        </div>
                    </div>
                    <button className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                        View on GitHub
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        Data Sources
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Our risk scores are calculated using verified data from several national and local agencies.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center text-sm text-slate-700">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            Department of Transportation (Maintenance Logs)
                        </li>
                        <li className="flex items-center text-sm text-slate-700">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            National Bridge Inventory (NBI)
                        </li>
                        <li className="flex items-center text-sm text-slate-700">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            NOAA Climate History & Flooding Trends
                        </li>
                        <li className="flex items-center text-sm text-slate-700">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            Municipal Geographic Information Systems (GIS)
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-100 p-8 rounded-3xl text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Collaborate With Us</h3>
                <p className="text-blue-800 max-w-xl mx-auto mb-6">
                    Are you a structural engineer or data scientist? Help us refine our decay curves.
                </p>
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
                    Contact Research Team
                </button>
            </div>
        </div>
    );
};
