import { test } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';

/*
    For ease of use, I hardcoded selectors and assertions in tests 3–9.
    While this works for a demo, it is not best practice for an enterprise suite. 
    The preferred approach, as shown in LoginScenarios.spec.ts, stores shared selectors in page objects
    and demonstrates the full flow from Login → Products Page. 
    This makes tests more maintainable: if element IDs or test data change, 
    only the page objects need updating, not the entire test suite.
    In a real-world scenario, I would refactor tests 3–9 to follow this pattern.
*/

test('3. On the Products page, verify products can be added/removed to the Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Verify the cart badge shows 1 item
    await test.expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    // Remove the first product from the cart
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
    // Verify the cart badge is no longer visible
    await test.expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('4. On the Products page, verify products can be sorted by Name and Price', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Sort products by Name (A to Z)
    await page.selectOption('select[data-test="product-sort-container"]', 'az');
    await test.expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');

    // Sort products by Name (Z to A)
    await page.selectOption('select[data-test="product-sort-container"]', 'za');
    await test.expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // Sort products by Price (Low to High)
    await page.selectOption('select[data-test="product-sort-container"]', 'lohi');
    await test.expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');

    // Sort products by Price (High to Low)
    await page.selectOption('select[data-test="product-sort-container"]', 'hilo');
    await test.expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');
});

test('5a. On the Products page, verify that product detail page can be reached by clicking on either the product name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Click on the product name to navigate to the product detail page
    await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }).click();
    // Verify that the product detail page is displayed
    await test.expect(page.locator('.inventory_details_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
});

test('5b. On the Products page, verify that product detail page can be reached by clicking on either the product image', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Click on the product image to navigate to the product detail page
    await page.locator('.inventory_item_img').first().click();
    // Verify that the product detail page is displayed
        await test.expect(page.locator('.inventory_details_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
});

test('6. On the Your Cart page, verify that products can be removed from the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Navigate to the cart page
    await page.locator('.shopping_cart_link').click();
    // Verify that the cart page is displayed
    await test.expect(page.locator('.title', { hasText: 'Your Cart' })).toBeVisible();
    // Remove the product from the cart
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
    // Verify that the cart is empty
    await test.expect(page.locator('.cart_item')).toHaveCount(0);
});

test('7. On the Checkout: Your Information page, verify that all fields are required', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Navigate to the cart page
    await page.locator('.shopping_cart_link').click();
    // Verify that the cart page is displayed
    await test.expect(page.locator('.title', { hasText: 'Your Cart' })).toBeVisible();
    // Click the Checkout button
    await page.locator('button[data-test="checkout"]').click();
    // Verify that the Checkout: Your Information page is displayed
    await test.expect(page.locator('.title', { hasText: 'Checkout: Your Information' })).toBeVisible();
    // Attempt to continue without filling in any fields
    await page.locator('input[data-test="continue"]').click();
    // Verify that an error message is displayed for the required fields
    await test.expect(page.locator('h3[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('8. On the Checkout: Overview page, verify that the Item Total amount is correct for the Products selected', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Navigate to the cart page
    await page.locator('.shopping_cart_link').click();
    // Verify that the cart page is displayed
    await test.expect(page.locator('.title', { hasText: 'Your Cart' })).toBeVisible();
    // Click the Checkout button
    await page.locator('button[data-test="checkout"]').click();
    // Fill in the checkout information
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('input[data-test="continue"]').click();
    // Verify that the Checkout: Overview page is displayed
    await test.expect(page.locator('.title', { hasText: 'Checkout: Overview' })).toBeVisible();
    // Verify that the Item Total amount is correct
    const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const itemTotal = parseFloat(itemTotalText?.replace('Item total: $', '') || '0');
    test.expect(itemTotal).toBe(29.99); // Assuming the price of the Sauce Labs Backpack is $29.99
});

test('9. Confirm order checkout can be completed successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.isOnProductsPage();

    // Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Navigate to the cart page
    await page.locator('.shopping_cart_link').click();
    // Verify that the cart page is displayed
    await test.expect(page.locator('.title', { hasText: 'Your Cart' })).toBeVisible();
    // Click the Checkout button
    await page.locator('button[data-test="checkout"]').click();
    // Fill in the checkout information
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('input[data-test="continue"]').click();
    // Verify that the Checkout: Overview page is displayed
    await test.expect(page.locator('.title', { hasText: 'Checkout: Overview' })).toBeVisible();
    // Click the Finish button to complete the order
    await page.locator('button[data-test="finish"]').click();
    // Verify that the order confirmation page is displayed
    await test.expect(page.locator('.title', { hasText: 'Checkout: Complete!' })).toBeVisible();
    await test.expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});