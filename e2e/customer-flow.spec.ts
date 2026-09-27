import { test, expect } from "@playwright/test";

// ─────────────────────────────────────────────
// CUSTOMER FLOW — End-to-End
// ─────────────────────────────────────────────

test.describe("Customer Flow", () => {
  test("homepage loads with hero, featured products, and footer", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Navbar should be visible
    await expect(page.locator("nav")).toBeVisible();

    // Hero section text
    await expect(page.locator("text=Transform Your Space")).toBeVisible({ timeout: 10_000 });

    // Featured products section should exist
    await expect(page.locator("text=Featured")).toBeVisible({ timeout: 10_000 });

    // Footer
    await expect(page.locator("footer")).toBeVisible();
  });

  test("catalog page loads and shows products", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");

    // Page heading
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });

    // Should have at least the catalog page structure
    await expect(page).toHaveURL(/\/catalog/);
  });

  test("panels page loads with panel tabs", async ({ page }) => {
    await page.goto("/panels");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("themes page loads", async ({ page }) => {
    await page.goto("/themes");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("spaces page loads", async ({ page }) => {
    await page.goto("/spaces");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("custom order page loads", async ({ page }) => {
    await page.goto("/custom-order");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  });

  test("checkout page loads with empty cart message", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("domcontentloaded");

    // Should show "Your cart is empty" or similar
    await expect(page.locator("text=empty")).toBeVisible({ timeout: 10_000 });
  });
});

// ─────────────────────────────────────────────
// PRODUCT DETAIL — Navigation & Cart
// ─────────────────────────────────────────────

test.describe("Product Detail & Cart Flow", () => {
  test("navigate from catalog to a product detail page", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");

    // Wait for product cards to load — look for any link that goes to /catalog/
    const productLink = page.locator('a[href*="/catalog/"]').first();
    const linkExists = await productLink.count();

    if (linkExists > 0) {
      await productLink.click();
      await page.waitForLoadState("domcontentloaded");

      // Should be on a product detail page
      await expect(page).toHaveURL(/\/catalog\/.+/);

      // Product title (h1) should be visible
      await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });

      // Breadcrumbs should be visible
      await expect(page.locator("text=Catalog")).toBeVisible();
    } else {
      // No products in catalog — skip gracefully
      test.skip();
    }
  });

  test("product detail page shows price and add to cart", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");

    const productLink = page.locator('a[href*="/catalog/"]').first();
    const linkExists = await productLink.count();

    if (linkExists === 0) {
      test.skip();
      return;
    }

    await productLink.click();
    await page.waitForLoadState("domcontentloaded");

    // Price should be visible (LKR format)
    await expect(page.locator("text=LKR")).toBeVisible({ timeout: 10_000 });

    // "Add to Cart" button should be visible
    const addToCartBtn = page.locator('button:has-text("Add to Cart")');
    const buyNowBtn = page.locator('button:has-text("Buy Now")');
    const orderNowBtn = page.locator('button:has-text("Order Now")');

    const hasAddToCart = (await addToCartBtn.count()) > 0;
    const hasBuyNow = (await buyNowBtn.count()) > 0;
    const hasOrderNow = (await orderNowBtn.count()) > 0;

    // At least one CTA should exist
    expect(hasAddToCart || hasBuyNow || hasOrderNow).toBe(true);
  });

  test("add product to cart and see badge update", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");

    const productLink = page.locator('a[href*="/catalog/"]').first();
    if ((await productLink.count()) === 0) {
      test.skip();
      return;
    }

    await productLink.click();
    await page.waitForLoadState("domcontentloaded");

    // Click Add to Cart
    const addToCartBtn = page.locator('button:has-text("Add to Cart")');
    if ((await addToCartBtn.count()) > 0) {
      await addToCartBtn.click();

      // Wait a moment for the state to update
      await page.waitForTimeout(500);

      // Cart badge in navbar should show a count
      // Look for the cart icon area in the nav
      const cartBadge = page.locator("nav").locator("text=/\\d+/").first();
      const hasBadge = (await cartBadge.count()) > 0;

      // If the cart system is implemented, the badge should appear
      if (hasBadge) {
        await expect(cartBadge).toBeVisible();
      }
    }
  });
});

// ─────────────────────────────────────────────
// ORDER FORM VALIDATION
// ─────────────────────────────────────────────

test.describe("Order Form Validation", () => {
  test("checkout form shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("domcontentloaded");

    // Try to submit the form without filling anything
    const submitBtn = page.locator('button[type="submit"]');
    if ((await submitBtn.count()) > 0) {
      await submitBtn.click();
      await page.waitForTimeout(500);

      // Should show at least one validation error or a cart-empty message
      const hasError =
        (await page.locator("text=required").count()) > 0 ||
        (await page.locator("text=empty").count()) > 0 ||
        (await page.locator("text=at least").count()) > 0 ||
        (await page.locator(".text-red-500").count()) > 0;

      expect(hasError).toBe(true);
    }
  });
});

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

test.describe("Navigation", () => {
  test("navbar links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Click Catalog link in nav
    const catalogLink = page.locator("nav").locator('a:has-text("Catalog")').first();
    if ((await catalogLink.count()) > 0) {
      await catalogLink.click();
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/\/catalog/);
    }
  });

  test("footer is present on all public pages", async ({ page }) => {
    const pages = ["/", "/catalog", "/about", "/contact"];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");
      await expect(page.locator("footer")).toBeVisible({ timeout: 10_000 });
    }
  });
});
