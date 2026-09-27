"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedDashedButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  darkText?: boolean;
}

export default function AnimatedDashedButton({
  href,
  children,
  className = "",
  darkText = true,
}: AnimatedDashedButtonProps) {
  const GOLD = "#C9A84C";
  const textColor = darkText ? "#1A1814" : "#FAF8F4";
  const borderColor = darkText ? "#1A1814" : "#FAF8F4";

  return (
    <>
      <style>{`
        @keyframes border-dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-border-dash {
          animation: border-dash 1.5s linear infinite;
        }
      `}</style>

      <Link
        href={href}
        className={`relative inline-flex items-center justify-center gap-2 py-3 px-8 group transition-all duration-500 ${className}`}
      >
        {/* Default Static Border */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ border: `1px solid ${borderColor}`, borderRadius: "1px" }}
        />

        {/* Animated Dashed Border (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            strokeDasharray="12 12"
            className="animate-border-dash"
          />
        </svg>

        {/* Inner glow on hover */}
        <div className="absolute inset-0 bg-[#C9A84C] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />

        {/* Text Content */}
        <span
          className="relative z-10 font-body text-sm tracking-widest uppercase transition-colors duration-500 group-hover:text-[#C9A84C]"
          style={{ color: textColor }}
        >
          {children}
        </span>
      </Link>
    </>
  );
}
