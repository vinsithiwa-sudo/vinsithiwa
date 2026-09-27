import Link from "next/link";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ProductOrderWidget from "@/components/product/ProductOrderWidget";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { theme: true },
  });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Vinsith Interior Wall Art`,
    description: product.seoDescription || `${product.title} — Premium wall art. ${product.description.slice(0, 140)}`,
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.mainImage ? [{ url: product.mainImage }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      theme: true,
      subtheme: true,
      panel: true,
      space: true,
      sizes: { orderBy: { price: "asc" } },
      frames: { orderBy: { price: "asc" } },
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!product || !product.isAvailable) {
    notFound();
  }

  const galleryImages = [
    ...(product.mainImage ? [{ url: product.mainImage, alt: product.title }] : []),
    ...product.images.map((img) => ({ url: img.url, alt: img.alt || product.title })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: galleryImages.map(img => img.url),
    description: product.description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "LKR",
      lowPrice: Number(product.basePrice),
      availability: product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavbarWrapper />
      <main className="pt-32 pb-24 bg-[#FAF8F4] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 font-body text-[10px] tracking-widest uppercase">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors" style={{ color: "#8C7B6A" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "#8C7B6A" }} />
            <Link href="/catalog" className="hover:text-[#C9A84C] transition-colors" style={{ color: "#8C7B6A" }}>Catalog</Link>
            {product.theme && (
              <>
                <ChevronRight size={12} style={{ color: "#8C7B6A" }} />
                <Link href={`/themes/${product.theme.slug}`} className="hover:text-[#C9A84C] transition-colors" style={{ color: "#8C7B6A" }}>
                  {product.theme.name}
                </Link>
              </>
            )}
            <ChevronRight size={12} style={{ color: "#8C7B6A" }} />
            <span style={{ color: DARK }}>{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Images */}
            <div>
              <ProductImageGallery images={galleryImages} />
            </div>

            {/* Right: Info + Order Widget */}
            <div className="flex flex-col">

              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[10px] tracking-[0.35em] uppercase font-medium block" style={{ color: GOLD }}>
                  {[product.theme?.name, product.panel?.name].filter(Boolean).join(" · ")}
                </span>
                {product.designNumber && (
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: "#8C7B6A" }}>
                    Design No: <strong style={{ color: DARK }}>{product.designNumber}</strong>
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: DARK }}>
                {product.title}
              </h1>

              <div className="w-12 h-px mb-6" style={{ backgroundColor: "#E8E2D9" }} />

              <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "#8C7B6A" }}>
                {product.description}
              </p>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 font-body text-[10px] tracking-widest uppercase border"
                      style={{ borderColor: "#E8E2D9", color: "#8C7B6A" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Interactive Order Widget — client component */}
              <ProductOrderWidget
                productId={product.id}
                productTitle={product.title}
                mainImage={product.mainImage}
                basePrice={Number(product.basePrice)}
                sizes={product.sizes.map(s => ({ label: s.label, price: Number(s.price) }))}
                frames={product.frames.map(f => ({ label: f.label, price: Number(f.price) }))}
                sizeChartTemplate={product.sizeChartTemplate}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
