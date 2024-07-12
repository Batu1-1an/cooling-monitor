// src/components/Dashboard.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react'; // Import within
import Dashboard from './Dashboard';
import mockCoolingUnits from '../mockData'; // Import the actual mock data

// Mock the UnitCard component for this test
// We only care that Dashboard tries to render the correct number of them
vi.mock('./UnitCard', () => ({
  // Provide a simple functional component mock
  default: ({ unit }) => <div data-testid={`unit-card-${unit.id}`}>{unit.name} Mock Card</div>,
}));

describe('Dashboard Component', () => {
  it('renders the dashboard title', () => {
    render(<Dashboard units={mockCoolingUnits} />);
    expect(screen.getByRole('heading', { name: /system dashboard/i })).toBeInTheDocument();
  });

  it('renders correct summary metrics based on mockData', () => {
    render(<Dashboard units={mockCoolingUnits} />);

    // Calculate expected values from the imported mock data
    const expectedTotal = mockCoolingUnits.length;
    const expectedWarnings = mockCoolingUnits.filter(u => u.status === 'warning').length;
    const expectedErrors = mockCoolingUnits.filter(u => u.status === 'error').length;

    // Check if the text content matches (using regex for flexibility)
    expect(screen.getByText(`Total Units: ${expectedTotal}`)).toBeInTheDocument();
    expect(screen.getByText(`Warnings: ${expectedWarnings}`)).toBeInTheDocument();
    expect(screen.getByText(`Errors: ${expectedErrors}`)).toBeInTheDocument();
  });

   it('applies highlight class to warning count if > 0', () => {
    // Assuming mockData has warnings based on previous setup
    render(<Dashboard units={mockCoolingUnits} />);
    const warningCountElement = screen.getByText(/Warnings:/);
    // Check for one of the specific classes applied conditionally
    expect(warningCountElement).toHaveClass('text-yellow-600');
  });

   it('applies highlight class to error count if > 0', () => {
    // Assuming mockData has errors based on previous setup
    render(<Dashboard units={mockCoolingUnits} />);
    const errorCountElement = screen.getByText(/Errors:/);
     // Check for one of the specific classes applied conditionally
    expect(errorCountElement).toHaveClass('text-red-600');
  });

  it('renders the correct number of UnitCard mocks', () => {
    render(<Dashboard units={mockCoolingUnits} />);

    // Find all elements that match our mocked UnitCard structure/content
    // Using the data-testid we added in the mock
    const unitCards = screen.getAllByTestId(/unit-card-/);
    expect(unitCards).toHaveLength(mockCoolingUnits.length);

    // Optionally, check if a specific unit name is present in one of the mocks
    expect(screen.getByText(`${mockCoolingUnits[0].name} Mock Card`)).toBeInTheDocument();
  });
  it('displays an alert section if there are units with "error" status', () => {
    // Ensure mockCoolingUnits has at least one error unit (based on initial setup)
    const errorUnits = mockCoolingUnits.filter(u => u.status === 'error');
    expect(errorUnits.length).toBeGreaterThan(0); // Pre-condition check

    render(<Dashboard units={mockCoolingUnits} onUnitSelect={() => {}} />); // Pass dummy onUnitSelect

    const alertHeading = screen.getByRole('heading', { name: /alerts!/i });
    expect(alertHeading).toBeInTheDocument();

    // Find the alert container (e.g., the parent div of the heading)
    const alertContainer = alertHeading.parentElement;
    expect(alertContainer).toBeInTheDocument();

    // Check if the names of the error units are mentioned *within* the alert container
    errorUnits.forEach(unit => {
      expect(within(alertContainer).getByText(new RegExp(unit.name))).toBeInTheDocument();
    });
  });

  it('does not display an alert section if there are no units with "error" status', () => {
    // Create data with no errors
    const noErrorUnits = mockCoolingUnits.map(unit => ({
      ...unit,
      status: unit.status === 'error' ? 'ok' : unit.status, // Change errors to ok
    }));

    render(<Dashboard units={noErrorUnits} onUnitSelect={() => {}} />); // Pass dummy onUnitSelect

    const alertHeading = screen.queryByRole('heading', { name: /alerts!/i });
    expect(alertHeading).not.toBeInTheDocument();
  });
});