import React, { useState, useEffect } from 'react'; // Import hooks
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UnitDetail from './components/UnitDetail'; // Import placeholder for UnitDetail
import initialUnits from './mockData';
import { simulateDataUpdate } from './utils/simulateDataUpdate'; // Import the utility function
// We no longer need App.css as Tailwind handles styling
// import './App.css'

/**
 * Main application component.
 * Manages the overall state including the list of cooling units,
 * the currently selected unit for detail view, and simulates data updates.
 */
function App() {
  /** @state {Array<object>} units - The list of cooling unit objects */
  const [units, setUnits] = useState(initialUnits);
  /** @state {string|null} selectedUnitId - The ID of the unit currently selected for detail view, or null */
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  /**
   * Handles selecting a unit to view its details.
   * @param {string} unitId - The ID of the unit to select.
   */
  const handleUnitSelect = (unitId) => {
    setSelectedUnitId(unitId);
  };

  /**
   * Handles returning to the main dashboard view from the detail view.
   */
  const handleBackToDashboard = () => {
    setSelectedUnitId(null);
  };

  // Effect to simulate real-time data updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Pass the utility function directly to setUnits
      // It will receive the previous state automatically
      setUnits(simulateDataUpdate);
    }, 3000); // Update every 3 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main content with proper container and scrolling */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Conditionally render Dashboard or UnitDetail */}
            {selectedUnitId ? (
              <UnitDetail
                unitId={selectedUnitId}
                units={units} // Pass all units data
                onBack={handleBackToDashboard} // Pass the back handler
              />
            ) : (
              <Dashboard
                units={units}
                onUnitSelect={handleUnitSelect} // Pass the select handler
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
