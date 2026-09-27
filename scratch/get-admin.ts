import 'dotenv/config';
import prisma from '../lib/prisma';

async function checkAdmin() {
  const users = await prisma.adminUser.findMany();
  console.log("Admin users found:", users.length);
  console.log(users.map(u => ({ id: u.id, email: u.email, name: u.name })));
}

checkAdmin().finally(() => prisma.$disconnect());
