import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Input> = {
	title: 'Components/UI/Input',
	component: Input,
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
					summary: 'Codice fiscale',
				},
			},
			defaultValue: 'Codice fiscale',
		},
		id: {
			control: 'text',
			description:
				'It is the id we use to identify the input field and to connect the input with the label',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'fiscalCode',
				},
			},
			defaultValue: 'fiscalCode',
		},
		description: {
			control: 'text',
			description: 'It is a description we can pass to add more informations regarding the field',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'It is the user fiscal code',
				},
			},
			defaultValue: 'It is the user fiscal code',
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
		pattern: {
			control: 'text',
			description: 'It is the format the input field needs to respect',
			type: { name: 'string' },
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$',
				},
			},
			defaultValue: '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$',
		},
		type: {
			control: 'text',
			description: 'It is the type of the input field we want to show, in this case it is "text"',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'text',
				},
			},
			defaultValue: 'text',
		},
		minLength: {
			control: 'number',
			description: 'It is the minimum lenght to validate an input text',
			table: {
				type: {
					summary: 'number',
				},
				defaultValue: {
					summary: 'number',
				},
			},
			defaultValue: 2,
		},
		maxLength: {
			control: 'number',
			description: 'It is the maximum lenght to validate an input text',
			table: {
				type: {
					summary: 'number',
				},
				defaultValue: {
					summary: 'number',
				},
			},
			defaultValue: 100,
		},
		min: {
			control: 'number',
			description: 'It is the minimum value possible for an input number',
			table: {
				type: {
					summary: 'number',
				},
				defaultValue: {
					summary: 'number',
				},
			},
			defaultValue: 1,
		},
		max: {
			control: 'number',
			description: 'It is the maximum value possible for an input number',
			table: {
				type: {
					summary: 'number',
				},
				defaultValue: {
					summary: 'number',
				},
			},
			defaultValue: 1,
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
					summary: 'The fiscal code needs to be a valid fiscal code',
				},
			},
			defaultValue: 'The fiscal code needs to be a valid fiscal code',
		},
		classProps: {
			control: 'text',
			description: 'You can pass some Tailwind classes to overwrite the Input layout',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'p-14 bg-red-500',
				},
			},
			defaultValue: 'p-14 bg-red-500',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
          />
        `,
			},
		},
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
		description: " - Il codice identificativo dell'utente",
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
            description=" - Il codice identificativo dell'utente"
          />
        `,
			},
		},
	},
};

export const WithPattern: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
		pattern: '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
            pattern="^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
          />
        `,
			},
		},
	},
};

export const TypeNumber: Story = {
	args: {
		label: 'Età',
		id: 'age',
		type: 'number',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Età"
            id="age"
            type="number"
          />
        `,
			},
		},
	},
};

export const TypeNumberWithMinAndMax: Story = {
	args: {
		label: 'Età',
		id: 'age',
		type: 'number',
		min: 0,
		max: 120,
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Età"
            id="age"
            type="number"
            min={0}
            max={120}
          />
        `,
			},
		},
	},
};

export const TextWithMinAndMaxLength: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
		minLength: 2,
		maxLength: 16,
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
            minLength={2}
            maxLength={16}
          />
        `,
			},
		},
	},
};

export const TextWithError: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
		errorMsg: 'Invalid fiscal code',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
            errorMsg="Invalid fiscal code"
          />
        `,
			},
		},
	},
};

export const TextWithStyle: Story = {
	args: {
		label: 'Codice Fiscale',
		id: 'fiscalCode',
		type: 'text',
		classProps: 'mx-20 my-20',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`
          <Input
            label="Codice Fiscale"
            id="fiscalCode"
            type="text"
            classProps="mx-20 my-20"
          />
        `,
			},
		},
	},
};
