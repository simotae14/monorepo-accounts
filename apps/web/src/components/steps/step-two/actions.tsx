'use server';
import { NewAccountType, stepOneSchema, stepTwoSchema } from '@/schemas';
import { FormErrors } from '@/types';

export type SubmitAccountActionReturnType = {
	redirectedStep?: number;
	errorMsg?: string;
	success?: boolean;
};

/*
 * The aim of this function is to revalidate all the form before the submission.
 * It covers the case when we change some of the values in the localStorage with invalid data
 * and then we refresh the data and try to submit all the form with invalide data
 */
export const submitAccountAction = async (
	account: NewAccountType,
): Promise<SubmitAccountActionReturnType> => {
	const stepOneValidated = await stepOneSchema.safeParseAsync(account);

	// if there are some validation errors in step one it redirects to step one showing an error message
	if (!stepOneValidated.success) {
		return {
			redirectedStep: 1,
			errorMsg: 'Please, there are some validation errors in the account details',
		};
	}

	const stepTwoValidated = stepTwoSchema.safeParse(account);

	// if there are some validation errors in step two it redirects to step two showing an error message
	if (!stepTwoValidated.success) {
		return {
			redirectedStep: 2,
			errorMsg: 'Please, there are some validation errors in the address details',
		};
	}

	return {
		success: true,
		redirectedStep: 1,
	};
};

export const stepTwoFormAction = async (
	prevState: FormErrors | undefined, // in the previous state we can have form errors or undefined
	formData: FormData, // the real data submitted from the form
): Promise<FormErrors | undefined> => {
	// take all the items in our formdata and convert them into an object of validated data
	const data = Object.fromEntries(formData.entries());
	// it validates the data, can return the data or the errors
	const validated = stepTwoSchema.safeParse(data);

	if (!validated.success) {
		const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
			const path = issue.path[0] as string;
			acc[path] = issue.message;
			return acc;
		}, {});
		return errors;
	}
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
