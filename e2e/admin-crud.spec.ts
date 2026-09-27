import { test, expect } from "@playwright/test";

test.describe("Admin CRUD Operations", () => {
  // We'll log in once before all tests in this suite
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@vinsith.lk");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 15_000 });
  });

  test("can navigate to products and see the list", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(page.locator("h1:has-text('Products')")).toBeVisible();
    
    // There should be an 'Add Product' button
    await expect(page.locator("text=Add Product")).toBeVisible();
  });

  test("can navigate to orders and see the list", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.locator("h1:has-text('Orders')")).toBeVisible();
    
    // Status badges or a table should exist
    await expect(page.locator("table")).toBeVisible();
  });

  test("can navigate to themes and see the list", async ({ page }) => {
    await page.goto("/admin/themes");
    await expect(page.locator("h1:has-text('Themes')")).toBeVisible();
    
    // Should have Add Theme button
    await expect(page.locator("button:has-text('Add Theme')").first()).toBeVisible();
  });

  test("can navigate to settings", async ({ page }) => {
    await page.goto("/admin/settings");
    await expect(page.locator("h1:has-text('Settings')")).toBeVisible();
    
    // Check if WhatsApp Number setting field is visible
    await expect(page.locator("label:has-text('WhatsApp Number')")).toBeVisible();
  });

  test("can navigate to size charts", async ({ page }) => {
    await page.goto("/admin/size-charts");
    await expect(page.locator("text=Size Charts")).toBeVisible();
  });
});
