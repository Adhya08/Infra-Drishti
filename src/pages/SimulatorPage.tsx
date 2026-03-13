import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const SimulatorPage: React.FC = () => {

  const [maintenanceGap] = useState(2)

  const data = useMemo(()=>{

    const baseRisk = 20
    const startYear = 2024

    return Array.from({length:12}).map((_,i)=>({
      year:startYear+i,
      risk:Math.min(100,baseRisk+i*6+maintenanceGap)
    }))

  },[])

  const failureYear = data.find(d=>d.risk>=80)?.year ?? "Safe"

  return(

    <div>

      <h1>Predictive Stress Simulator</h1>

      <h2>Estimated Failure Year: {failureYear}</h2>

      <div style={{height:400}}>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="year"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone" dataKey="risk" stroke="#111" fill="#ccc"/>
          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>

  )
}
