import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import FadeUp from "@/components/ui/FadeUp";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Browse by Theme | Vinsith Interior Wall Art",
  description: "Explore 17+ wall art themes — Nature, Gaming, Anime, Vehicles, Religion, Abstract, and more. Find the style that matches your interior personality.",
};

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";

const THEME_GRADIENTS: Record<string, string> = {
  Nature:    "from-green-900/40 to-green-950/80",
  Gaming:    "from-purple-900/40 to-purple-950/80",
  Anime:     "from-orange-900/40 to-orange-950/80",
  Vehicles:  "from-slate-700/40 to-slate-900/80",
  Religion:  "from-yellow-900/30 to-yellow-950/80",
  Flowers:   "from-pink-900/30 to-pink-950/80",
  Abstract:  "from-cyan-900/30 to-cyan-950/80",
  Animals:   "from-amber-900/30 to-amber-950/80",
  Luxury:    "from-neutral-800/40 to-neutral-900/80",
  Modern:    "from-zinc-700/40 to-zinc-900/80",
  Minimal:   "from-stone-700/40 to-stone-900/80",
  Sports:    "from-red-900/30 to-red-950/80",
  Movies:    "from-blue-900/30 to-blue-950/80",
  Music:     "from-violet-900/30 to-violet-950/80",
};

export default async function ThemesPage() {
  const themes = await prisma.theme.findMany({
    include: {
      subthemes: { orderBy: { name: "asc" } },
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });

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
              <span style={{ color: TEXT_LIGHT }}>Themes</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: TEXT_LIGHT }}>
              Browse by Theme
            </h1>
            <p className="font-body text-base max-w-xl" style={{ color: "rgba(250,248,244,0.7)" }}>
              From serene nature landscapes to cyberpunk cityscapes, discover wall art that speaks to your personal style.
            </p>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme, i) => {
              const gradient = THEME_GRADIENTS[theme.name] ?? "from-gray-800/40 to-gray-900/80";
              return (
                <FadeUp key={theme.slug} delay={i * 0.05}>
                  <div className="flex flex-col h-full bg-white border" style={{ borderColor: "#E8E2D9" }}>
                    {/* Visual Header */}
                    <div className={`relative h-48 bg-gradient-to-b ${gradient} flex items-end p-6 overflow-hidden`}>
                      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: GOLD }} />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
                      <div className="relative z-10">
                        <h2 className="font-display font-semibold text-2xl text-white">{theme.name}</h2>
                        <span className="font-body text-[10px] tracking-widest text-white/60 uppercase">
                          {theme._count.products} designs
                        </span>
                      </div>
                    </div>

                    {/* Subthemes + Link */}
                    <div className="p-6 flex-1 flex flex-col">
                      {theme.subthemes.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {theme.subthemes.map((sub) => (
                            <span
                              key={sub.id}
                              className="px-3 py-1 font-body text-[10px] tracking-widest uppercase border"
                              style={{ borderColor: "#E8E2D9", color: "#8C7B6A" }}
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="font-body text-sm mb-6" style={{ color: "#8C7B6A" }}>
                          Explore all contemporary designs in this curated collection.
                        </p>
                      )}

                      <Link
                        href={`/themes/${theme.slug}`}
                        className="mt-auto self-start font-body text-[11px] tracking-widest uppercase pb-1 transition-colors hover:opacity-70"
                        style={{ color: DARK, borderBottom: `1px solid ${DARK}` }}
                      >
                        View Collection
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
