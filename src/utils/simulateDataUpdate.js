// src/utils/simulateDataUpdate.js

/**
 * Takes an array of cooling units and returns a new array
 * with simulated updates applied to 1 or 2 random units.
 * @param {Array<object>} prevUnits - The previous array of unit objects.
 * @returns {Array<object>} A new array with updated unit data.
 */
export function simulateDataUpdate(prevUnits) {
  if (!prevUnits || prevUnits.length === 0) {
    return [];
  }

  // Create a deep copy to modify
  const nextUnits = JSON.parse(JSON.stringify(prevUnits));

  // Select 1 or 2 units to update randomly
  const unitsToUpdateCount = Math.random() < 0.7 ? 1 : 2; // 70% chance for 1, 30% for 2
  const updatedIndices = new Set();

  for (let i = 0; i < unitsToUpdateCount && i < nextUnits.length; i++) {
    let randomIndex;
    // Ensure we pick a unique index that hasn't been updated yet
    do {
      randomIndex = Math.floor(Math.random() * nextUnits.length);
    } while (updatedIndices.has(randomIndex));
    updatedIndices.add(randomIndex);

    const unit = nextUnits[randomIndex];

    // Simulate fluctuations
    unit.temperature = parseFloat((unit.temperature + (Math.random() - 0.5) * 0.8).toFixed(1)); // +/- 0.4
    unit.pressure = Math.round(unit.pressure + (Math.random() - 0.5) * 8); // +/- 4
    unit.fanSpeed = Math.round(unit.fanSpeed + (Math.random() - 0.5) * 30); // +/- 15

    // Ensure values stay within reasonable bounds (optional, but good practice)
    unit.temperature = Math.max(0, unit.temperature); // Temp shouldn't go below 0
    unit.pressure = Math.max(50, unit.pressure); // Pressure shouldn't go too low
    unit.fanSpeed = Math.max(0, unit.fanSpeed); // Fan speed shouldn't be negative

    // Apply status rules (Error > Warning > OK)
    // Using thresholds from PLAN.md: temp > 10 => 'warning', pressure > 200 => 'error'
    if (unit.pressure > 200) {
      unit.status = 'error';
    } else if (unit.temperature > 10) {
      unit.status = 'warning';
    } else {
      unit.status = 'ok';
    }
  }
  return nextUnits; // Return the new array
}