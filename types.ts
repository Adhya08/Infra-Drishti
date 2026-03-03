// Shared domain types for Infrastructure Risk Intelligence System

// ----------------------
// Risk Levels
// ----------------------

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// ----------------------
// Maintenance
// ----------------------

export interface MaintenanceEvent {
  date: string; // ISO date
  type: string;
  description: string;
}

// ----------------------
// Engineering Telemetry
// ----------------------

export interface EngineeringTelemetry {
  stress: number;              // MPa
  strain: number;              // microns/m
  loadCapacity: number;        // Tons/day or standard load units
  vibrationFrequency: number;  // Hz
}

// ----------------------
// Core Asset Model
// ----------------------

export interface Asset {
  id: string;
  name: string;

  type: 'Bridge' | 'Road' | 'Building' | 'Tunnel' | 'Flyover';

  coordinates: [number, number]; // [lat, lng]

  riskScore: number;  // 0–100
  age: number;        // years
  lastMaintenance: string; // ISO date

  loadFactor: number;     // 0–10
  climateImpact: number;  // 0–10

  description: string;
  zone: string;

  timeline: MaintenanceEvent[];
  telemetry: EngineeringTelemetry;

  imageUrl?: string;
}

// ----------------------
// Chat System
// ----------------------

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;

  image?: string;
  groundingMetadata?: unknown;
}



// ----------------------
// Scenario Simulation
// ----------------------

export interface ScenarioFactors {
  maintenanceGap: number;    // years
  trafficIncrease: number;   // %
  rainfallIntensity: number; // 1–10
  heavyVehicleRatio: number; // 0–100 %
  seismicIntensity: number;  // 0–10
  materialQuality: number;   // 0–1
}
