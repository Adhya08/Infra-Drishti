import React, { useState } from 'react';
import { mockAssets } from '../data/mockAssets';
import { Asset } from '../types';

export const GovPortalPage: React.FC<{ onSelectAsset: (a: Asset) => void }> = ({ onSelectAsset }) => {
  const [filter, setFilter] = useState('All');

  const filteredAssets = filter === 'All'
    ? [...mockAssets].sort((a, b) => b.riskScore - a.riskScore)
    : mockAssets.filter(a => a.type === filter).sort((a, b) => b.riskScore - a.riskScore);

  const stats = {
    total: mockAssets.length,
    critical: mockAssets.filter(a => a.riskScore > 70).length,
    monitoring: mockAssets.filter(a => a.riskScore > 40 && a.riskScore <= 70).length,
    stable: mockAssets.filter(a => a.riskScore <= 40).length
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-4xl font-bold">Infrastructure Oversight</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">Total Assets: {stats.total}</div>
        <div className="border p-4 rounded">Critical Risk: {stats.critical}</div>
        <div className="border p-4 rounded">Monitoring: {stats.monitoring}</div>
        <div className="border p-4 rounded">Stable: {stats.stable}</div>
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option>All</option>
        <option>Bridge</option>
        <option>Road</option>
        <option>Building</option>
        <option>Tunnel</option>
        <option>Flyover</option>
      </select>

      <div className="space-y-2">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="border p-3 rounded flex justify-between">
            <span>{asset.name}</span>
            <span>Risk: {asset.riskScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
