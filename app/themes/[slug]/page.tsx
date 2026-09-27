import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({
    where: { slug }
  });

  if (!theme) return { title: "Theme Not Found" };

  return {
    title: `${theme.name} Wall Art | Vinsith Interior Wall Art`,
    description: `Explore our collection of ${theme.name} themed luxury wall art.`,
  };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({
    where: { slug },
    include: {
      subthemes: true,
      products: {
        where: { isAvailable: true },
        include: {
          panel: true,
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!theme) {
    notFound();
  }

  return (
    <>
      <NavbarWrapper />
      <div className="bg-pearl min-h-screen pt-24 pb-20">
      
      {/* Theme Header */}
      <div className="bg-obsidian text-pearl py-16 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div>
            <span className="eyebrow inline-block mb-2">Theme Collection</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {theme.name}
            </h1>
          </div>
          <div className="text-sm text-pearl/60 uppercase tracking-widest">
            {theme.products.length} Products
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Subtheme Filter (Optional) */}
        {theme.subthemes.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            <span className="bg-[#1a1208] text-white px-5 py-2 rounded-full text-sm font-medium">
              All {theme.name}
            </span>
            {theme.subthemes.map(sub => (
              <Link 
                key={sub.id} 
                href={`/themes/${theme.slug}?subtheme=${sub.slug}`}
                className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {theme.products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-xl font-medium text-obsidian mb-2">No products found</h3>
            <p className="text-stone">We are currently updating our collection for this theme.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {theme.products.map(product => (
              <ProductCard 
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  slug: product.slug,
                  price: Number(product.basePrice),
                  mainImage: product.mainImage ?? undefined,
                  theme: theme.name,
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
