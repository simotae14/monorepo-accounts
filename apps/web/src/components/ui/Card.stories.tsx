import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Card> = {
	title: 'Components/UI/Card',
	component: Card,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
			description: 'The children components, typically the content to show inside the Card.',
			table: {
				type: { summary: 'React.ReactNode' },
			},
		},
		classProps: {
			control: 'text',
			description: 'You can pass some Tailwind classes to overwrite the Card layout',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'p-14 bg-red-500',
				},
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: <p>I am the content inside the card</p>,
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Card><p>I am the content inside the card</p></Card>
        `,
			},
		},
	},
};

export const WithOptionalStyle: Story = {
	args: {
		children: <p>I am the content inside the card</p>,
		classProps: 'inset-shadow-2xs my-6 mx-6',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Card classProps="inset-shadow-2xs my-6 mx-6"><p>I am the content inside the card</p></Card>
        `,
			},
		},
	},
};
