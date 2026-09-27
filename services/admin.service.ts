import prisma from "@/lib/prisma";

// ─────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────

export async function getDashboardStats() {
  const [totalOrders, pendingOrders, totalProducts, totalRevenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING_PAYMENT" } }),
    prisma.product.count({ where: { isAvailable: true } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ["PAYMENT_RECEIVED", "PROCESSING", "READY_FOR_DELIVERY", "DELIVERED"] } },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    totalProducts,
    totalRevenue: totalRevenue._sum.totalAmount?.toNumber() ?? 0,
  };
}

// ─────────────────────────────────────────────
// CUSTOM REQUESTS
// ─────────────────────────────────────────────

export async function getCustomRequests(status?: string) {
  return prisma.customRequest.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateCustomRequestStatus(id: string, status: string) {
  return prisma.customRequest.update({ where: { id }, data: { status } });
}

// ─────────────────────────────────────────────
// THEME / SPACE / PANEL MANAGEMENT
// ─────────────────────────────────────────────

export async function createTheme(name: string, slug: string) {
  return prisma.theme.create({ data: { name, slug } });
}

export async function updateTheme(id: string, name: string, slug: string) {
  return prisma.theme.update({ where: { id }, data: { name, slug } });
}

export async function deleteTheme(id: string) {
  return prisma.theme.delete({ where: { id } });
}

export async function createSubtheme(name: string, slug: string, themeId: string) {
  return prisma.subtheme.create({ data: { name, slug, themeId } });
}

export async function updateSubtheme(id: string, name: string, slug: string, themeId: string) {
  return prisma.subtheme.update({ where: { id }, data: { name, slug, themeId } });
}

export async function deleteSubtheme(id: string) {
  return prisma.subtheme.delete({ where: { id } });
}

export async function createSpace(name: string, slug: string, icon?: string, description?: string, color?: string) {
  return prisma.space.create({ data: { name, slug, icon, description, color } });
}

export async function updateSpace(id: string, name: string, slug: string, icon?: string, description?: string, color?: string) {
  return prisma.space.update({ where: { id }, data: { name, slug, icon, description, color } });
}

export async function deleteSpace(id: string) {
  return prisma.space.delete({ where: { id } });
}

export async function createPanel(name: string, count: number) {
  return prisma.panel.create({ data: { name, count } });
}

export async function updatePanel(id: string, name: string, count: number) {
  return prisma.panel.update({ where: { id }, data: { name, count } });
}

export async function deletePanel(id: string) {
  return prisma.panel.delete({ where: { id } });
}

// ─────────────────────────────────────────────
// BANK ACCOUNTS
// ─────────────────────────────────────────────

export async function createBankAccount(data: {
  bankName: string;
  accountName: string;
  accountNo: string;
  branch?: string;
}) {
  return prisma.bankAccount.create({ data });
}

export async function toggleBankAccount(id: string, isActive: boolean) {
  return prisma.bankAccount.update({ where: { id }, data: { isActive } });
}

export async function updateBankAccount(id: string, data: {
  bankName: string;
  accountName: string;
  accountNo: string;
  branch?: string;
}) {
  return prisma.bankAccount.update({ where: { id }, data });
}

export async function deleteBankAccount(id: string) {
  return prisma.bankAccount.delete({ where: { id } });
}

// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────

export async function upsertSetting(key: string, value: string) {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getAllSettings() {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((s: { key: string; value: string }) => [s.key, s.value]));
}
