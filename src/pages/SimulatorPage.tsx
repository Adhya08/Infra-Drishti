import React, { useState, useMemo } from 'react';

interface ScenarioFactors {
  maintenanceGap: number;
  trafficIncrease: number;
  rainfallIntensity: number;
  heavyVehicleRatio: number;
  seismicIntensity: number;
  materialQuality: number;
}

const SimulationSlider: React.FC<any> = ({label,value,min,max,onChange}) => (
  <div>
    <label>{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e)=>onChange(parseFloat(e.target.value))}
    />
    <span>{value}</span>
  </div>
)

export const SimulatorPage: React.FC = () => {

  const [factors, setFactors] = useState<ScenarioFactors>({
    maintenanceGap: 2,
    trafficIncrease: 10,
    rainfallIntensity: 4,
    heavyVehicleRatio: 12,
    seismicIntensity: 0,
    materialQuality: 0.9
  });

  const simulationResults = useMemo(() => {

    const startYear = 2024
    const baseRisk = 15

    const data = Array.from({length:10}).map((_,i)=>{

      const risk =
        baseRisk +
        factors.maintenanceGap * i +
        factors.trafficIncrease * 0.05 * i

      return {
        year: startYear + i,
        risk: Math.min(100, Math.round(risk))
      }

    })

    return data

  },[factors])

  return (
    <div>

      <h1>Predictive Stress Simulator</h1>

      <SimulationSlider
        label="Maintenance Delay"
        value={factors.maintenanceGap}
        min={0}
        max={20}
        onChange={(v)=>setFactors({...factors, maintenanceGap:v})}
      />

      <pre>{JSON.stringify(simulationResults,null,2)}</pre>

    </div>
  )
}
