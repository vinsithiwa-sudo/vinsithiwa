import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a VIN-XXXX format order ID
 * e.g. VIN-1001, VIN-2047
 */
export function generateOrderId(lastId?: number): string {
  const num = lastId ? lastId + 1 : 1001;
  return `${num}`;
}

/**
 * Format a price in Sri Lankan Rupees
 */
export function formatPrice(amount: number | string | { toNumber: () => number }): string {
  const value = typeof amount === "object" ? amount.toNumber() : Number(amount);
  return new Intl.NumberFormat("si-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate a string to maxLen characters
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + "…";
}

/**
 * Build a WhatsApp message URL for order confirmation
 */
export function buildWhatsAppUrl(
  phone: string,
  orderId: string,
  totalAmount: string,
  items?: Array<{ title: string; quantity: number; selectedSize?: string }>
): string {
  let itemLines = "";
  if (items && items.length > 0) {
    itemLines = "\n\n🛍️ Items Ordered:\n" + items
      .map(item => {
        const size = item.selectedSize ? ` (${item.selectedSize})` : "";
        return `  • ${item.title}${size} × ${item.quantity}`;
      })
      .join("\n");
  }

  const message = encodeURIComponent(
    `Hello Vinsith Interior Wall Art! 👋\n\nI have placed an order with the following details:\n\n📦 Order ID: ${orderId}${itemLines}\n\n💰 Total Amount: ${totalAmount}\n\nI have attached my deposit slip for payment verification.\n\nThank you!`
  );
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

/**
 * Order status label and colour mapping
 */
export const ORDER_STATUS_MAP: Record<
  string,
  { label: string; color: string }
> = {
  PENDING_PAYMENT:   { label: "Pending Payment",    color: "#C9A84C" },
  PAYMENT_RECEIVED:  { label: "Payment Received",   color: "#4CAF50" },
  PROCESSING:        { label: "Processing",          color: "#2196F3" },
  READY_FOR_DELIVERY:{ label: "Ready for Delivery",  color: "#9C27B0" },
  DELIVERED:         { label: "Delivered",           color: "#1A1814" },
  CANCELLED:         { label: "Cancelled",           color: "#f44336" },
};
