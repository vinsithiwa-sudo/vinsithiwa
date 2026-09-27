import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = await prisma.space.findUnique({
    where: { slug }
  });

  if (!space) return { title: "Space Not Found" };

  return {
    title: `${space.name} Wall Art | Vinsith Interior Wall Art`,
    description: `Explore our collection of luxury wall art for your ${space.name.toLowerCase()}.`,
  };
}

export default async function SpacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = await prisma.space.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isAvailable: true },
        include: {
          panel: true,
          theme: true,
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!space) {
    notFound();
  }

  return (
    <>
      <NavbarWrapper />
      <div className="bg-pearl min-h-screen pt-24 pb-20">
      
      {/* Space Header */}
      <div className="bg-obsidian text-pearl py-16 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div>
            <span className="eyebrow inline-block mb-2">Shop by Room</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {space.name}
            </h1>
          </div>
          <div className="text-sm text-pearl/60 uppercase tracking-widest">
            {space.products.length} Products
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Product Grid */}
        {space.products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-xl font-medium text-obsidian mb-2">No products found</h3>
            <p className="text-stone">We are currently updating our collection for this space.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {space.products.map(product => (
              <ProductCard 
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  slug: product.slug,
                  price: Number(product.basePrice),
                  mainImage: product.mainImage ?? undefined,
                  theme: product.theme?.name || "",
                  panel: product.panel?.name,
                  isFeatured: product.isFeatured,
                  sizeChartTemplate: product.sizeChartTemplate,
                  designNumber: product.designNumber,
                }}
              />
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}
