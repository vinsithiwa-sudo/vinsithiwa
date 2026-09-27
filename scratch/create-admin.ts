import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  const email = "admin@vinsith.lk";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.adminUser.upsert({
      where: { email },
      update: {
        password: hashedPassword,
      },
      create: {
        name: "Admin",
        email,
        password: hashedPassword,
      },
    });
    console.log("Admin user created/updated successfully.");
    console.log("Email:", user.email);
    console.log("Password:", password);
  } catch (error) {
    console.error("Failed to create admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
