import prisma from './lib/prisma';

async function check() {
  const p = await prisma.product.findFirst({ where: { title: "first one" } });
  console.log("sizeChartTemplate:", p?.sizeChartTemplate);
}

check().finally(() => prisma.$disconnect());
