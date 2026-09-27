import prisma from "@/lib/prisma";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const panels = await prisma.panel.findMany({
    select: { id: true, name: true, count: true },
    orderBy: { count: "asc" },
  });

  return <Navbar panels={panels} />;
}
