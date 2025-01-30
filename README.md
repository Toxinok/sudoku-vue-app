# Sudoku Game

A fully functional Sudoku game built with Vue.js, TypeScript, and Pinia for state management. The game includes features like difficulty levels, hints, scoring, and a records table. The project is containerized using Docker for easy deployment.

## Technologies Used

### Frontend:
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for better code quality and maintainability.
- **Pinia**: A lightweight state management library for Vue.js.
- **Vitest**: A fast and modern testing framework for Vue.js applications.

### Styling:
- **CSS**: Custom styles for the grid, cells, and controls.
- **Flexbox/Grid**: Used for responsive layout design.

### Containerization:
- **Docker**: Used to containerize the application for easy deployment.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js (v18 or higher) is installed.
- **Docker**: Install Docker for containerization (optional).

### Installation

#### Clone the repository:
```bash
git clone https://github.com/your-username/sudoku-game.git
cd sudoku-game
```

#### Install dependencies:
```bash
npm install
```

#### Start the development server:
```bash
npm run dev
```

#### Open the application in your browser:
```
http://localhost:3000
```

#### Build the Docker image:
```bash
docker-compose build
```

#### Build the Docker image:
```bash
docker-compose up
```

#### Access the application:
```
http://localhost:3000
```

#### Project Structure
```
sudoku-game/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Vue components
│   │   ├── __tests__/       # Component tests
│   │   ├── GameControls.vue # Game controls (difficulty, hints, etc.)
│   │   ├── SudokuGrid.vue   # Sudoku grid component
│   │   ├── SudokuCell.vue   # Individual cell component
│   │   ├── AvailableDigits.vue # Available digits component
│   │   └── RecordsTable.vue # Records table component
│   ├── stores/              # Pinia store for state management
│   │   ├── __tests__/       # Store tests
│   │   └── gameStore.ts     # Game state and logic
│   ├── utils/               # Utility functions
│   │   ├── __tests__/       # Utility tests
│   │   └── sudokuGenerator.ts # Sudoku puzzle generator
│   ├── App.vue              # Main application component
│   └── main.ts              # Application entry point
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

#### Running Tests
The project includes unit tests for all major components and utilities. To run the tests:
```bash
npm test
```
