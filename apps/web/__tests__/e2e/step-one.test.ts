import { TestUtils } from './utils';

describe('Homepage E2E Tests', () => {
	let utils: TestUtils;

	beforeEach(async () => {
		utils = new TestUtils(global.page);
		await utils.navigateToPage('/form');

		// Clear localStorage before each test
		await global.page.evaluate(() => {
			window.localStorage.clear();
		});
	});

	afterEach(async () => {
		// Clear localStorage after each test
		await global.page.evaluate(() => {
			window.localStorage.clear();
		});
	});

	test('should display the homepage', async () => {
		await utils.waitForSelector('body');
		expect(global.page.url()).toBe('http://localhost:3000/form');
	});

	test('should have proper page title', async () => {
		const title = await global.page.title();
		expect(title).toBe('Scalapay checkout');
	});

	test('should have the proper input fields', async () => {
		// the email field
		await utils.waitForSelector('input[name="email"]');
		const email = await global.page.$('input[name="email"]');
		expect(email).toBeTruthy();

		// the firstName field
		await utils.waitForSelector('input[name="firstName"]');
		const firstName = await global.page.$('input[name="firstName"]');
		expect(firstName).toBeTruthy();

		// the lastName field
		await utils.waitForSelector('input[name="lastName"]');
		const lastName = await global.page.$('input[name="lastName"]');
		expect(lastName).toBeTruthy();

		// the dateOfBirth field
		await utils.waitForSelector('input[name="dateOfBirth"]');
		const dateOfBirth = await global.page.$('input[name="dateOfBirth"]');
		expect(dateOfBirth).toBeTruthy();

		// the fiscalCode field
		await utils.waitForSelector('input[name="fiscalCode"]');
		const fiscalCode = await global.page.$('input[name="fiscalCode"]');
		expect(fiscalCode).toBeTruthy();
	});

	test('should show error messages when submitting invalid data', async () => {
		// Fill form with invalid data
		await utils.waitForSelector('input[name="email"]');
		await global.page.type('input[name="email"]', 'valid@email.com');

		await utils.waitForSelector('input[name="firstName"]');
		await global.page.type('input[name="firstName"]', '123'); // Invalid: numbers instead of letters

		await utils.waitForSelector('input[name="lastName"]');
		await global.page.type('input[name="lastName"]', '123'); // Invalid: numbers instead of letters

		await utils.waitForSelector('input[name="dateOfBirth"]');
		await global.page.type('input[name="dateOfBirth"]', '30/05/2045'); // Invalid: future date

		await utils.waitForSelector('input[name="fiscalCode"]');
		await global.page.type('input[name="fiscalCode"]', '1234567890123456'); // Invalid: too short

		// Click the submit button
		await global.page.click('button[type="submit"]');

		// Wait for form submission and error messages
		await global.page.waitForFunction(
			() => {
				const errorMessages = document.querySelectorAll('[data-testid]');
				return errorMessages.length > 0;
			},
			{ timeout: 5000 },
		);

		// Get all error messages and their content
		const errorMessages = await global.page.evaluate(() => {
			const messages = document.querySelectorAll('[data-testid]');
			return Array.from(messages).map(el => ({
				id: el.getAttribute('data-testid'),
				text: el.textContent,
			}));
		});

		// Expected error messages
		const expectedErrors = [
			{
				id: 'firstName',
				text: 'The first name accepts only letters and blank spaces, no numbers or special characters',
			},
			{
				id: 'lastName',
				text: 'The last name accepts only letters and blank space, no numbers or special characters',
			},
			{
				id: 'dateOfBirth',
				text: 'You must be at least 18 years old and the date cannot be in the future',
			},
			{
				id: 'fiscalCode',
				text: 'The fiscal code needs to respect a valid italian format',
			},
		];

		// Assert that we have the expected number of error messages
		expect(errorMessages.length).toBe(expectedErrors.length);

		// Assert each expected error message
		expectedErrors.forEach(expectedError => {
			const foundError = errorMessages.find(msg => msg.id === expectedError.id);
			expect(foundError).toBeTruthy();
			expect(foundError?.text).toBe(expectedError.text);
		});
	}, 3000);

	test('should submit successfully with valid data', async () => {
		// Fill form with valid data
		await utils.waitForSelector('input[name="email"]');
		await global.page.type('input[name="email"]', 'test@example.com');

		await utils.waitForSelector('input[name="firstName"]');
		await global.page.type('input[name="firstName"]', 'John');

		await utils.waitForSelector('input[name="lastName"]');
		await global.page.type('input[name="lastName"]', 'Doe');

		await utils.waitForSelector('input[name="dateOfBirth"]');
		await global.page.type('input[name="dateOfBirth"]', '01/01/1990');

		await utils.waitForSelector('input[name="fiscalCode"]');
		await global.page.type('input[name="fiscalCode"]', 'ABCDEF85S14F112Y');

		// Click the submit button
		await global.page.click('button[type="submit"]');

		// Verify we moved to the next step
		await utils.waitForSelector('input[name="street"]');
		const street = await global.page.$('input[name="street"]');
		expect(street).toBeTruthy();

		// Verify localStorage was updated
		const localStorageData = await global.page.evaluate(() => {
			return window.localStorage.getItem('scalapay-form-demo-newAccountData');
		});
		expect(localStorageData).toBeTruthy();
	}, 5000);

	test('should submit successfully with valid data using keyboard navigation', async () => {
		// Wait for the form to be ready
		await utils.waitForSelector('input[name="email"]');

		// Focus the first input (email)
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="email"]', 'test@example.com');

		// Tab to next field and fill it
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="firstName"]', 'John');

		// Tab to next field and fill it
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="lastName"]', 'Doe');

		// Tab to next field and fill it
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="dateOfBirth"]', '01/01/1990');

		// Tab to next field and fill it
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="fiscalCode"]', 'ABCDEF85S14F112Y');

		// Tab to submit button and press Enter
		await global.page.keyboard.press('Tab');
		await global.page.keyboard.press('Enter');

		// Verify we moved to the next step
		await utils.waitForSelector('input[name="street"]');
		const street = await global.page.$('input[name="street"]');
		expect(street).toBeTruthy();

		// Verify localStorage was updated
		const localStorageData = await global.page.evaluate(() => {
			return window.localStorage.getItem('scalapay-form-demo-newAccountData');
		});
		expect(localStorageData).toBeTruthy();
	}, 5000);
});
