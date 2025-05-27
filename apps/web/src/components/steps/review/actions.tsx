'use server';

import { NewAccountType, stepOneSchema, stepTwoSchema } from '@/schemas';

export type SubmitAccountActionReturnType = {
	redirectedStep?: number;
	errorMsg?: string;
	success?: boolean;
};

export const submitAccountAction = async (
	account: NewAccountType,
): Promise<SubmitAccountActionReturnType> => {
	const stepOneValidated = stepOneSchema.safeParse(account);

	// if there are some validation errors in step one it redirects to step one showing an error message
	if (!stepOneValidated.success) {
		return {
			redirectedStep: 1,
			errorMsg: 'Please validate product info',
		};
	}

	const stepTwoValidated = stepTwoSchema.safeParse(account);

	// if there are some validation errors in step two it redirects to step two showing an error message
	if (!stepTwoValidated.success) {
		return {
			redirectedStep: 2,
			errorMsg: 'Please validate coupon details',
		};
	}

	return {
		success: true,
		redirectedStep: 1,
	};
};

export async function saveAccount(newAccount: Partial<NewAccountType>) {
	const response = await fetch('http://localhost:3000/api/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ newAccount }),
	});

	const result = await response.json();

	return result;
}
