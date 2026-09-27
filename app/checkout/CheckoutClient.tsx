"use client";

import OrderForm from "@/components/order/OrderForm";
import { useOrderStore } from "@/store/orderStore";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Trash2 } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";
const BORDER = "#E8E2D9";

export default function CheckoutClient() {
  const { items, totalAmount, removeItem } = useOrderStore();

  return (
    <main className="pt-32 pb-24 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 font-body text-[10px] tracking-widest uppercase">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors" style={{ color: "#8C7B6A" }}>Home</Link>
          <ChevronRight size={12} style={{ color: "#8C7B6A" }} />
          <span style={{ color: DARK }}>Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Order Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="font-display font-bold text-3xl mb-8" style={{ color: DARK }}>
              Secure Checkout
            </h1>
            
            <div className="bg-white p-6 md:p-10 border" style={{ borderColor: BORDER }}>
              <OrderForm />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-6 md:p-8 border sticky top-32" style={{ borderColor: BORDER }}>
              <h2 className="font-display font-semibold text-xl mb-6" style={{ color: DARK }}>
                Order Summary
              </h2>

              {items.length === 0 ? (
                <div className="py-8 text-center border-t border-b" style={{ borderColor: BORDER }}>
                  <p className="font-body text-sm" style={{ color: "#8C7B6A" }}>Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 mb-6">
                  {items.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-[#F0EBE3] border flex-shrink-0 relative overflow-hidden" style={{ borderColor: BORDER }}>
                        {item.mainImage ? (
                          <Image src={item.mainImage} alt={item.title} fill className="object-cover" sizes="64px" />
                        ) : null}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-body text-sm font-medium leading-tight mb-1" style={{ color: DARK }}>
                          {item.title}
                        </h4>
                        <div className="font-body text-xs flex flex-col gap-0.5" style={{ color: "#8C7B6A" }}>
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedFrame && <span>Frame: {item.selectedFrame}</span>}
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <span className="font-body text-sm font-medium" style={{ color: DARK }}>
                          LKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between font-body text-sm mb-2" style={{ color: "#8C7B6A" }}>
                  <span>Subtotal</span>
                  <span>LKR {totalAmount().toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between font-body text-sm mb-4" style={{ color: "#8C7B6A" }}>
                  <span>Delivery</span>
                  <span>To be calculated</span>
                </div>
                
                <div className="flex items-center justify-between font-display text-xl font-semibold border-t pt-4" style={{ borderColor: BORDER, color: DARK }}>
                  <span>Total</span>
                  <span>LKR {totalAmount().toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
