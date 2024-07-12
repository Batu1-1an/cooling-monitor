// src/utils/simulateDataUpdate.test.js
import { describe, it, expect, vi } from 'vitest';
import { simulateDataUpdate } from './simulateDataUpdate';

// Sample input data for tests
const sampleUnits = [
  { id: '1', name: 'Unit A', status: 'ok', temperature: 5, pressure: 150, fanSpeed: 800 },
  { id: '2', name: 'Unit B', status: 'ok', temperature: 8, pressure: 160, fanSpeed: 750 },
  { id: '3', name: 'Unit C', status: 'ok', temperature: 9, pressure: 140, fanSpeed: 820 },
];

describe('simulateDataUpdate Utility', () => {
  it('should return a new array instance', () => {
    const result = simulateDataUpdate(sampleUnits);
    expect(result).not.toBe(sampleUnits); // Check for different reference
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array of the same length as input', () => {
    const result = simulateDataUpdate(sampleUnits);
    expect(result).toHaveLength(sampleUnits.length);
  });

  it('should handle empty array input', () => {
    const result = simulateDataUpdate([]);
    expect(result).toEqual([]);
  });

  it('should handle null or undefined input', () => {
    expect(simulateDataUpdate(null)).toEqual([]);
    expect(simulateDataUpdate(undefined)).toEqual([]);
  });

  it('should modify at least one unit property (usually)', () => {
    // Run it multiple times to increase chance of detecting modification
    let modified = false;
    for (let i = 0; i < 10; i++) {
      const result = simulateDataUpdate(sampleUnits);
      // Use JSON.stringify for simple deep comparison
      if (JSON.stringify(result) !== JSON.stringify(sampleUnits)) {
        modified = true;
        break;
      }
    }
    expect(modified).toBe(true); // High probability this should pass
  });

  it('should apply "warning" status if temperature > 10', () => {
    // Force a unit to have high temperature
    const highTempUnits = [
      { id: '1', name: 'Hot Unit', status: 'ok', temperature: 15, pressure: 150, fanSpeed: 800 },
      ...sampleUnits.slice(1),
    ];
    // Mock Math.random to ensure the first unit is always selected for update
    vi.spyOn(Math, 'random').mockReturnValue(0); // Guarantees first unit is picked if count is 1 or 2

    const result = simulateDataUpdate(highTempUnits);
    const updatedUnit = result.find(u => u.id === '1');

    expect(updatedUnit.status).toBe('warning');

    // Restore Math.random
    vi.restoreAllMocks();
  });

  it('should apply "error" status if pressure > 200', () => {
    // Force a unit to have high pressure
    const highPressureUnits = [
      { id: '1', name: 'Pressure Unit', status: 'ok', temperature: 8, pressure: 210, fanSpeed: 800 },
      ...sampleUnits.slice(1),
    ];
    // Mock Math.random to ensure the first unit is always selected
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = simulateDataUpdate(highPressureUnits);
    const updatedUnit = result.find(u => u.id === '1');

    expect(updatedUnit.status).toBe('error');

    // Restore Math.random
    vi.restoreAllMocks();
  });

   it('should prioritize "error" status over "warning"', () => {
    // Force a unit to have high temp AND high pressure
    const highBothUnits = [
      { id: '1', name: 'Hot Pressure Unit', status: 'ok', temperature: 15, pressure: 210, fanSpeed: 800 },
      ...sampleUnits.slice(1),
    ];
     // Mock Math.random to ensure the first unit is always selected
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = simulateDataUpdate(highBothUnits);
    const updatedUnit = result.find(u => u.id === '1');

    expect(updatedUnit.status).toBe('error'); // Error should take precedence

     // Restore Math.random
    vi.restoreAllMocks();
  });

});