'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/ui/Submit';
import { useAccountStore } from '@/store';
import { stepOneFormAction } from './actions';
import Card from '@/components/ui/Card';
import DatePicker from '@/components/ui/DatePicker';

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
		<Card classProps="mt-6">
			<h2 className="font-semibold color-black-dark mb-1">Crea account</h2>
			<form action={formAction} className="space-y-4 mt-4">
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
				<DatePicker
					label="Data di nascita (DD/MM/YYYY)"
					placeholder="Data di nascita"
					id="dateOfBirth"
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

				<SubmitButton text="Continua" />
			</form>
		</Card>
	);
}
