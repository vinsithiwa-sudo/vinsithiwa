import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.bdrecnxngspzwqmeimxn:Vinsith%402001@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    },
  },
})

async function main() {
  try {
    const panels = await prisma.panel.findMany()
    console.log("Success! Connected to aws-0. Panels:", panels)
  } catch (e) {
    console.error("Failed to connect to aws-0:", e)
  }
}

main().finally(() => prisma.$disconnect())
