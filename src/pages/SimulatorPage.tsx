import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ScenarioFactors {
  maintenanceGap: number;
  trafficIncrease: number;
  rainfallIntensity: number;
  heavyVehicleRatio: number;
  seismicIntensity: number;
  materialQuality: number;
}

export const SimulatorPage: React.FC = () => {

  const [factors] = useState<ScenarioFactors>({
    maintenanceGap: 2,
    trafficIncrease: 10,
    rainfallIntensity: 4,
    heavyVehicleRatio: 12,
    seismicIntensity: 0,
    materialQuality: 0.9
  });

  const data = useMemo(()=>{

    const baseRisk = 15
    const startYear = 2024

    return Array.from({length:10}).map((_,i)=>({
      year: startYear+i,
      risk: Math.min(100, baseRisk + i*5)
    }))

  },[])

  return (
    <div>

      <h1>Predictive Stress Simulator</h1>

      <div style={{height:400}}>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <XAxis dataKey="year"/>
            <YAxis/>
            <Tooltip/>

            <Area
              type="monotone"
              dataKey="risk"
              stroke="#111"
              fill="#ccc"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}
