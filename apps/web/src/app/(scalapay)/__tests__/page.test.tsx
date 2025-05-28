import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock next/link since it's a client component
jest.mock('next/link', () => {
	return function MockLink({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
	}) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	};
});

describe('Home Page', () => {
	it('renders the create account button', () => {
		render(<Home />);

		// Check if the button text is present
		expect(screen.getByText('Crea il tuo Account')).toBeInTheDocument();
	});

	it('has correct link to form page', () => {
		render(<Home />);

		// Check if the link points to the correct page
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/form');
	});
});
