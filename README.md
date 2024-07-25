# Cooling System Monitor UI

A simple frontend interface built with React, Vite, and Tailwind CSS to monitor the status of experimental cooling units using simulated real-time data.

## Features

*   **Dashboard View:** Displays an overview of all cooling units, including summary metrics (total units, warnings, errors) and a grid of unit status cards.
*   **Unit Detail View:** Shows detailed information for a selected unit, including all its parameters and a historical temperature chart.
*   **Real-Time Simulation:** Mock data is updated every 3 seconds to simulate changing conditions (temperature, pressure, fan speed, status).
*   **Alerts:** A prominent alert banner appears on the dashboard if any units enter an 'error' state.
*   **Basic Routing:** Simple client-side navigation between the dashboard and unit detail views.
*   **Styling:** Uses Tailwind CSS 4 for utility-first styling.
*   **Charting:** Uses Recharts for displaying historical data trends.
*   **Testing:** Includes unit and integration tests using Vitest and React Testing Library.

## Technologies Used

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS 4
*   **Charting:** Recharts
*   **Language:** JavaScript
*   **Testing:** Vitest, React Testing Library
*   **Utilities:** uuid (for mock data IDs), PropTypes (for component prop validation)

## Prerequisites

*   Node.js (v18 or later recommended)
*   npm (v10 or later recommended) or yarn

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Batu1-1an/cooling-monitor.git
    cd cooling-monitor-ui
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

## Running the Development Server

To start the application in development mode with hot module replacement:

```bash
npm run dev
```

This will typically start the server on `http://localhost:5173`. Open this URL in your browser.

## Running Tests

To run the automated tests:

```bash
npm run test
```

## Project Structure

```
cooling-monitor-ui/
├── public/              # Static assets
├── src/
│   ├── assets/          # Image assets (e.g., logos)
│   ├── components/      # React components (Dashboard, UnitCard, UnitDetail, etc.)
│   ├── utils/           # Utility functions (e.g., simulateDataUpdate)
│   ├── App.jsx          # Main application component (layout, routing, state)
│   ├── index.css        # Main CSS file (includes Tailwind directives)
│   ├── main.jsx         # Application entry point
│   ├── mockData.js      # Mock data generation and structure
│   └── setupTests.js    # Test setup file (e.g., for jest-dom)
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies and scripts
├── PLAN.md              # Project development plan
├── postcss.config.js    # PostCSS configuration (for Tailwind)
├── README.md            # This file
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration (includes Vitest config)
```

## Future Enhancements (TODO)

*   Connect to a real backend API instead of using mock data.
*   Implement user authentication.
*   Add more sophisticated charts (e.g., pressure history, multi-line charts).
*   Improve sidebar navigation (make it functional).
*   Enhance responsiveness for various screen sizes (e.g., collapsible sidebar).
*   Add more comprehensive error handling and user feedback.
*   Implement loading states for asynchronous operations.
