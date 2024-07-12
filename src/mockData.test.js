// src/mockData.test.js
import { describe, it, expect } from 'vitest';
import mockCoolingUnits from './mockData'; // Import the default export

describe('Mock Data', () => {
  it('should export an array of cooling units', () => {
    expect(Array.isArray(mockCoolingUnits)).toBe(true);
    expect(mockCoolingUnits.length).toBeGreaterThan(0); // Ensure it's not empty
  });

  it('each unit object should have the correct keys and basic types', () => {
    // Check the first unit as a representative sample
    const sampleUnit = mockCoolingUnits[0];
    expect(sampleUnit).toBeDefined();
    expect(sampleUnit).toHaveProperty('id');
    expect(typeof sampleUnit.id).toBe('string');

    expect(sampleUnit).toHaveProperty('name');
    expect(typeof sampleUnit.name).toBe('string');

    expect(sampleUnit).toHaveProperty('status');
    expect(['ok', 'warning', 'error']).toContain(sampleUnit.status); // Check if status is one of the allowed values

    expect(sampleUnit).toHaveProperty('temperature');
    expect(typeof sampleUnit.temperature).toBe('number');

    expect(sampleUnit).toHaveProperty('pressure');
    expect(typeof sampleUnit.pressure).toBe('number');

    expect(sampleUnit).toHaveProperty('fanSpeed');
    expect(typeof sampleUnit.fanSpeed).toBe('number');
  });

  // Optional: Could add more tests, e.g., checking all units match the structure
});