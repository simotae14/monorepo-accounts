'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { saveAccount, submitAccountAction, stepTwoFormAction } from './actions';
import { NewAccountType } from '@/schemas';
import toast from 'react-hot-toast';

const initialState: FormErrors = {};

export default function StepTwoForm() {
	const [serverErrors, formAction] = React.useActionState(stepTwoFormAction, initialState);
	const { newAccountData, resetLocalStorage, goToStep } = useAccountStore();
	const {
		email,
		firstName,
		lastName,
		dateOfBirth,
		fiscalCode,
		street,
		numberAddress,
		postalCode,
		province,
		city,
		country,
		isLivingHere,
		isPEP,
	} = newAccountData;
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleFormSubmit = React.useCallback(async () => {
		setIsSubmitting(true);

		try {
			// submit to action
			const { success, errorMsg, redirectedStep } = await submitAccountAction(
				newAccountData as NewAccountType,
			);

			if (success) {
				try {
					await saveAccount({
						email: email,
						firstName: firstName,
						lastName: lastName,
						dateOfBirth: dateOfBirth,
						fiscalCode: fiscalCode,
						street: street,
						numberAddress: numberAddress,
						postalCode: postalCode,
						province: province,
						city: city,
						country: country,
						isLivingHere,
						isPEP,
					});
					toast.success('Account submitted successfully');
					resetLocalStorage();
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					console.error(errorMessage);
					toast.error(errorMessage);
				}
			} else if (errorMsg) {
				toast.error(errorMsg);
			}
			if (redirectedStep) {
				goToStep(redirectedStep);
			}
		} finally {
			setIsSubmitting(false);
		}
	}, [
		newAccountData,
		email,
		firstName,
		lastName,
		dateOfBirth,
		fiscalCode,
		street,
		numberAddress,
		postalCode,
		province,
		city,
		country,
		isLivingHere,
		isPEP,
		resetLocalStorage,
		goToStep,
		setIsSubmitting,
	]);

	React.useEffect(() => {
		if (!serverErrors) {
			handleFormSubmit();
		}
	}, [handleFormSubmit, serverErrors]);

	return (
		<form action={formAction} className="flex flex-1 flex-col items-center">
			<div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
				<Input
					label="Via"
					placeholder="Via, piazza, etc"
					id="street"
					type="text"
					minLength={5}
					errorMsg={serverErrors?.street}
					required
				/>
				<Input
					label="N°"
					placeholder="N°"
					id="numberAddress"
					type="number"
					min={1}
					required
					errorMsg={serverErrors?.numberAddress}
				/>
				<Input
					label="CAP"
					placeholder="CAP"
					id="postalCode"
					type="text"
					minLength={5}
					errorMsg={serverErrors?.postalCode}
					required
				/>
				<Input
					label="Provincia"
					placeholder="Provincia"
					id="province"
					type="text"
					minLength={2}
					errorMsg={serverErrors?.province}
					required
				/>
				<Input
					label="Città"
					placeholder="Città"
					id="city"
					type="text"
					minLength={2}
					errorMsg={serverErrors?.city}
					required
				/>
				<Input
					label="Nazione"
					placeholder="Nazione"
					id="country"
					type="text"
					minLength={2}
					errorMsg={serverErrors?.country}
					required
				/>
				<Input
					label="I currently live here"
					id="isLivingHere"
					type="checkbox"
					defaultChecked={true}
					errorMsg={serverErrors?.isLivingHere}
				/>
				<Input
					label="Dichiaro di essere una PEP"
					id="isPEP"
					type="checkbox"
					defaultChecked={false}
					errorMsg={serverErrors?.isPEP}
				/>
				<SubmitButton text={isSubmitting ? 'Submitting...' : 'Submit'} disabled={isSubmitting} />
			</div>
		</form>
	);
}
