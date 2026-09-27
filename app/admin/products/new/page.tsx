import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function NewProductPage() {
  const [themes, spaces, panels] = await Promise.all([
    prisma.theme.findMany({ include: { subthemes: true }, orderBy: { name: 'asc' } }),
    prisma.space.findMany({ orderBy: { name: 'asc' } }),
    prisma.panel.findMany({ orderBy: { count: 'asc' } })
  ]);

  return (
    <div className="pb-10">
      <ProductForm 
        themes={themes} 
        spaces={spaces} 
        panels={panels} 
      />
    </div>
  );
}
