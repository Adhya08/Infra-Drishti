import React, { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export const SimulatorPage: React.FC = () => {

  const confidence = 92;

  const data = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      year: 2024 + i,
      risk: 20 + i * 6,
    }));
  }, []);

  <button
  onClick={() => window.location.reload()}
  className="px-6 py-2 bg-black text-white rounded-xl"
>
  Reset Simulation
</button>

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-4xl font-black">Predictive Stress Simulator</h1>

      <p>AI Prediction Confidence: {confidence}%</p>

      <progress value={confidence} max={100} className="w-full"/>

      <div style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="year"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone" dataKey="risk" stroke="#111" fill="#ddd"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
