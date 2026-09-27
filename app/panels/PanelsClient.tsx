"use client";

import { useState, useEffect } from "react";
import FadeUp from "@/components/ui/FadeUp";
import ProductCard from "@/components/product/ProductCard";
import type { Panel } from "@/prisma/generated/client";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  mainImage?: string;
  theme?: string;
  panel?: string;
  panelId?: string;
  isFeatured: boolean;
  sizeChartTemplate?: string | null;
  designNumber?: string | null;
}

interface PanelsClientProps {
  panels: Panel[];
  products: Product[];
}

const PANEL_DESCRIPTIONS: Record<string, string> = {
  "1 Piece": "Perfect for small accent walls, reading nooks, or clean modern looks.",
  "2 Pieces": "Great for creating symmetry and balance on medium-sized walls.",
  "3 Pieces": "A classic triptych arrangement for medium-to-large walls — the most popular choice.",
  "4 Pieces": "Ideal for wide walls above sofas or beds with a bold, expansive look.",
  "5 Pieces": "Maximum impact for large empty walls — a showstopping statement piece.",
};

export default function PanelsClient({ panels, products }: PanelsClientProps) {
  const [activePanelId, setActivePanelId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("activePanelCount");
    if (stored === "all") {
      setActivePanelId(null);
    } else if (stored) {
      const count = parseInt(stored, 10);
      const p = panels.find((p) => p.count === count);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (p) setActivePanelId(p.id);
    }
  }, [panels]);

  const handleSetActivePanel = (panelId: string | null) => {
    setActivePanelId(panelId);
    if (panelId) {
      const p = panels.find((p) => p.id === panelId);
      if (p) sessionStorage.setItem("activePanelCount", p.count.toString());
    } else {
      sessionStorage.removeItem("activePanelCount");
    }
  };

  const filteredProducts = activePanelId
    ? products.filter((p) => p.panelId === activePanelId)
    : products;

  const activePanel = panels.find((p) => p.id === activePanelId);

  return (
    <div>
      {/* Tab Bar */}
      <div className="border-b" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex overflow-x-auto">
          <button
            onClick={() => handleSetActivePanel(null)}
            className="whitespace-nowrap px-6 py-4 font-body text-[11px] tracking-widest uppercase transition-colors relative"
            style={{ color: !activePanelId ? DARK : "#8C7B6A", fontWeight: !activePanelId ? 500 : 400 }}
          >
            All
            {!activePanelId && <span className="absolute bottom-0 left-0 w-full h-[2px]" style={{ backgroundColor: GOLD }} />}
          </button>
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => handleSetActivePanel(panel.id)}
              className="whitespace-nowrap px-6 py-4 font-body text-[11px] tracking-widest uppercase transition-colors relative"
              style={{ color: activePanelId === panel.id ? DARK : "#8C7B6A", fontWeight: activePanelId === panel.id ? 500 : 400 }}
            >
              {panel.name}
              {activePanelId === panel.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px]" style={{ backgroundColor: GOLD }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Info Card for active panel */}
        {activePanel && (
          <div className="mb-10 p-6 border flex flex-col md:flex-row items-center justify-between gap-6 bg-white" style={{ borderColor: "#E8E2D9" }}>
            <div>
              <h3 className="font-display font-semibold text-xl mb-2" style={{ color: DARK }}>{activePanel.name} Wall Art</h3>
              <p className="font-body text-sm" style={{ color: "#8C7B6A" }}>
                {PANEL_DESCRIPTIONS[activePanel.name] ?? "Premium multi-panel wall art."}
              </p>
            </div>
            <div className="px-4 py-2 text-xs font-body tracking-wider uppercase" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: DARK }}>
              {filteredProducts.length} Designs Available
            </div>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.05}>
                <ProductCard product={product} />
              </FadeUp>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[#E8E2D9]">
            <p className="font-body text-lg mb-2" style={{ color: DARK }}>No products found</p>
            <p className="font-body text-sm" style={{ color: "#8C7B6A" }}>
              We're updating our collection for this panel type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
