# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-crud.spec.ts >> Admin CRUD Operations >> can navigate to themes and see the list
- Location: e2e\admin-crud.spec.ts:29:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text(\'Add Theme\')').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text(\'Add Theme\')').first()

```

```yaml
- complementary:
  - link "VINSITH":
    - /url: /admin/dashboard
  - link "Dashboard":
    - /url: /admin/dashboard
  - link "Orders":
    - /url: /admin/orders
  - link "Products":
    - /url: /admin/products
  - link "Themes":
    - /url: /admin/themes
  - link "Subthemes":
    - /url: /admin/subthemes
  - link "Spaces":
    - /url: /admin/spaces
  - link "Panels":
    - /url: /admin/panels
  - link "Custom Requests":
    - /url: /admin/custom-requests
  - link "Bank Accounts":
    - /url: /admin/bank-accounts
  - link "Settings":
    - /url: /admin/settings
  - text: admin@vinsith.lk
  - button "Sign Out"
- main:
  - heading "Themes" [level=1]
  - link "Add Theme":
    - /url: /admin/themes/new
  - table:
    - rowgroup:
      - row "Name Slug Subthemes Count Products Count Actions":
        - columnheader "Name"
        - columnheader "Slug"
        - columnheader "Subthemes Count"
        - columnheader "Products Count"
        - columnheader "Actions"
    - rowgroup:
      - row "Abstract abstract 0 1":
        - cell "Abstract"
        - cell "abstract"
        - cell "0"
        - cell "1"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdbev000bowbqmt6749zu/edit
          - button
      - row "Animals animals 1 2":
        - cell "Animals"
        - cell "animals"
        - cell "1"
        - cell "2"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdjme0010owbqfdw76576/edit
          - button
      - row "Anime anime 4 0":
        - cell "Anime"
        - cell "anime"
        - cell "4"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pddmx000iowbqy53h9gk7/edit
          - button
      - row "Architecture architecture 0 0":
        - cell "Architecture"
        - cell "architecture"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdm250018owbqmfz1gxgv/edit
          - button
      - row "Flowers flowers 3 0":
        - cell "Flowers"
        - cell "flowers"
        - cell "3"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdiby000wowbq0b3z388z/edit
          - button
      - row "Gaming gaming 6 1":
        - cell "Gaming"
        - cell "gaming"
        - cell "6"
        - cell "1"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdbpr000cowbq047abw1e/edit
          - button
      - row "Luxury luxury 0 0":
        - cell "Luxury"
        - cell "luxury"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdjxi0011owbqipzcbjzf/edit
          - button
      - row "Minimal minimal 0 0":
        - cell "Minimal"
        - cell "minimal"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdkjq0013owbq8lzd4vcw/edit
          - button
      - row "Modern modern 0 0":
        - cell "Modern"
        - cell "modern"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdk8a0012owbq89sz5p4o/edit
          - button
      - row "Movies movies 0 0":
        - cell "Movies"
        - cell "movies"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdl4u0015owbqk9sf2j2t/edit
          - button
      - row "Music music 0 0":
        - cell "Music"
        - cell "music"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdlfj0016owbqz07bdm5r/edit
          - button
      - row "Nature nature 4 0":
        - cell "Nature"
        - cell "nature"
        - cell "4"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pd9pu0006owbq8jodrkvm/edit
          - button
      - row "Religion religion 3 2":
        - cell "Religion"
        - cell "religion"
        - cell "3"
        - cell "2"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdfba000nowbqruxvvsj8/edit
          - button
      - row "Space / Galaxy space-galaxy 0 0":
        - cell "Space / Galaxy"
        - cell "space-galaxy"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdlqy0017owbq8qzbnh9l/edit
          - button
      - row "Sports sports 0 0":
        - cell "Sports"
        - cell "sports"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdkub0014owbqof7npvqu/edit
          - button
      - row "Sri Lankan Art sri-lankan-art 0 0":
        - cell "Sri Lankan Art"
        - cell "sri-lankan-art"
        - cell "0"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdmdg0019owbq50xrhsl1/edit
          - button
      - row "Vehicles vehicles 4 0":
        - cell "Vehicles"
        - cell "vehicles"
        - cell "4"
        - cell "0"
        - cell:
          - link:
            - /url: /admin/themes/cmq3pdgke000rowbqdruyjqyo/edit
          - button
- alert
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
> 34 |     await expect(page.locator("button:has-text('Add Theme')").first()).toBeVisible();
     |                                                                        ^ Error: expect(locator).toBeVisible() failed
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
  47 |     await expect(page.locator("text=Size Charts")).toBeVisible();
  48 |   });
  49 | });
  50 | 
```