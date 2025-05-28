import { stepOneFormAction } from '../actions';

describe('stepOneFormAction', () => {
	it('should return validation errors for invalid data', async () => {
		const formData = new FormData();
		formData.append('email', 'invalid-email');
		formData.append('firstName', 'J');
		formData.append('lastName', 'D');
		formData.append('dateOfBirth', '2020-01-01'); // Not an adult
		formData.append('fiscalCode', 'invalid-fiscal-code');

		const result = await stepOneFormAction(undefined, formData);

		expect(result).toBeDefined();
		expect(result).toHaveProperty('email');
		expect(result).toHaveProperty('firstName');
		expect(result).toHaveProperty('lastName');
		expect(result).toHaveProperty('dateOfBirth');
		expect(result).toHaveProperty('fiscalCode');
	});

	it('should return undefined for valid data', async () => {
		const formData = new FormData();
		formData.append('email', 'test@example.com');
		formData.append('firstName', 'John');
		formData.append('lastName', 'Doe');
		formData.append('dateOfBirth', '1990-01-01');
		formData.append('fiscalCode', 'ABCDEF85S14F112Y');

		const result = await stepOneFormAction(undefined, formData);

		expect(result).toBeUndefined();
	});

	it('should handle empty form data', async () => {
		const formData = new FormData();
		const result = await stepOneFormAction(undefined, formData);

		expect(result).toBeDefined();
		expect(result).toHaveProperty('email');
		expect(result).toHaveProperty('firstName');
		expect(result).toHaveProperty('lastName');
		expect(result).toHaveProperty('dateOfBirth');
		expect(result).toHaveProperty('fiscalCode');
	});
});
