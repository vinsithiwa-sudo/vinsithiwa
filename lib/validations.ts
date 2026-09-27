import { z } from "zod";

// ─────────────────────────────────────────────
// ORDER FORM
// ─────────────────────────────────────────────

// Full order schema (used by the API to validate the complete payload)
export const orderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Enter a valid phone number"),
  whatsapp: z.string().min(9, "Enter a valid WhatsApp number"),
  address: z.string().min(5, "Enter your delivery address"),
  city: z.string().min(2, "Enter your city"),
  deliveryNotes: z.string().optional(),
  bankAccountId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      selectedSize: z.string().optional(),
      selectedFrame: z.string().optional(),
      quantity: z.number().int().positive().default(1),
      unitPrice: z.number().positive(),
    })
  ).min(1, "At least one product is required"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

// Delivery-only schema (used by the front-end form — items come from cart)
export const deliveryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Enter a valid phone number"),
  whatsapp: z.string().min(9, "Enter a valid WhatsApp number"),
  address: z.string().min(5, "Enter your delivery address"),
  city: z.string().min(2, "Enter your city"),
  deliveryNotes: z.string().optional(),
  bankAccountId: z.string().optional(),
});

export type DeliveryFormValues = z.infer<typeof deliveryFormSchema>;



// ─────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ─────────────────────────────────────────────
// CUSTOM ORDER REQUEST
// ─────────────────────────────────────────────

export const customRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(9, "Enter a valid phone number"),
  whatsapp: z.string().min(9, "Enter a valid WhatsApp number"),
  description: z.string().min(20, "Please describe your custom order in detail"),
  budget: z.string().optional(),
  spaceType: z.string().optional(),
});

export type CustomRequestValues = z.infer<typeof customRequestSchema>;

// ─────────────────────────────────────────────
// ADMIN — PRODUCT
// ─────────────────────────────────────────────

export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  description: z.string().min(10, "Description is required"),
  basePrice: z.number().positive("Price must be positive"),
  mainImage: z.string().url("Main image must be a valid URL"),
  designNumber: z.string().optional(),
  themeId: z.string().optional(),
  subthemeId: z.string().optional(),
  spaceId: z.string().optional(),
  panelId: z.string().optional(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  sizeChartTemplate: z.string().optional(),
  sizes: z.array(z.object({ label: z.string(), price: z.number().positive() })).default([]),
  frames: z.array(z.object({ label: z.string(), price: z.number().positive() })).default([]),
  additionalImages: z.array(z.string().url()).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// ─────────────────────────────────────────────
// ADMIN — ORDER STATUS UPDATE
// ─────────────────────────────────────────────

export const orderStatusSchema = z.object({
  status: z.enum([
    "PENDING_PAYMENT",
    "PAYMENT_RECEIVED",
    "PROCESSING",
    "READY_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
  paymentVerified: z.boolean().optional(),
});

export type OrderStatusValues = z.infer<typeof orderStatusSchema>;
