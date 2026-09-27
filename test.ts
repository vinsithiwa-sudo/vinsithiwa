import prisma from "./lib/prisma";

async function main() {
  const products = await prisma.product.findMany();
  console.log(products.map(p => ({ title: p.title, designNumber: p.designNumber })));
}
main();
