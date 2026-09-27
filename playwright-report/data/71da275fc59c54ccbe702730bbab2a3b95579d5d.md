# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer-flow.spec.ts >> Product Detail & Cart Flow >> navigate from catalog to a product detail page
- Location: e2e\customer-flow.spec.ts:86:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Catalog')
Expected: visible
Error: strict mode violation: locator('text=Catalog') resolved to 4 elements:
    1) <a href="/catalog" class="relative px-4 py-3 transition-colors hover:text-[#C9A84C]">CATALOG</a> aka getByRole('link', { name: 'CATALOG', exact: true })
    2) <a href="/catalog" class="mt-2 px-6 py-3 font-body text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80">Browse Catalog</a> aka getByRole('link', { name: 'Browse Catalog' })
    3) <a href="/catalog" class="hover:text-[#C9A84C] transition-colors">Catalog</a> aka getByRole('main').getByRole('link', { name: 'Catalog' })
    4) <a href="/catalog" class="text-sm transition-colors text-[#FAF8F4]/55 hover:text-[#C9A84C]">Catalog</a> aka getByRole('contentinfo').getByRole('link', { name: 'Catalog' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Catalog')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]: G T A | Vinsith Interior Wall Art
  - navigation [ref=e12]:
    - generic [ref=e13]:
      - link "VINSITH Interior Wall Art" [ref=e14] [cursor=pointer]:
        - /url: /
        - generic [ref=e15]: VINSITH
        - generic [ref=e16]: Interior Wall Art
      - generic [ref=e17]:
        - link "HOME" [ref=e18] [cursor=pointer]:
          - /url: /
        - button "PANELS" [ref=e20]:
          - text: PANELS
          - img [ref=e21]
        - button "THEMES" [ref=e24]:
          - text: THEMES
          - img [ref=e25]
        - button "ROOMS" [ref=e28]:
          - text: ROOMS
          - img [ref=e29]
        - link "CATALOG" [ref=e31] [cursor=pointer]:
          - /url: /catalog
        - link "CONTACT" [ref=e32] [cursor=pointer]:
          - /url: /contact
        - button "Open cart" [ref=e33]:
          - img [ref=e34]
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - img [ref=e41]
          - heading "Your Cart" [level=2] [ref=e45]
        - button "Close cart" [ref=e46]:
          - img [ref=e47]
      - generic [ref=e51]:
        - img [ref=e52]
        - paragraph [ref=e56]: Your cart is empty
        - paragraph [ref=e57]: Browse our collection and add some wall art!
        - link "Browse Catalog" [ref=e58] [cursor=pointer]:
          - /url: /catalog
  - main [ref=e59]:
    - generic [ref=e60]:
      - generic [ref=e61]:
        - link "Home" [ref=e62] [cursor=pointer]:
          - /url: /
        - img [ref=e63]
        - link "Catalog" [ref=e65] [cursor=pointer]:
          - /url: /catalog
        - img [ref=e66]
        - link "Gaming" [ref=e68] [cursor=pointer]:
          - /url: /themes/gaming
        - img [ref=e69]
        - generic [ref=e71]: G T A
      - generic [ref=e72]:
        - button "G T A Click to Enlarge" [ref=e75]:
          - img "G T A" [ref=e76]
          - generic [ref=e78]:
            - img [ref=e79]
            - generic [ref=e88]: Click to Enlarge
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: Gaming · 5 Pieces
            - generic [ref=e92]:
              - text: "Design No:"
              - strong [ref=e93]: VIN-1001
          - heading "G T A" [level=1] [ref=e94]
          - paragraph [ref=e96]: gamimg for next level
          - paragraph [ref=e98]: LKR 9,500
          - generic [ref=e99]:
            - heading "Quantity" [level=3] [ref=e100]
            - generic [ref=e101]:
              - generic [ref=e102]:
                - button "Decrease quantity" [ref=e103]:
                  - img [ref=e104]
                - generic [ref=e105]: "1"
                - button "Increase quantity" [ref=e106]:
                  - img [ref=e107]
              - generic [ref=e108]:
                - text: "Total:"
                - strong [ref=e109]: LKR 9,500
          - generic [ref=e110]:
            - heading "Size Reference" [level=3] [ref=e112]
            - img "Size chart for 5 Piece - Standard" [ref=e114]
          - generic [ref=e115]:
            - button "Add to Cart" [ref=e116]:
              - img [ref=e117]
              - text: Add to Cart
            - button "Buy Now" [ref=e121]:
              - img [ref=e122]
              - text: Buy Now
            - generic [ref=e124]:
              - generic [ref=e125]: Secure Bank Transfer
              - generic [ref=e126]: ·
              - generic [ref=e127]: Island-wide Delivery
  - contentinfo [ref=e128]:
    - generic [ref=e131]:
      - generic [ref=e132]:
        - generic [ref=e133]:
          - generic [ref=e134]: VINSITH
          - generic [ref=e135]: Interior Wall Art
        - paragraph [ref=e136]: Premium wall art curated for Sri Lankan homes, hotels, and offices. Handpicked designs across every theme and space.
      - generic [ref=e137]:
        - generic [ref=e138]:
          - heading "Navigation" [level=3] [ref=e139]
          - list [ref=e140]:
            - listitem [ref=e141]:
              - link "Home" [ref=e142] [cursor=pointer]:
                - /url: /
            - listitem [ref=e143]:
              - link "Panels" [ref=e144] [cursor=pointer]:
                - /url: /panels
            - listitem [ref=e145]:
              - link "Themes" [ref=e146] [cursor=pointer]:
                - /url: /themes
            - listitem [ref=e147]:
              - link "Spaces" [ref=e148] [cursor=pointer]:
                - /url: /spaces
            - listitem [ref=e149]:
              - link "Catalog" [ref=e150] [cursor=pointer]:
                - /url: /catalog
            - listitem [ref=e151]:
              - link "About" [ref=e152] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e153]:
              - link "Contact" [ref=e154] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e155]:
              - link "Custom Order" [ref=e156] [cursor=pointer]:
                - /url: /custom-order
        - generic [ref=e157]:
          - heading "Follow Us" [level=3] [ref=e158]
          - generic [ref=e159]:
            - link "Facebook" [ref=e160] [cursor=pointer]:
              - /url: https://web.facebook.com/profile.php?id=61590636417644
              - img [ref=e161]
            - link "Instagram" [ref=e163] [cursor=pointer]:
              - /url: https://www.instagram.com/vinsithinteriorwallart/
              - img [ref=e164]
            - link "YouTube" [ref=e166] [cursor=pointer]:
              - /url: https://www.youtube.com/@VinsithInteriorWallArt
              - img [ref=e167]
            - link "TikTok" [ref=e169] [cursor=pointer]:
              - /url: https://www.tiktok.com/@vinsithinteriorwallart
              - img [ref=e170]
        - generic [ref=e172]:
          - heading "Customer Care" [level=3] [ref=e173]
          - list [ref=e174]:
            - listitem [ref=e175]:
              - generic [ref=e176]: Email
              - link "vinsithiwa@gmail.com" [ref=e177] [cursor=pointer]:
                - /url: mailto:vinsithiwa@gmail.com
            - listitem [ref=e178]:
              - generic [ref=e179]: Phone / WhatsApp
              - generic [ref=e180]: +94 77 069 7626
              - link "WhatsApp Us" [ref=e181] [cursor=pointer]:
                - /url: https://wa.me/94770697626
                - img [ref=e182]
                - text: WhatsApp Us
    - generic [ref=e185]:
      - paragraph [ref=e186]: © 2026 Vinsith Interior Wall Art. All rights reserved.
      - paragraph [ref=e187]: Colombo, Sri Lanka
