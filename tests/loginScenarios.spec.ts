import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';


test.describe('Login tests', () => {
  // Reset storage state for this file to avoid being authenticated
  test.use({ storageState: { cookies: [], origins: [] } });
  test('1. Login using any of the credentials provided', async ({ page }) => {
    const sauceDemoLoginPage = new LoginPage(page);
    await sauceDemoLoginPage.goto();
    await sauceDemoLoginPage.enterUsername('standard_user');
    await sauceDemoLoginPage.enterPassword('secret_sauce');
    //successful login takes you to products page
    const productsPage: ProductsPage = await sauceDemoLoginPage.clickLoginButtonExpectSuccess();
    await productsPage.isOnProductsPage();
  });

  test('2. Test the invalid login flow.', async ({ page }) => {
    const sauceDemoLoginPage = new LoginPage(page);
    await sauceDemoLoginPage.goto();
    await sauceDemoLoginPage.enterUsername('the_wrong_user');
    await sauceDemoLoginPage.enterPassword('the_wrong_password');
    //invalid login should show error message
    await sauceDemoLoginPage.clickLoginButtonExpectFailure();
  });
});

test('10. Logout of the site', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.isOnProductsPage();
  // Open the side menu
  await productsPage.openSideMenu();

  // Click the logout link
  const loginPage: LoginPage = await productsPage.clickLogoutLink();

  // Verify that the user is logged out and back on the login page
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

// Note: Tests 3, 4, 5, 6, 7, 8, and 9 have been moved to productsScenarios.spec.ts
