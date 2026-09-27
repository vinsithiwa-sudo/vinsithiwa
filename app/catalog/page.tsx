import type { Metadata } from "next";
import { Suspense } from "react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Wall Art Catalog | Vinsith Interior Wall Art",
  description: "Browse our full collection of luxury wall art. Filter by panel type, theme, space, and price. Handcrafted for homes, offices and hotels across Sri Lanka.",
};

export default async function CatalogPage() {
  // Fetch all the filter options from the DB
  const [themes, spaces, panels] = await Promise.all([
    prisma.theme.findMany({ orderBy: { name: "asc" } }),
    prisma.space.findMany({ orderBy: { name: "asc" } }),
    prisma.panel.findMany({ orderBy: { count: "asc" } }),
  ]);

  // Initial product fetch (unfiltered)
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: {
      theme: true,
      panel: true,
      space: true,
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 60,
  });

  const mappedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price: Number(p.basePrice),
    mainImage: p.mainImage,
    sizeChartTemplate: p.sizeChartTemplate,
    designNumber: p.designNumber,
    theme: p.theme?.name,
    panel: p.panel?.name,
    space: p.space?.name,
    isFeatured: p.isFeatured,
    themeId: p.themeId ?? undefined,
    spaceId: p.spaceId ?? undefined,
    panelId: p.panelId ?? undefined,
  }));

  return (
    <>
      <NavbarWrapper />
      <main className="pt-32 pb-24 bg-[#FAF8F4] min-h-screen">
        <Suspense>
          <CatalogClient
            initialProducts={mappedProducts}
            themes={themes}
            spaces={spaces}
            panels={panels}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
