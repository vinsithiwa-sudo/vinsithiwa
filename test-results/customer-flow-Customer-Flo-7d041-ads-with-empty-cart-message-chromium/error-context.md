# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer-flow.spec.ts >> Customer Flow >> checkout page loads with empty cart message
- Location: e2e\customer-flow.spec.ts:72:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=empty')
Expected: visible
Error: strict mode violation: locator('text=empty') resolved to 2 elements:
    1) <p class="font-display text-lg">Your cart is empty</p> aka getByText('Your cart is empty', { exact: true })
    2) <p class="font-body text-sm">Your cart is empty.</p> aka getByText('Your cart is empty.')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=empty')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "VINSITH Interior Wall Art" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: VINSITH
        - generic [ref=e6]: Interior Wall Art
      - generic [ref=e7]:
        - link "HOME" [ref=e8] [cursor=pointer]:
          - /url: /
        - button "PANELS" [ref=e10]:
          - text: PANELS
          - img [ref=e11]
        - button "THEMES" [ref=e14]:
          - text: THEMES
          - img [ref=e15]
        - button "ROOMS" [ref=e18]:
          - text: ROOMS
          - img [ref=e19]
        - link "CATALOG" [ref=e21] [cursor=pointer]:
          - /url: /catalog
        - link "CONTACT" [ref=e22] [cursor=pointer]:
          - /url: /contact
        - button "Open cart" [ref=e23]:
          - img [ref=e24]
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - img [ref=e31]
          - heading "Your Cart" [level=2] [ref=e35]
        - button "Close cart" [ref=e36]:
          - img [ref=e37]
      - generic [ref=e41]:
        - img [ref=e42]
        - paragraph [ref=e46]: Your cart is empty
        - paragraph [ref=e47]: Browse our collection and add some wall art!
        - link "Browse Catalog" [ref=e48] [cursor=pointer]:
          - /url: /catalog
  - main [ref=e49]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - link "Home" [ref=e52] [cursor=pointer]:
          - /url: /
        - img [ref=e53]
        - generic [ref=e55]: Checkout
      - generic [ref=e56]:
        - generic [ref=e57]:
          - heading "Secure Checkout" [level=1] [ref=e58]
          - generic [ref=e60]:
            - generic [ref=e61]:
              - generic [ref=e62]:
                - generic [ref=e63]: Full Name *
                - textbox "John Doe" [ref=e64]
              - generic [ref=e65]:
                - generic [ref=e66]: Phone Number *
                - textbox "077 123 4567" [ref=e67]
              - generic [ref=e68]:
                - generic [ref=e69]: WhatsApp Number *
                - textbox "077 123 4567" [ref=e70]
              - generic [ref=e71]:
                - generic [ref=e72]: City *
                - textbox "Colombo" [ref=e73]
            - generic [ref=e74]:
              - generic [ref=e75]: Delivery Address *
              - textbox "No. 123, Main Street" [ref=e76]
            - generic [ref=e77]:
              - generic [ref=e78]: Order Notes (Optional)
              - textbox "Any special requests or delivery instructions?" [ref=e79]
            - generic [ref=e80]:
              - button "Place Order — LKR 0" [disabled] [ref=e81]
              - paragraph [ref=e82]: After placing, you will receive bank transfer details and a WhatsApp link to send your payment slip.
        - generic [ref=e84]:
          - heading "Order Summary" [level=2] [ref=e85]
          - paragraph [ref=e87]: Your cart is empty.
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: Subtotal
              - generic [ref=e91]: LKR 0
            - generic [ref=e92]:
              - generic [ref=e93]: Delivery
              - generic [ref=e94]: To be calculated
            - generic [ref=e95]:
              - generic [ref=e96]: Total
              - generic [ref=e97]: LKR 0
  - contentinfo [ref=e98]:
    - generic [ref=e101]:
      - generic [ref=e102]:
        - generic [ref=e103]:
          - generic [ref=e104]: VINSITH
          - generic [ref=e105]: Interior Wall Art
        - paragraph [ref=e106]: Premium wall art curated for Sri Lankan homes, hotels, and offices. Handpicked designs across every theme and space.
      - generic [ref=e107]:
        - generic [ref=e108]:
          - heading "Navigation" [level=3] [ref=e109]
          - list [ref=e110]:
            - listitem [ref=e111]:
              - link "Home" [ref=e112] [cursor=pointer]:
                - /url: /
            - listitem [ref=e113]:
              - link "Panels" [ref=e114] [cursor=pointer]:
                - /url: /panels
            - listitem [ref=e115]:
              - link "Themes" [ref=e116] [cursor=pointer]:
                - /url: /themes
            - listitem [ref=e117]:
              - link "Spaces" [ref=e118] [cursor=pointer]:
                - /url: /spaces
            - listitem [ref=e119]:
              - link "Catalog" [ref=e120] [cursor=pointer]:
                - /url: /catalog
            - listitem [ref=e121]:
              - link "About" [ref=e122] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e123]:
              - link "Contact" [ref=e124] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e125]:
              - link "Custom Order" [ref=e126] [cursor=pointer]:
                - /url: /custom-order
        - generic [ref=e127]:
          - heading "Follow Us" [level=3] [ref=e128]
          - generic [ref=e129]:
            - link "Facebook" [ref=e130] [cursor=pointer]:
              - /url: https://web.facebook.com/profile.php?id=61590636417644
              - img [ref=e131]
            - link "Instagram" [ref=e133] [cursor=pointer]:
              - /url: https://www.instagram.com/vinsithinteriorwallart/
              - img [ref=e134]
            - link "YouTube" [ref=e136] [cursor=pointer]:
              - /url: https://www.youtube.com/@VinsithInteriorWallArt
              - img [ref=e137]
            - link "TikTok" [ref=e139] [cursor=pointer]:
              - /url: https://www.tiktok.com/@vinsithinteriorwallart
              - img [ref=e140]
        - generic [ref=e142]:
          - heading "Customer Care" [level=3] [ref=e143]
          - list [ref=e144]:
            - listitem [ref=e145]:
              - generic [ref=e146]: Email
              - link "vinsithiwa@gmail.com" [ref=e147] [cursor=pointer]:
                - /url: mailto:vinsithiwa@gmail.com
            - listitem [ref=e148]:
              - generic [ref=e149]: Phone / WhatsApp
              - generic [ref=e150]: +94 77 069 7626
              - link "WhatsApp Us" [ref=e151] [cursor=pointer]:
                - /url: https://wa.me/94770697626
                - img [ref=e152]
                - text: WhatsApp Us
    - generic [ref=e155]:
      - paragraph [ref=e156]: © 2026 Vinsith Interior Wall Art. All rights reserved.
      - paragraph [ref=e157]: Colombo, Sri Lanka
  - button "Open Next.js Dev Tools" [ref=e163] [cursor=pointer]:
    - img [ref=e164]
  - alert [ref=e167]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ─────────────────────────────────────────────
  4   | // CUSTOMER FLOW — End-to-End
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
> 77  |     await expect(page.locator("text=empty")).toBeVisible({ timeout: 10_000 });
      |                                              ^ Error: expect(locator).toBeVisible() failed
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
  105 |       await expect(page.locator("text=Catalog")).toBeVisible();
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
```