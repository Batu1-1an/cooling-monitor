// src/components/UnitCard.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UnitCard from './UnitCard';
import PropTypes from 'prop-types'; // Import PropTypes for mocking

// Mock PropTypes validation to avoid errors in tests if needed,
// though usually not necessary if providing valid props.
// vi.mock('prop-types', async (importOriginal) => {
//   const original = await importOriginal();
//   return {
//     ...original,
//     shape: () => original.any, // Mock shape to accept anything
//     oneOf: () => original.any,
//     string: original.any,
//     number: original.any,
//     isRequired: original.any,
//   };
// });


const mockOkUnit = {
  id: 'unit-1',
  name: 'Test Chiller OK',
  status: 'ok',
  temperature: 5.5,
  pressure: 150,
  fanSpeed: 800,
};

const mockWarningUnit = {
  id: 'unit-2',
  name: 'Test Chiller Warning',
  status: 'warning',
  temperature: 12.1,
  pressure: 160,
  fanSpeed: 850,
};

const mockErrorUnit = {
  id: 'unit-3',
  name: 'Test Chiller Error',
  status: 'error',
  temperature: 9.0,
  pressure: 210,
  fanSpeed: 700,
};


describe('UnitCard Component', () => {
  it('renders unit details correctly', () => {
    render(<UnitCard unit={mockOkUnit} />);

    expect(screen.getByText(mockOkUnit.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockOkUnit.temperature}°C`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOkUnit.pressure} psi`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOkUnit.fanSpeed} RPM`)).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument(); // Status text
  });

  it('applies correct styling for "ok" status', () => {
    const { container } = render(<UnitCard unit={mockOkUnit} />);
    const cardDiv = container.firstChild; // The main div
    const statusSpan = screen.getByText('OK');

    expect(cardDiv).toHaveClass('border-green-300'); // Check part of the class from getStatusColor
    expect(statusSpan).toHaveClass('bg-green-100'); // Check part of the class from getStatusColor
  });

  it('applies correct styling for "warning" status', () => {
    const { container } = render(<UnitCard unit={mockWarningUnit} />);
    const cardDiv = container.firstChild;
    const statusSpan = screen.getByText('WARNING');

    expect(cardDiv).toHaveClass('border-yellow-300');
    expect(statusSpan).toHaveClass('bg-yellow-100');
  });

  it('applies correct styling for "error" status', () => {
    const { container } = render(<UnitCard unit={mockErrorUnit} />);
    const cardDiv = container.firstChild;
    const statusSpan = screen.getByText('ERROR');

    expect(cardDiv).toHaveClass('border-red-300');
    expect(statusSpan).toHaveClass('bg-red-100');
  });

   it('does not render if unit prop is missing or null', () => {
    const { container } = render(<UnitCard unit={null} />);
    expect(container.firstChild).toBeNull();
  });
});