import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountLayout from '../layout';

// Mock setTimeout to control timing
jest.useFakeTimers();

describe('AccountLayout', () => {
	it('renders children after component mounts', async () => {
		render(
			<AccountLayout>
				<div data-testid="child-content">Test Content</div>
			</AccountLayout>,
		);

		// Advance timers to trigger useEffect
		await act(async () => {
			jest.advanceTimersByTime(0);
		});

		// Wait for the component to update after useEffect runs
		await waitFor(() => {
			expect(screen.getByTestId('child-content')).toBeInTheDocument();
		});

		// Spinner should be gone
		const spinner = document.querySelector('.animate-spin');
		expect(spinner).not.toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('renders multiple children correctly after mounting', async () => {
		render(
			<AccountLayout>
				<div data-testid="child-1">First Child</div>
				<div data-testid="child-2">Second Child</div>
				<span data-testid="child-3">Third Child</span>
			</AccountLayout>,
		);

		// Advance timers to trigger useEffect
		await act(async () => {
			jest.advanceTimersByTime(0);
		});

		// Wait for children to appear after mount
		await waitFor(() => {
			expect(screen.getByTestId('child-1')).toBeInTheDocument();
		});

		expect(screen.getByTestId('child-2')).toBeInTheDocument();
		expect(screen.getByTestId('child-3')).toBeInTheDocument();
		expect(screen.getByText('First Child')).toBeInTheDocument();
		expect(screen.getByText('Second Child')).toBeInTheDocument();
		expect(screen.getByText('Third Child')).toBeInTheDocument();
	});

	it('maintains component state through re-renders', async () => {
		const { rerender } = render(
			<AccountLayout>
				<div data-testid="initial-content">Initial Content</div>
			</AccountLayout>,
		);

		// Advance timers to trigger useEffect
		await act(async () => {
			jest.advanceTimersByTime(0);
		});

		// Wait for initial mount
		await waitFor(() => {
			expect(screen.getByTestId('initial-content')).toBeInTheDocument();
		});

		// Re-render with different children
		rerender(
			<AccountLayout>
				<div data-testid="updated-content">Updated Content</div>
			</AccountLayout>,
		);

		// Should not show spinner again (component stays mounted)
		const spinner = document.querySelector('.animate-spin');
		expect(spinner).not.toBeInTheDocument();
		expect(screen.getByTestId('updated-content')).toBeInTheDocument();
		expect(screen.queryByTestId('initial-content')).not.toBeInTheDocument();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});
});
