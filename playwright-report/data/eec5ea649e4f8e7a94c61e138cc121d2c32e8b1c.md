# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer-flow.spec.ts >> Customer Flow >> homepage loads with hero, featured products, and footer
- Location: e2e\customer-flow.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Featured')
Expected: visible
Error: strict mode violation: locator('text=Featured') resolved to 5 elements:
    1) <h2 class="font-display font-bold">Featured Collection</h2> aka getByRole('heading', { name: 'Featured Collection' })
    2) <div class="absolute top-3 left-3 font-body text-[9px] tracking-widest uppercase px-2 py-1">Featured</div> aka getByRole('link', { name: 'G T A Featured DESIGN : VIN-' })
    3) <div class="absolute top-3 left-3 font-body text-[9px] tracking-widest uppercase px-2 py-1">Featured</div> aka getByRole('link', { name: 'Jesus Featured DESIGN : VIN-' })
    4) <div class="absolute top-3 left-3 font-body text-[9px] tracking-widest uppercase px-2 py-1">Featured</div> aka getByRole('link', { name: 'Sun and Moon Featured DESIGN' })
    5) <div class="absolute top-3 left-3 font-body text-[9px] tracking-widest uppercase px-2 py-1">Featured</div> aka getByRole('link', { name: 'Elephent Featured DESIGN :' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=Featured')

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
          - text: HOME
        - button "PANELS" [ref=e11]:
          - text: PANELS
          - img [ref=e12]
        - button "THEMES" [ref=e15]:
          - text: THEMES
          - img [ref=e16]
        - button "ROOMS" [ref=e19]:
          - text: ROOMS
          - img [ref=e20]
        - link "CATALOG" [ref=e22] [cursor=pointer]:
          - /url: /catalog
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
    - generic [ref=e55]:
      - generic [ref=e56]:
        - generic [ref=e59]: Premium Wall Art
        - heading "Transform Your Space" [level=1] [ref=e60]
        - heading "With Timeless Art" [level=1] [ref=e61]
        - paragraph [ref=e62]: Handpicked luxury wall art for modern homes, hotels & offices across Sri Lanka.
        - generic [ref=e63]:
          - link "Shop Collection" [ref=e64] [cursor=pointer]:
            - /url: /catalog
            - generic [ref=e66]: Shop Collection
          - link "Custom Order" [ref=e67] [cursor=pointer]:
            - /url: /custom-order
            - generic [ref=e69]: Custom Order
        - generic [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e72]: 200+
            - generic [ref=e73]: Designs
          - generic [ref=e74]:
            - generic [ref=e75]: "17"
            - generic [ref=e76]: Themes
          - generic [ref=e77]:
            - generic [ref=e78]: "5"
            - generic [ref=e79]: Panel Types
          - generic [ref=e80]:
            - generic [ref=e81]: "11"
            - generic [ref=e82]: Room Spaces
      - img "Vinsith Interior Wall Art Logo" [ref=e87]
    - generic [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]: Curated Selection
        - generic [ref=e92]:
          - heading "Featured Collection" [level=2] [ref=e93]
          - link "View All" [ref=e94] [cursor=pointer]:
            - /url: /catalog
      - generic [ref=e95]:
        - 'link "G T A Featured DESIGN : VIN-1001 G T A LKR 9,500 View Size Chart" [ref=e97] [cursor=pointer]':
          - /url: /catalog/g-t-a
          - generic [ref=e98]:
            - img "G T A" [ref=e99]
            - generic [ref=e100]: Featured
          - generic [ref=e101]:
            - paragraph [ref=e102]: "DESIGN : VIN-1001"
            - generic [ref=e103]:
              - generic [ref=e104]:
                - heading "G T A" [level=3] [ref=e105]
                - generic [ref=e106]: LKR 9,500
              - button "View Size Chart" [ref=e109]
        - 'link "Jesus Featured DESIGN : VIN-1002 Jesus LKR 15,000 View Size Chart" [ref=e111] [cursor=pointer]':
          - /url: /catalog/jesus
          - generic [ref=e112]:
            - img "Jesus" [ref=e113]
            - generic [ref=e114]: Featured
          - generic [ref=e115]:
            - paragraph [ref=e116]: "DESIGN : VIN-1002"
            - generic [ref=e117]:
              - generic [ref=e118]:
                - heading "Jesus" [level=3] [ref=e119]
                - generic [ref=e120]: LKR 15,000
              - button "View Size Chart" [ref=e123]
        - 'link "Sun and Moon Featured DESIGN : VIN-1003 Sun and Moon LKR 10,500 View Size Chart" [ref=e125] [cursor=pointer]':
          - /url: /catalog/frenly
          - generic [ref=e126]:
            - img "Sun and Moon" [ref=e127]
            - generic [ref=e128]: Featured
          - generic [ref=e129]:
            - paragraph [ref=e130]: "DESIGN : VIN-1003"
            - generic [ref=e131]:
              - generic [ref=e132]:
                - heading "Sun and Moon" [level=3] [ref=e133]
                - generic [ref=e134]: LKR 10,500
              - button "View Size Chart" [ref=e137]
        - 'link "Elephent Featured DESIGN : VIN-1004 Elephent LKR 15,600 View Size Chart" [ref=e139] [cursor=pointer]':
          - /url: /catalog/elephent
          - generic [ref=e140]:
            - img "Elephent" [ref=e141]
            - generic [ref=e142]: Featured
          - generic [ref=e143]:
            - paragraph [ref=e144]: "DESIGN : VIN-1004"
            - generic [ref=e145]:
              - generic [ref=e146]:
                - heading "Elephent" [level=3] [ref=e147]
                - generic [ref=e148]: LKR 15,600
              - button "View Size Chart" [ref=e151]
    - generic [ref=e153]:
      - generic [ref=e154]:
        - text: Explore by Style
        - heading "Browse by Theme" [level=2] [ref=e157]
      - generic [ref=e158]:
        - link "Nature Nature Forest · Ocean · Mountains" [ref=e160] [cursor=pointer]:
          - /url: /themes
          - img "Nature" [ref=e161]
          - generic [ref=e165]:
            - paragraph [ref=e166]: Nature
            - paragraph [ref=e167]: Forest · Ocean · Mountains
        - link "Gaming Gaming PS5 · FPS · Racing" [ref=e169] [cursor=pointer]:
          - /url: /themes
          - img "Gaming" [ref=e170]
          - generic [ref=e174]:
            - paragraph [ref=e175]: Gaming
            - paragraph [ref=e176]: PS5 · FPS · Racing
        - link "Anime Anime Naruto · One Piece" [ref=e178] [cursor=pointer]:
          - /url: /themes
          - img "Anime" [ref=e179]
          - generic [ref=e183]:
            - paragraph [ref=e184]: Anime
            - paragraph [ref=e185]: Naruto · One Piece
        - link "Vehicles Vehicles Cars · Supercars · JDM" [ref=e187] [cursor=pointer]:
          - /url: /themes
          - img "Vehicles" [ref=e188]
          - generic [ref=e192]:
            - paragraph [ref=e193]: Vehicles
            - paragraph [ref=e194]: Cars · Supercars · JDM
        - link "Religion Religion Buddha · Islamic · Christian" [ref=e196] [cursor=pointer]:
          - /url: /themes
          - img "Religion" [ref=e197]
          - generic [ref=e201]:
            - paragraph [ref=e202]: Religion
            - paragraph [ref=e203]: Buddha · Islamic · Christian
        - link "Flowers Flowers Roses · Lotus · Sakura" [ref=e205] [cursor=pointer]:
          - /url: /themes
          - img "Flowers" [ref=e206]
          - generic [ref=e210]:
            - paragraph [ref=e211]: Flowers
            - paragraph [ref=e212]: Roses · Lotus · Sakura
        - link "Abstract Abstract Contemporary" [ref=e214] [cursor=pointer]:
          - /url: /themes
          - img "Abstract" [ref=e215]
          - generic [ref=e219]:
            - paragraph [ref=e220]: Abstract
            - paragraph [ref=e221]: Contemporary
        - link "Sri Lankan Art Sri Lankan Art Heritage & Culture" [ref=e223] [cursor=pointer]:
          - /url: /themes
          - img "Sri Lankan Art" [ref=e224]
          - generic [ref=e228]:
            - paragraph [ref=e229]: Sri Lankan Art
            - paragraph [ref=e230]: Heritage & Culture
      - link "View All 17 Themes" [ref=e232] [cursor=pointer]:
        - /url: /themes
        - generic [ref=e234]: View All 17 Themes
    - generic [ref=e236]:
      - generic [ref=e237]:
        - generic [ref=e238]:
          - generic [ref=e239]: By Interior Space
          - heading "Shop by Room" [level=2] [ref=e241]
        - link "All Spaces" [ref=e242] [cursor=pointer]:
          - /url: /spaces
      - generic [ref=e243]:
        - link "Living Room Living Room" [ref=e245] [cursor=pointer]:
          - /url: /spaces
          - img "Living Room" [ref=e246]: 🛋️
          - generic [ref=e247]: Living Room
        - link "Bedroom Bedroom" [ref=e249] [cursor=pointer]:
          - /url: /spaces
          - img "Bedroom" [ref=e250]: 🛏️
          - generic [ref=e251]: Bedroom
        - link "Dining Room Dining Room" [ref=e253] [cursor=pointer]:
          - /url: /spaces
          - img "Dining Room" [ref=e254]: 🍽️
          - generic [ref=e255]: Dining Room
        - link "Office Office" [ref=e257] [cursor=pointer]:
          - /url: /spaces
          - img "Office" [ref=e258]: 💼
          - generic [ref=e259]: Office
        - link "Hotel Lobby Hotel Lobby" [ref=e261] [cursor=pointer]:
          - /url: /spaces
          - img "Hotel Lobby" [ref=e262]: 🏨
          - generic [ref=e263]: Hotel Lobby
        - link "Kids Room Kids Room" [ref=e265] [cursor=pointer]:
          - /url: /spaces
          - img "Kids Room" [ref=e266]: 🎨
          - generic [ref=e267]: Kids Room
        - link "Cafe Cafe" [ref=e269] [cursor=pointer]:
          - /url: /spaces
          - img "Cafe" [ref=e270]: ☕
          - generic [ref=e271]: Cafe
        - link "Reception Reception" [ref=e273] [cursor=pointer]:
          - /url: /spaces
          - img "Reception" [ref=e274]: 🏢
          - generic [ref=e275]: Reception
        - link "Kitchen Kitchen" [ref=e277] [cursor=pointer]:
          - /url: /spaces
          - img "Kitchen" [ref=e278]: 🍳
          - generic [ref=e279]: Kitchen
        - link "Salon Salon" [ref=e281] [cursor=pointer]:
          - /url: /spaces
          - img "Salon" [ref=e282]: ✂️
          - generic [ref=e283]: Salon
        - link "Hallway Hallway" [ref=e285] [cursor=pointer]:
          - /url: /spaces
          - img "Hallway" [ref=e286]: 🚪
          - generic [ref=e287]: Hallway
        - link "Gaming Room Gaming Room" [ref=e289] [cursor=pointer]:
          - /url: /spaces
          - img "Gaming Room" [ref=e290]: 🎮
          - generic [ref=e291]: Gaming Room
      - link "View All Spaces" [ref=e293] [cursor=pointer]:
        - /url: /spaces
        - generic [ref=e295]: View All Spaces
    - generic [ref=e297]:
      - generic [ref=e298]:
        - generic [ref=e299]: Bespoke Creations
        - heading "Can't find the perfect piece?" [level=2] [ref=e300]
        - paragraph [ref=e301]: We create fully custom wall art tailored to your space, color scheme, and vision. Hotels, offices, and residential projects welcome. Let's bring your idea to life.
      - generic [ref=e302]:
        - link "Start Custom Order" [ref=e303] [cursor=pointer]:
          - /url: /custom-order
          - generic [ref=e305]: Start Custom Order
        - link "Contact Us" [ref=e306] [cursor=pointer]:
          - /url: /contact
          - generic [ref=e308]: Contact Us
  - contentinfo [ref=e309]:
    - generic [ref=e312]:
      - generic [ref=e313]:
        - generic [ref=e314]:
          - generic [ref=e315]: VINSITH
          - generic [ref=e316]: Interior Wall Art
        - paragraph [ref=e317]: Premium wall art curated for Sri Lankan homes, hotels, and offices. Handpicked designs across every theme and space.
      - generic [ref=e318]:
        - generic [ref=e319]:
          - heading "Navigation" [level=3] [ref=e320]
          - list [ref=e321]:
            - listitem [ref=e322]:
              - link "Home" [ref=e323] [cursor=pointer]:
                - /url: /
            - listitem [ref=e324]:
              - link "Panels" [ref=e325] [cursor=pointer]:
                - /url: /panels
            - listitem [ref=e326]:
              - link "Themes" [ref=e327] [cursor=pointer]:
                - /url: /themes
            - listitem [ref=e328]:
              - link "Spaces" [ref=e329] [cursor=pointer]:
                - /url: /spaces
            - listitem [ref=e330]:
              - link "Catalog" [ref=e331] [cursor=pointer]:
                - /url: /catalog
            - listitem [ref=e332]:
              - link "About" [ref=e333] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e334]:
              - link "Contact" [ref=e335] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e336]:
              - link "Custom Order" [ref=e337] [cursor=pointer]:
                - /url: /custom-order
        - generic [ref=e338]:
          - heading "Follow Us" [level=3] [ref=e339]
          - generic [ref=e340]:
            - link "Facebook" [ref=e341] [cursor=pointer]:
              - /url: https://web.facebook.com/profile.php?id=61590636417644
              - img [ref=e342]
            - link "Instagram" [ref=e344] [cursor=pointer]:
              - /url: https://www.instagram.com/vinsithinteriorwallart/
              - img [ref=e345]
            - link "YouTube" [ref=e347] [cursor=pointer]:
              - /url: https://www.youtube.com/@VinsithInteriorWallArt
              - img [ref=e348]
            - link "TikTok" [ref=e350] [cursor=pointer]:
              - /url: https://www.tiktok.com/@vinsithinteriorwallart
              - img [ref=e351]
        - generic [ref=e353]:
          - heading "Customer Care" [level=3] [ref=e354]
          - list [ref=e355]:
            - listitem [ref=e356]:
              - generic [ref=e357]: Email
              - link "vinsithiwa@gmail.com" [ref=e358] [cursor=pointer]:
                - /url: mailto:vinsithiwa@gmail.com
            - listitem [ref=e359]:
              - generic [ref=e360]: Phone / WhatsApp
              - generic [ref=e361]: +94 77 069 7626
              - link "WhatsApp Us" [ref=e362] [cursor=pointer]:
                - /url: https://wa.me/94770697626
                - img [ref=e363]
                - text: WhatsApp Us
    - generic [ref=e366]:
      - paragraph [ref=e367]: © 2026 Vinsith Interior Wall Art. All rights reserved.
      - paragraph [ref=e368]: Colombo, Sri Lanka
  - button "Open Next.js Dev Tools" [ref=e374] [cursor=pointer]:
    - img [ref=e375]
  - alert [ref=e378]
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
> 19  |     await expect(page.locator("text=Featured")).toBeVisible({ timeout: 10_000 });
      |                                                 ^ Error: expect(locator).toBeVisible() failed
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
```