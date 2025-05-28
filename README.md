# Scalapay Test - Monorepo

> Frontend part of the Scalapay exercise

A monorepo containing a Next.js frontend application and integration with a NestJS API for account creation functionality.

## 📋 Overview

This project consists of two main applications:

- **Frontend (Next.js)**: Runs on `localhost:3000` with a form interface at `localhost:3000/form`
- **Backend (NestJS API)**: Runs on `localhost:4000` with account creation endpoint at `localhost:4000/submit`

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or higher recommended)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
npm install
```

### Running the Applications

#### Development Mode

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

The frontend will be available at:

- Main app: http://localhost:3000
- Form page: http://localhost:3000/form

> **Note**: Make sure your NestJS API is running on `localhost:4000` for the form submission to work properly.

#### Production Mode

Build and start the production server:

```bash
npm run build
npm start
```

## 🧪 Testing

### Unit Tests

Run all unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

Watch mode with coverage:

```bash
npm run test:coverage:watch
```

### End-to-End Tests

Run E2E tests:

```bash
npm run test:e2e
```

Run E2E tests in watch mode:

```bash
npm run test:e2e:watch
```

Run E2E tests with development server:

```bash
npm run test:e2e:dev
```

Run E2E tests with production build:

```bash
npm run test:e2e:serve
```

### Run All Tests

Execute both unit and E2E tests:

```bash
npm run test:all
```

## 📚 Storybook

### Development

Start Storybook development server:

```bash
npm run storybook
```

Storybook will be available at http://localhost:6006

### Build

Build Storybook for production:

```bash
npm run build-storybook
```

### Health Check

Run Storybook diagnostics:

```bash
npm run storybook:doctor
```

## 🔧 Development Tools

### Code Formatting

Check code formatting:

```bash
npm run format:check
```

Format code:

```bash
npm run format
```

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### Linting

Run ESLint:

```bash
npm run lint
```

## 🏗️ Project Structure

```
├── src/                    # Source code
├── public/                 # Static assets
├── __tests__/             # Test files
│   └── e2e/               # End-to-end tests
├── .storybook/            # Storybook configuration
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.3.2** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Zod** - Schema validation
- **React Hot Toast** - Toast notifications

### Development & Testing

- **Jest** - Testing framework
- **Testing Library** - React testing utilities
- **Puppeteer** - E2E testing
- **Storybook** - Component development
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📡 API Integration

The frontend communicates with a NestJS API running on `localhost:4000`. The main integration point is:

- **POST** `localhost:4000/submit` - Account creation endpoint

Make sure the NestJS API server is running before testing form submissions.

## 🚨 Common Issues

### Port Conflicts

If you encounter port conflicts:

- Frontend uses port 3000
- API should be on port 4000
- Storybook uses port 6006

### API Connection

Ensure the NestJS API is running and accessible at `localhost:4000` before submitting forms.

### Build Issues

If you encounter build issues, try:

```bash
npm run type-check
npm run lint
```

## 📝 Scripts Reference

| Script       | Description                             |
| ------------ | --------------------------------------- |
| `dev`        | Start development server with Turbopack |
| `build`      | Build for production                    |
| `start`      | Start production server                 |
| `test`       | Run unit tests                          |
| `test:e2e`   | Run end-to-end tests                    |
| `storybook`  | Start Storybook development server      |
| `lint`       | Run ESLint                              |
| `format`     | Format code with Prettier               |
| `type-check` | Run TypeScript type checking            |

## 👤 Author

**Simone Taeggi**

## 📄 License

UNLICENSED - Private project
