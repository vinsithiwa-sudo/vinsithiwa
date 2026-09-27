import SpaceForm from "@/components/admin/SpaceForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditSpacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = await prisma.space.findUnique({ where: { id } });
  
  if (!space) return notFound();
  
  return <SpaceForm initialData={space} />;
}

