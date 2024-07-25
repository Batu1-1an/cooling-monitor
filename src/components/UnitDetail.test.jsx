// src/components/UnitDetail.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitDetail from './UnitDetail';
import mockCoolingUnits from '../mockData'; // Use the actual mock data

// Mock recharts components to prevent actual chart rendering in tests
vi.mock('recharts', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});


describe('UnitDetail Component', () => {
  const mockOnBack = vi.fn(); // Mock function for the back handler
  const testUnit = mockCoolingUnits[0]; // Use the first unit for testing details

  beforeEach(() => {
    mockOnBack.mockClear(); // Clear mock calls before each test
  });

  it('renders details correctly for a valid unitId', () => {
    render(<UnitDetail unitId={testUnit.id} units={mockCoolingUnits} onBack={mockOnBack} />);

    // Check title
    expect(screen.getByRole('heading', { name: `Details for: ${testUnit.name}` })).toBeInTheDocument();

    // Check some data points
    expect(screen.getByText(testUnit.id)).toBeInTheDocument();
    expect(screen.getByText(`${testUnit.temperature}°C`)).toBeInTheDocument();
    expect(screen.getByText(`${testUnit.pressure} psi`)).toBeInTheDocument();
    expect(screen.getByText(`${testUnit.fanSpeed} RPM`)).toBeInTheDocument();
    expect(screen.getByText(testUnit.status.toUpperCase())).toBeInTheDocument();

    // Check if the back button is present
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();

    // Check if mocked chart components are rendered
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument(); // Check for at least one chart element
  });

  it('renders error message if unitId is not found', () => {
    render(<UnitDetail unitId="invalid-id" units={mockCoolingUnits} onBack={mockOnBack} />);

    expect(screen.getByText(/selected unit not found/i)).toBeInTheDocument();
    // Check that unit details are NOT rendered
    expect(screen.queryByText(testUnit.id)).not.toBeInTheDocument();
    // Check that the back button is still present in the error view
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });

  it('calls onBack handler when the back button is clicked (valid unit)', async () => {
    const user = userEvent.setup();
    render(<UnitDetail unitId={testUnit.id} units={mockCoolingUnits} onBack={mockOnBack} />);

    const backButton = screen.getByRole('button', { name: /back to dashboard/i });
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

   it('calls onBack handler when the back button is clicked (invalid unit)', async () => {
    const user = userEvent.setup();
    render(<UnitDetail unitId="invalid-id" units={mockCoolingUnits} onBack={mockOnBack} />);

    const backButton = screen.getByRole('button', { name: /back to dashboard/i });
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

});