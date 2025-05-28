/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within, userEvent } from '@storybook/test';
import * as React from 'react';

// Create mock functions
const mockGoToStep = fn().mockName('goToStep');
const mockUpdateNewAccountDetails = fn().mockName('updateNewAccountDetails');
const mockResetLocalStorage = fn().mockName('resetLocalStorage');
const mockStepTwoFormAction = fn().mockName('stepTwoFormAction');
const mockSubmitAccountAction = fn().mockName('submitAccountAction');
const mockSaveAccount = fn().mockName('saveAccount');

// Mock toast
const mockToast = {
	success: fn().mockName('toast.success'),
	error: fn().mockName('toast.error'),
};

// Create mock account store
const createMockAccountStore = (newAccountData = {}) => ({
	goToStep: mockGoToStep,
	updateNewAccountDetails: mockUpdateNewAccountDetails,
	resetLocalStorage: mockResetLocalStorage,
	newAccountData: {
		email: 'mario.rossi@example.com',
		firstName: 'Mario',
		lastName: 'Rossi',
		dateOfBirth: '1990-05-15',
		fiscalCode: 'RSSMRA90E15H501X',
		street: '',
		numberAddress: '',
		postalCode: '',
		province: '',
		city: '',
		country: '',
		isLivingHere: false,
		isPEP: false,
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
	min,
	classProps,
}: any) => {
	return (
		<div className={`relative ${classProps}`}>
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
				min={min}
				onChange={e => mockUpdateNewAccountDetails({ [e.target.name]: e.target.value })}
			/>
			{errorMsg && <span className="text-red-500 text-sm block mt-1">{errorMsg}</span>}
		</div>
	);
};

const MockToggleInput = ({
	id,
	label,
	required,
	defaultChecked,
	errorMsg,
	classProps,
	startIcon,
}: any) => {
	const [checked, setChecked] = React.useState(defaultChecked || false);

	return (
		<div className={`flex items-center justify-between px-2 ${classProps}`}>
			<label
				htmlFor={id}
				className="text-gray-700 font-medium text-sm cursor-pointer flex items-center"
			>
				{label}
				{startIcon}
			</label>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					id={id}
					name={id}
					className="sr-only peer"
					required={required}
					checked={checked}
					onChange={e => {
						setChecked(e.target.checked);
						mockUpdateNewAccountDetails({ [e.target.name]: e.target.checked });
					}}
				/>
				<div className="relative w-8 h-4 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[-2px] after:left-[-2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400 peer-checked:after:bg-purple-600 after:shadow-md"></div>
				{errorMsg && <span className="text-red-500 text-sm block ml-2">{errorMsg}</span>}
			</label>
		</div>
	);
};

const MockSubmitButton = ({ text, disabled = false }: { text: string; disabled: boolean }) => {
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

const MockCard = ({ classProps, children }: { classProps: string; children: React.ReactNode }) => {
	return <div className={`bg-white rounded-xl p-6 mx-4 shadow-lg ${classProps}`}>{children}</div>;
};

const MockIconWithTooltip = ({
	tooltipMessage,
	classProps,
}: {
	tooltipMessage: string;
	classProps: string;
}) => {
	return (
		<div className={`inline-flex items-center ${classProps}`} title={tooltipMessage}>
			<svg width="16" height="16" viewBox="0 0 24 24" className="text-blue-500">
				<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
				<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			</svg>
		</div>
	);
};

// Create wrapper component
const StepTwoFormWrapper = ({
	serverErrors = {},
	accountData = {},
	submitSuccess = true,
	submitError = '',
	saveAccountError = false,
	redirectedStep = null,
}: {
	serverErrors?: any;
	accountData?: any;
	submitSuccess?: boolean;
	submitError?: string;
	saveAccountError?: boolean;
	redirectedStep?: number | null;
}) => {
	const mockStore = createMockAccountStore(accountData);

	// Mock the async actions
	const mockSubmitAccountActionImpl = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
		mockSubmitAccountAction();
		return {
			success: submitSuccess,
			errorMsg: submitError,
			redirectedStep: redirectedStep,
		};
	};

	const mockSaveAccountImpl = async () => {
		await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
		mockSaveAccount();
		if (saveAccountError) {
			throw new Error('Save account failed');
		}
	};

	const ModifiedStepTwoForm = () => {
		const [errors, formAction] = React.useActionState(mockStepTwoFormAction, {});
		const [isSubmitting, setIsSubmitting] = React.useState(false);

		const handleFormSubmit = React.useCallback(async () => {
			setIsSubmitting(true);

			try {
				const result = await mockSubmitAccountActionImpl();

				if (result.success) {
					try {
						await mockSaveAccountImpl();
						mockToast.success('Account submitted successfully');
						mockStore.resetLocalStorage();
					} catch (error) {
						const errorMessage =
							error instanceof Error ? error.message : 'An unknown error occurred';
						console.error(errorMessage);
						mockToast.error(errorMessage);
					}
				} else if (result.errorMsg) {
					mockToast.error(result.errorMsg);
				}

				if (result.redirectedStep) {
					mockStore.goToStep(result.redirectedStep);
				}
			} finally {
				setIsSubmitting(false);
			}
		}, []);

		React.useEffect(() => {
			if (Object.keys(serverErrors).length === 0) {
				handleFormSubmit();
			}
		}, [handleFormSubmit]);

		return (
			<MockCard classProps="mt-6">
				<h2 className="font-semibold text-gray-900 mb-1 flex items-center">
					Indirizzo di residenza
					<MockIconWithTooltip
						tooltipMessage="Riempi i campi del tuo indirizzo"
						classProps="ml-1"
					/>
				</h2>
				<form action={formAction} className="space-y-4 mt-4">
					{/* First row */}
					<div className="flex gap-4">
						<MockInput
							label="Via"
							placeholder="Via, piazza, etc"
							id="street"
							type="text"
							minLength={5}
							errorMsg={serverErrors?.street}
							required
							classProps="flex-2"
						/>
						<MockInput
							label="N°"
							placeholder="N°"
							id="numberAddress"
							type="number"
							min={1}
							required
							errorMsg={serverErrors?.numberAddress}
							classProps="flex-1"
						/>
					</div>

					{/* Second row */}
					<div className="flex gap-4">
						<MockInput
							label="CAP"
							placeholder="CAP"
							id="postalCode"
							type="text"
							minLength={5}
							errorMsg={serverErrors?.postalCode}
							required
							classProps="flex-1"
						/>
						<MockInput
							label="Provincia"
							placeholder="Provincia"
							id="province"
							type="text"
							minLength={2}
							errorMsg={serverErrors?.province}
							required
							classProps="flex-1"
						/>
					</div>

					<MockInput
						label="Città"
						placeholder="Città"
						id="city"
						type="text"
						minLength={2}
						errorMsg={serverErrors?.city}
						required
					/>
					<MockInput
						label="Nazione"
						placeholder="Nazione"
						id="country"
						type="text"
						minLength={2}
						errorMsg={serverErrors?.country}
						required
					/>
					<MockToggleInput
						label="I currently live here"
						id="isLivingHere"
						type="checkbox"
						defaultChecked={false}
						errorMsg={serverErrors?.isLivingHere}
						classProps="py-4 border-b border-gray-200"
					/>
					<MockToggleInput
						label="Dichiaro di essere una PEP"
						id="isPEP"
						type="checkbox"
						defaultChecked={false}
						errorMsg={serverErrors?.isPEP}
						classProps="pb-2"
						startIcon={
							<MockIconWithTooltip
								tooltipMessage="Persona politicamente esposta"
								classProps="ml-1"
							/>
						}
					/>
					<MockSubmitButton
						text={isSubmitting ? 'Submitting...' : 'Salva'}
						disabled={isSubmitting}
					/>
				</form>
			</MockCard>
		);
	};

	return <ModifiedStepTwoForm />;
};

const meta: Meta<typeof StepTwoFormWrapper> = {
	title: 'Components/steps/StepTwoForm',
	component: StepTwoFormWrapper,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Step two of the account creation process. Collects address information and additional preferences.',
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
		submitSuccess: {
			control: 'boolean',
			description: 'Whether form submission succeeds',
		},
		submitError: {
			control: 'text',
			description: 'Error message from form submission',
		},
		saveAccountError: {
			control: 'boolean',
			description: 'Whether saving account fails',
		},
		redirectedStep: {
			control: 'number',
			description: 'Step to redirect to after submission',
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
		submitSuccess: true,
		submitError: '',
		saveAccountError: false,
		redirectedStep: null,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default state of the StepTwoForm with empty address fields.',
			},
		},
	},
};

// Story with validation errors
export const WithValidationErrors: Story = {
	args: {
		serverErrors: {
			street: 'Street address must be at least 5 characters',
			numberAddress: 'House number is required',
			postalCode: 'Postal code must be exactly 5 digits',
			province: 'Province is required',
			city: 'City name is required',
			country: 'Country is required',
		},
		accountData: {},
		submitSuccess: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Form displaying validation errors for address fields.',
			},
		},
	},
};

// Interactive story for testing
export const Interactive: Story = {
	args: {
		serverErrors: {},
		accountData: {},
		submitSuccess: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive version for testing form behavior and async actions.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Fill out some fields
		const streetInput = canvas.getByPlaceholderText('Via, piazza, etc');
		await userEvent.type(streetInput, 'Via Roma');

		const numberInput = canvas.getByPlaceholderText('N°');
		await userEvent.type(numberInput, '123');

		// Toggle the living here checkbox
		const livingHereToggle = canvas.getByLabelText('I currently live here');
		await userEvent.click(livingHereToggle);
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
				story: 'Form optimized for mobile devices with stacked layout.',
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
