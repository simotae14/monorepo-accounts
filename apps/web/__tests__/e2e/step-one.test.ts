import { TestUtils } from './utils';

describe('Homepage E2E Tests', () => {
	let utils: TestUtils;

	beforeEach(async () => {
		utils = new TestUtils(global.page);
		await utils.navigateToPage('/form');
	});

	test('should display the homepage', async () => {
		await utils.waitForSelector('body');
		expect(global.page.url()).toBe('http://localhost:3000/form');
	});

	test('should have proper page title', async () => {
		const title = await global.page.title();
		expect(title).toBe('Scalapay checkout');
	});

	test('shoud have the proper input fields', async () => {
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

	test('shoud fill the input fields with invalid data', async () => {
		// the email field
		await utils.waitForSelector('input[name="email"]');
		const email = await global.page.$('input[name="email"]');
		await email?.type('invalid@email.com');

		// the firstName field
		await utils.waitForSelector('input[name="firstName"]');
		const firstName = await global.page.$('input[name="firstName"]');
		await firstName?.type('123'); // Invalid: numbers instead of letters

		// the lastName field
		await utils.waitForSelector('input[name="lastName"]');
		const lastName = await global.page.$('input[name="lastName"]');
		await lastName?.type('123'); // Invalid: numbers instead of letters

		// the dateOfBirth field
		await utils.waitForSelector('input[name="dateOfBirth"]');
		const dateOfBirth = await global.page.$('input[name="dateOfBirth"]');
		await dateOfBirth?.type('30/05/2045'); // Invalid: future date

		// the fiscalCode field
		await utils.waitForSelector('input[name="fiscalCode"]');
		const fiscalCode = await global.page.$('input[name="fiscalCode"]');
		await fiscalCode?.type('1234567890123456'); // Invalid: too short

		// Click the Continua button
		const submitButton = await global.page.$('input[name="fiscalCode"]');

		const innerText = await page.evaluate(() => {
			const el = document.querySelector('form');
			return el?.innerHTML;
		});
		console.log(JSON.stringify(innerText, null, 2));
	});
});
