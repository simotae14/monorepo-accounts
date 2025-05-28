import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../DatePicker';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DatePicker> = {
	title: 'Components/UI/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'It is the label we want to show on top of the input when we select a value',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'Data di nascita (DD/MM/YYYY)',
				},
			},
			defaultValue: 'Data di nascita (DD/MM/YYYY)',
		},
		id: {
			control: 'text',
			description:
				'It is the id we use to identify the Date picker input field and to connect the input with the label',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'dateOfBirth',
				},
			},
			defaultValue: 'dateOfBirth',
		},
		description: {
			control: 'text',
			description: 'It is a description we can pass to add more informations regarding the field',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'It is the user date of birth',
				},
			},
			defaultValue: 'It is the user date of birth',
		},
		required: {
			control: 'boolean',
			description: 'Marks the field as required.',
			type: { name: 'boolean' },
			table: {
				defaultValue: { summary: 'false' },
			},
			defaultValue: false,
		},
		placeholder: {
			control: 'text',
			description: 'It is the placeholder of the input field',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'I am a placeholder',
				},
			},
			defaultValue: 'I am a placeholder',
		},
		errorMsg: {
			control: 'text',
			description: 'It is an error message to show in case of invalid validation',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'The date cannot be in the future',
				},
			},
			defaultValue: 'The date cannot be in the future',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		label: 'Data di nascita (DD/MM/YYYY)',
		id: 'dateOfBirth',
		placeholder: 'Data di nascita',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <DatePicker
            label="Data di nascita (DD/MM/YYYY)"
            placeholder="Data di nascita"
            id="dateOfBirth"
          />
        `,
			},
		},
	},
};

export const WithErrorMessage: Story = {
	args: {
		label: 'Data di nascita (DD/MM/YYYY)',
		id: 'dateOfBirth',
		placeholder: 'Data di nascita',
		required: true,
		description: 'La tua data di nascita',
		errorMsg: 'The date cannot be in the future',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <DatePicker
            label="Data di nascita (DD/MM/YYYY)"
            placeholder="Data di nascita"
            id="dateOfBirth"
            description="La tua data di nascita"
            errorMsg="The date cannot be in the future"
            required
          />
        `,
			},
		},
	},
};
