
import React, { useState } from 'react';
import { mockAssets } from '../data/mockAssets';
import { Asset } from '../types';
import {
  FileDown,
  Calendar,
  ShieldAlert,
  Activity,
  CheckCircle,
  Database,
  ChevronRight
} from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 dark:bg-slate-950 transition-colors animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Administrative Access Active</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Infrastructure Oversight</h1>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 max-w-xl">Infrastructure Health & Maintenance Prioritization Terminal for National oversight agencies (NHAI/NHIDCL).</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 transition-all shadow-sm active:scale-95">
            <FileDown className="w-4 h-4" />
            <span>Export Registry</span>
          </button>
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl flex items-center gap-2 active:scale-95">
            <Calendar className="w-4 h-4" />
            Schedule Audits
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: stats.total, color: 'text-slate-900 dark:text-white', bg: 'bg-white dark:bg-slate-900', icon: Database },
          { label: 'Critical Risk', value: stats.critical, color: 'text-slate-900 dark:text-white', bg: 'bg-slate-200 dark:bg-slate-700', icon: ShieldAlert },
          { label: 'Monitoring Required', value: stats.monitoring, color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800', icon: Activity },
          { label: 'Network Stable', value: stats.stable, color: 'text-slate-400 dark:text-slate-500', bg: 'bg-white dark:bg-slate-900', icon: CheckCircle }
        ].map((stat, i) => (
          <div key={stat.label} className={`${stat.bg} p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-lg animate-fade-in-up flex flex-col justify-between`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-40`} />
            </div>
            <p className={`text-5xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Asset Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all animate-fade-in-up delay-500">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 dark:bg-slate-800/50 gap-4">
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Asset Prioritization Engine</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time risk ranking based on telemetry</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Filter By Type:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-slate-500/10 focus:border-slate-600 dark:text-white transition-all cursor-pointer shadow-sm"
            >
              <option>All</option>
              <option>Bridge</option>
              <option>Road</option>
              <option>Building</option>
              <option>Tunnel</option>
              <option>Flyover</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5">Asset Identifier</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Zone / Corridor</th>
                <th className="px-8 py-5 text-center">Risk Index</th>
                <th className="px-8 py-5">Operational Status</th>
                <th className="px-8 py-5 text-right">Registry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group cursor-default">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight group-hover:text-slate-400 transition-colors">{asset.name}</span>
                      <span className="text-[9px] font-bold text-slate-400 font-mono mt-1">{asset.id.toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{asset.zone}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`text-base font-black ${asset.riskScore > 70 ? 'text-slate-900 dark:text-white' : asset.riskScore > 40 ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                        {asset.riskScore}
                      </span>
                      <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div className={`h-full ${asset.riskScore > 70 ? 'bg-slate-900 dark:bg-white' : asset.riskScore > 40 ? 'bg-slate-500' : 'bg-slate-300'}`} style={{ width: `${asset.riskScore}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${asset.riskScore > 70 ? 'bg-slate-900 dark:bg-white animate-ping' : asset.riskScore > 40 ? 'bg-slate-500' : 'bg-slate-300'}`}></span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${asset.riskScore > 70 ? 'text-slate-900 dark:text-white' : asset.riskScore > 40 ? 'text-slate-700 dark:text-slate-400' : 'text-slate-500 dark:text-slate-500'
                        }`}>
                        {asset.riskScore > 70 ? 'Immediate Audit' : asset.riskScore > 40 ? 'Active Monitor' : 'Stable'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => onSelectAsset(asset)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                    >
                      Analyze
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span>Displaying {filteredAssets.length} Strategic Nodes</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center opacity-50 cursor-not-allowed">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};
