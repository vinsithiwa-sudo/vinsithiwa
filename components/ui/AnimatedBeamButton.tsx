"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedBeamButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  darkText?: boolean;
  maskColor?: string; // e.g. "#ffffff" or "#F5F0E8"
  isPremium?: boolean;
}

export default function AnimatedBeamButton({
  href,
  children,
  className = "",
  darkText = true,
  maskColor = "#ffffff",
  isPremium = false,
}: AnimatedBeamButtonProps) {
  const textColor = isPremium ? "#1A1814" : (darkText ? "#1A1814" : "#FAF8F4");
  const borderColor = isPremium ? "#1A1814" : (darkText ? "#9CA3AF" : "rgba(250,248,244,0.3)");
  const bgStyle = isPremium ? { backgroundColor: "#C9A84C" } : { backgroundColor: maskColor };

  return (
    <Link
      href={href}
      className={`relative inline-flex group items-center justify-center p-[1px] transition-all duration-500 rounded-[1px] ${isPremium ? "hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] hover:-translate-y-[2px]" : ""} ${className}`}
      style={{ backgroundColor: borderColor }} // Base 1px static border
    >
      {/* Layer 1: Dims the base 1px border on hover so the dot pops */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none z-0 rounded-[1px]"
        style={bgStyle}
      />

      {/* Layer 2: The 2px thick Moving Dot Container */}
      <div className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none rounded-[2px] z-10">
        {/* The rotating gradient (bold moving circle) */}
        {isPremium ? (
          <div className="absolute top-1/2 left-1/2 h-[500%] w-[500%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,#ffffff_48%,#ffffff_52%,transparent_55%,transparent_100%)]" />
        ) : (
          <div className="absolute top-1/2 left-1/2 h-[500%] w-[500%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,#C9A84C_48%,#C9A84C_52%,transparent_55%,transparent_100%)]" />
        )}
        
        {/* Inner Mask of the 2px beam */}
        <div 
          className="absolute inset-[2px] rounded-[1px]" 
          style={bgStyle} 
        />
      </div>

      {/* Layer 3: Static Inner Mask & Text (Highest z-index so text is visible) */}
      <div 
        className={`relative z-20 flex h-full w-full items-center justify-center py-3 px-8 rounded-[1px] transition-colors duration-500 overflow-hidden ${!isPremium ? "group-hover:!bg-[rgba(201,168,76,0.1)]" : ""}`}
        style={bgStyle}
      >
        {isPremium && (
          <div className="absolute inset-0 w-[200%] -translate-x-[150%] group-hover:translate-x-[50%] transition-transform duration-1000 ease-out skew-x-[-20deg] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent pointer-events-none" />
        )}
        <span
          className={`font-body text-sm tracking-widest uppercase transition-colors duration-500 ${isPremium ? "font-bold font-display tracking-[0.1em]" : ""}`}
          style={{ color: textColor }}
        >
          {children}
        </span>
      </div>
    </Link>
  );
}
