"use client";

import { useState } from "react";
import SizeChartModal from "./SizeChartModal";

interface SizeChartButtonProps {
  templateKey: string | null | undefined;
}

export default function SizeChartButton({ templateKey }: SizeChartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!templateKey) return null;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent navigating if inside a Link
          e.stopPropagation(); // Prevent bubbling up to the Link
          setIsOpen(true);
        }}
        className="font-body text-[10px] tracking-wider uppercase transition-colors hover:text-[#C9A84C]"
        style={{ color: "#8C7B6A", marginTop: "4px" }}
      >
        View Size Chart
      </button>
      <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <SizeChartModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          templateKey={templateKey}
        />
      </div>
    </>
  );
}
