"use client";

import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import AnimatedBeamButton from "@/components/ui/AnimatedBeamButton";

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";
const TEXT_DIM = "rgba(250,248,244,0.8)";

const themes = [
  { name: "Nature",       slug: "nature",       subs: "Forest · Ocean · Mountains", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop" },
  { name: "Gaming",       slug: "gaming",       subs: "PS5 · FPS · Racing",         image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop" },
  { name: "Anime",        slug: "anime",        subs: "Naruto · One Piece",         image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop" },
  { name: "Vehicles",     slug: "vehicles",     subs: "Cars · Supercars · JDM",     image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop" },
  { name: "Religion",     slug: "religion",     subs: "Buddha · Islamic · Christian",image: "/images/religion-art.png" },
  { name: "Flowers",      slug: "flowers",      subs: "Roses · Lotus · Sakura",     image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop" },
  { name: "Abstract",     slug: "abstract",     subs: "Contemporary",               image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop" },
  { name: "Sri Lankan Art", slug: "sri-lankan-art", subs: "Heritage & Culture",     image: "/images/sri-lankan-art.png" },
];

export default function ThemeShowcase() {
  return (
    <section
      className="py-24 px-6 lg:px-12"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <span
            className="font-body text-[10px] tracking-[0.35em] uppercase font-medium"
            style={{ color: GOLD }}
          >
            Explore by Style
          </span>
          <div className="flex justify-center my-3">
            <span className="w-8 h-px" style={{ backgroundColor: GOLD, display: "block" }} />
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1A1814" }}
          >
            Browse by Theme
          </h2>
        </FadeUp>

        {/* Theme grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map((theme, i) => (
            <FadeUp key={theme.slug} delay={i * 0.08}>
              <Link
                href={`/themes`}
                className="group relative flex flex-col justify-end overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: "1/1.1",
                  backgroundColor: DARK,
                  borderRadius: "1px",
                }}
              >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay for text readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/90 via-[#1a1208]/30 to-transparent transition-opacity duration-500 group-hover:opacity-80"
                />

                {/* Gold corner accent */}
                <div
                  className="absolute top-3 left-3 w-5 h-5 transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"
                  style={{
                    borderTop: `1.5px solid ${GOLD}`,
                    borderLeft: `1.5px solid ${GOLD}`,
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 w-5 h-5 transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"
                  style={{
                    borderBottom: `1.5px solid ${GOLD}`,
                    borderRight: `1.5px solid ${GOLD}`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-5">
                  <p
                    className="font-display font-bold text-xl leading-tight mb-1 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ color: TEXT_LIGHT }}
                  >
                    {theme.name}
                  </p>
                  <p
                    className="font-body text-[10px] tracking-wide leading-relaxed transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ color: TEXT_DIM }}
                  >
                    {theme.subs}
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* View all */}
        <FadeUp className="text-center mt-12">
          <AnimatedBeamButton href="/themes" maskColor="#F5F0E8">
            View All 17 Themes
          </AnimatedBeamButton>
        </FadeUp>
      </div>
    </section>
  );
}
