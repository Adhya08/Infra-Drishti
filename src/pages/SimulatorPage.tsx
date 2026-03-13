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

interface Interventions {
  iotSensors:boolean
  frpReinforcement:boolean
  loadLimit:boolean
}

export const SimulatorPage: React.FC = () => {

  const [factors,setFactors] = useState<ScenarioFactors>({
    maintenanceGap:2,
    trafficIncrease:10,
    rainfallIntensity:4,
    heavyVehicleRatio:12,
    seismicIntensity:0,
    materialQuality:0.9
  })

  const [interventions,setInterventions] = useState<Interventions>({
    iotSensors:false,
    frpReinforcement:false,
    loadLimit:false
  })

  const data = useMemo(()=>{

    const baseRisk = 15
    const startYear = 2024

    let reduction = 0
    if(interventions.iotSensors) reduction += 5
    if(interventions.frpReinforcement) reduction += 10
    if(interventions.loadLimit) reduction += 6

    return Array.from({length:10}).map((_,i)=>({

      year:startYear+i,
      risk:Math.max(
        5,
        Math.min(
          100,
          baseRisk + i*5 + factors.maintenanceGap - reduction
        )
      )

    }))

  },[factors,interventions])

  return(
    <div>

      <h1>Predictive Stress Simulator</h1>

      <label>
        <input
          type="checkbox"
          checked={interventions.iotSensors}
          onChange={()=>setInterventions({...interventions,iotSensors:!interventions.iotSensors})}
        />
        IoT Monitoring
      </label>

      <label>
        <input
          type="checkbox"
          checked={interventions.frpReinforcement}
          onChange={()=>setInterventions({...interventions,frpReinforcement:!interventions.frpReinforcement})}
        />
        FRP Reinforcement
      </label>

      <label>
        <input
          type="checkbox"
          checked={interventions.loadLimit}
          onChange={()=>setInterventions({...interventions,loadLimit:!interventions.loadLimit})}
        />
        Load Limit Policy
      </label>

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
