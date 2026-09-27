import { OrderStatus, Prisma } from "@/prisma/generated/client";
import prisma from "@/lib/prisma";
import { generateOrderId } from "@/lib/utils";
import type { OrderFormValues } from "@/lib/validations";

// ─────────────────────────────────────────────
// PUBLIC — Create Order
// ─────────────────────────────────────────────

export async function createOrder(data: OrderFormValues) {
  return prisma.$transaction(async (tx) => {
    // 1. Find or create customer (match by phone)
    let customer = await tx.customer.findFirst({
      where: { phone: data.phone },
    });

    if (customer) {
      customer = await tx.customer.update({
        where: { id: customer.id },
        data: {
          name: data.name,
          whatsapp: data.whatsapp,
          address: data.address,
          city: data.city,
        },
      });
    } else {
      customer = await tx.customer.create({
        data: {
          name: data.name,
          phone: data.phone,
          whatsapp: data.whatsapp,
          address: data.address,
          city: data.city,
        },
      });
    }

    // 2. Generate orderId (VIN-XXXX)
    const lastOrder = await tx.order.findFirst({ orderBy: { createdAt: "desc" } });
    const lastNum = lastOrder
      ? parseInt(lastOrder.orderId.replace(/\D/g, ""), 10)
      : 1000;
    const orderId = generateOrderId(lastNum);

    // 3. Calculate total
    const total = data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // 4. Create order
    const order = await tx.order.create({
      data: {
        orderId,
        customerId: customer.id,
        totalAmount: new Prisma.Decimal(total),
        bankAccountId: data.bankAccountId,
        deliveryNotes: data.deliveryNotes,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            selectedSize: item.selectedSize,
            selectedFrame: item.selectedFrame,
            quantity: item.quantity,
            unitPrice: new Prisma.Decimal(item.unitPrice),
          })),
        },
      },
      include: { customer: true, items: { include: { product: true } }, bankAccount: true },
    });

    return order;
  });
}

// ─────────────────────────────────────────────
// ADMIN — List Orders
// ─────────────────────────────────────────────

export async function getOrders(filters?: {
  status?: OrderStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 20;

  const where: Prisma.OrderWhereInput = {};
  if (filters?.status) where.status = filters.status;
  if (filters?.search) {
    where.OR = [
      { orderId: { contains: filters.search, mode: "insensitive" } },
      { customer: { name: { contains: filters.search, mode: "insensitive" } } },
      { customer: { phone: { contains: filters.search } } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        customer: true,
        items: { include: { product: true } },
        bankAccount: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, page, pageSize };
}

// ─────────────────────────────────────────────
// ADMIN — Get Single Order
// ─────────────────────────────────────────────

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: { include: { product: { include: { images: true } } } },
      bankAccount: true,
    },
  });
}

// ─────────────────────────────────────────────
// ADMIN — Update Order Status
// ─────────────────────────────────────────────

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  paymentVerified?: boolean
) {
  return prisma.order.update({
    where: { id },
    data: {
      status,
      ...(paymentVerified !== undefined && { paymentVerified }),
    },
  });
}
