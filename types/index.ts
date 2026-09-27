import { Prisma } from "@prisma/client";

// ─────────────────────────────────────────────
// Prisma Model Types (for use across the app)
// ─────────────────────────────────────────────

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    theme: true;
    subtheme: true;
    space: true;
    panel: true;
    images: true;
    sizes: true;
    frames: true;
  };
}>;

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    customer: true;
    items: {
      include: {
        product: true;
      };
    };
    bankAccount: true;
  };
}>;

export type ThemeWithSubthemes = Prisma.ThemeGetPayload<{
  include: { subthemes: true };
}>;

export type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: { product: true };
}>;

// ─────────────────────────────────────────────
// Shared UI/API Types
// ─────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type OrderStatusType =
  | "PENDING_PAYMENT"
  | "PAYMENT_RECEIVED"
  | "PROCESSING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface SiteSettings {
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  businessHours: string;
}
