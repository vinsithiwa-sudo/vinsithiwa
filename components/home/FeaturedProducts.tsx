import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import ProductCard from "@/components/product/ProductCard";
import AnimatedBeamButton from "@/components/ui/AnimatedBeamButton";
import prisma from "@/lib/prisma";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true, isAvailable: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { theme: true, panel: true },
  });
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] w-full mx-auto">
      {/* Header */}
      <FadeUp className="flex flex-col items-start mb-12">
        <span
          className="font-body text-[10px] tracking-[0.35em] uppercase font-medium mb-3"
          style={{ color: GOLD }}
        >
          Curated Selection
        </span>
        <span className="w-8 h-px mb-4" style={{ backgroundColor: GOLD, display: "block" }} />
        <div className="flex items-end justify-between w-full flex-wrap gap-4">
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1A1814" }}
          >
            Featured Collection
          </h2>
          <Link
            href="/catalog"
            className="font-body text-sm tracking-widest uppercase pb-0.5 transition-colors hover:opacity-70"
            style={{
              color: GOLD,
              borderBottom: `1px solid ${GOLD}`,
            }}
          >
            View All
          </Link>
        </div>
      </FadeUp>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product, i) => (
          <FadeUp key={product.id} delay={i * 0.1}>
              <ProductCard
                product={{
                  id: product.id,
                  title: product.title,
                  slug: product.slug,
                  price: Number(product.basePrice),
                  mainImage: product.mainImage ?? undefined,
                  theme: product.theme?.name,
                  panel: product.panel?.name,
                  isFeatured: product.isFeatured,
                  sizeChartTemplate: product.sizeChartTemplate,
                  designNumber: product.designNumber,
                }}
              />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
