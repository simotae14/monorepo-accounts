import type { Meta, StoryObj } from '@storybook/react';
import SubmitButton from './Submit';
import { default as outdent } from 'outdent';

const meta: Meta<typeof SubmitButton> = {
	title: 'Components/UI/SubmitButton',
	component: SubmitButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			description: 'You can passe the text to show inside the button',
			table: {
				type: {
					summary: 'Submit',
				},
				defaultValue: {
					summary: 'Submit',
				},
			},
		},
		disabled: {
			control: 'boolean',
			description: 'You can select it or deselect to enable/disable the button',
			type: { name: 'boolean' },
			table: {
				defaultValue: { summary: 'false' },
			},
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		text: 'Continua',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <SubmitButton text="Continua" />
        `,
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		text: 'Submit',
		disabled: true,
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <SubmitButton text="Submit" disabled />
        `,
			},
		},
	},
};
