import type { Meta, StoryObj } from '@storybook/react';
import ToggleInput from './ToggleInput';
import IconWithTooltip from './IconWithTooltip';
import infoIcon from '../../../public/Info.svg';
import { default as outdent } from 'outdent';

const meta: Meta<typeof ToggleInput> = {
	title: 'Components/UI/ToggleInput',
	component: ToggleInput,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		id: {
			control: 'text',
			description:
				'It is the id we use to identify the input checkbox field and to connect the input with the label',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'isValid',
				},
			},
			defaultValue: 'isValid',
		},
		label: {
			control: 'text',
			description: 'It is the label we want to show on the left of the toggle',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'Sono abilitato?',
				},
			},
			defaultValue: 'Sono abilitato?',
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
		type: {
			control: 'text',
			description:
				'It is the type of the input field we want to show, in this case it is "checkbox"',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'checkbox',
				},
			},
			defaultValue: 'checkbox',
		},
		defaultChecked: {
			control: 'boolean',
			description: 'It shows the checkbox as checked by default',
			type: { name: 'boolean' },
			table: {
				defaultValue: { summary: 'false' },
			},
			defaultValue: false,
		},
		errorMsg: {
			control: 'text',
			description: 'It is an error message to show in case of invalid value',
			table: {
				type: {
					summary: 'text',
				},
				defaultValue: {
					summary: 'The checkbox needs to be true',
				},
			},
			defaultValue: 'The checkbox needs to be true',
		},
		classProps: {
			control: 'text',
			description: 'You can pass some Tailwind classes to overwrite the Toggle layout',
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
		startIcon: {
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
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		label: 'Sei adulto?',
		id: 'isAdult',
		type: 'checkbox',
		classProps: 'mx-80',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`  
          <ToggleInput
            label="Sei adulto?"
            id="isAdult"
            type="checkbox"
          />
        `,
			},
		},
	},
};

export const WithErrorMessage: Story = {
	args: {
		label: 'Sei adulto?',
		id: 'isAdult',
		type: 'checkbox',
		classProps: 'mx-80',
		errorMsg: 'I am an error',
	},
	parameters: {
		docs: {
			source: {
				code: outdent`  
          <ToggleInput
            label="Sei adulto?"
            id="isAdult"
            type="checkbox"
            errorMsg="I am an error"
          />
        `,
			},
		},
	},
};

export const WithIcon: Story = {
	args: {
		label: 'Sei adulto?',
		id: 'isAdult',
		type: 'checkbox',
		classProps: 'mx-80',
		startIcon: (
			<IconWithTooltip
				icon={infoIcon}
				tooltipMessage="Persona politicamente esposta"
				classProps="ml-1"
			/>
		),
	},
	parameters: {
		docs: {
			source: {
				code: outdent`  
          <ToggleInput
            label="Sei adulto?"
            id="isAdult"
            type="checkbox"
            startIcon: (
              <IconWithTooltip
                icon={infoIcon}
                tooltipMessage="Persona politicamente esposta"
                classProps="ml-1"
              />
            ),
          />
        `,
			},
		},
	},
};
