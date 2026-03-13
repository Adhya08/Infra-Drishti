import React, { useState } from 'react';
import { mockAssets } from '../data/mockAssets';
import { Asset } from '../types';

export const GovPortalPage: React.FC<{ onSelectAsset: (a: Asset) => void }> = ({ onSelectAsset }) => {
  const [filter, setFilter] = useState('All');

  const filteredAssets = filter === 'All'
    ? [...mockAssets]
    : mockAssets.filter(a => a.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold">Infrastructure Oversight</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mt-4 border p-2 rounded"
      >
        <option>All</option>
        <option>Bridge</option>
        <option>Road</option>
        <option>Building</option>
      </select>

      <div className="mt-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="border p-3 mb-2">
            {asset.name}
          </div>
        ))}
      </div>
    </div>
  );
};
