# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-crud.spec.ts >> Admin CRUD Operations >> can navigate to size charts
- Location: e2e\admin-crud.spec.ts:45:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Size Charts')
Expected: visible
Error: strict mode violation: locator('text=Size Charts') resolved to 2 elements:
    1) <h1 class="text-3xl font-bold tracking-tight text-gray-900">Size Charts</h1> aka getByRole('heading', { name: 'Size Charts' })
    2) <p class="text-sm">These are the predefined size charts available fo…</p> aka getByText('These are the predefined size')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Size Charts')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - link "VINSITH" [ref=e5] [cursor=pointer]:
        - /url: /admin/dashboard
      - generic [ref=e6]:
        - link "Dashboard" [ref=e7] [cursor=pointer]:
          - /url: /admin/dashboard
          - img [ref=e8]
          - text: Dashboard
        - link "Orders" [ref=e13] [cursor=pointer]:
          - /url: /admin/orders
          - img [ref=e14]
          - text: Orders
        - link "Products" [ref=e18] [cursor=pointer]:
          - /url: /admin/products
          - img [ref=e19]
          - text: Products
        - link "Themes" [ref=e23] [cursor=pointer]:
          - /url: /admin/themes
          - img [ref=e24]
          - text: Themes
        - link "Subthemes" [ref=e30] [cursor=pointer]:
          - /url: /admin/subthemes
          - img [ref=e31]
          - text: Subthemes
        - link "Spaces" [ref=e37] [cursor=pointer]:
          - /url: /admin/spaces
          - img [ref=e38]
          - text: Spaces
        - link "Panels" [ref=e42] [cursor=pointer]:
          - /url: /admin/panels
          - img [ref=e43]
          - text: Panels
        - link "Custom Requests" [ref=e46] [cursor=pointer]:
          - /url: /admin/custom-requests
          - img [ref=e47]
          - text: Custom Requests
        - link "Bank Accounts" [ref=e49] [cursor=pointer]:
          - /url: /admin/bank-accounts
          - img [ref=e50]
          - text: Bank Accounts
        - link "Settings" [ref=e52] [cursor=pointer]:
          - /url: /admin/settings
          - img [ref=e53]
          - text: Settings
      - generic [ref=e56]:
        - generic [ref=e58]: admin@vinsith.lk
        - button "Sign Out" [ref=e59]:
          - img [ref=e60]
          - text: Sign Out
    - main [ref=e63]:
      - generic [ref=e65]:
        - heading "Size Charts" [level=1] [ref=e67]
        - generic [ref=e68]:
          - generic [ref=e69]:
            - img [ref=e70]
            - paragraph [ref=e76]: These are the predefined size charts available for products. You can assign a size chart to any product from the product edit page.
          - generic [ref=e77]:
            - generic [ref=e78]:
              - img "1 Piece - Horizontal" [ref=e80]
              - generic [ref=e81]:
                - heading "1 Piece - Horizontal" [level=3] [ref=e82]
                - paragraph [ref=e83]: 1-piece-horizontal
            - generic [ref=e84]:
              - img "1 Piece - Vertical" [ref=e86]
              - generic [ref=e87]:
                - heading "1 Piece - Vertical" [level=3] [ref=e88]
                - paragraph [ref=e89]: 1-piece-vertical
            - generic [ref=e90]:
              - img "1 Piece - Vertical Small" [ref=e92]
              - generic [ref=e93]:
                - heading "1 Piece - Vertical Small" [level=3] [ref=e94]
                - paragraph [ref=e95]: 1-piece-vertical-small
            - generic [ref=e96]:
              - img "2 Piece - Horizontal" [ref=e98]
              - generic [ref=e99]:
                - heading "2 Piece - Horizontal" [level=3] [ref=e100]
                - paragraph [ref=e101]: 2-piece-horizontal
            - generic [ref=e102]:
              - img "2 Piece - Square" [ref=e104]
              - generic [ref=e105]:
                - heading "2 Piece - Square" [level=3] [ref=e106]
                - paragraph [ref=e107]: 2-piece-square
            - generic [ref=e108]:
              - img "3 Piece - Large" [ref=e110]
              - generic [ref=e111]:
                - heading "3 Piece - Large" [level=3] [ref=e112]
                - paragraph [ref=e113]: 3-piece-large
            - generic [ref=e114]:
              - img "3 Piece - Small" [ref=e116]
              - generic [ref=e117]:
                - heading "3 Piece - Small" [level=3] [ref=e118]
                - paragraph [ref=e119]: 3-piece-small
            - generic [ref=e120]:
              - img "4 Piece - Layout 1" [ref=e122]
              - generic [ref=e123]:
                - heading "4 Piece - Layout 1" [level=3] [ref=e124]
                - paragraph [ref=e125]: 4-piece-layout-1
            - generic [ref=e126]:
              - img "4 Piece - Layout 2" [ref=e128]
              - generic [ref=e129]:
                - heading "4 Piece - Layout 2" [level=3] [ref=e130]
                - paragraph [ref=e131]: 4-piece-layout-2
            - generic [ref=e132]:
              - img "4 Piece - Layout 3" [ref=e134]
              - generic [ref=e135]:
                - heading "4 Piece - Layout 3" [level=3] [ref=e136]
                - paragraph [ref=e137]: 4-piece-layout-3
            - generic [ref=e138]:
              - img "4 Piece - Layout 4" [ref=e140]
              - generic [ref=e141]:
                - heading "4 Piece - Layout 4" [level=3] [ref=e142]
                - paragraph [ref=e143]: 4-piece-layout-4
            - generic [ref=e144]:
              - img "4 Piece - Layout 5" [ref=e146]
              - generic [ref=e147]:
                - heading "4 Piece - Layout 5" [level=3] [ref=e148]
                - paragraph [ref=e149]: 4-piece-layout-5
            - generic [ref=e150]:
              - img "5 Piece - Standard" [ref=e152]
              - generic [ref=e153]:
                - heading "5 Piece - Standard" [level=3] [ref=e154]
                - paragraph [ref=e155]: 5-piece-standard
  - button "Open Next.js Dev Tools" [ref=e161] [cursor=pointer]:
    - img [ref=e162]
  - alert [ref=e165]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Admin CRUD Operations", () => {
  4  |   // We'll log in once before all tests in this suite
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto("/admin/login");
  7  |     await page.fill('input[type="email"]', "admin@vinsith.lk");
  8  |     await page.fill('input[type="password"]', "admin123");
  9  |     await page.click('button[type="submit"]');
  10 |     await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 15_000 });
  11 |   });
  12 | 
  13 |   test("can navigate to products and see the list", async ({ page }) => {
  14 |     await page.goto("/admin/products");
  15 |     await expect(page.locator("h1:has-text('Products')")).toBeVisible();
  16 |     
  17 |     // There should be an 'Add Product' button
  18 |     await expect(page.locator("text=Add Product")).toBeVisible();
  19 |   });
  20 | 
  21 |   test("can navigate to orders and see the list", async ({ page }) => {
  22 |     await page.goto("/admin/orders");
  23 |     await expect(page.locator("h1:has-text('Orders')")).toBeVisible();
  24 |     
  25 |     // Status badges or a table should exist
  26 |     await expect(page.locator("table")).toBeVisible();
  27 |   });
  28 | 
  29 |   test("can navigate to themes and see the list", async ({ page }) => {
  30 |     await page.goto("/admin/themes");
  31 |     await expect(page.locator("h1:has-text('Themes')")).toBeVisible();
  32 |     
  33 |     // Should have Add Theme button
  34 |     await expect(page.locator("button:has-text('Add Theme')").first()).toBeVisible();
  35 |   });
  36 | 
  37 |   test("can navigate to settings", async ({ page }) => {
  38 |     await page.goto("/admin/settings");
  39 |     await expect(page.locator("h1:has-text('Settings')")).toBeVisible();
  40 |     
  41 |     // Check if WhatsApp Number setting field is visible
  42 |     await expect(page.locator("label:has-text('WhatsApp Number')")).toBeVisible();
  43 |   });
  44 | 
  45 |   test("can navigate to size charts", async ({ page }) => {
  46 |     await page.goto("/admin/size-charts");
> 47 |     await expect(page.locator("text=Size Charts")).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  48 |   });
  49 | });
  50 | 
```