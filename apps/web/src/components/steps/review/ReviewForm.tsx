'use client';

import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { submitAccountAction } from './actions';
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

	const handleFormSubmit = async () => {
		// submit to action
		const { success, errorMsg, redirectedStep } = await submitAccountAction(
			newAccountData as NewAccountType,
		);

		if (success) {
			try {
				// const response = await saveAccount({
				// 	name: name ?? '',
				// 	link: link ?? '',
				// 	coupon: coupon ?? '',
				// 	discount: discount,
				// 	contactName: contactName ?? '',
				// 	contactEmail: contactEmail ?? '',
				// });
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
			<SubmitButton text="Submit" />
		</form>
	);
}

export default ReviewForm;
