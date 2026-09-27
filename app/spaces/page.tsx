import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import FadeUp from "@/components/ui/FadeUp";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Shop by Room | Vinsith Interior Wall Art",
  description: "Find the perfect wall art for every room — Living Room, Bedroom, Office, Hotel Lobby, Dining Room and more. Curated collections for every interior space in Sri Lanka.",
};

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";

const SPACE_ICONS: Record<string, string> = {
  "Living Room":  "🛋️",
  "Bedroom":      "🛏️",
  "Dining Room":  "🍽️",
  "Office":       "💼",
  "Hotel Lobby":  "🏨",
  "Kids Room":    "🎨",
  "Cafe":         "☕",
  "Reception":    "🏢",
  "Kitchen":      "🍳",
  "Salon":        "✂️",
  "Hallway":      "🚪",
};

const SPACE_COLORS: Record<string, string> = {
  "Living Room":  "#F5F0E8",
  "Bedroom":      "#F0EBE8",
  "Dining Room":  "#EDF0E8",
  "Office":       "#E8ECF0",
  "Hotel Lobby":  "#F0E8F0",
  "Kids Room":    "#E8F0EE",
  "Cafe":         "#F0ECE8",
  "Reception":    "#E8EEF0",
  "Kitchen":      "#F5F0EA",
  "Salon":        "#EEE8F0",
  "Hallway":      "#F0EEE8",
};

const SPACE_DESCRIPTIONS: Record<string, string> = {
  "Living Room":  "Large statement pieces for above the sofa.",
  "Bedroom":      "Calming art for above the bed or dressers.",
  "Dining Room":  "Elegant artwork to complement your dining area.",
  "Office":       "Professional and motivating pieces for workspaces.",
  "Hotel Lobby":  "Grand, luxurious art to welcome guests.",
  "Kids Room":    "Playful and colourful designs for children.",
  "Cafe":         "Cosy and aesthetic art for coffee shops.",
  "Reception":    "Professional art for corporate waiting areas.",
  "Kitchen":      "Fresh and vibrant pieces for culinary spaces.",
  "Salon":        "Chic and modern art for beauty studios.",
  "Hallway":      "Vertical or multi-panel art for corridors.",
};

export default async function SpacesPage() {
  const [spaces] = await Promise.all([
    prisma.space.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <>
      <NavbarWrapper />
      <main className="pt-24 min-h-screen bg-[#FAF8F4]">
        {/* Dark Banner Header */}
        <div className="py-20 px-6 lg:px-12 relative" style={{ backgroundColor: DARK }}>
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at center, #C9A84C 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-6 font-body text-[10px] tracking-widest uppercase">
              <Link href="/" className="hover:text-[#C9A84C] transition-colors" style={{ color: "rgba(250,248,244,0.6)" }}>Home</Link>
              <ChevronRight size={12} style={{ color: "rgba(250,248,244,0.6)" }} />
              <span style={{ color: TEXT_LIGHT }}>Rooms</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: TEXT_LIGHT }}>
              Shop by Room
            </h1>
            <p className="font-body text-base max-w-xl" style={{ color: "rgba(250,248,244,0.7)" }}>
              Find the perfect piece tailored for your specific interior space, from cosy bedrooms to grand hotel lobbies.
            </p>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {spaces.map((space, i) => (
              <FadeUp key={space.slug} delay={i * 0.05}>
                <Link
                  href={`/catalog?space=${space.slug}`}
                  className="group flex flex-col h-full p-8 transition-all duration-300 hover:border-[#C9A84C]"
                  style={{
                    backgroundColor: "white",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#E8E2D9",
                    borderTopWidth: "4px",
                    borderTopColor: space.color || SPACE_COLORS[space.name] || "#E8E2D9",
                  }}
                >
                  <span className="text-4xl mb-6 inline-block" role="img" aria-label={space.name}>
                    {space.icon || SPACE_ICONS[space.name] || "🖼️"}
                  </span>
                  <h2 className="font-display font-semibold text-xl mb-3" style={{ color: DARK }}>
                    {space.name}
                  </h2>
                  <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: "#8C7B6A" }}>
                    {space.description || SPACE_DESCRIPTIONS[space.name] || "Premium wall art for this room."}
                  </p>
                  {space._count.products > 0 && (
                    <span
                      className="inline-block font-body text-[10px] tracking-widest uppercase px-3 py-1 mb-4 w-fit"
                      style={{ backgroundColor: "rgba(201,168,76,0.08)", color: DARK }}
                    >
                      {space._count.products} designs
                    </span>
                  )}
                  <span
                    className="font-body text-[10px] tracking-widest uppercase flex items-center gap-2 group-hover:text-[#C9A84C] transition-colors"
                    style={{ color: DARK }}
                  >
                    View Products <ChevronRight size={14} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
