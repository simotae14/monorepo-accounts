import {
	stepOneSchema,
	stepTwoSchema,
	newAccountSchema,
	newAccountInitialValuesSchema,
} from './schemas';

describe('Step One Schema Validation', () => {
	const validStepOneData = {
		email: 'test@example.com',
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-01-01',
		fiscalCode: 'ABCDEF85S14F112Y',
	};

	it('should validate correct data', async () => {
		const result = await stepOneSchema.safeParseAsync(validStepOneData);
		expect(result.success).toBe(true);
	});

	it('should reject invalid email', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			email: 'invalid-email',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty email', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			email: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid first name', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			firstName: 'J0hn', // contains number
		});
		expect(result.success).toBe(false);
	});

	it('should reject first name shorter than 2 characters', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			firstName: 'J',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty first name', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			firstName: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid last name', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			lastName: 'D03', // contains number
		});
		expect(result.success).toBe(false);
	});

	it('should reject last name shorter than 2 characters', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			lastName: 'D',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty last name', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			lastName: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid date of birth (under 18)', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '2020-01-01',
		});
		expect(result.success).toBe(false);
	});

	it('should reject future date of birth', async () => {
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 1);
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: futureDate.toISOString(),
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid date format', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: 'invalid-date',
		});
		expect(result.success).toBe(false);
	});

	it('should accept valid date with timezone', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-01-01T00:00:00.000Z',
		});
		expect(result.success).toBe(true);
	});

	it('should reject invalid date with invalid month', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-13-01',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid date with invalid day', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-01-32',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date before 1900', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1899-01-01',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid fiscal code format', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			fiscalCode: 'INVALID123',
		});
		expect(result.success).toBe(false);
	});

	it('should reject fiscal code shorter than 16 characters', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			fiscalCode: 'ABCDEF85S14F112',
		});
		expect(result.success).toBe(false);
	});

	it('should reject fiscal code longer than 16 characters', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			fiscalCode: 'ABCDEF85S14F112YY',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty fiscal code', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			fiscalCode: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject missing required fields', async () => {
		const result = await stepOneSchema.safeParseAsync({});
		expect(result.success).toBe(false);
	});

	it('should reject empty date of birth', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date with month less than 1', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-00-01',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date with month greater than 12', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-13-01',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date with day less than 1', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-01-00',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date with day greater than 31', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-01-32',
		});
		expect(result.success).toBe(false);
	});

	it('should reject date that was auto-corrected', async () => {
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: '1990-02-30', // February 30th doesn't exist
		});
		expect(result.success).toBe(false);
	});

	it('should correctly calculate age when birthday is in the future this year', async () => {
		const today = new Date();
		// Create a date that's 17 years and 364 days old (just under 18)
		const birthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate() - 1);
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: birthDate.toISOString().split('T')[0],
		});
		expect(result.success).toBe(false);
	});

	it('should correctly calculate age when birthday is today', async () => {
		const today = new Date();
		const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: birthDate.toISOString().split('T')[0],
		});
		expect(result.success).toBe(true);
	});

	it('should correctly calculate age when birthday was yesterday', async () => {
		const today = new Date();
		const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() - 1);
		const result = await stepOneSchema.safeParseAsync({
			...validStepOneData,
			dateOfBirth: birthDate.toISOString().split('T')[0],
		});
		expect(result.success).toBe(true);
	});
});

describe('Step Two Schema Validation', () => {
	const validStepTwoData = {
		street: 'Main Street',
		numberAddress: 123,
		postalCode: '12345',
		province: 'Milan',
		city: 'Rome',
		country: 'IT',
		isLivingHere: true,
		isPEP: false,
	};

	it('should validate correct data', () => {
		const result = stepTwoSchema.safeParse(validStepTwoData);
		expect(result.success).toBe(true);
	});

	it('should reject invalid street name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			street: '123 Street', // contains number
		});
		expect(result.success).toBe(false);
	});

	it('should reject street name shorter than 5 characters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			street: 'Main',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty street name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			street: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject negative number address', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			numberAddress: -1,
		});
		expect(result.success).toBe(false);
	});

	it('should reject zero number address', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			numberAddress: 0,
		});
		expect(result.success).toBe(false);
	});

	it('should accept string number address (coerced to number)', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			numberAddress: '123', // string will be coerced to number
		});
		expect(result.success).toBe(true);
	});

	it('should reject invalid number address that cannot be coerced', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			numberAddress: 'not-a-number',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid postal code', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			postalCode: '1234', // too short
		});
		expect(result.success).toBe(false);
	});

	it('should reject postal code with letters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			postalCode: '1234A',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty postal code', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			postalCode: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid province name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			province: 'M1lan', // contains number
		});
		expect(result.success).toBe(false);
	});

	it('should reject province name shorter than 2 characters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			province: 'M',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty province name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			province: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid city name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			city: 'R0me', // contains number
		});
		expect(result.success).toBe(false);
	});

	it('should reject city name shorter than 2 characters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			city: 'R',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty city name', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			city: '',
		});
		expect(result.success).toBe(false);
	});

	it('should reject invalid country code', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			country: 'XX', // not in COUNTRY_CODES
		});
		expect(result.success).toBe(false);
	});

	it('should reject country code shorter than 2 characters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			country: 'I',
		});
		expect(result.success).toBe(false);
	});

	it('should reject country code longer than 2 characters', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			country: 'ITA',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty country code', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			country: '',
		});
		expect(result.success).toBe(false);
	});

	it('should accept optional boolean fields', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			isLivingHere: undefined,
			isPEP: undefined,
		});
		expect(result.success).toBe(true);
	});

	it('should accept string boolean for isLivingHere (coerced to boolean)', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			isLivingHere: 'true', // string will be coerced to boolean
		});
		expect(result.success).toBe(true);
	});

	it('should accept string boolean for isPEP (coerced to boolean)', () => {
		const result = stepTwoSchema.safeParse({
			...validStepTwoData,
			isPEP: 'false', // string will be coerced to boolean
		});
		expect(result.success).toBe(true);
	});

	it('should accept various truthy values for boolean fields', () => {
		const truthyValues = ['true', '1', 'yes', 'on', 1, true];
		truthyValues.forEach(value => {
			const result = stepTwoSchema.safeParse({
				...validStepTwoData,
				isLivingHere: value,
			});
			expect(result.success).toBe(true);
		});
	});

	it('should accept various falsy values for boolean fields', () => {
		const falsyValues = ['false', '0', 'no', 'off', 0, false];
		falsyValues.forEach(value => {
			const result = stepTwoSchema.safeParse({
				...validStepTwoData,
				isLivingHere: value,
			});
			expect(result.success).toBe(true);
		});
	});

	it('should accept all valid country codes', () => {
		const validCountries = ['IT', 'ES', 'DE', 'PT', 'FR'];
		validCountries.forEach(country => {
			const result = stepTwoSchema.safeParse({
				...validStepTwoData,
				country,
			});
			expect(result.success).toBe(true);
		});
	});

	it('should reject missing required fields', () => {
		const result = stepTwoSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});

