import { TestUtils } from './utils';

describe('Homepage E2E Tests', () => {
	let utils: TestUtils;

	beforeEach(async () => {
		utils = new TestUtils(global.page);
		await utils.navigateToPage('/');
	});

	test('should display the homepage', async () => {
		await utils.waitForSelector('body');
		expect(global.page.url()).toBe('http://localhost:3000/');
	});

	test('should have proper page title', async () => {
		const title = await global.page.title();
		expect(title).toBe('Scalapay checkout');
	});

	test('should have a link to the form page', async () => {
		await utils.waitForSelector('a[href="/form"]');
		const link = await global.page.$('a[href="/form"]');
		expect(link).toBeTruthy();
	});

	test('should have correct link text content', async () => {
		await utils.waitForSelector('a[href="/form"]');
		const linkText = await utils.getText('a[href="/form"]');
		expect(linkText).toBeTruthy();
		expect(linkText).toContain('Crea il tuo account');
	});

	test('should navigate to form page when clicking the link', async () => {
		await utils.waitForSelector('a[href="/form"]');

		await Promise.all([
			global.page.waitForNavigation({ waitUntil: 'networkidle0' }),
			utils.clickAndWait('a[href="/form"]', true),
		]);

		expect(global.page.url()).toBe('http://localhost:3000/form');
	});
});
