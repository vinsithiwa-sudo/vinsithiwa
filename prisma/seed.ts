import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@vinsith.lk" },
    update: {},
    create: {
      email: "admin@vinsith.lk",
      password: hashedPassword,
      name: "Vinsith Admin",
    },
  });
  console.log("✅ Admin user created");

  // ── Panels ──────────────────────────────────────────────────────────────────
  const panelData = [
    { name: "1 Piece", count: 1 },
    { name: "2 Pieces", count: 2 },
    { name: "3 Pieces", count: 3 },
    { name: "4 Pieces", count: 4 },
    { name: "5 Pieces", count: 5 },
  ];

  for (const p of panelData) {
    await prisma.panel.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }
  console.log("✅ Panels seeded");

  // ── Themes & Subthemes ───────────────────────────────────────────────────────
  const themeData = [
    { name: "Nature",       slug: "nature",       subs: ["Forest", "Ocean", "Mountains", "Waterfalls"] },
    { name: "Abstract",     slug: "abstract",     subs: [] },
    { name: "Gaming",       slug: "gaming",       subs: ["PS5", "FPS", "Racing", "Cyberpunk", "RGB Setup"] },
    { name: "Anime",        slug: "anime",        subs: ["Naruto-style", "One Piece-style", "Demon Slayer-style", "Character Art"] },
    { name: "Religion",     slug: "religion",     subs: ["Buddha Art", "Islamic Art", "Christian Art"] },
    { name: "Vehicles",     slug: "vehicles",     subs: ["Cars", "Supercars", "Bikes", "JDM"] },
    { name: "Flowers",      slug: "flowers",      subs: ["Roses", "Lotus", "Sakura"] },
    { name: "Animals",      slug: "animals",      subs: [] },
    { name: "Luxury",       slug: "luxury",       subs: [] },
    { name: "Modern",       slug: "modern",       subs: [] },
    { name: "Minimal",      slug: "minimal",      subs: [] },
    { name: "Sports",       slug: "sports",       subs: [] },
    { name: "Movies",       slug: "movies",       subs: [] },
    { name: "Music",        slug: "music",        subs: [] },
    { name: "Space / Galaxy", slug: "space-galaxy", subs: [] },
    { name: "Architecture",  slug: "architecture",  subs: [] },
    { name: "Sri Lankan Art", slug: "sri-lankan-art", subs: [] },
  ];

  for (const t of themeData) {
    const theme = await prisma.theme.upsert({
      where: { slug: t.slug },
      update: {},
      create: { name: t.name, slug: t.slug },
    });

    for (const sub of t.subs) {
      const subSlug = sub.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await prisma.subtheme.upsert({
        where: { themeId_slug: { themeId: theme.id, slug: subSlug } },
        update: {},
        create: { name: sub, slug: subSlug, themeId: theme.id },
      });
    }
  }
  console.log("✅ Themes & subthemes seeded");

  // ── Spaces ───────────────────────────────────────────────────────────────────
  const spaceData = [
    { name: "Living Room",  slug: "living-room" },
    { name: "Bedroom",      slug: "bedroom" },
    { name: "Dining Room",  slug: "dining-room" },
    { name: "Kitchen",      slug: "kitchen" },
    { name: "Kids Room",    slug: "kids-room" },
    { name: "Office",       slug: "office" },
    { name: "Reception",    slug: "reception" },
    { name: "Hotel Lobby",  slug: "hotel-lobby" },
    { name: "Cafe",         slug: "cafe" },
    { name: "Salon",        slug: "salon" },
    { name: "Hallway",      slug: "hallway" },
  ];

  for (const s of spaceData) {
    await prisma.space.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log("✅ Spaces seeded");

  // ── Bank Account ─────────────────────────────────────────────────────────────
  const existingBank = await prisma.bankAccount.findFirst();
  if (!existingBank) {
    await prisma.bankAccount.create({
      data: {
        bankName: "Commercial Bank of Ceylon",
        accountName: "Vinsith Interior Wall Art",
        accountNo: "1234567890",
        branch: "Colombo",
        isActive: true,
      },
    });
  }
  console.log("✅ Bank account seeded");

  // ── Settings ─────────────────────────────────────────────────────────────────
  const settings = [
    { key: "whatsappNumber", value: "+94770697626" },
    { key: "contactEmail",   value: "info@vinsith.lk" },
    { key: "contactPhone",   value: "+94770697626" },
    { key: "address",        value: "Colombo, Sri Lanka" },
    { key: "businessHours",  value: "Mon–Sat, 9am–6pm" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log("✅ Settings seeded");

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
