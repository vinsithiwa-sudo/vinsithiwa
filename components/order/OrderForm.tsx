"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryFormSchema, DeliveryFormValues } from "@/lib/validations";
import { useOrderStore } from "@/store/orderStore";
import { useRouter } from "next/navigation";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

export default function OrderForm() {
  const { items, totalAmount, clearCart } = useOrderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const total = totalAmount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliveryFormSchema) as any,
  });

  const onSubmit = async (data: any) => {
    if (items.length === 0) {
      setError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Inject live cart items at submit time
    const payload = {
      ...data,
      items: items.map(item => ({
        productId: item.productId,
        selectedSize: item.selectedSize,
        selectedFrame: item.selectedFrame,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    };

    try {
      const response = await fetch("/api/public/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      clearCart();
      router.push(`/order-confirmation/${result.data.orderId}`);

    } catch (err: any) {
      setError(err.message || "An error occurred while placing the order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-sm mb-2" style={{ color: DARK }}>Full Name *</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: errors.name ? "red" : "#E8E2D9" }}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-body text-sm mb-2" style={{ color: DARK }}>Phone Number *</label>
          <input
            {...register("phone")}
            className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: errors.phone ? "red" : "#E8E2D9" }}
            placeholder="077 123 4567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-body text-sm mb-2" style={{ color: DARK }}>WhatsApp Number *</label>
          <input
            {...register("whatsapp")}
            className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: errors.whatsapp ? "red" : "#E8E2D9" }}
            placeholder="077 123 4567"
          />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
        </div>

        <div>
          <label className="block font-body text-sm mb-2" style={{ color: DARK }}>City *</label>
          <input
            {...register("city")}
            className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: errors.city ? "red" : "#E8E2D9" }}
            placeholder="Colombo"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-body text-sm mb-2" style={{ color: DARK }}>Delivery Address *</label>
        <textarea
          {...register("address")}
          rows={3}
          className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
          style={{ borderColor: errors.address ? "red" : "#E8E2D9" }}
          placeholder="No. 123, Main Street"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block font-body text-sm mb-2" style={{ color: DARK }}>Order Notes (Optional)</label>
        <textarea
          {...register("deliveryNotes")}
          rows={2}
          className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C]"
          style={{ borderColor: "#E8E2D9" }}
          placeholder="Any special requests or delivery instructions?"
        />
      </div>

      <div className="pt-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full py-4 font-body text-sm tracking-widest uppercase font-medium transition-opacity disabled:opacity-50"
          style={{ backgroundColor: DARK, color: "#FAF8F4", borderRadius: "1px" }}
        >
          {isSubmitting ? "Processing..." : `Place Order — LKR ${total.toLocaleString()}`}
        </button>
        <p className="text-center font-body text-[10px] tracking-wide mt-3" style={{ color: "#8C7B6A" }}>
          After placing, you will receive bank transfer details and a WhatsApp link to send your payment slip.
        </p>
      </div>
    </form>
  );
}
