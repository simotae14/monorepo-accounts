import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepOneForm from './StepOneForm';
import { useAccountStore } from '@/store';
import { stepOneFormAction } from './actions';

// Mock the server action
jest.mock('./actions', () => ({
	stepOneFormAction: jest.fn(),
}));

// Mock the store
jest.mock('@/store', () => ({
	useAccountStore: jest.fn(),
}));

describe('StepOneForm', () => {
	const mockNextStep = jest.fn();
	const mockUpdateNewAccountDetails = jest.fn();

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Setup store mock with proper typing
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			nextStep: mockNextStep,
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				email: '',
				firstName: '',
				lastName: '',
				dateOfBirth: '',
				fiscalCode: '',
			},
		});
	});

	it('renders all form fields correctly', () => {
		render(<StepOneForm />);

		// Check if all form fields are present using role-based queries
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Cognome' })).toBeInTheDocument();
		expect(screen.getByLabelText('Data di nascita (DD/MM/YYYY)')).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Codice Fiscale' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Continua' })).toBeInTheDocument();
	});

	it('handles form submission with valid data', async () => {
		// Mock successful form submission
		(stepOneFormAction as jest.Mock).mockResolvedValue(undefined);

		render(<StepOneForm />);

		// Fill in the form
		fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Nome' }), {
			target: { value: 'John' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Cognome' }), {
			target: { value: 'Doe' },
		});
		fireEvent.change(screen.getByLabelText('Data di nascita (DD/MM/YYYY)'), {
			target: { value: '1990-01-01' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Codice Fiscale' }), {
			target: { value: 'ABCDEF12G34H567I' },
		});

		// Submit the form
		const submitButton = screen.getByRole('button', { name: 'Continua' });
		const form = submitButton.closest('form');
		if (!form) throw new Error('Form not found');

		fireEvent.submit(form);

		// Wait for the form submission to complete
		await waitFor(() => {
			expect(stepOneFormAction).toHaveBeenCalled();
			expect(mockNextStep).toHaveBeenCalled();
		});
	});

	it('handles form submission with invalid data', async () => {
		// Mock form submission with errors
		const mockErrors = {
			email: 'Invalid email format',
			firstName: 'First name is required',
		};
		(stepOneFormAction as jest.Mock).mockResolvedValue(mockErrors);

		render(<StepOneForm />);

		// Submit the form without filling in required fields
		const submitButton = screen.getByRole('button', { name: 'Continua' });
		const form = submitButton.closest('form');
		if (!form) throw new Error('Form not found');

		fireEvent.submit(form);

		// Wait for the form submission to complete
		await waitFor(() => {
			expect(stepOneFormAction).toHaveBeenCalled();
			expect(mockNextStep).not.toHaveBeenCalled();
			expect(screen.getByText('Invalid email format')).toBeInTheDocument();
			expect(screen.getByText('First name is required')).toBeInTheDocument();
		});
	});

	it('updates store when input values change', () => {
		render(<StepOneForm />);

		// Change an input value
		fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
			target: { value: 'test@example.com' },
		});

		// Check if store was updated
		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			email: 'test@example.com',
		});
	});
});
