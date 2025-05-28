import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}', '**/?(*.)+(spec|test).{js,jsx,ts,tsx}'],
	// Exclude E2E tests from unit test runs
	testPathIgnorePatterns: ['/node_modules/', '/__tests__/e2e/'],
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/*.stories.{js,jsx,ts,tsx}',
		'!src/**/*.test.{js,jsx,ts,tsx}',
		'!src/**/index.{js,jsx,ts,tsx}',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'json'],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
