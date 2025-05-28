import { render, screen, fireEvent } from '@testing-library/react';
import { useAccountStore } from '@/store';
import DatePicker from '../DatePicker';

// Mock the store
jest.mock('@/store', () => ({
	useAccountStore: jest.fn(),
}));

describe('DatePicker', () => {
	const mockUpdateNewAccountDetails = jest.fn();
	const mockNewAccountData = {
		dateOfBirth: '',
	};

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Setup default store mock
		(useAccountStore as unknown as jest.Mock).mockImplementation(() => ({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: mockNewAccountData,
		}));
	});

	it('renders with required props', () => {
		render(<DatePicker label="Date of Birth" id="dateOfBirth" required />);

		const input = screen.getByLabelText('Date of Birth');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('required');
	});

	it('renders with optional description', () => {
		render(<DatePicker label="Date of Birth" id="dateOfBirth" description="(DD/MM/YYYY)" />);

		expect(screen.getByText('(DD/MM/YYYY)')).toBeInTheDocument();
	});

	it('renders with error message', () => {
		render(<DatePicker label="Date of Birth" id="dateOfBirth" errorMsg="Invalid date" />);

		const input = screen.getByLabelText('Date of Birth');
		expect(screen.getByText('Invalid date')).toBeInTheDocument();
		expect(input).toHaveClass('border-red-500');
	});

	it('updates store on input change', () => {
		render(<DatePicker label="Date of Birth" id="dateOfBirth" />);

		const input = screen.getByLabelText('Date of Birth');
		fireEvent.change(input, { target: { value: '2024-03-20', name: 'dateOfBirth' } });

		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			dateOfBirth: '2024-03-20',
		});
	});

	it('displays floating label when input has value', () => {
		(useAccountStore as unknown as jest.Mock).mockImplementation(() => ({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				dateOfBirth: '2024-03-20',
			},
		}));

		render(<DatePicker label="Date of Birth" id="dateOfBirth" />);

		const label = screen.getByText('Date of Birth');
		expect(label).toHaveClass('top-0');
	});
});
