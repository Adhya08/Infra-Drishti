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
export const AnalysisPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 dark:bg-slate-950 transition-colors">
      {/* Simplified Hero */}
      <section className="mb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 mb-8 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in">
          <div className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-pulse"></div>
          <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Methodology Simplified</h2>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] mb-10 animate-reveal">
          How We Predict <br /> <span className="text-slate-400">Public Risk</span>
        </h1>
        <p className="max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium animate-fade-in delay-200">
          Predicting infrastructure failure isn't magic—it's like a fitness tracker for a bridge.
          We use live sensors to "listen" to how structures feel and warn engineers before anything breaks.
        </p>
      </section>
            {/* The 4-Step Simple Journey */}
      <section className="mb-40 relative">
        <div className="absolute top-10 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 hidden lg:block"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          <Step
            number="01"
            title="Listen"
            desc="Tiny sensors attached to the structure act like a stethoscope, listening to internal vibrations 24/7."
            icon={Mic}
          />
          <Step
            number="02"
            title="Feel"
            desc="We measure how much the structure stretches and bends when heavy trucks pass over it."
            icon={Zap}
          />
          <Step
            number="03"
            title="Compare"
            desc="Our AI compares current 'vital signs' with safe historical levels and thousands of other structures."
            icon={BarChart3}
          />
          <Step
            number="04"
            title="Alert"
            desc="If something feels 'off,' an automatic alert is sent to municipal engineers to schedule a physical check-up."
            icon={Bell}
          />
        </div>
      </section>
            {/* Simplified Metrics Grid */}
      <section className="mb-40">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4 animate-reveal">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">The "Vital Signs" We Track</h2>
            <p className="text-slate-500 font-medium">Think of these as the blood pressure and pulse for our highways.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnalogyCard
            title="Internal Pressure"
            analogy="Backpack Weight"
            desc="How much weight the structure 'feels' inside. Too much pressure for too long can cause hidden fatigue."
            icon={Activity}
            technicalTerm="Stress (MPa)"
            color="bg-slate-900"
          />
          <AnalogyCard
            title="Stretching"
            analogy="A Rubber Band"
            desc="Structures change shape slightly under load. If they don't 'snap back' to their original shape, they are wearing out."
            icon={Waves}
            technicalTerm="Strain (μm/m)"
            color="bg-slate-400"
          />
          <AnalogyCard
            title="Traffic Load"
            analogy="Crowd Control"
            desc="We track the total number of heavy trucks. It's like counting how many people are standing on a single chair."
            icon={Truck}
            technicalTerm="Operational Factor"
            color="bg-slate-600"
          />
          <AnalogyCard
            title="Vibration"
            analogy="Musical Tuning"
            desc="Every bridge 'hums' at a certain frequency. If that hum changes, it means something is loose or cracked inside."
            icon={Music}
            technicalTerm="Resonance (Hz)"
            color="bg-slate-500"
          />
        </div>
      </section>
           {/* STRATEGIC DATA SOURCES SECTION */}
      <section className="mb-40">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4 animate-reveal">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Strategic Data Inventory</h2>
            <p className="text-slate-500 font-medium italic">Grounding our AI in official national repositories and standards.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <DataSourceCard
            agency="NHAI"
            title="Data Lake & VAHAN"
            desc="Ingesting telemetry from 500+ toll plazas and the centralized Data Lake for pavement quality (IRI indices) and traffic density."
            tag="Operational Load"
            updateFreq="Real-time"
          />
          <DataSourceCard
            agency="IMD & NCS"
            title="Climate & Seismology"
            desc="Satellite precipitation streams and tectonic shift data for assets in Himalayas and high-risk flood zones (Kerala/Assam)."
            tag="Environmental Stress"
            updateFreq="60 Min"
          />
          <DataSourceCard
            agency="NHIDCL"
            title="Hill-Infra Logs"
            desc="Specific maintenance and structural integrity logs for mountain tunnels and border bridges in Strategic Zones."
            tag="Structural Integrity"
            updateFreq="Daily"
          />
        </div>

        <div className="bg-slate-900 dark:bg-black p-8 rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Engineering Codes</h3>
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4">BIS Standard <br />Registry Integration</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Our decay algorithms are calibrated against the **Bureau of Indian Standards (BIS)** 2024 revisions to ensure compliance with national engineering safety mandates.
              </p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { code: 'IS 456', label: 'Concrete Design', desc: 'Durability limits for saline environments.' },
                { code: 'IS 800', label: 'Steel Struct.', desc: 'Fatigue life cycles for structural steel.' },
                { code: 'IS 1893', label: 'Seismic Res.', desc: 'Zonal acceleration coefficients (Zone I-V).' },
                { code: 'IS 13920', label: 'Ductile Det.', desc: 'Flexibility markers for high-load nodes.' }
              ].map(bis => (
                <div key={bis.code} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                  <span className="text-xs font-black text-slate-300 block mb-1">{bis.code}</span>
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest block mb-2">{bis.label}</span>
                  <p className="text-[9px] text-slate-500 leading-tight">{bis.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>