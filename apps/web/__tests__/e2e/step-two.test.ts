import { TestUtils } from './utils';

describe('Homepage E2E Tests', () => {
	let utils: TestUtils;

	beforeEach(async () => {
		utils = new TestUtils(global.page);

		// Enable request interception
		await global.page.setRequestInterception(true);

		// Listen for requests
		global.page.on('request', request => {
			// If it's the submit API call, respond with a mock success
			if (request.url() === 'http://localhost:4000/submit' && request.method() === 'POST') {
				request.respond({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({
						success: true,
						redirectTo: '/form',
						step: 1,
					}),
				});
			} else {
				// Let other requests continue normally
				request.continue();
			}
		});

		// Navigate to the page first
		await utils.navigateToPage('/form');

		// Set localStorage using Puppeteer's evaluate
		await global.page.evaluate(() => {
			localStorage.setItem(
				'scalapay-form-demo-newAccountData',
				'{"state":{"newAccountData":{"email":"test@example.com","firstName":"John","lastName":"Doe","dateOfBirth":"1990-01-01","fiscalCode":"ABCDEF85S14F112Y","street":"","postalCode":"","province":"","city":"","country":"","isLivingHere":false,"isPEP":false},"step":2},"version":0}',
			);
		});

		// Reload the page to apply the localStorage changes
		await global.page.reload();

		// Wait for the page to be ready
		await global.page.waitForFunction(() => {
			return document.readyState === 'complete';
		});
	});

	afterEach(async () => {
		// Disable request interception
		await global.page.setRequestInterception(false);

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
		// the street field
		await utils.waitForSelector('input[name="street"]');
		const street = await global.page.$('input[name="street"]');
		expect(street).toBeTruthy();

		// the numberAddress field
		await utils.waitForSelector('input[name="numberAddress"]');
		const numberAddress = await global.page.$('input[name="numberAddress"]');
		expect(numberAddress).toBeTruthy();

		// the postalCode field
		await utils.waitForSelector('input[name="postalCode"]');
		const postalCode = await global.page.$('input[name="postalCode"]');
		expect(postalCode).toBeTruthy();

		// the province field
		await utils.waitForSelector('input[name="province"]');
		const province = await global.page.$('input[name="province"]');
		expect(province).toBeTruthy();

		// the city field
		await utils.waitForSelector('input[name="city"]');
		const city = await global.page.$('input[name="city"]');
		expect(city).toBeTruthy();

		// the country field
		await utils.waitForSelector('input[name="country"]');
		const country = await global.page.$('input[name="country"]');
		expect(country).toBeTruthy();

		// the isLivingHere field
		await utils.waitForSelector('input[name="isLivingHere"]');
		const isLivingHere = await global.page.$('input[name="isLivingHere"]');
		expect(isLivingHere).toBeTruthy();

		// the isPEP field
		await utils.waitForSelector('input[name="isPEP"]');
		const isPEP = await global.page.$('input[name="isPEP"]');
		expect(isPEP).toBeTruthy();
	});

	test('should show error messages when submitting invalid data', async () => {
		// the street field
		await utils.waitForSelector('input[name="street"]');
		await global.page.type('input[name="street"]', 'Via A. Maj');

		// the postalCode field
		await utils.waitForSelector('input[name="numberAddress"]');
		await global.page.type('input[name="numberAddress"]', '4');

		// the postalCode field
		await utils.waitForSelector('input[name="postalCode"]');
		await global.page.type('input[name="postalCode"]', '111111');

		// the province field
		await utils.waitForSelector('input[name="province"]');
		await global.page.type('input[name="province"]', 'Cal1f0rn1a');

		// the city field
		await utils.waitForSelector('input[name="city"]');
		await global.page.type('input[name="city"]', 'R0m4');

		// the country field
		await utils.waitForSelector('input[name="country"]');
		await global.page.type('input[name="country"]', 'US');

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
				id: 'postalCode',
				text: 'The postal code needs to be 5 characters long',
			},
			{
				id: 'province',
				text: 'The province name accepts only letters and blank space, no numbers or special characters',
			},
			{
				id: 'city',
				text: 'The city name accepts only letters and blank space, no numbers or special characters',
			},
			{
				id: 'country',
				text: 'Country must be one of: IT, ES, DE, PT, FR',
			},
		];

		// Assert each expected error message
		expectedErrors.forEach(expectedError => {
			const foundError = errorMessages.find(msg => msg.id === expectedError.id);
			expect(foundError).toBeTruthy();
			expect(foundError?.text).toBe(expectedError.text);
		});
	}, 5000);

	test('should submit successfully with valid data', async () => {
		// Fill form with valid data
		// the street field
		await utils.waitForSelector('input[name="street"]');
		await global.page.type('input[name="street"]', 'Via A Maj');

		// the postalCode field
		await utils.waitForSelector('input[name="numberAddress"]');
		await global.page.type('input[name="numberAddress"]', '4');

		// the postalCode field
		await utils.waitForSelector('input[name="postalCode"]');
		await global.page.type('input[name="postalCode"]', '24000');

		// the province field
		await utils.waitForSelector('input[name="province"]');
		await global.page.type('input[name="province"]', 'California');

		// the city field
		await utils.waitForSelector('input[name="city"]');
		await global.page.type('input[name="city"]', 'Roma');

		// the country field
		await utils.waitForSelector('input[name="country"]');
		await global.page.type('input[name="country"]', 'IT');

		// Click the submit button
		await global.page.click('button[type="submit"]');

		// Wait for the success toast to appear
		await global.page.waitForFunction(
			() => {
				const toast = document.querySelector('[role="status"]');
				return toast && toast.textContent?.includes('Account submitted successfully');
			},
			{ timeout: 5000 },
		);

		// Verify the toast message
		const toastMessage = await global.page.evaluate(() => {
			const toast = document.querySelector('[role="status"]');
			return toast?.textContent;
		});
		expect(toastMessage).toContain('Account submitted successfully');
	}, 30000);

	test('should submit successfully with valid data using keyboard navigation', async () => {
		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="street"]', 'Via A Maj');

		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="numberAddress"]', '4');

		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="postalCode"]', '24000');

		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="province"]', 'California');

		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="city"]', 'Roma');

		await global.page.keyboard.press('Tab');
		await global.page.type('input[name="country"]', 'IT');

		// Tab to submit button and press Enter
		await global.page.keyboard.press('Tab');
		await global.page.keyboard.press('Enter');

		// Wait for the success toast to appear
		await global.page.waitForFunction(
			() => {
				const toast = document.querySelector('[role="status"]');
				return toast && toast.textContent?.includes('Account submitted successfully');
			},
			{ timeout: 5000 },
		);

		// Verify the toast message
		const toastMessage = await global.page.evaluate(() => {
			const toast = document.querySelector('[role="status"]');
			return toast?.textContent;
		});
		expect(toastMessage).toContain('Account submitted successfully');
	}, 5000);
});
