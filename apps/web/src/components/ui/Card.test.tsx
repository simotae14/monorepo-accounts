import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
	it('renders children correctly', () => {
		render(
			<Card>
				<div data-testid="test-child">Test Content</div>
			</Card>,
		);

		expect(screen.getByTestId('test-child')).toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('applies custom class props correctly', () => {
		const customClass = 'custom-class';
		render(
			<Card classProps={customClass}>
				<div>Test Content</div>
			</Card>,
		);

		const cardElement = screen.getByText('Test Content').parentElement;
		expect(cardElement).toHaveClass(customClass);
	});
});
