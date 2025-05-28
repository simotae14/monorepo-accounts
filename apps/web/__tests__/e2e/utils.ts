import { Page, ElementHandle } from 'puppeteer';

export interface TestConfig {
	baseUrl: string;
	timeout: number;
	viewport: {
		width: number;
		height: number;
	};
}

export const DEFAULT_CONFIG: TestConfig = {
	baseUrl: process.env.BASE_URL || 'http://localhost:3000',
	timeout: 10000,
	viewport: {
		width: 375,
		height: 1077,
	},
};

export class TestUtils {
	constructor(private page: Page) {}

	async navigateToPage(path: string = '/'): Promise<void> {
		const url = `${DEFAULT_CONFIG.baseUrl}${path}`;
		await this.page.goto(url, {
			waitUntil: 'networkidle0',
			timeout: DEFAULT_CONFIG.timeout,
		});
	}

	async waitForSelector(selector: string, timeout?: number): Promise<void> {
		await this.page.waitForSelector(selector, {
			timeout: timeout || DEFAULT_CONFIG.timeout,
		});
	}

	async clickAndWait(selector: string, waitForNavigation: boolean = false): Promise<void> {
		if (waitForNavigation) {
			await Promise.all([
				this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
				this.page.click(selector),
			]);
		} else {
			await this.page.click(selector);
		}
	}

	async fillForm(formData: Record<string, string>): Promise<void> {
		for (const [selector, value] of Object.entries(formData)) {
			await this.page.evaluate(sel => {
				const element = document.querySelector(sel) as HTMLInputElement;
				if (element) element.value = '';
			}, selector);
			await this.page.type(selector, value);
		}
	}

	async getText(selector: string): Promise<string> {
		return await this.page.$eval(selector, el => el.textContent || '');
	}

	async getInputValue(selector: string): Promise<string> {
		return await this.page.$eval(selector, (el: Element) => (el as HTMLInputElement).value || '');
	}

	async waitForText(selector: string, expectedText: string): Promise<void> {
		await this.page.waitForFunction(
			(sel, text) => {
				const element = document.querySelector(sel);
				return element && element.textContent?.includes(text);
			},
			{ timeout: DEFAULT_CONFIG.timeout },
			selector,
			expectedText,
		);
	}

	async findByText(text: string, selector: string = '*'): Promise<ElementHandle<Element> | null> {
		const handle = await this.page.evaluateHandle(
			(text, selector) => {
				const elements = document.querySelectorAll(selector);
				return Array.from(elements).find(element => element.textContent?.includes(text)) || null;
			},
			text,
			selector,
		);

		const element = await handle.asElement();
		return element as ElementHandle<Element> | null;
	}
}
