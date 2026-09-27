import SubthemeForm from "@/components/admin/SubthemeForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditSubthemePage({ params }: { params: { id: string } }) {
  const [subtheme, themes] = await Promise.all([
    prisma.subtheme.findUnique({ where: { id: params.id } }),
    prisma.theme.findMany({ orderBy: { name: "asc" } })
  ]);
  
  if (!subtheme) return notFound();
  
  return <SubthemeForm initialData={subtheme} themes={themes} />;
}
