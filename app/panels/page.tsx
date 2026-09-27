import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import PanelsClient from "./PanelsClient";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop by Panel | Vinsith Interior Wall Art",
  description: "Browse 1-piece to 5-piece multi-panel wall art sets. Find the perfect configuration for your wall dimensions, from minimalist singles to expansive 5-panel masterpieces.",
};

const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";

export default async function PanelsPage() {
  const [panels, products] = await Promise.all([
    prisma.panel.findMany({ orderBy: { count: "asc" } }),
    prisma.product.findMany({
      where: { isAvailable: true },
      include: { theme: true, panel: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const mappedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price: Number(p.basePrice),
    mainImage: p.mainImage ?? undefined,
    sizeChartTemplate: p.sizeChartTemplate,
    theme: p.theme?.name,
    panel: p.panel?.name,
    panelId: p.panelId ?? undefined,
    isFeatured: p.isFeatured,
    designNumber: p.designNumber,
  }));

  return (
    <>
      <NavbarWrapper />
      <main className="pt-24 min-h-screen bg-[#FAF8F4]">
        {/* Dark Banner Header */}
        <div className="py-20 px-6 lg:px-12 relative" style={{ backgroundColor: DARK }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at center, #C9A84C 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-6 font-body text-[10px] tracking-widest uppercase">
              <Link href="/" className="hover:text-[#C9A84C] transition-colors" style={{ color: "rgba(250,248,244,0.6)" }}>Home</Link>
              <ChevronRight size={12} style={{ color: "rgba(250,248,244,0.6)" }} />
              <span style={{ color: TEXT_LIGHT }}>Panels</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: TEXT_LIGHT }}>
              Shop by Panel
            </h1>
            <p className="font-body text-base max-w-xl" style={{ color: "rgba(250,248,244,0.7)" }}>
              From minimalist single pieces to expansive 5-piece multi-panel sets, find the perfect configuration for your wall dimension.
            </p>
          </div>
        </div>

        <PanelsClient panels={panels} products={mappedProducts} />
      </main>
      <Footer />
    </>
  );
}
