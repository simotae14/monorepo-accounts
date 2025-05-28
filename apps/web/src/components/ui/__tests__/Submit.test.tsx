import { render, screen } from '@testing-library/react';
import SubmitButton from '../Submit';

describe('SubmitButton', () => {
	it('renders with the provided text', () => {
		render(<SubmitButton text="Submit" />);
		expect(screen.getByText('Submit')).toBeInTheDocument();
	});

	it('is enabled by default', () => {
		render(<SubmitButton text="Submit" />);
		const button = screen.getByRole('button');
		expect(button).not.toBeDisabled();
	});

	it('can be disabled', () => {
		render(<SubmitButton text="Submit" disabled />);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('has the correct type attribute', () => {
		render(<SubmitButton text="Submit" />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('type', 'submit');
	});
});
