import React from 'react';

export const OpenSourcePage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-slate-900">
                Open Infrastructure, Open Code.
            </h1>
        </div>
        <div className="text-center mb-16">
  <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
    Open Infrastructure, Open Code.
  </h1>
  <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
    We believe the tools that manage public resources should be owned by the public.
  </p>
</div>
<div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
  <h2 className="text-xl font-bold text-slate-900 mb-6">
    GitHub Repository
  </h2>

  <p className="text-slate-600 mb-6">
    Access the full source code for the platform.
  </p>

  <div className="space-y-3">
    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
      <span>pid-predictor-core</span>
      <span>Model</span>
    </div>
    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
      <span>pid-dashboard-ui</span>
      <span>Frontend</span>
    </div>
  </div>
</div>
<div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
  <h2 className="text-xl font-bold text-slate-900 mb-6">
    Data Sources
  </h2>

  <ul className="space-y-4">
    <li>Department of Transportation</li>
    <li>National Bridge Inventory</li>
    <li>NOAA Climate Data</li>
    <li>Municipal GIS</li>
  </ul>
</div>

    );
};