describe('New Account Schema Validation', () => {
	const validNewAccountData = {
		email: 'test@example.com',
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-01-01',
		fiscalCode: 'ABCDEF85S14F112Y',
		street: 'Main Street',
		numberAddress: 123,
		postalCode: '12345',
		province: 'Milan',
		city: 'Rome',
		country: 'IT',
		isLivingHere: true,
		isPEP: false,
	};

	it('should validate complete correct data', async () => {
		const result = await newAccountSchema.safeParseAsync(validNewAccountData);
		expect(result.success).toBe(true);
	});

	it('should reject incomplete data', async () => {
		const result = await newAccountSchema.safeParseAsync({
			email: 'test@example.com',
			// missing required fields
		});
		expect(result.success).toBe(false);
	});

	it('should reject data with invalid email', async () => {
		const result = await newAccountSchema.safeParseAsync({
			...validNewAccountData,
			email: 'invalid-email',
		});
		expect(result.success).toBe(false);
	});

	it('should reject data with invalid fiscal code', async () => {
		const result = await newAccountSchema.safeParseAsync({
			...validNewAccountData,
			fiscalCode: 'INVALID123',
		});
		expect(result.success).toBe(false);
	});

	it('should reject data with invalid address', async () => {
		const result = await newAccountSchema.safeParseAsync({
			...validNewAccountData,
			street: '123 Street',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty object', async () => {
		const result = await newAccountSchema.safeParseAsync({});
		expect(result.success).toBe(false);
	});

	it('should reject invalid types for all fields', async () => {
		const result = await newAccountSchema.safeParseAsync({
			email: 123,
			firstName: 456,
			lastName: 789,
			dateOfBirth: true,
			fiscalCode: [],
			street: {},
			numberAddress: 'not-a-number',
			postalCode: 12345,
			province: 123,
			city: 456,
			country: 789,
			isLivingHere: 'not-a-boolean',
			isPEP: 'not-a-boolean',
		});
		expect(result.success).toBe(false);
	});
});

describe('New Account Initial Values Schema Validation', () => {
	it('should accept empty object', () => {
		const result = newAccountInitialValuesSchema.safeParse({});
		expect(result.success).toBe(true);
	});

	it('should accept partial data', () => {
		const result = newAccountInitialValuesSchema.safeParse({
			email: 'test@example.com',
			firstName: 'John',
		});
		expect(result.success).toBe(true);
	});

	it('should accept all fields as optional', () => {
		const result = newAccountInitialValuesSchema.safeParse({
			email: 'test@example.com',
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			fiscalCode: 'ABCDEF85S14F112Y',
			street: 'Main Street',
			numberAddress: 123,
			postalCode: '12345',
			province: 'Milan',
			city: 'Rome',
			country: 'IT',
			isLivingHere: true,
			isPEP: false,
		});
		expect(result.success).toBe(true);
	});

	it('should accept undefined values for all fields', () => {
		const result = newAccountInitialValuesSchema.safeParse({
			email: undefined,
			firstName: undefined,
			lastName: undefined,
			dateOfBirth: undefined,
			fiscalCode: undefined,
			street: undefined,
			numberAddress: undefined,
			postalCode: undefined,
			province: undefined,
			city: undefined,
			country: undefined,
			isLivingHere: undefined,
			isPEP: undefined,
		});
		expect(result.success).toBe(true);
	});

	it('should reject invalid types for all fields', () => {
		const result = newAccountInitialValuesSchema.safeParse({
			email: 123,
			firstName: 456,
			lastName: 789,
			dateOfBirth: true,
			fiscalCode: [],
			street: {},
			numberAddress: 'not-a-number',
			postalCode: 12345,
			province: 123,
			city: 456,
			country: 789,
			isLivingHere: 'not-a-boolean',
			isPEP: 'not-a-boolean',
		});
		expect(result.success).toBe(false);
	});
});
