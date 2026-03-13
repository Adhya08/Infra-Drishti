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

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-8">
      <h1 className="text-4xl font-black">Predictive Stress Simulator</h1>

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
