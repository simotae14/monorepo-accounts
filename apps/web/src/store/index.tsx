import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Step {
	id: number;
	title: string;
}

interface AccountStore {
	step: number;
	steps: Step[];
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
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
];

const LOCAL_STORAGE_KEY = 'scalapay-newAccountData';

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
			dataLoaded: false,
		}),
		{
			name: LOCAL_STORAGE_KEY,
		},
	),
);
