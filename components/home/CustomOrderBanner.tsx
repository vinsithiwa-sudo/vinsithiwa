import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import AnimatedBeamButton from "@/components/ui/AnimatedBeamButton";

const GOLD = "#C9A84C";
const DARK = "#1a1208";
const TEXT_LIGHT = "#FAF8F4";
const TEXT_DIM = "rgba(250,248,244,0.65)";

export default function CustomOrderBanner() {
  return (
    <section
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: DARK }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <FadeUp className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <span
            className="font-body text-[10px] tracking-[0.35em] uppercase font-medium mb-4 block"
            style={{ color: GOLD }}
          >
            Bespoke Creations
          </span>
          <h2
            className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: TEXT_LIGHT }}
          >
            Can&apos;t find the perfect piece?
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: TEXT_DIM }}>
            We create fully custom wall art tailored to your space, color scheme, and vision.
            Hotels, offices, and residential projects welcome. Let&apos;s bring your idea to life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <AnimatedBeamButton href="/custom-order" maskColor="#1a1208" darkText={false}>
            Start Custom Order
          </AnimatedBeamButton>
          <AnimatedBeamButton href="/contact" maskColor="#1a1208" darkText={false}>
            Contact Us
          </AnimatedBeamButton>
        </div>
      </FadeUp>
    </section>
  );
}
