import React from 'react';

export const SimulatorPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">Predictive Stress Simulator</h1>
        </div>

    );
};
const [factors, setFactors] = useState({
    maintenanceGap: 2,
    trafficIncrease: 10,
    rainfallIntensity: 4,
    heavyVehicleRatio: 12,
    seismicIntensity: 0,
    materialQuality: 0.9
});
