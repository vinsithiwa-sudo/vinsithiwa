import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, themes, spaces, panels] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        frames: true,
        images: { orderBy: { order: "asc" } },
      }
    }),
    prisma.theme.findMany({ include: { subthemes: true }, orderBy: { name: 'asc' } }),
    prisma.space.findMany({ orderBy: { name: 'asc' } }),
    prisma.panel.findMany({ orderBy: { count: 'asc' } })
  ]);

  if (!product) {
    notFound();
  }

  // Serialize Prisma Decimal fields to plain numbers/strings before
  // passing to the client-side ProductForm component
  const serializedProduct = {
    ...product,
    basePrice: Number(product.basePrice),
    sizes: product.sizes.map((s) => ({ ...s, price: Number(s.price) })),
    frames: product.frames.map((f) => ({ ...f, price: Number(f.price) })),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return (
    <div className="pb-10">
      <ProductForm 
        initialData={serializedProduct}
        themes={themes} 
        spaces={spaces} 
        panels={panels} 
      />
    </div>
  );
}
