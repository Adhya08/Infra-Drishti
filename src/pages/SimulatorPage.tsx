import React, { useState } from 'react';

interface ScenarioFactors {
  maintenanceGap: number;
  trafficIncrease: number;
  rainfallIntensity: number;
  heavyVehicleRatio: number;
  seismicIntensity: number;
  materialQuality: number;
}

const SimulationSlider: React.FC<{
  label: string
  value: number
  min: number
  max: number
  onChange: (v:number)=>void
}> = ({label,value,min,max,onChange}) => {

  return (
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
}

export const SimulatorPage: React.FC = () => {

  const [factors, setFactors] = useState<ScenarioFactors>({
    maintenanceGap: 2,
    trafficIncrease: 10,
    rainfallIntensity: 4,
    heavyVehicleRatio: 12,
    seismicIntensity: 0,
    materialQuality: 0.9
  });

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

    </div>
  );
};
