import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	NewAccountInitialValuesType,
	NewAccountType,
	newAccountInitialValuesSchema,
} from '@/schemas';

const defaultAccount: NewAccountInitialValuesType = {
	email: '',
	firstName: '',
	lastName: '',
	dateOfBirth: '',
	fiscalCode: '',
	street: '',
	numberAddress: undefined,
	postalCode: '',
	province: '',
	city: '',
	country: '',
	isLivingHere: false,
	isPEP: false,
};

interface Step {
	id: number;
	title: string;
}

const steps = [
	{
		id: 1,
		title: 'Step One',
	},
	{
		id: 2,
		title: 'Step Two',
	},
	{
		id: 3,
		title: 'Review',
	},
];

const LOCAL_STORAGE_KEY = 'scalapay-form-demo-newAccountData';

type AccountStore = {
	step: number;
	steps: Step[];
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
	newAccountData: NewAccountInitialValuesType;
	dataLoaded: boolean;
	updateNewAccountDetails: (accountDetails: Partial<NewAccountType>) => void;
	resetLocalStorage: () => void;
	setDataLoaded: (loaded: boolean) => void;
};

export const useAccountStore = create<AccountStore>()(
	persist(
		set => ({
			step: 1,
			steps,
			nextStep: () =>
				set(state => ({
					step: state.step + 1,
				})),
			prevStep: () =>
				set(state => ({
					step: state.step - 1,
				})),
			goToStep: (newStep: number) =>
				set(state => {
					if (newStep > 0 && newStep <= 4) {
						return {
							step: newStep,
						};
					}
					return {
						step: state.step,
					};
				}),
			newAccountData: defaultAccount,
			dataLoaded: false,

			updateNewAccountDetails: (accountDetails: Partial<NewAccountType>) => {
				set(state => ({
					newAccountData: { ...state.newAccountData, ...accountDetails },
				}));
			},

			resetLocalStorage: () => {
				set({ newAccountData: defaultAccount });
			},

			setDataLoaded: (loaded: boolean) => {
				set({ dataLoaded: loaded });
			},
		}),
		{
			name: LOCAL_STORAGE_KEY,
			// Persist both form data and current step
			partialize: state => ({
				newAccountData: state.newAccountData,
				step: state.step,
			}),
			onRehydrateStorage: () => state => {
				if (state) {
					// Validate the persisted data when rehydrating
					if (state.newAccountData) {
						const validated = newAccountInitialValuesSchema.safeParse(state.newAccountData);
						if (!validated.success) {
							state.newAccountData = defaultAccount;
						}
					}

					// Validate step is within bounds
					if (state.step && (state.step < 1 || state.step > steps.length)) {
						state.step = 1;
					}

					// Set dataLoaded to true after rehydration
					state.setDataLoaded(true);
				}
			},
		},
	),
);
