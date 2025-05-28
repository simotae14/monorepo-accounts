import { render, screen, fireEvent } from '@testing-library/react';
import { useAccountStore } from '@/store';
import ToggleInput from '../ToggleInput';

// Mock the store
jest.mock('@/store', () => ({
	useAccountStore: jest.fn(),
}));

describe('ToggleInput', () => {
	const mockUpdateNewAccountDetails = jest.fn();
	const mockNewAccountData = {
		isLivingHere: false,
		isPEP: false,
	};

	beforeEach(() => {
		// Reset mocks before each test
		jest.clearAllMocks();
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: mockNewAccountData,
		});
	});

	it('renders with basic props', () => {
		render(<ToggleInput id="isLivingHere" label="I live here" type="checkbox" />);

		expect(screen.getByText('I live here')).toBeInTheDocument();
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('handles toggle change and updates store', () => {
		render(<ToggleInput id="isLivingHere" label="I live here" type="checkbox" />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			isLivingHere: true,
		});
	});

	it('displays error message when provided', () => {
		render(
			<ToggleInput
				id="isLivingHere"
				label="I live here"
				type="checkbox"
				errorMsg="This field is required"
			/>,
		);

		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});

	it('applies custom class props', () => {
		render(
			<ToggleInput
				id="isLivingHere"
				label="I live here"
				type="checkbox"
				classProps="custom-class"
			/>,
		);

		const container = screen.getByText('I live here').parentElement;
		expect(container).toHaveClass('custom-class');
	});

	it('renders with start icon when provided', () => {
		const StartIcon = () => <span data-testid="start-icon">🚀</span>;

		render(
			<ToggleInput
				id="isLivingHere"
				label="I live here"
				type="checkbox"
				startIcon={<StartIcon />}
			/>,
		);

		expect(screen.getByTestId('start-icon')).toBeInTheDocument();
	});

	it('initializes with store value when available', () => {
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				...mockNewAccountData,
				isLivingHere: true,
			},
		});

		render(<ToggleInput id="isLivingHere" label="I live here" type="checkbox" />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('initializes with defaultChecked when no store value is available', () => {
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				...mockNewAccountData,
				isLivingHere: undefined,
			},
		});

		render(
			<ToggleInput id="isLivingHere" label="I live here" type="checkbox" defaultChecked={true} />,
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('initializes as unchecked when no store value and no defaultChecked', () => {
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: {
				...mockNewAccountData,
				isLivingHere: undefined,
			},
		});

		render(<ToggleInput id="isLivingHere" label="I live here" type="checkbox" />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
	});
});
