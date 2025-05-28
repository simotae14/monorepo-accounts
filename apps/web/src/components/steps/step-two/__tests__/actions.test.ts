import { submitAccountAction, stepTwoFormAction, saveAccount } from '../actions';
import { NewAccountType } from '@/schemas';

// Mock fetch
global.fetch = jest.fn();

describe('stepTwoFormAction', () => {
	it('should return validation errors for invalid data', async () => {
		const formData = new FormData();
		formData.append('street', 'St');
		formData.append('numberAddress', '0');
		formData.append('postalCode', '123');
		formData.append('province', 'P');
		formData.append('city', 'C');
		formData.append('country', 'XX');

		const result = await stepTwoFormAction(undefined, formData);

		expect(result).toBeDefined();
		expect(result).toHaveProperty('street');
		expect(result).toHaveProperty('numberAddress');
		expect(result).toHaveProperty('postalCode');
		expect(result).toHaveProperty('province');
		expect(result).toHaveProperty('city');
		expect(result).toHaveProperty('country');
	});

	it('should return undefined for valid data', async () => {
		const formData = new FormData();
		formData.append('street', 'Via Roma');
		formData.append('numberAddress', '123');
		formData.append('postalCode', '12345');
		formData.append('province', 'MI');
		formData.append('city', 'Milano');
		formData.append('country', 'IT');

		const result = await stepTwoFormAction(undefined, formData);

		expect(result).toBeUndefined();
	});
});

describe('submitAccountAction', () => {
	const validAccount: NewAccountType = {
		email: 'test@example.com',
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-01-01',
		fiscalCode: 'ABCDEF85S14F112Y',
		street: 'Via Roma',
		numberAddress: 123,
		postalCode: '12345',
		province: 'MI',
		city: 'Milano',
		country: 'IT',
	};

	it('should return success for valid account data', async () => {
		const result = await submitAccountAction(validAccount);

		expect(result).toEqual({
			success: true,
			redirectedStep: 1,
		});
	});

	it('should return step one errors for invalid step one data', async () => {
		const invalidAccount = {
			...validAccount,
			email: 'invalid-email',
		};

		const result = await submitAccountAction(invalidAccount);

		expect(result).toEqual({
			redirectedStep: 1,
			errorMsg: 'Please, there are some validation errors in the account details',
		});
	});

	it('should return step two errors for invalid step two data', async () => {
		const invalidAccount = {
			...validAccount,
			street: 'St',
		};

		const result = await submitAccountAction(invalidAccount);

		expect(result).toEqual({
			redirectedStep: 2,
			errorMsg: 'Please, there are some validation errors in the address details',
		});
	});
});

describe('saveAccount', () => {
	const mockAccount = {
		email: 'test@example.com',
		firstName: 'John',
		lastName: 'Doe',
	};

	beforeEach(() => {
		(global.fetch as jest.Mock).mockClear();
	});

	it('should successfully save account data', async () => {
		const mockResponse = { success: true };
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await saveAccount(mockAccount);

		expect(result).toEqual(mockResponse);
		expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mockAccount),
		});
	});

	it('should handle validation errors (400)', async () => {
		const errorMessage = ['Invalid email', 'Invalid name'];
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 400,
			text: () => Promise.resolve(JSON.stringify({ message: errorMessage })),
		});

		await expect(saveAccount(mockAccount)).rejects.toThrow(
			'Validation failed: Invalid email\nInvalid name',
		);
	});

	it('should handle server errors (500)', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 500,
			text: () => Promise.resolve('Internal Server Error'),
		});

		await expect(saveAccount(mockAccount)).rejects.toThrow('Server error: Internal Server Error');
	});

	it('should handle other errors', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 403,
			text: () => Promise.resolve('Forbidden'),
		});

		await expect(saveAccount(mockAccount)).rejects.toThrow('Request failed (403): Forbidden');
	});
});
