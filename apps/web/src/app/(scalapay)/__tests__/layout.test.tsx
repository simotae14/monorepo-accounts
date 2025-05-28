/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { render } from '@testing-library/react';
import RootLayout from '../layout';
import '@testing-library/jest-dom';

// Mock the Next.js Image component
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		height,
		width,
		...props
	}: {
		src: string;
		alt: string;
		height: number;
		width: number;
		[key: string]: unknown;
	}) => {
		return <img src={src} alt={alt} height={height} width={width} {...props} />;
	},
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
	Poppins: () => ({
		className: 'poppins-class',
	}),
}));

describe('RootLayout', () => {
	// Mock console.error before each test, just in this case
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	// Restore console.error after each test
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders the layout with all main components', () => {
		const { container } = render(
			<RootLayout>
				<div>Test Child</div>
			</RootLayout>,
			{
				container: document.documentElement,
			},
		);

		// Check for main heading
		expect(container.querySelector('h1')).toHaveTextContent('Secure checkout');

		// Check for merchant card content
		expect(container.querySelector('h2')).toHaveTextContent('Merchant');
		expect(container.querySelector('p')).toHaveTextContent(
			'Paga il tuo ordine in un massimo di 36 rate',
		);

		// Check for Scalapay logo
		const logo = container.querySelector('img[alt="My Happy SVG"]');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'scalapay-logo.svg');

		// Check if children are rendered
		expect(container).toHaveTextContent('Test Child');
	});

	it('applies the correct font class', () => {
		const { container } = render(
			<RootLayout>
				<div>Test Child</div>
			</RootLayout>,
			{
				container: document.documentElement,
			},
		);

		const body = container.querySelector('body');
		expect(body).toHaveClass('poppins-class');
	});
});
