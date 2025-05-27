'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { stepTwoFormAction } from './actions';

const initialState: FormErrors = {};

export default function StepTwoForm() {
	const [serverErrors, formAction] = React.useActionState(stepTwoFormAction, initialState);

	const { nextStep } = useAccountStore();

	React.useEffect(() => {
		if (!serverErrors) {
			nextStep();
		}
	}, [serverErrors, nextStep]);

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
				<SubmitButton text="Continue" />
			</div>
		</form>
	);
}
