'use server';
import { stepTwoSchema } from '@/schemas';
import { FormErrors } from '@/types';

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
