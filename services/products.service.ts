import { Prisma } from "@/prisma/generated/client";
import prisma from "@/lib/prisma";
import type { ProductFormValues } from "@/lib/validations";

// ─────────────────────────────────────────────
// PUBLIC — List Products
// ─────────────────────────────────────────────

export async function getProducts(filters?: {
  themeId?: string;
  subthemeId?: string;
  spaceId?: string;
  panelId?: string;
  isFeatured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 24;

  const where: Prisma.ProductWhereInput = { isAvailable: true };

  if (filters?.themeId)    where.themeId    = filters.themeId;
  if (filters?.subthemeId) where.subthemeId = filters.subthemeId;
  if (filters?.spaceId)    where.spaceId    = filters.spaceId;
  if (filters?.panelId)    where.panelId    = filters.panelId;
  if (filters?.isFeatured) where.isFeatured = true;

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { tags: { has: filters.search } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        theme: true,
        subtheme: true,
        space: true,
        panel: true,
        images: { orderBy: { order: "asc" }, take: 1 },
        sizes: true,
        frames: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, pageSize };
}

// ─────────────────────────────────────────────
// PUBLIC — Single Product by Slug
// ─────────────────────────────────────────────

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      theme: true,
      subtheme: true,
      space: true,
      panel: true,
      images: { orderBy: { order: "asc" } },
      sizes: true,
      frames: true,
    },
  });
}

// ─────────────────────────────────────────────
// ADMIN — Create Product
// ─────────────────────────────────────────────

export async function createProduct(data: ProductFormValues) {
  const { sizes, frames, additionalImages, themeId, subthemeId, spaceId, panelId, sizeChartTemplate, ...scalar } = data;

  return prisma.product.create({
    data: {
      ...scalar,
      designNumber: scalar.designNumber || null,
      basePrice: new Prisma.Decimal(scalar.basePrice),
      sizeChartTemplate: sizeChartTemplate || null,
      ...(themeId    && { theme:    { connect: { id: themeId } } }),
      ...(subthemeId && { subtheme: { connect: { id: subthemeId } } }),
      ...(spaceId    && { space:    { connect: { id: spaceId } } }),
      ...(panelId    && { panel:    { connect: { id: panelId } } }),
      sizes:  { create: sizes.map((s) => ({ label: s.label, price: new Prisma.Decimal(s.price) })) },
      frames: { create: frames.map((f) => ({ label: f.label, price: new Prisma.Decimal(f.price) })) },
      images: { create: additionalImages.map((url, i) => ({ url, order: i })) },
    },
    include: { sizes: true, frames: true, images: true },
  });
}

// ─────────────────────────────────────────────
// ADMIN — Update Product
// ─────────────────────────────────────────────

export async function updateProduct(id: string, data: Partial<ProductFormValues>) {
  const { sizes, frames, additionalImages, themeId, subthemeId, spaceId, panelId, sizeChartTemplate, ...scalar } = data;

  return prisma.product.update({
    where: { id },
    data: {
      ...scalar,
      ...(scalar.designNumber !== undefined && { designNumber: scalar.designNumber || null }),
      ...(scalar.basePrice !== undefined && { basePrice: new Prisma.Decimal(scalar.basePrice) }),
      sizeChartTemplate: sizeChartTemplate || null,
      theme:    themeId    ? { connect: { id: themeId } }    : { disconnect: true },
      subtheme: subthemeId ? { connect: { id: subthemeId } } : { disconnect: true },
      space:    spaceId    ? { connect: { id: spaceId } }    : { disconnect: true },
      panel:    panelId    ? { connect: { id: panelId } }    : { disconnect: true },
      ...(sizes && {
        sizes: {
          deleteMany: {},
          create: sizes.map((s) => ({ label: s.label, price: new Prisma.Decimal(s.price) })),
        },
      }),
      ...(frames && {
        frames: {
          deleteMany: {},
          create: frames.map((f) => ({ label: f.label, price: new Prisma.Decimal(f.price) })),
        },
      }),
      ...(additionalImages && {
        images: {
          deleteMany: {},
          create: additionalImages.map((url, i) => ({ url, order: i })),
        },
      }),
    },
  });
}

// ─────────────────────────────────────────────
// ADMIN — Delete Product
// ─────────────────────────────────────────────

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

// ─────────────────────────────────────────────
// PUBLIC — Taxonomy Lists
// ─────────────────────────────────────────────

export async function getAllThemes() {
  return prisma.theme.findMany({
    include: { subthemes: true },
    orderBy: { name: "asc" },
  });
}

export async function getAllSpaces() {
  return prisma.space.findMany({ orderBy: { name: "asc" } });
}

export async function getAllPanels() {
  return prisma.panel.findMany({ orderBy: { count: "asc" } });
}

export async function getActiveBankAccounts() {
  return prisma.bankAccount.findMany({ where: { isActive: true } });
}

export async function getSetting(key: string) {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value ?? null;
}
