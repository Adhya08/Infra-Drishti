import { Asset } from '../types';

export const mockAssets: Asset[] = [
    {
        id: 'new-parliament-house',
        name: 'New Parliament House (Sansad Bhavan)',
        type: 'Building',
        coordinates: [28.6171, 77.2081],
        riskScore: 4,
        age: 1,
        lastMaintenance: '2024-05-01',
        loadFactor: 3.2,
        climateImpact: 4.5,
        description: 'Central Vista centerpiece.',
        zone: 'New Delhi',
        timeline: [],
        telemetry: { stress: 10.2, strain: 12, loadCapacity: 450000, vibrationFrequency: 3.2 }
    },
    {
        id: 'signature-bridge-delhi',
        name: 'Signature Bridge',
        type: 'Flyover',
        coordinates: [28.7111, 77.23],
        riskScore: 18,
        age: 6,
        lastMaintenance: '2023-11-20',
        loadFactor: 8.5,
        climateImpact: 6.8,
        description: 'Cable-stayed bridge',
        zone: 'North Delhi',
        timeline: [],
        telemetry: { stress: 24.5, strain: 65, loadCapacity: 150000, vibrationFrequency: 0.82 }
    }
];
