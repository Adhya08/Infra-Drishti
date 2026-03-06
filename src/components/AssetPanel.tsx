
import React, { useMemo } from 'react';
import { Asset } from '../types';
import {
  X,
  Image as ImageIcon,
  Activity,
  ShieldAlert,
  Zap,
  Clock,
  Truck,
  CloudRain,
  LineChart as LineChartIcon,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceDot,
  Label
} from 'recharts';

interface AssetPanelProps {
  asset: Asset | null;
  onClose: () => void;
}

export const AssetPanel: React.FC<AssetPanelProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  // Calculate individual risk contributions for Explainable AI section
  const ageContribution = Math.min(100, (asset.age / 60) * 100);
  const loadContribution = asset.loadFactor * 10;
  const climateContribution = asset.climateImpact * 10;

  // Weights for the summary paragraph
  const totalWeight = ageContribution + loadContribution + climateContribution;
  const agePct = Math.round((ageContribution / totalWeight) * 100);
  const loadPct = Math.round((loadContribution / totalWeight) * 100);
  const climatePct = Math.round((climateContribution / totalWeight) * 100);

  const pieData = [
    { name: 'Structural Fatigue', value: agePct },
    { name: 'Operational Load', value: loadPct },
    { name: 'Environmental Impact', value: climatePct },
  ];

  const PIE_COLORS = ['#0f172a', '#475569', '#94a3b8'];

  // Generate a theoretical Stress-Strain curve data set
  const curveData = useMemo(() => {
    const points = [];
    const maxStrain = Math.max(asset.telemetry.strain * 1.5, 300);
    const modulus = asset.telemetry.stress / asset.telemetry.strain;

    for (let i = 0; i <= 10; i++) {
      const s = (maxStrain / 10) * i;
      let stress = s * modulus;
      if (s > asset.telemetry.strain * 0.8) {
        stress = (asset.telemetry.strain * 0.8 * modulus) + (s - asset.telemetry.strain * 0.8) * (modulus * 0.2);
      }
      points.push({ strain: Math.round(s), stress: Number(stress.toFixed(2)) });
    }
    return points;
  }, [asset.telemetry]);

  const getRiskStatus = (score: number) => {
    if (score > 70) return { label: 'CRITICAL', color: 'text-slate-900 dark:text-white', bg: 'bg-slate-900/10 dark:bg-white/10' };
    if (score > 40) return { label: 'MONITORING', color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-600/10 dark:bg-slate-300/10' };
    return { label: 'STABLE', color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-400/10 dark:bg-slate-500/10' };
  };

  const status = getRiskStatus(asset.riskScore);

  return (
    <div className="absolute right-0 top-0 h-full w-full sm:w-[500px] bg-white dark:bg-slate-950 shadow-2xl z-[1050] border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
      {/* Asset Hero Image */}
      <div className="relative h-72 overflow-hidden shadow-sm">
        {asset.imageUrl ? (
          <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-700" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 via-white/50 dark:via-slate-950/50 to-transparent"></div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-white/10 dark:bg-white/5 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-all border border-white/20 z-20 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="px-8 py-4 -mt-10 relative z-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{asset.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-md">{asset.type}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{asset.zone} Sector</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color} border border-current shadow-sm`}>
              {status.label} Status
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Risk Score Highlight */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Aggregate Health Index</h3>
            <Activity className="w-4 h-4 text-slate-900 dark:text-white" />
          </div>
          <div className={`p-8 rounded-[2.5rem] ${status.bg} border border-slate-100 dark:border-slate-800/50 flex items-center justify-between transition-all hover:shadow-lg`}>
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`text-6xl font-black ${status.color} tracking-tighter italic`}>{asset.riskScore}</span>
                <span className="text-slate-400 dark:text-slate-600 font-bold text-lg">/100</span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide">Dynamic Risk Vector</p>
            </div>
            <div className={`w-20 h-20 rounded-full border-[6px] border-slate-200 dark:border-slate-800 flex items-center justify-center relative`}>
              <div
                className={`absolute inset-0 rounded-full border-[6px] border-current opacity-80`}
                style={{ clipPath: `polygon(50% 50%, -50% -50%, ${asset.riskScore}% -50%, ${asset.riskScore}% 150%, -50% 150%)` }}
              ></div>
              <ShieldAlert className={`w-8 h-8 ${status.color}`} />
            </div>
          </div>
        </div>

       

        {/* Timeline View */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Maintenance Audit History</h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{asset.timeline.length} Events Logged</span>
          </div>
          <div className="space-y-8 border-l-2 border-slate-100 dark:border-slate-800 ml-3 pl-8">
            {asset.timeline.map((event, idx) => (
              <div key={idx} className="relative group cursor-default">
                <div className="absolute -left-[39px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-900 dark:border-slate-400 group-hover:scale-125 transition-transform"></div>
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-widest">{event.date}</div>
                <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-slate-500 transition-colors">{event.type}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">{event.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 sticky bottom-0 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 pb-8 transition-colors">
          <button
            className="w-full bg-slate-900 dark:bg-white hover:scale-[1.02] active:scale-[0.98] text-white dark:text-slate-900 font-black py-5 px-8 rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-3 group"
          >
            <ShieldAlert className="w-5 h-5 group-hover:animate-bounce" />
            <span className="uppercase tracking-[0.2em] text-xs">Initiate Structural Audit</span>
            <ChevronRight className="w-4 h-4 ml-2 opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};
