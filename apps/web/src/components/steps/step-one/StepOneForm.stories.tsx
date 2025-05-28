/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';

// Create mock functions
const mockNextStep = fn().mockName('nextStep');
const mockUpdateNewAccountDetails = fn().mockName('updateNewAccountDetails');
const mockStepOneFormAction = fn().mockName('stepOneFormAction');

// Mock the store - this will be used by all stories
const createMockAccountStore = (newAccountData = {}) => ({
	nextStep: mockNextStep,
	updateNewAccountDetails: mockUpdateNewAccountDetails,
	newAccountData: {
		email: '',
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		fiscalCode: '',
		...newAccountData,
	},
});

// Mock UI Components
const MockInput = ({
	label,
	placeholder,
	id,
	type,
	required,
	errorMsg,
	minLength,
	maxLength,
}: any) => {
	return (
		<div className="relative">
			<label
				className={`absolute left-4 top-0 text-xs transition-all duration-200 ease-in-out pointer-events-none z-10 bg-white px-1 -translate-y-1/2 ${
					errorMsg ? 'text-red-500' : 'text-blue-600'
				}`}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className={`w-full p-4 pt-6 border rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 ${
					errorMsg
						? 'border-red-500 focus:border-red-500'
						: 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
				}`}
				type={type}
				name={id}
				id={id}
				placeholder={placeholder}
				required={required}
				minLength={minLength}
				maxLength={maxLength}
				onChange={e => mockUpdateNewAccountDetails({ [e.target.name]: e.target.value })}
			/>
			{errorMsg && <span className="text-red-500 text-sm block mt-1">{errorMsg}</span>}
		</div>
	);
};

const MockDatePicker = ({ label, id, type, errorMsg, required }: any) => {
	return (
		<div className="relative">
			<label
				className={`absolute left-4 top-0 text-xs transition-all duration-200 ease-in-out pointer-events-none z-10 bg-white px-1 -translate-y-1/2 ${
					errorMsg ? 'text-red-500' : 'text-blue-600'
				}`}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className={`w-full p-4 pt-6 border rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 ${
					errorMsg
						? 'border-red-500 focus:border-red-500'
						: 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
				}`}
				type={type}
				name={id}
				id={id}
				required={required}
				onChange={e => mockUpdateNewAccountDetails({ [e.target.name]: e.target.value })}
			/>
			{errorMsg && <span className="text-red-500 text-sm block mt-1">{errorMsg}</span>}
		</div>
	);
};

const MockSubmitButton = ({ text, disabled = false }: any) => {
	return (
		<button
			className={`fixed rounded-full py-3 px-8 font-semibold text-sm text-white transition-all duration-200 ease-in-out bottom-8 left-16 right-16 ${
				disabled
					? 'bg-purple-300 cursor-not-allowed'
					: 'bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95'
			}`}
			type="submit"
			disabled={disabled}
		>
			{text}
		</button>
	);
};

const MockCard = ({ classProps, children }: any) => {
	return <div className={`bg-white rounded-xl p-6 mx-4 shadow-lg ${classProps}`}>{children}</div>;
};

// Create a wrapper component that provides the mocked dependencies
const StepOneFormWrapper = ({
	serverErrors = {},
	accountData = {},
	mockFormAction = mockStepOneFormAction,
}: {
	serverErrors?: any;
	accountData?: any;
	mockFormAction?: any;
}) => {
	// Mock the hooks and modules for this specific story
	const mockStore = createMockAccountStore(accountData);

	// Mock the useAccountStore hook
	const mockUseAccountStore = () => mockStore;

	// Create a modified component with mocked dependencies
	const ModifiedStepOneForm = () => {
		const [, formAction] = React.useActionState(mockFormAction, {});
		const store = mockUseAccountStore();

		React.useEffect(() => {
			if (Object.keys(serverErrors).length === 0) {
				store.nextStep();
			}
		}, [store, store.nextStep]);

		return (
			<MockCard classProps="mt-6">
				<h2 className="font-semibold text-gray-900 mb-1">Crea account</h2>
				<form action={formAction} className="space-y-4 mt-4">
					<MockInput
						label="Email"
						placeholder="Email"
						id="email"
						type="email"
						required
						errorMsg={serverErrors?.email}
					/>
					<MockInput
						label="Nome"
						placeholder="Nome"
						id="firstName"
						type="text"
						minLength={2}
						errorMsg={serverErrors?.firstName}
						required
					/>
					<MockInput
						label="Cognome"
						placeholder="Cognome"
						id="lastName"
						type="text"
						minLength={2}
						errorMsg={serverErrors?.lastName}
						required
					/>
					<MockDatePicker
						label="Data di nascita (DD/MM/YYYY)"
						placeholder="Data di nascita"
						id="dateOfBirth"
						type="date"
						errorMsg={serverErrors?.dateOfBirth}
						required
					/>
					<MockInput
						label="Codice Fiscale"
						placeholder="Codice Fiscale"
						id="fiscalCode"
						type="text"
						minLength={16}
						maxLength={16}
						errorMsg={serverErrors?.fiscalCode}
						required
					/>
					<MockSubmitButton text="Continua" />
				</form>
			</MockCard>
		);
	};

	return <ModifiedStepOneForm />;
};

const meta: Meta<typeof StepOneFormWrapper> = {
	title: 'Components/steps/StepOneForm',
	component: StepOneFormWrapper,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A multi-step form component for creating user accounts. This is step one which collects basic personal information.',
			},
		},
	},
	decorators: [
		Story => (
			<div className="min-h-screen bg-gray-50 py-8">
				<Story />
			</div>
		),
	],
	argTypes: {
		serverErrors: {
			control: 'object',
			description: 'Server validation errors',
		},
		accountData: {
			control: 'object',
			description: 'Pre-filled account data',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
	args: {
		serverErrors: {},
		accountData: {},
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the StepOneForm with empty fields.',
			},
		},
	},
};

// Story with validation errors
export const WithValidationErrors: Story = {
	args: {
		serverErrors: {
			email: 'Please enter a valid email address',
			firstName: 'First name must be at least 2 characters',
			lastName: 'Last name must be at least 2 characters',
			dateOfBirth: 'Please enter your date of birth',
			fiscalCode: 'Fiscal code must be exactly 16 characters',
		},
		accountData: {},
	},
	parameters: {
		docs: {
			description: {
				story: 'Form displaying validation errors for all fields.',
			},
		},
	},
};

// Story showing individual field errors
export const WithPartialErrors: Story = {
	args: {
		serverErrors: {
			email: 'This email is already registered',
			fiscalCode: 'Invalid fiscal code format',
		},
		accountData: {},
	},
	parameters: {
		docs: {
			description: {
				story: 'Form showing validation errors for specific fields only.',
			},
		},
	},
};

// Interactive story for testing form submission
export const Interactive: Story = {
	args: {
		serverErrors: {},
		accountData: {},
		mockFormAction: action('Form submitted'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive version for testing form behavior. Fill out the form and submit to see actions in the Actions panel.',
			},
		},
	},
};

// Mobile view story
export const MobileView: Story = {
	args: {
		serverErrors: {},
		accountData: {},
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
		docs: {
			description: {
				story: 'Form optimized for mobile devices.',
			},
		},
	},
};

// Desktop view story
export const DesktopView: Story = {
	args: {
		serverErrors: {},
		accountData: {},
	},
	parameters: {
		viewport: {
			defaultViewport: 'desktop',
		},
		docs: {
			description: {
				story: 'Form optimized for desktop screens.',
			},
		},
	},
};
