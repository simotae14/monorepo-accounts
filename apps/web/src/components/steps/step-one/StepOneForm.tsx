'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { stepOneFormAction } from './actions';

const initialState: FormErrors = {};

export default function StepOneForm() {
	const [serverErrors, formAction] = React.useActionState(stepOneFormAction, initialState);

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
					label="Email"
					placeholder="Email"
					id="email"
					type="email"
					required
					errorMsg={serverErrors?.email}
				/>
				<Input
					label="Nome"
					placeholder="Nome"
					id="firstName"
					type="text"
					minLength={2}
					errorMsg={serverErrors?.firstName}
					required
				/>
				<Input
					label="Cognome"
					placeholder="Cognome"
					id="lastName"
					type="text"
					minLength={2}
					errorMsg={serverErrors?.lastName}
					required
				/>
				<Input
					label="Data di nascita"
					placeholder="Data di nascita (DD/MM/YYYY)"
					id="dateOfBirth"
					type="date"
					errorMsg={serverErrors?.dateOfBirth}
					required
				/>
				<Input
					label="Codice Fiscale"
					placeholder="Codice Fiscale"
					id="fiscalCode"
					type="text"
					minLength={16}
					maxLength={16}
					errorMsg={serverErrors?.fiscalCode}
					required
				/>
				<SubmitButton text="Continue" />
			</div>
		</form>
	);
}
