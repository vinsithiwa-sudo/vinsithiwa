import { test, expect } from "@playwright/test";

test.describe("Admin Auth Flow", () => {
  test("redirects to login when accessing protected route without session", async ({ page }) => {
    await page.goto("/admin/dashboard");
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/\/admin\/login/);
    
    // Check if the login form is visible
    await expect(page.locator("text=Sign In")).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");

    await page.fill('input[type="email"]', "wrong@email.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Wait for the error message
    await expect(page.locator("text=Invalid email or password")).toBeVisible();
  });

  test("successful login and logout", async ({ page }) => {
    await page.goto("/admin/login");

    // Using the seeded admin credentials
    await page.fill('input[type="email"]', "admin@vinsith.lk");
    await page.fill('input[type="password"]', "admin123");
    
    // We expect navigation to dashboard
    await page.click('button[type="submit"]');
    
    // Increase timeout for login
    await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 15_000 });
    
    // Verify dashboard elements
    await expect(page.locator("text=Total Orders")).toBeVisible();
    await expect(page.locator("text=Total Revenue")).toBeVisible();

    // Test Logout
    const logoutBtn = page.locator('button:has-text("Logout"), a:has-text("Logout")').first();
    if (await logoutBtn.count() > 0) {
      await logoutBtn.click();
      await expect(page).toHaveURL(/\/admin\/login/);
    }
  });
});
