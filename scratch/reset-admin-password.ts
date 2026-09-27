import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function resetAdminPassword() {
  const email = "admin@vinsith.lk";
  const newPassword = "Vinsith@2025";
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.adminUser.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log("✅ Password updated successfully!");
  console.log("Email:", user.email);
  console.log("Password:", newPassword);
}

resetAdminPassword().finally(() => prisma.$disconnect());
