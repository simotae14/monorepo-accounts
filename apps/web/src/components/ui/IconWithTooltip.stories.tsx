import type { Meta, StoryObj } from '@storybook/react';
import IconWithTooltip from './IconWithTooltip';
import infoIcon from '../../../public/Info.svg';

const meta: Meta<typeof IconWithTooltip> = {
	title: 'Components/UI/IconWithTooltip',
	component: IconWithTooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'text',
		},
		tooltipMessage: {
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		icon: infoIcon,
		tooltipMessage: 'This is a tooltip',
	},
};

export const WithOptionalStyle: Story = {
	args: {
		icon: infoIcon,
		tooltipMessage: 'This is a tooltip with style',
		classProps: 'p-14 bg-red-50',
	},
};
