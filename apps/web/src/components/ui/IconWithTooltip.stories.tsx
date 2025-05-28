import type { Meta, StoryObj } from '@storybook/react';
import IconWithTooltip from './IconWithTooltip';
import infoIcon from '../../../public/Info.svg';
import { default as outdent } from 'outdent';

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
			description: 'You can passe the url to the icon',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'urlToTheSVG',
				},
			},
		},
		tooltipMessage: {
			control: 'text',
			description: 'It is the message to show in the tooltip',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'I am a tooltip message',
				},
			},
		},
		classProps: {
			control: 'text',
			description: 'You can pass some Tailwind classes to overwrite the Tooltip layout',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'p-14 bg-red-50',
				},
			},
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
	parameters: {
		docs: {
			source: {
				code: outdent`
          <IconWithTooltip
						icon={infoIcon}
						tooltipMessage="This is a tooltip"
					/>
        `,
			},
		},
	},
};

export const WithOptionalStyle: Story = {
	args: {
		icon: infoIcon,
		tooltipMessage: 'This is a tooltip with style',
		classProps: 'p-14 bg-red-50',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <IconWithTooltip
						icon={infoIcon}
						tooltipMessage="This is a tooltip"
						classProps="p-14 bg-red-50"
					/>
        `,
			},
		},
	},
};
