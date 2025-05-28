import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node', // Important: node environment for Puppeteer
	setupFilesAfterEnv: ['<rootDir>/__tests__/e2e/setup.ts'],
	testMatch: ['**/__tests__/e2e/**/*.test.{ts,tsx}'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testTimeout: 30000,
	verbose: true,
	collectCoverage: false, // Usually disabled for E2E tests
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	testPathIgnorePatterns: ['/node_modules/'],
};

export default config;
