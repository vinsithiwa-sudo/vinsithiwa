"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";
import SizeChartViewer from "./SizeChartViewer";
import { ShoppingCart, Zap, Minus, Plus } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

interface PricingOption {
  label: string;
  price: number;
}

interface ProductOrderWidgetProps {
  productId: string;
  productTitle: string;
  mainImage?: string | null;
  basePrice: number;
  sizes: PricingOption[];
  frames: PricingOption[];
  sizeChartTemplate?: string | null;
}

export default function ProductOrderWidget({
  productId,
  productTitle,
  mainImage,
  basePrice,
  sizes,
  frames,
  sizeChartTemplate,
}: ProductOrderWidgetProps) {
  const router = useRouter();
  const { addItem } = useOrderStore();

  const [selectedSize, setSelectedSize] = useState(sizes[0] || { label: "Standard", price: basePrice });
  const [selectedFrame, setSelectedFrame] = useState(frames[0] || { label: "No Frame", price: 0 });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const unitPrice = selectedSize.price + selectedFrame.price;
  const totalPrice = unitPrice * quantity;

  const buildCartItem = () => ({
    productId,
    title: productTitle,
    mainImage: mainImage || "",
    basePrice,
    selectedSize: selectedSize.label,
    selectedFrame: selectedFrame.label,
    quantity,
    unitPrice,
  });

  const handleAddToCart = () => {
    addItem(buildCartItem());
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(buildCartItem());
    router.push("/checkout");
  };

  return (
    <>
      {/* Price display */}
      <div className="flex items-baseline gap-3 mb-8">
        <p className="font-display text-2xl" style={{ color: DARK }}>
          LKR {totalPrice.toLocaleString()}
        </p>
        {quantity > 1 && (
          <span className="font-body text-sm" style={{ color: "#8C7B6A" }}>
            ({quantity} × LKR {unitPrice.toLocaleString()})
          </span>
        )}
      </div>

      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color: DARK }}>
            Select Size
          </h3>
          <div className="flex flex-col gap-2">
            {sizes.map((size, i) => (
              <label
                key={i}
                className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                style={{
                  borderColor: selectedSize.label === size.label ? GOLD : "#E8E2D9",
                  backgroundColor: selectedSize.label === size.label ? "rgba(201,168,76,0.05)" : "transparent",
                }}
                onClick={() => setSelectedSize(size)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center"
                    style={{ borderColor: selectedSize.label === size.label ? GOLD : "#E8E2D9" }}
                  >
                    {selectedSize.label === size.label && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
                    )}
                  </div>
                  <span className="font-body text-sm" style={{ color: DARK }}>
                    {size.label}
                  </span>
                </div>
                <span className="font-body text-sm font-medium" style={{ color: DARK }}>
                  LKR {size.price.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Frames */}
      {frames.length > 0 && (
        <div className="mb-8">
          <h3 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color: DARK }}>
            Frame Option
          </h3>
          <div className="flex flex-col gap-2">
            {frames.map((frame, i) => (
              <label
                key={i}
                className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                style={{
                  borderColor: selectedFrame.label === frame.label ? GOLD : "#E8E2D9",
                  backgroundColor: selectedFrame.label === frame.label ? "rgba(201,168,76,0.05)" : "transparent",
                }}
                onClick={() => setSelectedFrame(frame)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center"
                    style={{ borderColor: selectedFrame.label === frame.label ? GOLD : "#E8E2D9" }}
                  >
                    {selectedFrame.label === frame.label && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
                    )}
                  </div>
                  <span className="font-body text-sm" style={{ color: DARK }}>
                    {frame.label}
                  </span>
                </div>
                <span className="font-body text-sm font-medium" style={{ color: DARK }}>
                  {frame.price > 0 ? `+ LKR ${frame.price.toLocaleString()}` : "Included"}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-8">
        <h3 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color: DARK }}>
          Quantity
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border" style={{ borderColor: "#E8E2D9" }}>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-[#FAF8F4]"
              style={{ color: DARK }}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span
              className="w-12 text-center font-body text-sm font-medium select-none"
              style={{ color: DARK }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => Math.min(99, q + 1))}
              className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-[#FAF8F4]"
              style={{ color: DARK }}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-body text-xs" style={{ color: "#8C7B6A" }}>
            Total: <strong style={{ color: DARK }}>LKR {totalPrice.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Size Chart Viewer */}
      {sizeChartTemplate && (
        <SizeChartViewer templateKey={sizeChartTemplate} />
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-auto pt-6">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-4 font-body text-sm tracking-widest uppercase font-medium border-2 flex items-center justify-center gap-2 transition-all"
          style={{
            borderColor: addedToCart ? "#4CAF50" : GOLD,
            color: addedToCart ? "#4CAF50" : GOLD,
            backgroundColor: addedToCart ? "rgba(76,175,80,0.05)" : "transparent",
          }}
        >
          <ShoppingCart size={16} />
          {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="w-full py-4 font-body text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
          style={{ backgroundColor: DARK, color: "#FAF8F4", borderRadius: "1px" }}
        >
          <Zap size={16} />
          Buy Now
        </button>

        <div
          className="flex items-center justify-center gap-2 font-body text-[10px] tracking-wide uppercase"
          style={{ color: "#8C7B6A" }}
        >
          <span>Secure Bank Transfer</span>
          <span>·</span>
          <span>Island-wide Delivery</span>
        </div>
      </div>
    </>
  );
}
