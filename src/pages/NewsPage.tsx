
import React from 'react';
import { mockNews, IncidentNews } from '../data/mockNews';

const SeverityBadge: React.FC<{ severity: IncidentNews['severity'] }> = ({ severity }) => {
  const styles = {
    Fatal: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white',
    Major: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600',
    Significant: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const IncidentCard: React.FC<{ item: IncidentNews }> = ({ item }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border flex flex-col group min-h-[500px] ${item.category === 'Recent'
    ? 'border-slate-900 dark:border-white ring-1 ring-slate-100 dark:ring-slate-800'
    : 'border-slate-200 dark:border-slate-800'
    }`}>
    <div className="p-8 flex flex-col flex-grow relative">
      {item.category === 'Recent' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-slate-900 dark:bg-white text-[8px] font-black text-white dark:text-slate-900 uppercase tracking-widest rounded-full shadow-lg">
          Active Monitoring
        </div>
      )}

      {/* Card Header: Metadata & Badges */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <SeverityBadge severity={item.severity} />
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 mb-1">
            {item.date}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
            {item.time}
          </div>
        </div>
      </div>

      {/* Title & Body */}
      <h3 className={`text-2xl font-black uppercase tracking-tighter leading-none mb-6 transition-colors ${item.category === 'Recent'
        ? 'text-slate-900 dark:text-white group-hover:text-slate-400'
        : 'text-slate-900 dark:text-white group-hover:text-slate-400'
        }`}>
        {item.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed font-medium">
        {item.description}
      </p>

      {/* Forensic Report Details */}
      <div className="grid grid-cols-1 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Forensic Root Cause</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            {item.rootCause}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Discovery & Action Taken</span>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
            "{item.actionTaken}"
          </p>
        </div>

        {item.videoUrl && (
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all group/video"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-lg group-hover/video:scale-110 transition-transform">
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block leading-none mb-1">Evidence Archive</span>
              <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-tighter">View Forensic Footage</span>
            </div>
            <svg className="w-3 h-3 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6l6 6-6 6" />
            </svg>
          </a>
        )}

        <div className="flex justify-between items-center py-2 px-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Incident Casualties</span>
          <span className={`text-xs font-black uppercase ${item.casualties > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
            {item.casualties > 0 ? `${item.casualties} Life Loss` : 'No Fatalities (Structural Only)'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {item.tags.map(tag => (
            <span key={tag} className="text-[8px] font-bold text-slate-500 dark:text-slate-500 px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const NewsPage: React.FC = () => {
  const recentIncidents = mockNews.filter(n => n.category === 'Recent');
  const historicalIncidents = mockNews.filter(n => n.category === 'Historical');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 dark:bg-slate-950 transition-colors">
      <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-pulse"></div>
            <h2 className="text-base font-semibold leading-7 text-slate-900 dark:text-white uppercase tracking-[0.4em]">Integrated Failure Intel</h2>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.85] mb-8">
            News Feed & <br />Loss Intelligence
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
            Objective analysis of both current forensic events and historical failure archives.
            This longitudinal dataset drives our predictive structural decay models, incorporating time, location, root cause, and remedial actions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0">
          <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Total Cases</span>
            <div className="text-3xl font-black text-white">{mockNews.length}</div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Indexed Archives</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Confidence</span>
            <div className="text-3xl font-black text-white">99.8%</div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified Logic</span>
          </div>
        </div>
      </div>

      {/* --- RECENT FEED SECTION --- */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Current News Feed</h2>
          <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Last 12 Months</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentIncidents.map(item => (
            <IncidentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* --- HISTORICAL ARCHIVE SECTION --- */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Previous Failure Archive</h2>
          <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Historical Legacy</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {historicalIncidents.map(item => (
            <IncidentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
