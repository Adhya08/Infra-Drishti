import React from 'react';
import {
  Activity,
  Waves,
  Truck,
  Music,
  Mic,
  Zap,
  BarChart3,
  Bell,
  AlertTriangle,
  PieChart,
  LucideIcon
} from 'lucide-react';

const AnalogyCard: React.FC<{
  title: string;
  analogy: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  technicalTerm: string;
}> = ({ title, analogy, desc, icon: Icon, color, technicalTerm }) => (
  <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 group flex flex-col relative overflow-hidden shadow-sm hover:shadow-2xl animate-fade-in-up">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:opacity-10 transition-opacity`}></div>

    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border transition-all duration-500 ${color === 'bg-slate-900' ? 'bg-slate-900 text-white border-slate-700' :
      color === 'bg-slate-400' ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700' :
        color === 'bg-slate-600' ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800' :
          'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'
      }`}>
      <Icon className="w-7 h-7" />
    </div>
        <div className="mb-4">
      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Analog: {analogy}</span>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-slate-500 transition-colors">{title}</h3>
    </div>

    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">{desc}</p>

    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Scientific Term</span>
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{technicalTerm}</span>
      </div>
    </div>
  </div>
);
const Step: React.FC<{ number: string, title: string, desc: string, icon: LucideIcon }> = ({ number, title, desc, icon: Icon }) => (
  <div className="relative flex flex-col items-center text-center group px-4 animate-fade-in-up">
    <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800 shadow-xl group-hover:scale-110 group-hover:bg-slate-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-500">
      <Icon className="w-10 h-10" strokeWidth={1.5} />
    </div>
    <div className="absolute top-0 right-1/4 w-8 h-8 bg-slate-900 dark:bg-white rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center text-xs font-black text-white dark:text-slate-950 z-10 shadow-lg">
      {number}
    </div>
    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">{title}</h4>
    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
  </div>
);
const DataSourceCard: React.FC<{
  agency: string;
  title: string;
  desc: string;
  tag: string;
  updateFreq: string;
}> = ({ agency, title, desc, tag, updateFreq }) => (
  <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-slate-500 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{agency}</span>
      <span className="text-[8px] font-bold text-slate-400 uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded">{updateFreq}</span>
    </div>
    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-2 group-hover:text-slate-500 transition-colors">{title}</h4>
    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{desc}</p>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tag}</span>
    </div>
  </div>
);