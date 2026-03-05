
import React from 'react';
import { MapComponent } from '../components/MapComponent';
import { mockAssets } from '../data/mockAssets';
import { Logo } from '../components/Logo';

interface LandingPageProps {
  onExplore: () => void;
  onHowItWorks: () => void;
  isDarkMode?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onHowItWorks, isDarkMode = false }) => {
  // Select a few representative assets for the primary showcase
  const primaryAssets = mockAssets.filter(a => [
    'del-1', 'samruddhi-1', 'agra-luc-1', 'mthl-1', 'signature-1', 'dwarka-exp-1'
  ].includes(a.id));

  // Expanded gallery for "Strategic Assets"
  const strategicAssets = mockAssets.filter(a => [
    'chenab-1', 'pamban-1', 'mum-1', 'neh-1', 'bogibeel-1', 'mgsetu-1'
  ].includes(a.id));

  const roadAssetsCount = mockAssets.filter(a => a.type === 'Road').length;
  const bridgeAssetsCount = mockAssets.filter(a => a.type === 'Bridge' || a.type === 'Flyover').length;
  const avgRiskScore = Math.round(mockAssets.reduce((acc, a) => acc + a.riskScore, 0) / mockAssets.length);

  return (
    <div className="relative isolate overflow-hidden dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-slate-600 dark:text-slate-400 ring-1 ring-slate-900/10 dark:ring-slate-100/10 hover:ring-slate-900/20 dark:hover:ring-slate-100/20">
              <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Logo size={16} /> Smart Cities & Strategic Infra India
              </span>
              <span className="h-4 w-px bg-slate-900/10 dark:bg-slate-100/10" aria-hidden="true" />
              <span className="flex items-center gap-x-1">
                INFRA-DRISHTI v2.5
                <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl uppercase leading-tight">
            INFRA-DRISHTI: <br/>
            <span className="text-blue-600 dark:text-blue-400 lowercase italic">Vision for a Safer Bharat.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            A proactive AI-driven platform integrating data from <strong>NHAI</strong> and <strong>NHIDCL</strong>. 
            We monitor structural decay in national highways, mountain tunnels, and border bridges across India, 
            ensuring all-weather connectivity and public safety through digital foresight.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={onExplore}
              className="rounded-xl bg-slate-900 dark:bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-all active:scale-95"
            >
              Explore National Risk Map
            </button>
            <button
              onClick={onHowItWorks}
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300 flex items-center group"
            >
              Engineering Methodology <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center">
          <div className="relative mx-auto w-full max-w-[600px] aspect-[4/3] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group transition-colors">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-40"></div>
            <div className="w-full h-full">
               <MapComponent 
                 assets={mockAssets} 
                 selectedAsset={null} 
                 onSelectAsset={() => {}} 
                 isDarkMode={isDarkMode}
               />
            </div>
            
            {/* HUD Elements */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm z-20 flex items-center gap-3">
              <Logo size={24} />
              <div>
                <div className="w-24 h-1.5 bg-blue-100 dark:bg-blue-900 rounded-full mb-1">
                  <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">DRISHTI Dataset: Pan-India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Asset Gallery - REAL WORLD SHOWCASE */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400 uppercase tracking-widest">Real-World Assets</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Strategic Corridors Under Monitoring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {primaryAssets.map((asset) => (
              <div key={asset.id} className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-800">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={asset.imageUrl} 
                    alt={asset.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute top-6 right-6">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                    asset.riskScore < 30 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  }`}>
                    Risk: {asset.riskScore}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block">{asset.type} • {asset.zone}</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{asset.name}</h3>
                  <p className="text-white/60 text-xs mt-3 line-clamp-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Engineering Wonders Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400 uppercase tracking-widest">Digital Twin Repository</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Engineering Wonders: Live Feed
              </p>
            </div>
            <button onClick={onExplore} className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-black dark:hover:bg-blue-700 transition-all active:scale-95">
              View Deployment Map
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicAssets.slice(0, 4).map((asset) => (
              <div key={asset.id} className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer">
                <img 
                  src={asset.imageUrl} 
                  alt={asset.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${asset.riskScore > 50 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                    <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">{asset.type}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white leading-tight">{asset.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Health Stats Section */}
      <section className="py-24 bg-slate-900 transition-colors overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
              <div>
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Accuracy</p>
                 <div className="text-6xl font-black text-white">99.8%</div>
                 <p className="text-sm text-slate-400 mt-2">AI Model Precision</p>
              </div>
              <div className="border-l border-slate-800 pl-12">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Assets</p>
                 <div className="text-6xl font-black text-white">48</div>
                 <p className="text-sm text-slate-400 mt-2">Monitored Real-time</p>
              </div>
              <div className="border-l border-slate-800 pl-12">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Government Initiatives</p>
                 <div className="text-6xl font-black text-white">6</div>
                 <p className="text-sm text-slate-400 mt-2">Integrated Projects</p>
              </div>
              <div className="border-l border-slate-800 pl-12">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Reports</p>
                 <div className="text-6xl font-black text-white">12k+</div>
                 <p className="text-sm text-slate-400 mt-2">Citizen Submissions</p>
              </div>
           </div>
        </div>
      </section>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-slate-950 py-24 sm:py-32 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400 uppercase tracking-widest">Digital Resilience</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              NHAI & NHIDCL Integrated Intelligence
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Mountain & Hill Connectivity',
                  desc: 'Specialized NHIDCL monitoring for tunnels and bridges in high-altitude zones like Ladakh, Sikkim, and Arunachal Pradesh.',
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                },
                {
                  name: 'Strategic Infrastructure',
                  desc: 'Ensuring 24/7 reliability for critical border roads and high-traffic national corridors through predictive telemetry.',
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                },
                {
                  name: 'Climate-Adaptive Risk',
                  desc: 'Live NHAI/NHIDCL data combined with landslide and flood risk models for India\'s diverse geographical terrains.',
                  icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                }
              ].map(benefit => (
                <div key={benefit.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/30">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                      </svg>
                    </div>
                    {benefit.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                    <p className="flex-auto">{benefit.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
