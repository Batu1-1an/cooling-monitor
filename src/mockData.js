import { v4 as uuidv4 } from 'uuid';

// Structure: { id: string, name: string, status: 'ok' | 'warning' | 'error', temperature: number, pressure: number, fanSpeed: number }

const mockCoolingUnits = [
  {
    id: uuidv4(),
    name: 'Main Chiller A',
    status: 'ok',
    temperature: 5.2,
    pressure: 155,
    fanSpeed: 810,
  },
  {
    id: uuidv4(),
    name: 'Auxiliary Cooler 1',
    status: 'ok',
    temperature: 7.8,
    pressure: 140,
    fanSpeed: 750,
  },
  {
    id: uuidv4(),
    name: 'Server Room AC',
    status: 'warning', // Example warning state
    temperature: 11.5, // Temp > 10 triggers warning
    pressure: 160,
    fanSpeed: 900,
  },
  {
    id: uuidv4(),
    name: 'Backup Chiller B',
    status: 'ok',
    temperature: 6.1,
    pressure: 148,
    fanSpeed: 800,
  },
    {
    id: uuidv4(),
    name: 'Critical System Cooler',
    status: 'error', // Example error state
    temperature: 8.0,
    pressure: 210, // Pressure > 200 triggers error
    fanSpeed: 650,
  },
];

export default mockCoolingUnits;

// Function to generate mock historical data (can be used later in Phase 4)
export const generateMockHistory = (baseValue, points = 20, variation = 2) => {
  const history = [];
  let currentValue = baseValue;
  const now = Date.now();
  for (let i = points - 1; i >= 0; i--) {
    // Simulate some fluctuation
    const fluctuation = (Math.random() - 0.5) * variation;
    currentValue += fluctuation;
    // Ensure value doesn't drift too far unrealistically or go below zero for temp/pressure
    currentValue = Math.max(0, currentValue);
    if (baseValue > 100 && currentValue < 50) currentValue = baseValue + fluctuation; // Prevent pressure dropping too low

    history.push({
      timestamp: now - i * 60 * 1000, // Data point every minute for the last 'points' minutes
      value: parseFloat(currentValue.toFixed(1)), // Keep one decimal place
    });
  }
  return history;
};