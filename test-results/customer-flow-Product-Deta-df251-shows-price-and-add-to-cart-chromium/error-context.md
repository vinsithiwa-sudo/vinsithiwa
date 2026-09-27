# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer-flow.spec.ts >> Product Detail & Cart Flow >> product detail page shows price and add to cart
- Location: e2e\customer-flow.spec.ts:112:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=LKR')
Expected: visible
Error: strict mode violation: locator('text=LKR') resolved to 7 elements:
    1) <h4 class="font-body text-[10px] tracking-widest uppercase mb-4">Price (LKR)</h4> aka getByRole('heading', { name: 'Price (LKR)' })
    2) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'G T A Featured DESIGN : VIN-' })
    3) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'Jesus Featured DESIGN : VIN-' })
    4) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'Sun and Moon Featured DESIGN' })
    5) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'Elephent Featured DESIGN :' })
    6) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'Buddha Featured DESIGN : VIN-' })
    7) <span class="font-body font-medium text-sm">…</span> aka getByRole('link', { name: 'Golden Horse DESIGN : VIN-' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=LKR')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
          - text: CATALOG
        - link "CONTACT" [ref=e23] [cursor=pointer]:
          - /url: /contact
        - button "Open cart" [ref=e24]:
          - img [ref=e25]
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - img [ref=e32]
          - heading "Your Cart" [level=2] [ref=e36]
        - button "Close cart" [ref=e37]:
          - img [ref=e38]
      - generic [ref=e42]:
        - img [ref=e43]
        - paragraph [ref=e47]: Your cart is empty
        - paragraph [ref=e48]: Browse our collection and add some wall art!
        - link "Browse Catalog" [ref=e49] [cursor=pointer]:
          - /url: /catalog
  - main [ref=e50]:
    - generic [ref=e51]:
      - generic [ref=e52]:
        - heading "The Collection" [level=1] [ref=e53]
        - paragraph [ref=e54]: Explore our full range of luxury wall art. Use the filters to find the perfect piece for your space.
      - generic [ref=e55]:
        - complementary [ref=e56]:
          - generic [ref=e57]:
            - heading "Filters" [level=3] [ref=e59]
            - generic [ref=e60]:
              - heading "Theme" [level=4] [ref=e61]
              - list [ref=e62]:
                - listitem [ref=e63]:
                  - generic [ref=e64] [cursor=pointer]:
                    - checkbox "Abstract" [ref=e65]
                    - generic [ref=e66]: Abstract
                - listitem [ref=e67]:
                  - generic [ref=e68] [cursor=pointer]:
                    - checkbox "Animals" [ref=e69]
                    - generic [ref=e70]: Animals
                - listitem [ref=e71]:
                  - generic [ref=e72] [cursor=pointer]:
                    - checkbox "Anime" [ref=e73]
                    - generic [ref=e74]: Anime
                - listitem [ref=e75]:
                  - generic [ref=e76] [cursor=pointer]:
                    - checkbox "Architecture" [ref=e77]
                    - generic [ref=e78]: Architecture
                - listitem [ref=e79]:
                  - generic [ref=e80] [cursor=pointer]:
                    - checkbox "Flowers" [ref=e81]
                    - generic [ref=e82]: Flowers
                - listitem [ref=e83]:
                  - generic [ref=e84] [cursor=pointer]:
                    - checkbox "Gaming" [ref=e85]
                    - generic [ref=e86]: Gaming
                - listitem [ref=e87]:
                  - generic [ref=e88] [cursor=pointer]:
                    - checkbox "Luxury" [ref=e89]
                    - generic [ref=e90]: Luxury
                - listitem [ref=e91]:
                  - generic [ref=e92] [cursor=pointer]:
                    - checkbox "Minimal" [ref=e93]
                    - generic [ref=e94]: Minimal
                - listitem [ref=e95]:
                  - generic [ref=e96] [cursor=pointer]:
                    - checkbox "Modern" [ref=e97]
                    - generic [ref=e98]: Modern
                - listitem [ref=e99]:
                  - generic [ref=e100] [cursor=pointer]:
                    - checkbox "Movies" [ref=e101]
                    - generic [ref=e102]: Movies
                - listitem [ref=e103]:
                  - generic [ref=e104] [cursor=pointer]:
                    - checkbox "Music" [ref=e105]
                    - generic [ref=e106]: Music
                - listitem [ref=e107]:
                  - generic [ref=e108] [cursor=pointer]:
                    - checkbox "Nature" [ref=e109]
                    - generic [ref=e110]: Nature
                - listitem [ref=e111]:
                  - generic [ref=e112] [cursor=pointer]:
                    - checkbox "Religion" [ref=e113]
                    - generic [ref=e114]: Religion
                - listitem [ref=e115]:
                  - generic [ref=e116] [cursor=pointer]:
                    - checkbox "Space / Galaxy" [ref=e117]
                    - generic [ref=e118]: Space / Galaxy
                - listitem [ref=e119]:
                  - generic [ref=e120] [cursor=pointer]:
                    - checkbox "Sports" [ref=e121]
                    - generic [ref=e122]: Sports
                - listitem [ref=e123]:
                  - generic [ref=e124] [cursor=pointer]:
                    - checkbox "Sri Lankan Art" [ref=e125]
                    - generic [ref=e126]: Sri Lankan Art
                - listitem [ref=e127]:
                  - generic [ref=e128] [cursor=pointer]:
                    - checkbox "Vehicles" [ref=e129]
                    - generic [ref=e130]: Vehicles
            - generic [ref=e131]:
              - heading "Panel Type" [level=4] [ref=e132]
              - list [ref=e133]:
                - listitem [ref=e134]:
                  - generic [ref=e135] [cursor=pointer]:
                    - checkbox "1 Piece" [ref=e136]
                    - generic [ref=e137]: 1 Piece
                - listitem [ref=e138]:
                  - generic [ref=e139] [cursor=pointer]:
                    - checkbox "2 Pieces" [ref=e140]
                    - generic [ref=e141]: 2 Pieces
                - listitem [ref=e142]:
                  - generic [ref=e143] [cursor=pointer]:
                    - checkbox "3 Pieces" [ref=e144]
                    - generic [ref=e145]: 3 Pieces
                - listitem [ref=e146]:
                  - generic [ref=e147] [cursor=pointer]:
                    - checkbox "4 Pieces" [ref=e148]
                    - generic [ref=e149]: 4 Pieces
                - listitem [ref=e150]:
                  - generic [ref=e151] [cursor=pointer]:
                    - checkbox "5 Pieces" [ref=e152]
                    - generic [ref=e153]: 5 Pieces
            - generic [ref=e154]:
              - heading "Space" [level=4] [ref=e155]
              - list [ref=e156]:
                - listitem [ref=e157]:
                  - generic [ref=e158] [cursor=pointer]:
                    - checkbox "Bedroom" [ref=e159]
                    - generic [ref=e160]: Bedroom
                - listitem [ref=e161]:
                  - generic [ref=e162] [cursor=pointer]:
                    - checkbox "Cafe" [ref=e163]
                    - generic [ref=e164]: Cafe
                - listitem [ref=e165]:
                  - generic [ref=e166] [cursor=pointer]:
                    - checkbox "Dining Room" [ref=e167]
                    - generic [ref=e168]: Dining Room
                - listitem [ref=e169]:
                  - generic [ref=e170] [cursor=pointer]:
                    - checkbox "Gaming Room" [ref=e171]
                    - generic [ref=e172]: Gaming Room
                - listitem [ref=e173]:
                  - generic [ref=e174] [cursor=pointer]:
                    - checkbox "Hallway" [ref=e175]
                    - generic [ref=e176]: Hallway
                - listitem [ref=e177]:
                  - generic [ref=e178] [cursor=pointer]:
                    - checkbox "Hotel Lobby" [ref=e179]
                    - generic [ref=e180]: Hotel Lobby
                - listitem [ref=e181]:
                  - generic [ref=e182] [cursor=pointer]:
                    - checkbox "Kids Room" [ref=e183]
                    - generic [ref=e184]: Kids Room
                - listitem [ref=e185]:
                  - generic [ref=e186] [cursor=pointer]:
                    - checkbox "Kitchen" [ref=e187]
                    - generic [ref=e188]: Kitchen
                - listitem [ref=e189]:
                  - generic [ref=e190] [cursor=pointer]:
                    - checkbox "Living Room" [ref=e191]
                    - generic [ref=e192]: Living Room
                - listitem [ref=e193]:
                  - generic [ref=e194] [cursor=pointer]:
                    - checkbox "Office" [ref=e195]
                    - generic [ref=e196]: Office
                - listitem [ref=e197]:
                  - generic [ref=e198] [cursor=pointer]:
                    - checkbox "Reception" [ref=e199]
                    - generic [ref=e200]: Reception
                - listitem [ref=e201]:
                  - generic [ref=e202] [cursor=pointer]:
                    - checkbox "Salon" [ref=e203]
                    - generic [ref=e204]: Salon
            - generic [ref=e205]:
              - heading "Price (LKR)" [level=4] [ref=e206]
              - generic [ref=e207]:
                - spinbutton [ref=e208]
                - generic [ref=e209]: –
                - spinbutton [ref=e210]
        - generic [ref=e211]:
          - generic [ref=e213]: Showing 6 results
          - generic [ref=e214]:
            - 'link "G T A Featured DESIGN : VIN-1001 G T A LKR 9,500 View Size Chart" [active] [ref=e216] [cursor=pointer]':
              - /url: /catalog/g-t-a
              - generic [ref=e217]:
                - img "G T A" [ref=e218]
                - generic [ref=e219]: Featured
              - generic [ref=e220]:
                - paragraph [ref=e221]: "DESIGN : VIN-1001"
                - generic [ref=e222]:
                  - generic [ref=e223]:
                    - heading "G T A" [level=3] [ref=e224]
                    - generic [ref=e225]: LKR 9,500
                  - button "View Size Chart" [ref=e228]
            - 'link "Jesus Featured DESIGN : VIN-1002 Jesus LKR 15,000 View Size Chart" [ref=e230] [cursor=pointer]':
              - /url: /catalog/jesus
              - generic [ref=e231]:
                - img "Jesus" [ref=e232]
                - generic [ref=e233]: Featured
              - generic [ref=e234]:
                - paragraph [ref=e235]: "DESIGN : VIN-1002"
                - generic [ref=e236]:
                  - generic [ref=e237]:
                    - heading "Jesus" [level=3] [ref=e238]
                    - generic [ref=e239]: LKR 15,000
                  - button "View Size Chart" [ref=e242]
            - 'link "Sun and Moon Featured DESIGN : VIN-1003 Sun and Moon LKR 10,500 View Size Chart" [ref=e244] [cursor=pointer]':
              - /url: /catalog/frenly
              - generic [ref=e245]:
                - img "Sun and Moon" [ref=e246]
                - generic [ref=e247]: Featured
              - generic [ref=e248]:
                - paragraph [ref=e249]: "DESIGN : VIN-1003"
                - generic [ref=e250]:
                  - generic [ref=e251]:
                    - heading "Sun and Moon" [level=3] [ref=e252]
                    - generic [ref=e253]: LKR 10,500
                  - button "View Size Chart" [ref=e256]
            - 'link "Elephent Featured DESIGN : VIN-1004 Elephent LKR 15,600 View Size Chart" [ref=e258] [cursor=pointer]':
              - /url: /catalog/elephent
              - generic [ref=e259]:
                - img "Elephent" [ref=e260]
                - generic [ref=e261]: Featured
              - generic [ref=e262]:
                - paragraph [ref=e263]: "DESIGN : VIN-1004"
                - generic [ref=e264]:
                  - generic [ref=e265]:
                    - heading "Elephent" [level=3] [ref=e266]
                    - generic [ref=e267]: LKR 15,600
                  - button "View Size Chart" [ref=e270]
            - 'link "Buddha Featured DESIGN : VIN-1005 Buddha LKR 20,150 View Size Chart" [ref=e272] [cursor=pointer]':
              - /url: /catalog/peace
              - generic [ref=e273]:
                - img "Buddha" [ref=e274]
                - generic [ref=e275]: Featured
              - generic [ref=e276]:
                - paragraph [ref=e277]: "DESIGN : VIN-1005"
                - generic [ref=e278]:
                  - generic [ref=e279]:
                    - heading "Buddha" [level=3] [ref=e280]
                    - generic [ref=e281]: LKR 20,150
                  - button "View Size Chart" [ref=e284]
            - 'link "Golden Horse DESIGN : VIN-1006 Golden Horse LKR 9,800 View Size Chart" [ref=e286] [cursor=pointer]':
              - /url: /catalog/golden-horse
              - img "Golden Horse" [ref=e288]
              - generic [ref=e289]:
                - paragraph [ref=e290]: "DESIGN : VIN-1006"
                - generic [ref=e291]:
                  - generic [ref=e292]:
                    - heading "Golden Horse" [level=3] [ref=e293]
                    - generic [ref=e294]: LKR 9,800
                  - button "View Size Chart" [ref=e297]
  - contentinfo [ref=e298]:
    - generic [ref=e301]:
      - generic [ref=e302]:
        - generic [ref=e303]:
          - generic [ref=e304]: VINSITH
          - generic [ref=e305]: Interior Wall Art
        - paragraph [ref=e306]: Premium wall art curated for Sri Lankan homes, hotels, and offices. Handpicked designs across every theme and space.
      - generic [ref=e307]:
        - generic [ref=e308]:
          - heading "Navigation" [level=3] [ref=e309]
          - list [ref=e310]:
            - listitem [ref=e311]:
              - link "Home" [ref=e312] [cursor=pointer]:
                - /url: /
            - listitem [ref=e313]:
              - link "Panels" [ref=e314] [cursor=pointer]:
                - /url: /panels
            - listitem [ref=e315]:
              - link "Themes" [ref=e316] [cursor=pointer]:
                - /url: /themes
            - listitem [ref=e317]:
              - link "Spaces" [ref=e318] [cursor=pointer]:
                - /url: /spaces
            - listitem [ref=e319]:
              - link "Catalog" [ref=e320] [cursor=pointer]:
                - /url: /catalog
            - listitem [ref=e321]:
              - link "About" [ref=e322] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e323]:
              - link "Contact" [ref=e324] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e325]:
              - link "Custom Order" [ref=e326] [cursor=pointer]:
                - /url: /custom-order
        - generic [ref=e327]:
          - heading "Follow Us" [level=3] [ref=e328]
          - generic [ref=e329]:
            - link "Facebook" [ref=e330] [cursor=pointer]:
              - /url: https://web.facebook.com/profile.php?id=61590636417644
              - img [ref=e331]
            - link "Instagram" [ref=e333] [cursor=pointer]:
              - /url: https://www.instagram.com/vinsithinteriorwallart/
              - img [ref=e334]
            - link "YouTube" [ref=e336] [cursor=pointer]:
              - /url: https://www.youtube.com/@VinsithInteriorWallArt
              - img [ref=e337]
            - link "TikTok" [ref=e339] [cursor=pointer]:
              - /url: https://www.tiktok.com/@vinsithinteriorwallart
              - img [ref=e340]
        - generic [ref=e342]:
          - heading "Customer Care" [level=3] [ref=e343]
          - list [ref=e344]:
            - listitem [ref=e345]:
              - generic [ref=e346]: Email
              - link "vinsithiwa@gmail.com" [ref=e347] [cursor=pointer]:
                - /url: mailto:vinsithiwa@gmail.com
            - listitem [ref=e348]:
              - generic [ref=e349]: Phone / WhatsApp
              - generic [ref=e350]: +94 77 069 7626
              - link "WhatsApp Us" [ref=e351] [cursor=pointer]:
                - /url: https://wa.me/94770697626
                - img [ref=e352]
                - text: WhatsApp Us
    - generic [ref=e355]:
      - paragraph [ref=e356]: © 2026 Vinsith Interior Wall Art. All rights reserved.
      - paragraph [ref=e357]: Colombo, Sri Lanka
  - button "Open Next.js Dev Tools" [ref=e363] [cursor=pointer]:
    - img [ref=e364]
  - alert [ref=e367]
