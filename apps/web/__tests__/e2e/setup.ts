import puppeteer, { Browser, Page } from 'puppeteer';

declare global {
	// eslint-disable-next-line no-var
	var browser: Browser;
	// eslint-disable-next-line no-var
	var page: Page;
}

let browser: Browser;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: false, // process.env.CI === 'true',
		slowMo: 0, //process.env.CI === 'true' ? 0 : 50,
		devtools: false, // process.env.NODE_ENV === 'development',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--window-size=375,1077',
		],
	});
	global.browser = browser;
}, 60000);

beforeEach(async () => {
	const page = await browser.newPage();
	await page.setViewport({ width: 375, height: 1077 });
	page.setDefaultNavigationTimeout(10000);
	page.setDefaultTimeout(10000);
	global.page = page;
}, 30000);

afterEach(async () => {
	if (global.page) {
		await global.page.close();
	}
});

afterAll(async () => {
	if (browser) {
		await browser.close();
	}
}, 10000);
