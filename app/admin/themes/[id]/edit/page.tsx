import ThemeForm from "@/components/admin/ThemeForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditThemePage({ params }: { params: { id: string } }) {
  const theme = await prisma.theme.findUnique({ where: { id: params.id } });
  
  if (!theme) return notFound();
  
  return <ThemeForm initialData={theme} />;
}
