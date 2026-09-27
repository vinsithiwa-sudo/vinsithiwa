"use client";

import { useOrderStore } from "@/store/orderStore";
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useOrderStore();
  const total = totalAmount();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "#FAF8F4",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: isOpen ? "-8px 0 40px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "#E8E2D9" }}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} style={{ color: DARK }} />
            <h2 className="font-display font-semibold text-lg" style={{ color: DARK }}>
              Your Cart
            </h2>
            {items.length > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold"
                style={{ backgroundColor: GOLD, color: "#fff" }}
              >
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-[#E8E2D9]"
            style={{ color: DARK }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingCart size={48} style={{ color: "#E8E2D9" }} />
              <p className="font-display text-lg" style={{ color: DARK }}>Your cart is empty</p>
              <p className="font-body text-sm" style={{ color: "#8C7B6A" }}>
                Browse our collection and add some wall art!
              </p>
              <Link
                href="/catalog"
                onClick={onClose}
                className="mt-2 px-6 py-3 font-body text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: DARK, color: "#FAF8F4" }}
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: "#E8E2D9" }}>
              {items.map((item) => (
                <li key={item.productId} className="p-5 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 flex-shrink-0 bg-[#E8E2D9] overflow-hidden relative">
                    {item.mainImage ? (
                      <Image
                        src={item.mainImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart size={20} style={{ color: "#8C7B6A" }} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate mb-1" style={{ color: DARK }}>
                      {item.title}
                    </p>
                    {item.selectedSize && (
                      <p className="font-body text-xs mb-0.5" style={{ color: "#8C7B6A" }}>
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedFrame && (
                      <p className="font-body text-xs mb-2" style={{ color: "#8C7B6A" }}>
                        Frame: {item.selectedFrame}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center border" style={{ borderColor: "#E8E2D9" }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#E8E2D9] transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={12} style={{ color: DARK }} />
                        </button>
                        <span className="w-8 text-center font-body text-sm" style={{ color: DARK }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#E8E2D9] transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={12} style={{ color: DARK }} />
                        </button>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-semibold" style={{ color: DARK }}>
                          LKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 hover:text-red-500 transition-colors"
                          style={{ color: "#8C7B6A" }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-6 space-y-4" style={{ borderColor: "#E8E2D9" }}>
            {/* Order total */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm" style={{ color: "#8C7B6A" }}>Order Total</span>
              <span className="font-display text-xl font-semibold" style={{ color: DARK }}>
                LKR {total.toLocaleString()}
              </span>
            </div>

            {/* Place Order */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 text-center font-body text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-85"
              style={{ backgroundColor: DARK, color: "#FAF8F4" }}
            >
              Place Order
            </Link>

            {/* Clear cart */}
            <button
              onClick={() => { clearCart(); onClose(); }}
              className="w-full py-2 font-body text-xs tracking-widest uppercase text-center transition-opacity hover:opacity-60"
              style={{ color: "#8C7B6A" }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
