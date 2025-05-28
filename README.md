# Scalapay Test - Monorepo

> A monorepo for the Scalapay test where the backend is built in NestJS and the frontend in NextJS

This monorepo contains two applications working together to provide account creation functionality with a clean separation between frontend and backend services.

## 📋 Overview

### Applications

- **API (NestJS)**: Backend service running on `localhost:4000`
  - Location: `apps/api/`
  - Provides REST API endpoints including `POST /submit` for account creation
- **Web (Next.js)**: Frontend application running on `localhost:3000`
  - Location: `apps/web/`
  - Contains form interface at `/form` for account creation
  - Communicates with the API service

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scalapay-test
```

2. Install dependencies for all workspaces:

```bash
npm install
```

This will install dependencies for both the API and Web applications using npm workspaces.

### Running the Applications

#### Development Mode (Both Apps)

Start both API and Web applications simultaneously:

```bash
npm run dev
```

This command runs both services concurrently:

- API server: http://localhost:4000
- Web application: http://localhost:3000
- Form interface: http://localhost:3000/form

#### Individual Applications

Start only the API server:

```bash
npm run dev:api
```

Start only the Web application:

```bash
npm run dev:web
```

### Production Mode

Build both applications:

```bash
npm run build
```

Start both applications in production mode:

```bash
npm run start
```

#### Individual Production Commands

Build and start API only:

```bash
npm run build:api
npm run start:api:prod
```

Build and start Web only:

```bash
npm run build:web
npm run start:web
```

#### API Development Modes

The NestJS API supports different startup modes:

- **Development with watch mode:**

  ```bash
  npm run start:api:dev
  ```

- **Debug mode:**

  ```bash
  npm run start:api:debug
  ```

- **Production mode:**
  ```bash
  npm run start:api:prod
  ```

## 🧪 Testing

### All Tests

Run tests for both applications:

```bash
npm test
```

### API Testing

Run API unit tests:

```bash
npm run test:api
```

Run API tests in watch mode:

```bash
npm run test:api:watch
```

Run API tests with coverage:

```bash
npm run test:api:cov
```

Run API end-to-end tests:

```bash
npm run test:api:e2e
```

### Web Testing

Run Web application tests:

```bash
npm run test:web
```

For more Web testing options (watch mode, coverage, E2E), navigate to the web directory:

```bash
cd apps/web
npm run test:watch
npm run test:coverage
npm run test:e2e
```

## 🔧 Code Quality & Development Tools

### Formatting

Format code in both applications:

```bash
npm run format
```

Check formatting without making changes:

```bash
npm run format:check
```

Format individual applications:

```bash
npm run format:api
npm run format:web
```

### Linting

Lint both applications:

```bash
npm run lint
```

Lint individual applications:

```bash
npm run lint:api
npm run lint:web
```

Check API linting:

```bash
npm run lint:api:check
```

### Type Checking

Run TypeScript type checking for Web application:

```bash
npm run type-check:web
```

## 📚 Storybook (Web App)

The Web application includes Storybook for component development:

```bash
cd apps/web
npm run storybook
```

Storybook will be available at http://localhost:6006

## 📚 Swagger (API)

When you run the API part you have access to the Swagger code available for example at http://localhost:4000/api#/submit/AccountController_create

Also if you want to test the APIs you can use Postman and also use this VSCode extension VSCode Rest Client[https://marketplace.visualstudio.com/items?itemName=humao.rest-client] and use the file apps/api/rest-client.http to launch the APIs

## 🏗️ Project Structure

```
scalapay-test/
├── apps/
│   ├── api/                    # NestJS Backend Application
│   │   ├── src/
│   │   ├── test/
│   │   ├── package.json
│   │   └── ...
│   └── web/                    # Next.js Frontend Application
│       ├── src/
│       ├── public/
│       ├── __tests__/
│       ├── .storybook/
│       ├── package.json
│       └── ...
├── package.json                # Root package.json with workspace config
└── README.md                   # This file
```

## 🛠️ Technology Stack

### Backend (NestJS API)

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **Jest** - Testing framework

### Frontend (Next.js Web)

- **Next.js 15.3.2** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Zod** - Schema validation
- **Storybook** - Component development

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 📡 API Endpoints

The NestJS API provides the following endpoints:

- **POST** `/submit` - Create new account
  - Used by the Web form for account creation
- **GET** `/submit` - Get all the accounts
  - Used to check the created accounts
- **DELETE** `/submit/:id` - Delete a specific account
  - Used to delete the created accounts

## 🚨 Troubleshooting

### Port Conflicts

Default ports used:

- API: `localhost:4000`
- Web: `localhost:3000`
- Storybook: `localhost:6006`

### Workspace Issues

If you encounter workspace-related issues:

```bash
# Clean install
rm -rf node_modules apps/*/node_modules
npm install
```

### Build Issues

Check for type errors and linting issues:

```bash
npm run lint
npm run type-check:web
```

### API Connection Issues

Ensure the API is running before testing form submissions:

```bash
npm run dev:api
# Then in another terminal
npm run dev:web
```

## 📝 Available Scripts

### Root Level Scripts

| Script           | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Start both API and Web in development mode |
| `npm run build`  | Build both applications for production     |
| `npm run start`  | Start both applications in production mode |
| `npm test`       | Run tests for both applications            |
| `npm run lint`   | Lint both applications                     |
| `npm run format` | Format code in both applications           |

### Individual App Scripts

| Script                    | Description                   |
| ------------------------- | ----------------------------- |
| `npm run dev:api`         | Start API in development mode |
| `npm run dev:web`         | Start Web application         |
| `npm run start:api:dev`   | Start API with watch mode     |
| `npm run start:api:debug` | Start API in debug mode       |
| `npm run start:api:prod`  | Start API in production mode  |
| `npm run test:api:*`      | Various API testing commands  |

## 🤝 Development Workflow

1. **Setup**: `npm install` (installs all workspace dependencies)
2. **Development**: `npm run dev` (starts both services)
3. **Testing**: `npm test` (runs all tests)
4. **Code Quality**: `npm run lint && npm run format:check`
5. **Build**: `npm run build` (builds both apps)
6. **Production**: `npm run start` (starts both in production mode)

## 👤 Author

**Simone Taeggi**

## 📄 License

ISC License
