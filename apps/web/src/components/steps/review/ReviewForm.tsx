'use client';

import * as React from 'react';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { saveAccount, submitAccountAction } from './actions';
import { NewAccountType } from '@/schemas';
import toast from 'react-hot-toast';

function ReviewForm() {
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

	const handleFormSubmit = async () => {
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
	};
	return (
		<form
			action={handleFormSubmit}
			className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]"
		>
			<p className="text-white/90">Email: {email}</p>
			<p className="text-white/90">Nome: {firstName}</p>
			<p className="text-white/90">Cognome: {lastName}</p>
			<p className="text-white/90">Data di nascita: {dateOfBirth}</p>
			<p className="text-white/90">Codice Fiscale: {fiscalCode}</p>
			<p className="text-white/90">Via: {street}</p>
			<p className="text-white/90">N°: {numberAddress}</p>
			<p className="text-white/90">CAP: {postalCode}</p>
			<p className="text-white/90">Provincia: {province}</p>
			<p className="text-white/90">Città: {city}</p>
			<p className="text-white/90">Nazione: {country}</p>
			<p className="text-white/90">I currently live here: {isLivingHere ? 'Yes' : 'No'}</p>
			<p className="text-white/90">Dichiaro di essere una PEP: {isPEP ? 'Yes' : 'No'}</p>
			<SubmitButton text={isSubmitting ? 'Submitting...' : 'Submit'} disabled={isSubmitting} />
		</form>
	);
}

export default ReviewForm;
