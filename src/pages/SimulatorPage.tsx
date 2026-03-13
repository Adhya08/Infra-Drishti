import React, { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export const SimulatorPage: React.FC = () => {

  const data = useMemo(() => {
    const startYear = 2024;
    return Array.from({ length: 10 }).map((_, i) => ({
      year: startYear + i,
      risk: 20 + i * 6,
    }));
  }, []);

  const currentRisk = data[0].risk;
  const safetyScore = 100 - currentRisk;

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-8">

      <h1 className="text-4xl font-black">Predictive Stress Simulator</h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 rounded-xl bg-slate-100">
          <p>Current Risk</p>
          <h2 className="text-3xl font-bold">{currentRisk}%</h2>
        </div>

        <div className="p-6 rounded-xl bg-slate-100">
          <p>Safety Score</p>
          <h2 className="text-3xl font-bold">{safetyScore}%</h2>
        </div>

        <div className="p-6 rounded-xl bg-slate-100">
          <p>Projection Window</p>
          <h2 className="text-3xl font-bold">10 Years</h2>
        </div>

      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="risk" stroke="#111" fill="#ddd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