```

# Test source

```ts
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
> 128 |     await expect(page.locator("text=LKR")).toBeVisible({ timeout: 10_000 });
      |                                            ^ Error: expect(locator).toBeVisible() failed
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
  206 | // ─────────────────────────────────────────────
  207 | 
  208 | test.describe("Navigation", () => {
  209 |   test("navbar links navigate correctly", async ({ page }) => {
  210 |     await page.goto("/");
  211 |     await page.waitForLoadState("domcontentloaded");
  212 | 
  213 |     // Click Catalog link in nav
  214 |     const catalogLink = page.locator("nav").locator('a:has-text("Catalog")').first();
  215 |     if ((await catalogLink.count()) > 0) {
  216 |       await catalogLink.click();
  217 |       await page.waitForLoadState("domcontentloaded");
  218 |       await expect(page).toHaveURL(/\/catalog/);
  219 |     }
  220 |   });
  221 | 
  222 |   test("footer is present on all public pages", async ({ page }) => {
  223 |     const pages = ["/", "/catalog", "/about", "/contact"];
  224 | 
  225 |     for (const path of pages) {
  226 |       await page.goto(path);
  227 |       await page.waitForLoadState("domcontentloaded");
  228 |       await expect(page.locator("footer")).toBeVisible({ timeout: 10_000 });
```