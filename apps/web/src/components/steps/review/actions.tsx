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
	const stepOneValidated = await stepOneSchema.safeParseAsync(account);

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
	const response = await fetch('http://localhost:4000/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newAccount),
	});

	if (!response.ok) {
		const errorText = await response.text();

		let errorMessage;
		try {
			const errorJson = JSON.parse(errorText);
			// Extract validation messages if they exist (for 400 errors)
			if (errorJson.message && Array.isArray(errorJson.message)) {
				errorMessage = errorJson.message.join('\n');
			} else if (errorJson.message) {
				errorMessage = errorJson.message;
			} else {
				errorMessage = errorText;
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			errorMessage = errorText;
		}

		// Throw specific errors based on status code
		if (response.status === 400) {
			throw new Error(`Validation failed: ${errorMessage}`);
		} else if (response.status >= 500) {
			throw new Error(`Server error: ${errorMessage}`);
		} else {
			throw new Error(`Request failed (${response.status}): ${errorMessage}`);
		}
	}

	const result = await response.json();
	return result;
}
