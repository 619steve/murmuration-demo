import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from './loginPage';

export class ProductsPage {
    readonly page: Page;
    readonly productsTitle: Locator;
    readonly burgerButton: Locator;
    readonly burgerMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.locator('.title', { hasText: 'Products' });
        this.burgerButton = page.locator('#react-burger-menu-btn');
        this.burgerMenu = page.locator('.bm-menu-wrap');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async isOnProductsPage() {
        await expect(this.productsTitle).toBeVisible();
    }

    async openSideMenu() {
        await this.burgerButton.click();
        await expect(this.burgerMenu).toBeVisible();
    }

    async clickLogoutLink() {
        const logoutLink = this.burgerMenu.locator('#logout_sidebar_link');
        await logoutLink.click();
        return new LoginPage(this.page);
    }
}