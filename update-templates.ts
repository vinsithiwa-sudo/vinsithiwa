import prisma from './lib/prisma';

async function main() {
  const products = await prisma.product.findMany({ include: { panel: true } });

  for (const product of products) {
    if (!product.sizeChartTemplate && product.panel) {
      let template = null;
      if (product.panel.name === '1 Piece') template = '1-piece-horizontal';
      if (product.panel.name === '2 Pieces') template = '2-piece-horizontal';
      if (product.panel.name === '3 Pieces') template = '3-piece-large';
      if (product.panel.name === '4 Pieces') template = '4-piece-layout-1';
      if (product.panel.name === '5 Pieces') template = '5-piece-standard';

      if (template) {
        await prisma.product.update({
          where: { id: product.id },
          data: { sizeChartTemplate: template }
        });
      }
    }
  }
  console.log("Updated templates successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
