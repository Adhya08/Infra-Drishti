
import React, { useState, useMemo } from 'react';
import { ScenarioFactors } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';

const SimulationSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (val: number) => void;
  color: string;
  icon: string;
}> = ({ label, value, min, max, unit, onChange, color, icon }) => (
  <div className="space-y-3 group">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700 ${color}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </span>
        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-xs font-black font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${color}`}>
        {value}{unit}
      </span>
    </div>
    <input
      type="range" min={min} max={max} step={min === 0 && max === 1 ? 0.05 : 1}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-slate-900 dark:accent-white hover:accent-slate-700 dark:hover:accent-slate-200 transition-all"
    />
  </div>
);

export const SimulatorPage: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [factors, setFactors] = useState<ScenarioFactors>({
    maintenanceGap: 2,
    trafficIncrease: 10,
    rainfallIntensity: 4,
    heavyVehicleRatio: 12,
    seismicIntensity: 0,
    materialQuality: 0.9
  });

  const [activeInterventions, setActiveInterventions] = useState<string[]>([]);

  // Simulation Engine: Non-linear decay calculation
  const simulationResults = useMemo(() => {
    const maintenanceImpact = 1 + (Math.pow(factors.maintenanceGap, 1.4) * 0.03);
    const trafficImpact = 1 + (factors.trafficIncrease * 0.012) + (factors.heavyVehicleRatio * 0.008);
    const environmentImpact = 1 + (Math.max(0, factors.rainfallIntensity - 5) * 0.08) + (factors.seismicIntensity * 0.2);
    const materialFragility = 1 + ((1 - factors.materialQuality) * 1.5);

    let totalMultiplier = maintenanceImpact * trafficImpact * environmentImpact * materialFragility;

    // Apply Mitigation "Buffs"
    if (activeInterventions.includes('FRP')) totalMultiplier *= 0.78;
    if (activeInterventions.includes('IOT')) totalMultiplier *= 0.90;
    if (activeInterventions.includes('LOAD_LIMIT')) totalMultiplier *= 0.85;

    const startYear = 2024;
    const baseRisk = 15; // Initial healthy asset risk
    const annualNaturalDecay = 1.03; // 3% natural aging per year

    const chartData = Array.from({ length: 16 }).map((_, i) => {
      const year = startYear + i;
      // Exponential decay curve
      const calculatedRisk = Math.min(100, Math.round(baseRisk * Math.pow(annualNaturalDecay * (totalMultiplier > 1 ? (1 + (totalMultiplier - 1) * 0.5) : 1), i)));
      const baselineRisk = Math.min(100, Math.round(baseRisk * Math.pow(annualNaturalDecay, i)));

      return { year, risk: calculatedRisk, baselineRisk };
    });

    const failurePoint = chartData.find(d => d.risk >= 75);
    const currentRisk = chartData[0].risk;

    return {
      chartData,
      multiplier: totalMultiplier,
      failureYear: failurePoint?.year || null,
      currentRisk
    };
  }, [factors, activeInterventions]);

  const toggleIntervention = (id: string) => {
    setActiveInterventions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getHealthStatus = (risk: number) => {
    if (risk > 75) return { label: 'CRITICAL', color: 'text-slate-900 dark:text-white', bg: 'bg-slate-900/10 dark:bg-white/10', bar: 'bg-slate-900 dark:bg-white' };
    if (risk > 45) return { label: 'WARNING', color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-600/10 dark:bg-slate-300/10', bar: 'bg-slate-600 dark:bg-slate-300' };
    return { label: 'OPTIMAL', color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-400/10 dark:bg-slate-500/10', bar: 'bg-slate-400 dark:bg-slate-500' };
  };

  const status = getHealthStatus(simulationResults.chartData[0].risk);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 transition-all duration-500">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Structural Sandbox v4.2</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-4">
            Predictive Stress <br /><span className="text-slate-500">Simulator</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Adjust the operational and environmental sliders below to see how strategic infrastructure assets
            will degrade over the next 15 years.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setFactors({ maintenanceGap: 12, trafficIncrease: 80, rainfallIntensity: 10, heavyVehicleRatio: 45, seismicIntensity: 2, materialQuality: 0.6 }); }} className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Scenario: Catastrophic
          </button>
          <button onClick={() => { setFactors({ maintenanceGap: 1, trafficIncrease: 5, rainfallIntensity: 3, heavyVehicleRatio: 10, seismicIntensity: 0, materialQuality: 1.0 }); setActiveInterventions(['FRP', 'IOT', 'LOAD_LIMIT']); }} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Scenario: Perfect Health
          </button>
          <button onClick={() => { setFactors({ maintenanceGap: 2, trafficIncrease: 10, rainfallIntensity: 4, heavyVehicleRatio: 12, seismicIntensity: 0, materialQuality: 0.9 }); setActiveInterventions([]); }} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Reset
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PARAMETER CONTROLS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pb-4 border-b border-slate-100 dark:border-slate-800">Variable Matrix</h3>
            <div className="space-y-6">
              <SimulationSlider label="Maintenance Delay" value={factors.maintenanceGap} min={0} max={20} unit="y" color="text-slate-950 dark:text-white" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" onChange={v => setFactors({ ...factors, maintenanceGap: v })} />
              <SimulationSlider label="Traffic Growth" value={factors.trafficIncrease} min={0} max={200} unit="%" color="text-slate-700 dark:text-slate-200" icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" onChange={v => setFactors({ ...factors, trafficIncrease: v })} />
              <SimulationSlider label="Heavy Trucks" value={factors.heavyVehicleRatio} min={0} max={100} unit="%" color="text-slate-600 dark:text-slate-300" icon="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" onChange={v => setFactors({ ...factors, heavyVehicleRatio: v })} />
              <SimulationSlider label="Precipitation" value={factors.rainfallIntensity} min={1} max={10} unit="/10" color="text-slate-500 dark:text-slate-400" icon="M19.4 15a6.5 6.5 0 11-12.5-2.1M17 11.5a4.5 4.5 0 11-6 8" onChange={v => setFactors({ ...factors, rainfallIntensity: v })} />
              <SimulationSlider label="Seismic Risk" value={factors.seismicIntensity} min={0} max={9} unit="M" color="text-slate-400 dark:text-slate-500" icon="M4 4v16h16" onChange={v => setFactors({ ...factors, seismicIntensity: v })} />
              <SimulationSlider label="Material Grade" value={factors.materialQuality} min={0.3} max={1.0} unit="Q" color="text-slate-300 dark:text-slate-600" icon="M9 12l2 2 4-4" onChange={v => setFactors({ ...factors, materialQuality: v })} />
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-900 p-8 rounded-[2.5rem] text-white border border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Simulation Status</h4>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className={`text-4xl font-black ${status.color}`}>{simulationResults.chartData[0].risk}%</span>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Instantaneous Risk Score</p>
              </div>
              <div className={`px-4 py-2 rounded-xl text-[10px] font-black ${status.bg} ${status.color} border border-current animate-pulse`}>
                {status.label}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                <span>System Degradation Path</span>
                <span>{simulationResults.failureYear ? 'Critical Year: ' + simulationResults.failureYear : 'Stable Range'}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-700 ${status.bar}`} style={{ width: `${simulationResults.chartData[0].risk}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & CHART */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Decay Projection</h3>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Modelled over a 15-year lifecycle</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase">Simulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase">Engineering Baseline</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationResults.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDarkMode ? "#ffffff" : "#0f172a"} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={isDarkMode ? "#ffffff" : "#0f172a"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickMargin={12} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickMargin={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '20px',
                      border: 'none',
                      color: '#fff',
                      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                      padding: '16px'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ marginBottom: '8px', color: '#64748b', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="baselineRisk" stroke="#64748b" strokeWidth={1} strokeDasharray="5 5" fill="transparent" />
                  <Area type="monotone" dataKey="risk" stroke={isDarkMode ? "#ffffff" : "#0f172a"} strokeWidth={4} fill="url(#simGrad)" />
                  <ReferenceLine y={75} stroke="#64748b" strokeWidth={1} strokeDasharray="3 3">
                    <Label value="STRUCTURAL FAILURE LIMIT" position="top" fill="#64748b" fontSize={8} fontWeight="900" />
                  </ReferenceLine>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${simulationResults.failureYear ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'}`}>
                  {simulationResults.failureYear ? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">
                    {simulationResults.failureYear
                      ? `Critical failure predicted by year ${simulationResults.failureYear}`
                      : 'Asset resilience remains within safe operational limits for the 15-year period.'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {simulationResults.failureYear
                      ? 'Immediate intervention required to avoid structural collapse. High decay multiplier detected in the current variable matrix.'
                      : 'Maintain current inspection cycles. The current intervention and maintenance mix is sufficient for long-term health.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COUNTER-MEASURES / UPGRADES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'FRP', label: 'Composite Reinforcement', desc: 'Add carbon fiber wraps to pillars and beams.', reduction: '22%', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { id: 'IOT', label: 'Predictive IoT Grid', desc: 'Real-time sensors for sub-millimeter shift detection.', reduction: '10%', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'LOAD_LIMIT', label: 'Smart Toll Restriction', desc: 'Dynamic caps on heavy axle vehicles.', reduction: '15%', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
            ].map(inv => (
              <button
                key={inv.id}
                onClick={() => toggleIntervention(inv.id)}
                className={`p-6 rounded-[2.5rem] border text-left group transition-all duration-500 relative overflow-hidden ${activeInterventions.includes(inv.id)
                  ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-xl translate-y-[-8px]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-white'
                  }`}
              >
                {activeInterventions.includes(inv.id) && (
                  <div className="absolute top-4 right-4 text-[8px] font-black uppercase text-white px-2 py-0.5 rounded bg-white/20">Active</div>
                )}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeInterventions.includes(inv.id) ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={inv.icon} /></svg>
                </div>
                <h4 className={`text-xs font-black uppercase mb-1 ${activeInterventions.includes(inv.id) ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>{inv.label}</h4>
                <p className={`text-[10px] leading-relaxed font-bold mb-4 ${activeInterventions.includes(inv.id) ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-500'}`}>{inv.desc}</p>
                <div className={`text-[10px] font-black uppercase ${activeInterventions.includes(inv.id) ? 'text-white dark:text-slate-900 opacity-60' : 'text-slate-900 dark:text-white'}`}>
                  Risk Reduction: {inv.reduction}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
