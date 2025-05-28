import { render, screen, waitFor } from '@testing-library/react';
import AddPage from '../page';
import { useAccountStore } from '@/store';
import { act } from 'react';

describe('AddPage', () => {
	beforeEach(() => {
		// Reset the store before each test
		act(() => {
			useAccountStore.getState().resetLocalStorage();
			useAccountStore.getState().goToStep(1);
		});
	});

	it('renders StepOne component when step is 1', () => {
		render(<AddPage />);
		// StepOne has specific input fields
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Cognome' })).toBeInTheDocument();
	});

	it('renders StepTwo component when step is 2', async () => {
		// Set step to 2
		act(() => {
			useAccountStore.getState().goToStep(2);
		});

		render(<AddPage />);

		// Wait for the component to update
		await waitFor(() => {
			expect(screen.getByRole('textbox', { name: 'Via' })).toBeInTheDocument();
			expect(screen.getByRole('spinbutton', { name: 'N°' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'CAP' })).toBeInTheDocument();
		});
	});

	it('renders StepOne when step is invalid', async () => {
		// Set step to an invalid value
		act(() => {
			useAccountStore.getState().goToStep(999);
		});

		render(<AddPage />);

		// Wait for the component to update and check for StepOne fields
		await waitFor(() => {
			expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Cognome' })).toBeInTheDocument();
		});
	});

	it('updates rendered component when step changes', async () => {
		render(<AddPage />);

		// Initially should show Step One
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();

		// Change step to 2
		act(() => {
			useAccountStore.getState().goToStep(2);
		});

		// Wait for the component to update and check for StepTwo fields
		await waitFor(() => {
			expect(screen.getByRole('textbox', { name: 'Via' })).toBeInTheDocument();
			expect(screen.getByRole('spinbutton', { name: 'N°' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'CAP' })).toBeInTheDocument();
		});
	});
});
