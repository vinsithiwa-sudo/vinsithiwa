"use client";

import { useState, useMemo } from "react";
import FadeUp from "@/components/ui/FadeUp";
import ProductCard from "@/components/product/ProductCard";
import { Filter, X } from "lucide-react";
import type { Theme, Space, Panel } from "@prisma/client";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  mainImage?: string | null;
  theme?: string;
  panel?: string;
  space?: string;
  isFeatured: boolean;
  designNumber?: string | null;
  themeId?: string;
  spaceId?: string;
  panelId?: string;
}

interface CatalogClientProps {
  initialProducts: Product[];
  themes: Theme[];
  spaces: Space[];
  panels: Panel[];
}

interface Filters {
  themeIds: string[];
  panelIds: string[];
  spaceIds: string[];
  minPrice?: number;
  maxPrice?: number;
}

export default function CatalogClient({ initialProducts, themes, spaces, panels }: CatalogClientProps) {
  const [filters, setFilters] = useState<Filters>({
    themeIds: [],
    panelIds: [],
    spaceIds: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      if (filters.themeIds.length > 0 && (!p.themeId || !filters.themeIds.includes(p.themeId))) return false;
      if (filters.panelIds.length > 0 && (!p.panelId || !filters.panelIds.includes(p.panelId))) return false;
      if (filters.spaceIds.length > 0 && (!p.spaceId || !filters.spaceIds.includes(p.spaceId))) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      return true;
    });
  }, [initialProducts, filters]);

  const activeFilterCount = filters.themeIds.length + filters.panelIds.length + filters.spaceIds.length + (filters.minPrice || filters.maxPrice ? 1 : 0);

  const clearFilters = () => setFilters({ themeIds: [], panelIds: [], spaceIds: [] });


  const filterPanel = (
    <div className="space-y-8">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-display font-semibold text-lg" style={{ color: DARK }}>Filters</h3>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearFilters} 
            className="text-xs font-medium px-3 py-1 rounded-full transition-all duration-300" 
            style={{ 
              border: "1px solid #E8E2D9",
              color: "#8C7B6A",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = GOLD;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = GOLD;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#8C7B6A";
              e.currentTarget.style.borderColor = "#E8E2D9";
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Themes */}
      <div>
        <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>Theme</h4>
        <ul className="space-y-2 font-body text-sm max-h-52 overflow-y-auto pr-1">
          {themes.map((t) => {
            const isChecked = filters.themeIds.includes(t.id);
            return (
              <li key={t.id}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setFilters(f => ({
                      ...f,
                      themeIds: isChecked ? f.themeIds.filter(id => id !== t.id) : [...f.themeIds, t.id]
                    }))}
                    className="accent-[#C9A84C] w-3.5 h-3.5 rounded-sm"
                  />
                  <span style={{ color: isChecked ? DARK : "#8C7B6A" }}>{t.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Panels */}
      <div>
        <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>Panel Type</h4>
        <ul className="space-y-2 font-body text-sm">
          {panels.map((p) => {
            const isChecked = filters.panelIds.includes(p.id);
            return (
              <li key={p.id}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setFilters(f => ({
                      ...f,
                      panelIds: isChecked ? f.panelIds.filter(id => id !== p.id) : [...f.panelIds, p.id]
                    }))}
                    className="accent-[#C9A84C] w-3.5 h-3.5 rounded-sm"
                  />
                  <span style={{ color: isChecked ? DARK : "#8C7B6A" }}>{p.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Spaces */}
      <div>
        <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>Space</h4>
        <ul className="space-y-2 font-body text-sm max-h-48 overflow-y-auto pr-1">
          {spaces.map((s) => {
            const isChecked = filters.spaceIds.includes(s.id);
            return (
              <li key={s.id}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setFilters(f => ({
                      ...f,
                      spaceIds: isChecked ? f.spaceIds.filter(id => id !== s.id) : [...f.spaceIds, s.id]
                    }))}
                    className="accent-[#C9A84C] w-3.5 h-3.5 rounded-sm"
                  />
                  <span style={{ color: isChecked ? DARK : "#8C7B6A" }}>{s.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>Price (LKR)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number" placeholder="Min"
            value={filters.minPrice || ""}
            className="w-full px-3 py-2 text-sm border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: "#E8E2D9" }}
            onChange={(e) => setFilters(f => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
          />
          <span style={{ color: "#8C7B6A" }}>–</span>
          <input
            type="number" placeholder="Max"
            value={filters.maxPrice || ""}
            className="w-full px-3 py-2 text-sm border focus:outline-none focus:border-[#C9A84C]"
            style={{ borderColor: "#E8E2D9" }}
            onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeUp className="mb-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: DARK }}>
          The Collection
        </h1>
        <p className="font-body text-base max-w-2xl" style={{ color: "#8C7B6A" }}>
          Explore our full range of luxury wall art. Use the filters to find the perfect piece for your space.
        </p>
      </FadeUp>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Mobile filter button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 font-body text-sm tracking-widest uppercase px-4 py-2.5 border"
            style={{ borderColor: GOLD, color: DARK }}
          >
            <Filter size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          {filterPanel}
        </aside>

        {/* Mobile drawer */}
        {isFilterOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsFilterOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-semibold text-xl" style={{ color: DARK }}>Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              {filterPanel}
            </div>
          </>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <span className="font-body text-sm" style={{ color: "#8C7B6A" }}>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product, i) => (
                <FadeUp key={product.id} delay={i * 0.04}>
                  <ProductCard
                    product={{
                      ...product,
                      mainImage: product.mainImage ?? undefined,
                    }}
                  />
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[#E8E2D9]">
              <p className="font-body text-lg mb-2" style={{ color: DARK }}>No products found</p>
              <p className="font-body text-sm" style={{ color: "#8C7B6A" }}>
                Try adjusting your filters to see more results.
              </p>
              <button onClick={clearFilters} className="mt-4 underline text-sm" style={{ color: DARK }}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
