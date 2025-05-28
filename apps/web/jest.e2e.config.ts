import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	setupFilesAfterEnv: ['<rootDir>/__tests__/e2e/setup.ts'],
	testMatch: ['**/__tests__/e2e/**/*.test.{js,jsx,ts,tsx}'],
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};

export default createJestConfig(config);
