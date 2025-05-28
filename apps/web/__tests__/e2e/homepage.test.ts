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
		expect(title).toBeTruthy();
	});
});
