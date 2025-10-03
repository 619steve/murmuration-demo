import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

test('can login successfully', async ({ page }) => {
  const sauceDemoLoginPage = new LoginPage(page);
  await sauceDemoLoginPage.goto();
  await sauceDemoLoginPage.enterUsername('standard_user');
  await sauceDemoLoginPage.enterPassword('secret_sauce');
  const productsPage: ProductsPage = await sauceDemoLoginPage.clickLoginButton();
  await productsPage.isOnProductsPage();
});
