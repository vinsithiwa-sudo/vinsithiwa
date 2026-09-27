import SubthemeForm from "@/components/admin/SubthemeForm";
import prisma from "@/lib/prisma";

export default async function NewSubthemePage() {
  const themes = await prisma.theme.findMany({ orderBy: { name: "asc" } });
  return <SubthemeForm themes={themes} />;
}
