import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.setting.upsert({
    where: { key: "whatsappNumber" },
    update: { value: "+94770697626" },
    create: { key: "whatsappNumber", value: "+94770697626" },
  });

  await prisma.setting.upsert({
    where: { key: "contactPhone" },
    update: { value: "+94770697626" },
    create: { key: "contactPhone", value: "+94770697626" },
  });

  console.log("✅ Phone numbers updated in database to +94770697626");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

