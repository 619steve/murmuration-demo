import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.locator('.title', { hasText: 'Products' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async isOnProductsPage() {
        await expect(this.productsTitle).toBeVisible();
    }
}