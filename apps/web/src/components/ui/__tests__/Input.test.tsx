import { render, screen, fireEvent } from '@testing-library/react';
import { useAccountStore } from '@/store';
import Input from '../Input';

// Mock the store
jest.mock('@/store', () => ({
	useAccountStore: jest.fn(),
}));

describe('Input Component', () => {
	const mockUpdateNewAccountDetails = jest.fn();
	const mockNewAccountData = {};

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Setup default store mock
		(useAccountStore as unknown as jest.Mock).mockReturnValue({
			updateNewAccountDetails: mockUpdateNewAccountDetails,
			newAccountData: mockNewAccountData,
		});
	});

	it('renders with basic props', () => {
		render(<Input label="Test Label" id="test-input" type="text" />);

		expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
	});

	it('handles text input changes', () => {
		render(<Input label="Test Label" id="test-input" type="text" />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'test value' } });

		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			'test-input': 'test value',
		});
	});

	it('handles checkbox input changes', () => {
		render(<Input label="Test Checkbox" id="test-checkbox" type="checkbox" />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		expect(mockUpdateNewAccountDetails).toHaveBeenCalledWith({
			'test-checkbox': true,
		});
	});

	it('displays error message when provided', () => {
		const errorMessage = 'This field is required';
		render(<Input label="Test Label" id="test-input" type="text" errorMsg={errorMessage} />);

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
	});

	it('applies required attribute when specified', () => {
		render(<Input label="Test Label" id="test-input" type="text" required />);

		expect(screen.getByRole('textbox')).toBeRequired();
	});

	it('applies custom class props', () => {
		const customClass = 'custom-class';
		render(<Input label="Test Label" id="test-input" type="text" classProps={customClass} />);

		expect(screen.getByRole('textbox').parentElement).toHaveClass(customClass);
	});

	it('displays description when provided', () => {
		const description = 'This is a description';
		render(<Input label="Test Label" id="test-input" type="text" description={description} />);

		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('applies validation attributes when provided', () => {
		render(
			<Input
				label="Test Label"
				id="test-input"
				type="text"
				minLength={2}
				maxLength={10}
				pattern="[A-Za-z]+"
			/>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('minLength', '2');
		expect(input).toHaveAttribute('maxLength', '10');
		expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
	});
});
