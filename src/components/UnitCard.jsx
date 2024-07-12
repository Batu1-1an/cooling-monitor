import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

/**
 * Helper function to determine style classes based on unit status.
 * @param {'ok' | 'warning' | 'error'} status - The status of the unit.
 * @returns {object} Tailwind classes for various elements
 */
const getStatusStyles = (status) => {
  switch (status) {
    case 'ok':
      return {
        indicator: 'bg-green-500',
        text: 'text-green-800',
        border: 'border-green-200',
        bg: 'bg-green-50',
        icon: 'text-green-600'
      };
    case 'warning':
      return {
        indicator: 'bg-yellow-500',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600'
      };
    case 'error':
      return {
        indicator: 'bg-red-500',
        text: 'text-red-800',
        border: 'border-red-200',
        bg: 'bg-red-50',
        icon: 'text-red-600'
      };
    default:
      return {
        indicator: 'bg-gray-500',
        text: 'text-gray-800',
        border: 'border-gray-200',
        bg: 'bg-white',
        icon: 'text-gray-600'
      };
  }
};

/**
 * Displays a summary card for a single cooling unit.
 * Allows clicking the card to select the unit for details.
 *
 * @param {object} props - Component props.
 * @param {object} props.unit - The cooling unit object data.
 * @param {function} props.onSelect - Callback function invoked when the card is clicked, passing the unit ID.
 */
function UnitCard({ unit, onSelect }) {
  if (!unit) {
    return null; // Don't render if no unit data is provided
  }

  const styles = getStatusStyles(unit.status);
  
  // Calculate appropriate status label text
  const getStatusLabel = (status) => {
    switch (status) {
      case 'ok': return 'Operational';
      case 'warning': return 'Warning';
      case 'error': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer`}
      onClick={() => onSelect(unit.id)}
    >
      <div className={`px-5 py-4 border-b ${styles.border}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{unit.name}</h3>
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${styles.indicator} mr-2`}></span>
            <span className={`text-sm font-medium ${styles.text}`}>
              {getStatusLabel(unit.status)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className={`${styles.bg} rounded-lg p-3`}>
            <div className="flex items-center">
              <div className={`${styles.icon} mr-3`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Temperature</div>
                <div className="text-base font-semibold text-gray-800">{unit.temperature}°C</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="text-indigo-600 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Pressure</div>
                <div className="text-base font-semibold text-gray-800">{unit.pressure} psi</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 col-span-2">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Fan Speed</div>
                <div className="text-base font-semibold text-gray-800">{unit.fanSpeed} RPM</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Define prop types for validation and clarity
UnitCard.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['ok', 'warning', 'error']).isRequired,
    temperature: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    fanSpeed: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired, // Add prop type for the handler
};

export default UnitCard;