'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { saveAccount, submitAccountAction, stepTwoFormAction } from './actions';
import { NewAccountType } from '@/schemas';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import IconWithTooltip from '@/components/ui/IconWithTooltip';
import faqIcon from '../../../../public/FAQ.svg';
import infoIcon from '../../../../public/Info.svg';
import ToggleInput from '@/components/ui/ToggleInput';

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
		<Card classProps="mt-6">
			<h2 className="font-semibold color-black-dark mb-1 flex">
				Indirizzo di residenza
				<IconWithTooltip
					icon={faqIcon}
					tooltipMessage="Riempi i campi del tuo indirizzo"
					classProps="ml-1"
				/>
			</h2>
			<form action={formAction} className="space-y-4 mt-4">
				{/* First row */}
				<div className="flex gap-4">
					<Input
						label="Via"
						placeholder="Via, piazza, etc"
						id="street"
						type="text"
						minLength={5}
						errorMsg={serverErrors?.street}
						required
						classProps="flex-2"
					/>
					<Input
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
					<Input
						label="CAP"
						placeholder="CAP"
						id="postalCode"
						type="text"
						minLength={5}
						errorMsg={serverErrors?.postalCode}
						required
						classProps="flex-1"
					/>
					<Input
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
				<ToggleInput
					label="I currently live here"
					id="isLivingHere"
					type="checkbox"
					defaultChecked={false}
					errorMsg={serverErrors?.isLivingHere}
					classProps="py-4 border-b-1 border-[#e5e5e5]"
				/>
				<ToggleInput
					label="Dichiaro di essere una PEP"
					id="isPEP"
					type="checkbox"
					defaultChecked={false}
					errorMsg={serverErrors?.isPEP}
					classProps="pb-2"
					startIcon={
						<IconWithTooltip
							icon={infoIcon}
							tooltipMessage="Persona politicamente esposta"
							classProps="ml-1"
						/>
					}
				/>
				<SubmitButton text={isSubmitting ? 'Submitting...' : 'Salva'} disabled={isSubmitting} />
			</form>
		</Card>
	);
}
