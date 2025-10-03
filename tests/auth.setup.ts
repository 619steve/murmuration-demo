import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate and store session state', async ({ page }) => {
    const sauceDemoLoginPage = new LoginPage(page);
    await sauceDemoLoginPage.goto();
    await sauceDemoLoginPage.enterUsername('standard_user');
    await sauceDemoLoginPage.enterPassword('secret_sauce');
    //successful login takes you to products page
    const productsPage: ProductsPage = await sauceDemoLoginPage.clickLoginButtonExpectSuccess();
    await productsPage.isOnProductsPage();

    // Store authentication state in a file.
    await page.context().storageState({ path: authFile });
});