import { render, screen } from '@testing-library/react';
import IconWithTooltip from './IconWithTooltip';

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
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={src} alt={alt} height={height} width={width} {...props} />;
	},
}));

describe('IconWithTooltip', () => {
	const mockIcon = '/path/to/icon.svg';
	const mockTooltipMessage = 'Test tooltip message';

	it('renders the icon correctly', () => {
		render(<IconWithTooltip icon={mockIcon} tooltipMessage={mockTooltipMessage} />);

		const icon = screen.getByAltText('Open to know more');
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute('src', mockIcon);
	});

	it('renders the tooltip message correctly', () => {
		render(<IconWithTooltip icon={mockIcon} tooltipMessage={mockTooltipMessage} />);

		const tooltip = screen.getByText(mockTooltipMessage);
		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveClass('opacity-0'); // Tooltip should be hidden by default
	});

	it('applies custom class props correctly', () => {
		const customClass = 'custom-class';
		render(
			<IconWithTooltip
				icon={mockIcon}
				tooltipMessage={mockTooltipMessage}
				classProps={customClass}
			/>,
		);

		const container = screen.getByAltText('Open to know more').parentElement;
		expect(container).toHaveClass(customClass);
	});
});
