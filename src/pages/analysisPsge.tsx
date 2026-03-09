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