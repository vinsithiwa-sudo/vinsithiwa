"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";

export interface FilterOptions {
  theme?: string;
  panel?: string;
  space?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value };
    // Remove undefined keys
    Object.keys(newFilters).forEach((k) => {
      if (newFilters[k as keyof FilterOptions] === undefined) {
        delete newFilters[k as keyof FilterOptions];
      }
    });
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 font-body text-sm tracking-widest uppercase mb-6 px-4 py-2 border"
        style={{ borderColor: GOLD, color: DARK }}
      >
        <Filter size={16} /> Filters
      </button>

      {/* Filter Sidebar / Modal */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-full md:w-64 max-w-sm bg-white md:bg-transparent transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 ease-in-out border-r border-[#E8E2D9] md:border-none`}
      >
        <div className="p-6 md:p-0 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h3 className="font-display font-semibold text-xl" style={{ color: DARK }}>
              Filters
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} style={{ color: DARK }} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Panels Filter */}
            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>
                Panel Type
              </h4>
              <ul className="space-y-2 font-body text-sm">
                {["1 Piece", "2 Pieces", "3 Pieces", "4 Pieces", "5 Pieces"].map((panel) => (
                  <li key={panel}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="panel"
                        checked={filters.panel === panel}
                        onChange={() => handleFilterChange("panel", panel)}
                        className="accent-[#C9A84C]"
                      />
                      <span style={{ color: filters.panel === panel ? DARK : "#8C7B6A" }}>
                        {panel}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Themes Filter */}
            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>
                Themes
              </h4>
              <ul className="space-y-2 font-body text-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {["Nature", "Gaming", "Anime", "Religion", "Abstract", "Flowers", "Vehicles", "Luxury"].map((theme) => (
                  <li key={theme}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        checked={filters.theme === theme}
                        onChange={() => handleFilterChange("theme", theme)}
                        className="accent-[#C9A84C]"
                      />
                      <span style={{ color: filters.theme === theme ? DARK : "#8C7B6A" }}>
                        {theme}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spaces Filter */}
            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>
                Spaces
              </h4>
              <ul className="space-y-2 font-body text-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {["Living Room", "Bedroom", "Office", "Dining Room", "Kids Room"].map((space) => (
                  <li key={space}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="space"
                        checked={filters.space === space}
                        onChange={() => handleFilterChange("space", space)}
                        className="accent-[#C9A84C]"
                      />
                      <span style={{ color: filters.space === space ? DARK : "#8C7B6A" }}>
                        {space}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase mb-4" style={{ color: GOLD }}>
                Price Range
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 text-sm border focus:outline-none"
                  style={{ borderColor: "#E8E2D9" }}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                />
                <span style={{ color: "#8C7B6A" }}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 text-sm border focus:outline-none"
                  style={{ borderColor: "#E8E2D9" }}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                />
              </div>
            </div>

            {/* Clear Filters */}
            {Object.keys(filters).length > 0 && (
              <button
                onClick={clearFilters}
                className="w-full py-3 text-sm tracking-widest uppercase transition-colors"
                style={{ backgroundColor: DARK, color: TEXT_LIGHT }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
