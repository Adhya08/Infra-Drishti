import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const SimulatorPage: React.FC = () => {

  const data = useMemo(()=>{

    const startYear = 2024
    const baseRisk = 18

    return Array.from({length:10}).map((_,i)=>({
      year:startYear+i,
      risk:Math.min(100,baseRisk+i*6)
    }))

  },[])

  const currentRisk = data[0].risk

  return(

    <div>

      <h1>Predictive Stress Simulator</h1>

      <div
        style={{
          width:"100%",
          background:"#eee",
          borderRadius:"8px",
          overflow:"hidden"
        }}
      >

        <div
          style={{
            width:`${currentRisk}%`,
            background:"#111",
            height:"12px"
          }}
        />

      </div>

      <p>Infrastructure Stress Level: {currentRisk}%</p>

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
