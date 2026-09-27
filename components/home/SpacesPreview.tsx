"use client";

import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import AnimatedBeamButton from "@/components/ui/AnimatedBeamButton";

const GOLD = "#C9A84C";
const BORDER = "#E8E2D9";

const spaces = [
  { name: "Living Room",  slug: "living-room",  icon: "🛋️",  color: "#F5F0E8" },
  { name: "Bedroom",      slug: "bedroom",       icon: "🛏️",  color: "#F0EBE8" },
  { name: "Dining Room",  slug: "dining-room",   icon: "🍽️",  color: "#EDF0E8" },
  { name: "Office",       slug: "office",        icon: "💼",  color: "#E8ECF0" },
  { name: "Hotel Lobby",  slug: "hotel-lobby",   icon: "🏨",  color: "#F0E8F0" },
  { name: "Kids Room",    slug: "kids-room",     icon: "🎨",  color: "#E8F0EE" },
  { name: "Cafe",         slug: "cafe",          icon: "☕",  color: "#F0ECE8" },
  { name: "Reception",    slug: "reception",     icon: "🏢",  color: "#E8EEF0" },
  { name: "Kitchen",      slug: "kitchen",       icon: "🍳",  color: "#F5F0EA" },
  { name: "Salon",        slug: "salon",         icon: "✂️",  color: "#EEE8F0" },
  { name: "Hallway",      slug: "hallway",       icon: "🚪",  color: "#F0EEE8" },
  { name: "Gaming Room",  slug: "gaming-room",   icon: "🎮",  color: "#E8EAF0" },
];

export default function SpacesPreview() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span
              className="font-body text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block"
              style={{ color: GOLD }}
            >
              By Interior Space
            </span>
            <span className="w-8 h-px mb-4" style={{ backgroundColor: GOLD, display: "block" }} />
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1A1814" }}
            >
              Shop by Room
            </h2>
          </div>
          <Link
            href="/spaces"
            className="font-body text-sm tracking-widest uppercase pb-0.5 transition-opacity hover:opacity-60 self-start sm:self-auto"
            style={{ color: GOLD, borderBottom: `1px solid ${GOLD}` }}
          >
            All Spaces
          </Link>
        </FadeUp>

        {/* Spaces grid — horizontal scroll on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {spaces.map((space, i) => (
            <FadeUp key={space.slug} delay={i * 0.06}>
              <Link
                href="/spaces"
                className="group flex flex-col items-center justify-center text-center py-7 px-3 transition-all duration-300 cursor-pointer hover:!bg-[#FAF8F4] hover:!border-[#C9A84C] hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: space.color,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "1px",
                }}
              >
                <span className="text-3xl mb-3" role="img" aria-label={space.name}>
                  {space.icon}
                </span>
                <span
                  className="font-body text-xs font-medium tracking-wide leading-tight"
                  style={{ color: "#1A1814" }}
                >
                  {space.name}
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* View all */}
        <FadeUp className="text-center mt-12">
          <AnimatedBeamButton href="/spaces" maskColor="#ffffff">
            View All Spaces
          </AnimatedBeamButton>
        </FadeUp>
      </div>
    </section>
  );
}
