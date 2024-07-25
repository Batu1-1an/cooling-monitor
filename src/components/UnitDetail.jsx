import React, { useMemo } from 'react'; // Import useMemo
import PropTypes from 'prop-types';
import { generateMockHistory } from '../mockData'; // Import history generator
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'; // Import recharts components
// Helper function to get status color classes (copied from UnitCard)
const getStatusColor = (status) => {
  switch (status) {
    case 'ok':
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700';
    case 'warning':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700';
    case 'error':
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700';
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600';
  }
};

/**
 * Displays detailed information and historical data for a single selected cooling unit.
 *
 * @param {object} props - Component props.
 * @param {string} props.unitId - The ID of the unit to display details for.
 * @param {Array<object>} props.units - The full list of unit objects (to find the selected one).
 * @param {function} props.onBack - Callback function to navigate back to the dashboard.
 */
function UnitDetail({ unitId, units = [], onBack }) {
  // Find the selected unit from the units array
  const selectedUnit = units.find(unit => unit.id === unitId);

  if (!selectedUnit) {
    return (
      <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Error</h2>
        <p className="text-gray-600 dark:text-gray-300">Selected unit not found.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusColorClasses = getStatusColor(selectedUnit.status);

  // Generate mock historical data for temperature (memoized)
  const temperatureHistory = useMemo(() => {
    return generateMockHistory(selectedUnit.temperature, 30, 1.5); // 30 points, +/- 1.5 variation
  }, [selectedUnit.temperature]); // Regenerate only if base temperature changes (unlikely with current sim)

  /**
   * Formats a timestamp for display on the chart's X-axis.
   * @param {number} timestamp - The timestamp value (milliseconds since epoch).
   * @returns {string} Formatted time string (e.g., "15:30").
   */
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 rounded text-sm transition duration-200"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Details for: {selectedUnit.name}
      </h1>
      {/* Detailed Data Display */}
      <div className={`mt-4 border-t pt-4 border-gray-200 dark:border-gray-600 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm`}>
        <div>
          <p className="text-gray-500 dark:text-gray-400">ID:</p>
          <p className="font-mono text-gray-800 dark:text-gray-200">{selectedUnit.id}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Status:</p>
          <p>
            <span className={`font-medium px-2 py-0.5 rounded text-xs ${statusColorClasses}`}>
              {selectedUnit.status.toUpperCase()}
            </span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Temperature:</p>
          <p className="font-medium text-lg text-gray-800 dark:text-gray-200">{selectedUnit.temperature}°C</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Pressure:</p>
          <p className="font-medium text-lg text-gray-800 dark:text-gray-200">{selectedUnit.pressure} psi</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Fan Speed:</p>
          <p className="font-medium text-lg text-gray-800 dark:text-gray-200">{selectedUnit.fanSpeed} RPM</p>
        </div>
        {/* Add more fields if they exist */}
      </div>
       {/* Chart Section */}
       <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-600">
         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Temperature History (Last 30 mins)</h2>
         <div className="h-64 w-full"> {/* Set height for the container */}
           <ResponsiveContainer width="100%" height="100%">
             <LineChart
               data={temperatureHistory}
               margin={{ top: 5, right: 20, left: -10, bottom: 5 }} // Adjust margins
             >
               <CartesianGrid strokeDasharray="3 3" stroke="#ccc dark:#666" />
               <XAxis
                 dataKey="timestamp"
                 tickFormatter={formatXAxis}
                 stroke="#666 dark:#aaa"
                 tick={{ fontSize: 10 }}
               />
               <YAxis
                 stroke="#666 dark:#aaa"
                 tick={{ fontSize: 10 }}
                 domain={['dataMin - 1', 'dataMax + 1']} // Add slight padding to Y-axis
                 label={{ value: '°C', angle: -90, position: 'insideLeft', offset: 0, style: { textAnchor: 'middle', fontSize: 12, fill: '#666 dark:#aaa' } }}
               />
               <Tooltip
                 contentStyle={{ backgroundColor: '#fff dark:#333', border: '1px solid #ccc dark:#555' }}
                 labelFormatter={formatXAxis} // Format tooltip label time
               />
               <Legend />
               <Line
                 type="monotone"
                 dataKey="value"
                 stroke="#8884d8" // Line color
                 strokeWidth={2}
                 dot={false} // Hide dots on the line
                 name="Temperature" // Name for Legend/Tooltip
               />
             </LineChart>
           </ResponsiveContainer>
         </div>
       </div>
    </div>
  );
}

UnitDetail.propTypes = {
  unitId: PropTypes.string.isRequired,
  units: PropTypes.arrayOf(
    // Update shape to include all fields needed for display
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['ok', 'warning', 'error']).isRequired,
      temperature: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      fanSpeed: PropTypes.number.isRequired,
    })
  ).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UnitDetail;