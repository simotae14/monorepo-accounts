import { z } from 'zod';

const isAdult = (dateOfBirth: string): boolean => {
	if (!dateOfBirth) return false;

	const birthDate = new Date(dateOfBirth);
	const today = new Date();

	// check if date is valid
	if (isNaN(birthDate.getTime())) return false;

	// Check if date is not in the future
	if (birthDate > today) return false;

	// Check if date is not an invalid date like 2000-02-30
	const dateStr = dateOfBirth.split('T')[0];
	const [year, month, day] = dateStr.split('-').map(Number);
	if (year < 1900 || year > new Date().getFullYear()) return false;
	if (month < 1 || month > 12) return false;
	if (day < 1 || day > 31) return false;

	// Check if date was auto-corrected
	if (
		!(
			birthDate.getFullYear() === year &&
			birthDate.getMonth() === month - 1 &&
			birthDate.getDate() === day
		)
	) {
		return false;
	}

	// Calculate age
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age >= 18;
};

const isValidFiscalCode = async (fiscalCode: string): Promise<boolean> => {
	if (!fiscalCode) return false;

	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 500));
	return fiscalCode === 'ABCDEF85S14F112Y';
};

const COUNTRY_CODES = ['IT', 'ES', 'DE', 'PT', 'FR'];

export const stepOneSchema = z.object({
	email: z.string().email('Please enter a valid email').nonempty('The email cannot be empty'),
	firstName: z
		.string()
		.min(2, 'Please enter a first name longer than 2 characters')
		.regex(
			/^[A-Za-z ]*$/,
			'The first name accepts only letters and blank spaces, no numbers or special characters',
		)
		.nonempty('The first name cannot be empty'),
	lastName: z
		.string()
		.min(2, 'Please enter a last name longer than 2 characters')
		.regex(
			/^[A-Za-z ]*$/,
			'The last name accepts only letters and blank space, no numbers or special characters',
		)
		.nonempty('The last name cannot be empty'),
	dateOfBirth: z
		.string()
		.nonempty('The date of birth cannot be empty')
		.datetime({ message: 'Invalid date format' })
		.or(z.string().date('Invalid date format'))
		.refine(
			date => isAdult(date),
			'You must be at least 18 years old and the date cannot be in the future',
		),
	fiscalCode: z
		.string()
		.length(16, 'The fiscal code needs to be 16 characters long')
		.regex(
			/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
			'The fiscal code needs to respect the correct format',
		)
		.nonempty('The fiscal code cannot be empty')
		.refine(
			async fiscalCode => await isValidFiscalCode(fiscalCode),
			'The fiscal code needs to respect a valid italian format',
		),
});

export const stepTwoSchema = z.object({
	street: z
		.string()
		.min(5, 'Please enter a street name longer than 5 characters')
		.regex(
			/^[A-Za-z ]*$/,
			'The street name accepts only letters and blank space, no numbers or special characters',
		)
		.nonempty('The street name cannot be empty'),
	numberAddress: z.coerce
		.number({
			message: 'Number Address must be a valid number',
		})
		.min(1, 'Number Address must be at least 1')
		.nonnegative('The number of the address cannot be empty'),
	postalCode: z
		.string()
		.length(5, 'The postal code needs to be 5 characters long')
		.regex(/^[0-9]*$/, 'The postal code accepts only digits')
		.nonempty('The postal code cannot be empty'),
	province: z
		.string()
		.min(2, 'Please enter a province name longer than 2 characters')
		.regex(
			/^[A-Za-z ]*$/,
			'The province name accepts only letters and blank space, no numbers or special characters',
		)
		.nonempty('The province name cannot be empty'),
	city: z
		.string()
		.min(2, 'Please enter a city name longer than 2 characters')
		.regex(
			/^[A-Za-z ]*$/,
			'The city name accepts only letters and blank space, no numbers or special characters',
		)
		.nonempty('The city name cannot be empty'),
	country: z
		.string()
		.length(2, 'Country must be a valid ISO 3166-1 alpha-2 code (e.g., IT, ES, DE, PT, FR)')
		.nonempty('The country name cannot be empty')
		.refine(code => COUNTRY_CODES.includes(code), 'Country must be one of: IT, ES, DE, PT, FR'),
	isLivingHere: z.coerce.boolean().optional(),
	isPEP: z.coerce.boolean().optional(),
});

export const newAccountSchema = z.object({
	...stepOneSchema.shape,
	...stepTwoSchema.shape,
});

export const newAccountInitialValuesSchema = z.object({
	email: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	dateOfBirth: z.string().optional(),
	fiscalCode: z.string().optional(),
	street: z.string().optional(),
	numberAddress: z.coerce.number().optional(),
	postalCode: z.string().optional(),
	province: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	isLivingHere: z.boolean().optional(),
	isPEP: z.boolean().optional(),
});

// the type of the form data
export type NewAccountType = z.infer<typeof newAccountSchema>;
export type NewAccountInitialValuesType = z.infer<typeof newAccountInitialValuesSchema>;
