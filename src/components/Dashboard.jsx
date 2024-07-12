import React from 'react';
// No longer need to import mockData directly here
import PropTypes from 'prop-types'; // Import PropTypes
import UnitCard from './UnitCard'; // Import the UnitCard component

/**
 * Displays the main dashboard view, including summary metrics, alerts,
 * and a grid of cooling units.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.units - Array of cooling unit objects to display.
 * @param {function} props.onUnitSelect - Callback function to handle selecting a unit.
 */
function Dashboard({ units = [], onUnitSelect }) {
  // Calculate summary metrics from props
  const totalUnits = units.length;
  const warningCount = units.filter(unit => unit.status === 'warning').length;
  const errorCount = units.filter(unit => unit.status === 'error').length;
  const errorUnits = units.filter(unit => unit.status === 'error'); // Get the actual error units

  return (
    <div className="space-y-6">
      {/* Dashboard Header with date */}
      <header className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          Cooling System Dashboard
        </h1>
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* Alert Section */}
      {errorCount > 0 && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Critical Alerts</h3>
              <p className="text-red-700">
                The following units require immediate attention: {errorUnits.map(u => u.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Metrics Section - Status Cards */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Units Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total Units</h4>
                <p className="text-3xl font-bold text-gray-800">{totalUnits}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Warnings Card */}
          <div className={`bg-white p-5 rounded-lg shadow-sm border ${warningCount > 0 ? 'border-yellow-400' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Warnings</h4>
                <p className={`text-3xl font-bold ${warningCount > 0 ? 'text-yellow-600' : 'text-gray-800'}`}>{warningCount}</p>
              </div>
              <div className={`${warningCount > 0 ? 'bg-yellow-100' : 'bg-gray-100'} p-3 rounded-full`}>
                <svg className={`w-7 h-7 ${warningCount > 0 ? 'text-yellow-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Errors Card */}
          <div className={`bg-white p-5 rounded-lg shadow-sm border ${errorCount > 0 ? 'border-red-500' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Errors</h4>
                <p className={`text-3xl font-bold ${errorCount > 0 ? 'text-red-600' : 'text-gray-800'}`}>{errorCount}</p>
              </div>
              <div className={`${errorCount > 0 ? 'bg-red-100' : 'bg-gray-100'} p-3 rounded-full`}>
                <svg className={`w-7 h-7 ${errorCount > 0 ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooling Units Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Cooling Units</h2>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <button className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </button>
          </div>
        </div>
        
        {/* Grid of cooling units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.length > 0 ? (
            units.map(unit => (
              <UnitCard
                key={unit.id}
                unit={unit}
                onSelect={onUnitSelect} // Pass handler down
              />
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg p-8 text-center border border-gray-200">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-600 text-lg">No cooling units data available.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Add Unit
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Add PropTypes for the units prop
Dashboard.propTypes = {
  units: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['ok', 'warning', 'error']).isRequired,
      temperature: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      fanSpeed: PropTypes.number.isRequired,
    })
  ),
  onUnitSelect: PropTypes.func.isRequired, // Add prop type for the handler
};

export default Dashboard;