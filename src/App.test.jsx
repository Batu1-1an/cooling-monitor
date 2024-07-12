// src/App.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'; // Import timer utils
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import App from './App';
import initialUnits from './mockData'; // Import initial units for testing selection

// Mock the child components to isolate the App component test
vi.mock('./components/Sidebar', () => ({
  default: () => <aside>Sidebar Mock</aside>,
}));
// Now mock Dashboard instead of MainContentPlaceholder
// Modify Dashboard mock to capture props and allow triggering onUnitSelect
let receivedUnits = null;
let capturedOnUnitSelect = null;
vi.mock('./components/Dashboard', () => ({
  default: ({ units, onUnitSelect }) => {
    receivedUnits = units;
    capturedOnUnitSelect = onUnitSelect; // Capture the handler
    return (
      <div data-testid="dashboard-mock">
        Dashboard Mock - Units: {units ? units.length : 0}
        {units && units[0] && <span data-testid="unit-0-temp">{units[0].temperature}</span>}
        {/* Add a button to trigger selection for testing */}
        {units && units[0] && (
          <button onClick={() => onUnitSelect(units[0].id)}>Select Unit 0</button>
        )}
      </div>
    );
  },
}));

// Add mock for UnitDetail to capture props and allow triggering onBack
let receivedUnitId = null;
let capturedOnBack = null;
vi.mock('./components/UnitDetail', () => ({
  default: ({ unitId, onBack }) => {
    receivedUnitId = unitId;
    capturedOnBack = onBack; // Capture the handler
    return (
      <div data-testid="unit-detail-mock">
        Unit Detail Mock - ID: {unitId}
        {/* Add a button to trigger back for testing */}
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  },
}));


describe('App Component', () => {
  // Reset shared mocks before each test
  beforeEach(() => {
    receivedUnits = null;
    capturedOnUnitSelect = null;
    receivedUnitId = null;
    capturedOnBack = null;
  });

  // Restore any potentially spied mocks after each test
   afterEach(() => {
     vi.restoreAllMocks();
   });

  it('renders the main layout structure with sidebar and dashboard', () => {
    render(<App />);
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-mock')).toBeInTheDocument();
    // Check initial render text from the modified mock
    expect(screen.getByText(/Dashboard Mock - Units:/)).toBeInTheDocument();
  });
// Group tests requiring fake timers
describe('Timer-Dependent Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers(); // Clear any remaining timers
    vi.useRealTimers();
  });

  it('updates units state periodically via useEffect interval', async () => {
    render(<App />);

    // Capture initial state rendered by the mock
    const initialUnitsState = JSON.parse(JSON.stringify(receivedUnits)); // Deep copy
    expect(initialUnitsState).not.toBeNull();

    // Act wrapper is needed for state updates triggered by timers
    await act(async () => {
      vi.advanceTimersByTime(3000); // Advance time by the interval duration (3 seconds)
    });

    // Capture state after timer advancement
    const updatedUnitsState = JSON.parse(JSON.stringify(receivedUnits));

    // Verify that the state object passed to Dashboard has changed
    expect(JSON.stringify(updatedUnitsState)).not.toEqual(JSON.stringify(initialUnitsState));

     // Advance time again to ensure interval continues
     const secondUpdateUnitsStateBefore = JSON.parse(JSON.stringify(receivedUnits));
     await act(async () => {
       vi.advanceTimersByTime(3000);
     });
     const secondUpdateUnitsStateAfter = JSON.parse(JSON.stringify(receivedUnits));
     expect(JSON.stringify(secondUpdateUnitsStateAfter)).not.toEqual(JSON.stringify(secondUpdateUnitsStateBefore));
  });

   it('clears the interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<App />);

    // Optional: Advance time slightly to ensure interval is set if needed for verification
    // await act(async () => { vi.advanceTimersByTime(100); });

    unmount(); // Unmount the component

    // Verify that clearInterval was called
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    // No need to restore spy here, afterEach handles vi.restoreAllMocks()
  });
});

  // Group routing tests and isolate simulateDataUpdate mock
  // Group routing tests (these don't need fake timers)
  describe('Routing Tests', () => {
    // No specific beforeEach/afterEach needed here now

    it('switches view to UnitDetail on unit select and back to Dashboard on back click', async () => {
      const user = userEvent.setup({ delay: null }); // Remove advanceTimers option
      render(<App />);

      // 1. Initial state: Dashboard should be visible
      expect(screen.getByTestId('dashboard-mock')).toBeInTheDocument();
      expect(screen.queryByTestId('unit-detail-mock')).not.toBeInTheDocument();
      expect(capturedOnUnitSelect).not.toBeNull(); // Check handler was passed

      // 2. Simulate clicking the "Select Unit 0" button in the mocked Dashboard
      const selectButton = screen.getByRole('button', { name: /select unit 0/i });
      await act(async () => {
        await user.click(selectButton);
      });


      // 3. After click: UnitDetail should be visible, Dashboard hidden
      expect(screen.queryByTestId('dashboard-mock')).not.toBeInTheDocument();
      expect(screen.getByTestId('unit-detail-mock')).toBeInTheDocument();
      expect(receivedUnitId).toBe(initialUnits[0].id); // Check correct ID was passed
      expect(capturedOnBack).not.toBeNull(); // Check back handler was passed

      // 4. Simulate clicking the "Go Back" button in the mocked UnitDetail
      const backButton = screen.getByRole('button', { name: /go back/i });
       await act(async () => {
         await user.click(backButton);
       });


      // 5. After back click: Dashboard should be visible again, UnitDetail hidden
      expect(screen.getByTestId('dashboard-mock')).toBeInTheDocument();
      expect(screen.queryByTestId('unit-detail-mock')).not.toBeInTheDocument();
    }); // Remove increased timeout
  });

});