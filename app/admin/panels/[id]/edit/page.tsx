import PanelForm from "@/components/admin/PanelForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPanelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const panel = await prisma.panel.findUnique({ where: { id } });
  
  if (!panel) return notFound();
  
  return <PanelForm initialData={panel} />;
}
