import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepTwoForm from '../StepTwoForm';
import { useAccountStore } from '@/store';
import { stepTwoFormAction, submitAccountAction } from '../actions';

// Mock the server actions
jest.mock('../actions', () => ({
	stepTwoFormAction: jest.fn(),
	submitAccountAction: jest.fn(),
	saveAccount: jest.fn(),
}));

// Mock the store
jest.mock('@/store', () => ({
	useAccountStore: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
	success: jest.fn(),
	error: jest.fn(),
}));

describe('StepTwoForm', () => {
	const mockResetLocalStorage = jest.fn();
	const mockGoToStep = jest.fn();
	const mockUpdateNewAccountDetails = jest.fn();

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Setup store mock with proper typing
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			resetLocalStorage: mockResetLocalStorage,
			goToStep: mockGoToStep,
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				email: 'test@example.com',
				firstName: 'John',
				lastName: 'Doe',
				dateOfBirth: '1990-01-01',
				fiscalCode: 'ABCDEF12G34H567I',
				street: '',
				numberAddress: undefined,
				postalCode: '',
				province: '',
				city: '',
				country: '',
				isLivingHere: false,
				isPEP: false,
			},
		});
	});

	it('renders all form fields correctly', () => {
		render(<StepTwoForm />);

		// Check if all form fields are present
		expect(screen.getByRole('textbox', { name: 'Via' })).toBeInTheDocument();
		expect(screen.getByRole('spinbutton', { name: 'N°' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'CAP' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Provincia' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Città' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Nazione' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'I currently live here' })).toBeInTheDocument();
		expect(
			screen.getByRole('checkbox', {
				name: /Dichiaro di essere una PEP/,
			}),
		).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Salva' })).toBeInTheDocument();
	});

	it('handles form submission with valid data', async () => {
		// Mock successful form submission
		(stepTwoFormAction as jest.Mock).mockResolvedValue(undefined);
		(submitAccountAction as jest.Mock).mockResolvedValue({ success: true });

		render(<StepTwoForm />);

		// Fill in the form
		fireEvent.change(screen.getByRole('textbox', { name: 'Via' }), {
			target: { value: 'Via Roma' },
		});
		fireEvent.change(screen.getByRole('spinbutton', { name: 'N°' }), {
			target: { value: '123' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'CAP' }), {
			target: { value: '12345' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Provincia' }), {
			target: { value: 'MI' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Città' }), {
			target: { value: 'Milano' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Nazione' }), {
			target: { value: 'IT' },
		});

		// Submit the form
		const submitButton = screen.getByRole('button', { name: 'Salva' });
		const form = submitButton.closest('form');
		if (!form) throw new Error('Form not found');

		fireEvent.submit(form);

		// Wait for the form submission to complete
		await waitFor(() => {
			expect(stepTwoFormAction).toHaveBeenCalled();
			expect(submitAccountAction).toHaveBeenCalled();
			expect(mockResetLocalStorage).toHaveBeenCalled();
		});
	});

	it('handles form submission with invalid data', async () => {
		// Mock form submission with errors
		const mockErrors = {
			street: 'Street name is required',
			postalCode: 'Invalid postal code format',
		};
		(stepTwoFormAction as jest.Mock).mockResolvedValue(mockErrors);

		render(<StepTwoForm />);

		// Submit the form without filling in required fields
		const submitButton = screen.getByRole('button', { name: 'Salva' });
		const form = submitButton.closest('form');
		if (!form) throw new Error('Form not found');

		fireEvent.submit(form);

		// Wait for the form submission to complete
		await waitFor(() => {
			expect(stepTwoFormAction).toHaveBeenCalled();
			expect(submitAccountAction).not.toHaveBeenCalled();
			expect(screen.getByText('Street name is required')).toBeInTheDocument();
			expect(screen.getByText('Invalid postal code format')).toBeInTheDocument();
		});
	});

	it('handles server error during submission', async () => {
		// Mock successful form validation but failed server submission
		(stepTwoFormAction as jest.Mock).mockResolvedValue(undefined);
		(submitAccountAction as jest.Mock).mockResolvedValue({
			success: false,
			errorMsg: 'Server error occurred',
		});

		render(<StepTwoForm />);

		// Fill in the form with valid data
		fireEvent.change(screen.getByRole('textbox', { name: 'Via' }), {
			target: { value: 'Via Roma' },
		});
		fireEvent.change(screen.getByRole('spinbutton', { name: 'N°' }), {
			target: { value: '123' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'CAP' }), {
			target: { value: '12345' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Provincia' }), {
			target: { value: 'MI' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Città' }), {
			target: { value: 'Milano' },
		});
		fireEvent.change(screen.getByRole('textbox', { name: 'Nazione' }), {
			target: { value: 'IT' },
		});

		// Submit the form
		const submitButton = screen.getByRole('button', { name: 'Salva' });
		const form = submitButton.closest('form');
		if (!form) throw new Error('Form not found');

		fireEvent.submit(form);

		// Wait for the form submission to complete
		await waitFor(() => {
			expect(stepTwoFormAction).toHaveBeenCalled();
			expect(submitAccountAction).toHaveBeenCalled();
			expect(mockResetLocalStorage).not.toHaveBeenCalled();
		});
	});

	it('updates store when input values change', () => {
		render(<StepTwoForm />);

		// Change an input value
		fireEvent.change(screen.getByRole('textbox', { name: 'Via' }), {
			target: { value: 'Via Roma' },
		});

		// Check if store was updated
		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			street: 'Via Roma',
		});
	});

	it('handles checkbox toggles correctly', () => {
		render(<StepTwoForm />);

		// Toggle the isLivingHere checkbox
		const isLivingHereCheckbox = screen.getByRole('checkbox', { name: 'I currently live here' });
		fireEvent.click(isLivingHereCheckbox);

		// Check if store was updated
		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			isLivingHere: true,
		});

		// Toggle the isPEP checkbox
		const isPEPCheckbox = screen.getByRole('checkbox', {
			name: /Dichiaro di essere una PEP/,
		});
		fireEvent.click(isPEPCheckbox);

		// Check if store was updated
		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			isPEP: true,
		});
	});
});