```

# Test source

```ts
  5   | // ─────────────────────────────────────────────
  6   | 
  7   | test.describe("Customer Flow", () => {
  8   |   test("homepage loads with hero, featured products, and footer", async ({ page }) => {
  9   |     await page.goto("/");
  10  |     await page.waitForLoadState("domcontentloaded");
  11  | 
  12  |     // Navbar should be visible
  13  |     await expect(page.locator("nav")).toBeVisible();
  14  | 
  15  |     // Hero section text
  16  |     await expect(page.locator("text=Transform Your Space")).toBeVisible({ timeout: 10_000 });
  17  | 
  18  |     // Featured products section should exist
  19  |     await expect(page.locator("text=Featured")).toBeVisible({ timeout: 10_000 });
  20  | 
  21  |     // Footer
  22  |     await expect(page.locator("footer")).toBeVisible();
  23  |   });
  24  | 
  25  |   test("catalog page loads and shows products", async ({ page }) => {
  26  |     await page.goto("/catalog");
  27  |     await page.waitForLoadState("domcontentloaded");
  28  | 
  29  |     // Page heading
  30  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  31  | 
  32  |     // Should have at least the catalog page structure
  33  |     await expect(page).toHaveURL(/\/catalog/);
  34  |   });
  35  | 
  36  |   test("panels page loads with panel tabs", async ({ page }) => {
  37  |     await page.goto("/panels");
  38  |     await page.waitForLoadState("domcontentloaded");
  39  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  40  |   });
  41  | 
  42  |   test("themes page loads", async ({ page }) => {
  43  |     await page.goto("/themes");
  44  |     await page.waitForLoadState("domcontentloaded");
  45  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  46  |   });
  47  | 
  48  |   test("spaces page loads", async ({ page }) => {
  49  |     await page.goto("/spaces");
  50  |     await page.waitForLoadState("domcontentloaded");
  51  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  52  |   });
  53  | 
  54  |   test("about page loads", async ({ page }) => {
  55  |     await page.goto("/about");
  56  |     await page.waitForLoadState("domcontentloaded");
  57  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  58  |   });
  59  | 
  60  |   test("contact page loads", async ({ page }) => {
  61  |     await page.goto("/contact");
  62  |     await page.waitForLoadState("domcontentloaded");
  63  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  64  |   });
  65  | 
  66  |   test("custom order page loads", async ({ page }) => {
  67  |     await page.goto("/custom-order");
  68  |     await page.waitForLoadState("domcontentloaded");
  69  |     await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  70  |   });
  71  | 
  72  |   test("checkout page loads with empty cart message", async ({ page }) => {
  73  |     await page.goto("/checkout");
  74  |     await page.waitForLoadState("domcontentloaded");
  75  | 
  76  |     // Should show "Your cart is empty" or similar
  77  |     await expect(page.locator("text=empty")).toBeVisible({ timeout: 10_000 });
  78  |   });
  79  | });
  80  | 
  81  | // ─────────────────────────────────────────────
  82  | // PRODUCT DETAIL — Navigation & Cart
  83  | // ─────────────────────────────────────────────
  84  | 
  85  | test.describe("Product Detail & Cart Flow", () => {
  86  |   test("navigate from catalog to a product detail page", async ({ page }) => {
  87  |     await page.goto("/catalog");
  88  |     await page.waitForLoadState("domcontentloaded");
  89  | 
  90  |     // Wait for product cards to load — look for any link that goes to /catalog/
  91  |     const productLink = page.locator('a[href*="/catalog/"]').first();
  92  |     const linkExists = await productLink.count();
  93  | 
  94  |     if (linkExists > 0) {
  95  |       await productLink.click();
  96  |       await page.waitForLoadState("domcontentloaded");
  97  | 
  98  |       // Should be on a product detail page
  99  |       await expect(page).toHaveURL(/\/catalog\/.+/);
  100 | 
  101 |       // Product title (h1) should be visible
  102 |       await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
  103 | 
  104 |       // Breadcrumbs should be visible
> 105 |       await expect(page.locator("text=Catalog")).toBeVisible();
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  106 |     } else {
  107 |       // No products in catalog — skip gracefully
  108 |       test.skip();
  109 |     }
  110 |   });
  111 | 
  112 |   test("product detail page shows price and add to cart", async ({ page }) => {
  113 |     await page.goto("/catalog");
  114 |     await page.waitForLoadState("domcontentloaded");
  115 | 
  116 |     const productLink = page.locator('a[href*="/catalog/"]').first();
  117 |     const linkExists = await productLink.count();
  118 | 
  119 |     if (linkExists === 0) {
  120 |       test.skip();
  121 |       return;
  122 |     }
  123 | 
  124 |     await productLink.click();
  125 |     await page.waitForLoadState("domcontentloaded");
  126 | 
  127 |     // Price should be visible (LKR format)
  128 |     await expect(page.locator("text=LKR")).toBeVisible({ timeout: 10_000 });
  129 | 
  130 |     // "Add to Cart" button should be visible
  131 |     const addToCartBtn = page.locator('button:has-text("Add to Cart")');
  132 |     const buyNowBtn = page.locator('button:has-text("Buy Now")');
  133 |     const orderNowBtn = page.locator('button:has-text("Order Now")');
  134 | 
  135 |     const hasAddToCart = (await addToCartBtn.count()) > 0;
  136 |     const hasBuyNow = (await buyNowBtn.count()) > 0;
  137 |     const hasOrderNow = (await orderNowBtn.count()) > 0;
  138 | 
  139 |     // At least one CTA should exist
  140 |     expect(hasAddToCart || hasBuyNow || hasOrderNow).toBe(true);
  141 |   });
  142 | 
  143 |   test("add product to cart and see badge update", async ({ page }) => {
  144 |     await page.goto("/catalog");
  145 |     await page.waitForLoadState("domcontentloaded");
  146 | 
  147 |     const productLink = page.locator('a[href*="/catalog/"]').first();
  148 |     if ((await productLink.count()) === 0) {
  149 |       test.skip();
  150 |       return;
  151 |     }
  152 | 
  153 |     await productLink.click();
  154 |     await page.waitForLoadState("domcontentloaded");
  155 | 
  156 |     // Click Add to Cart
  157 |     const addToCartBtn = page.locator('button:has-text("Add to Cart")');
  158 |     if ((await addToCartBtn.count()) > 0) {
  159 |       await addToCartBtn.click();
  160 | 
  161 |       // Wait a moment for the state to update
  162 |       await page.waitForTimeout(500);
  163 | 
  164 |       // Cart badge in navbar should show a count
  165 |       // Look for the cart icon area in the nav
  166 |       const cartBadge = page.locator("nav").locator("text=/\\d+/").first();
  167 |       const hasBadge = (await cartBadge.count()) > 0;
  168 | 
  169 |       // If the cart system is implemented, the badge should appear
  170 |       if (hasBadge) {
  171 |         await expect(cartBadge).toBeVisible();
  172 |       }
  173 |     }
  174 |   });
  175 | });
  176 | 
  177 | // ─────────────────────────────────────────────
  178 | // ORDER FORM VALIDATION
  179 | // ─────────────────────────────────────────────
  180 | 
  181 | test.describe("Order Form Validation", () => {
  182 |   test("checkout form shows validation errors on empty submit", async ({ page }) => {
  183 |     await page.goto("/checkout");
  184 |     await page.waitForLoadState("domcontentloaded");
  185 | 
  186 |     // Try to submit the form without filling anything
  187 |     const submitBtn = page.locator('button[type="submit"]');
  188 |     if ((await submitBtn.count()) > 0) {
  189 |       await submitBtn.click();
  190 |       await page.waitForTimeout(500);
  191 | 
  192 |       // Should show at least one validation error or a cart-empty message
  193 |       const hasError =
  194 |         (await page.locator("text=required").count()) > 0 ||
  195 |         (await page.locator("text=empty").count()) > 0 ||
  196 |         (await page.locator("text=at least").count()) > 0 ||
  197 |         (await page.locator(".text-red-500").count()) > 0;
  198 | 
  199 |       expect(hasError).toBe(true);
  200 |     }
  201 |   });
  202 | });
  203 | 
  204 | // ─────────────────────────────────────────────
  205 | // NAVIGATION
```