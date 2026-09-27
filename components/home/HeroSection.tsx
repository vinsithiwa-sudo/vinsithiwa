"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedBeamButton from "@/components/ui/AnimatedBeamButton";

const GOLD = "#C9A84C";
const TEXT_LIGHT = "#FAF8F4";
const TEXT_DIM = "rgba(250,248,244,0.65)";

const slides = [
  {
    id: 1,
    src: "/images/LOGO.jpg",
    alt: "Vinsith Interior Wall Art Logo",
  },
  {
    id: 2,
    src: "/images/slide2.png",
    alt: "Modern luxury office with abstract gold wall art",
  },
  {
    id: 3,
    src: "/images/slide3.png",
    alt: "Luxury hotel lobby with 3-piece panel art",
  },
  {
    id: 4,
    src: "/images/slide4.png",
    alt: "Minimal luxury room with premium artwork",
  },
  {
    id: 5,
    src: "/images/slide5.png",
    alt: "Luxury living room interior featuring an expansive 5-piece multi-panel canvas",
  },
  {
    id: 6,
    src: "/images/slide6.png",
    alt: "Modern high-end hotel suite bedroom featuring a striking 3-piece abstract canvas",
  },
  {
    id: 7,
    src: "/images/slide7.png",
    alt: "High-relief 3D mural painting of a traditional Sri Lankan dancer",
  },
];

// Stagger animation variants for text
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const stats = [
  { value: "200+", label: "Designs" },
  { value: "17", label: "Themes" },
  { value: "5", label: "Panel Types" },
  { value: "11", label: "Room Spaces" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Background — dark luxury obsidian */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #120e09 0%, #1a140d 50%, #0d0a06 100%)",
        }}
      >
        {/* Soft radial gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 45%, rgba(201,168,76,0.05) 0%, transparent 65%)",
          }}
        />
        {/* Architectural grid texture (reduced opacity to not distract) */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-12 pt-32 pb-24 lg:pt-0 lg:pb-0 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[100svh]">

        {/* LEFT SIDE - Typography & CTAs (45% approximate on desktop via col-span-5) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex flex-col justify-center"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px" style={{ backgroundColor: GOLD }} />
            <span
              className="font-body text-[11px] tracking-[0.4em] uppercase font-medium"
              style={{ color: GOLD }}
            >
              Premium Wall Art
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-[1.05] mb-2"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              color: TEXT_LIGHT,
            }}
          >
            Transform Your Space
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="font-accent font-normal italic leading-[1.05] mb-8"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              color: GOLD,
            }}
          >
            With Timeless Art
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base lg:text-lg leading-relaxed mb-12 max-w-lg"
            style={{ color: TEXT_DIM }}
          >
            Handpicked luxury wall art for modern homes, hotels &amp; offices across
            Sri Lanka.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Button - Solid Gold Luxury + Moving Dot */}
            <AnimatedBeamButton href="/catalog" isPremium={true} className="w-full sm:w-auto">
              Shop Collection
            </AnimatedBeamButton>
            {/* Secondary Button */}
            <AnimatedBeamButton href="/custom-order" maskColor="#1a140d" darkText={false} className="w-full sm:w-auto mt-4 sm:mt-0">
              Custom Order
            </AnimatedBeamButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-display font-bold text-3xl mb-1"
                  style={{ color: TEXT_LIGHT }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-body text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: GOLD }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Center Gap (16% approximate via col-span-2) */}
        <div className="hidden lg:block lg:col-span-2" />

        {/* RIGHT SIDE - Cinematic Slideshow (42% approximate via col-span-5) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full mt-12 lg:mt-0 flex justify-end"
        >
          <div className="relative w-full aspect-[4/5] max-w-[480px] overflow-hidden rounded-[2px] bg-[#1a140d]">
            {/* Subtle base border visible when beam is elsewhere */}
            <div className="absolute inset-0 rounded-[2px] pointer-events-none z-0" style={{ border: `1px solid ${GOLD}40` }} />
            
            {/* The Spinning Beam Layer */}
            <div className="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,#C9A84C_48%,#C9A84C_52%,transparent_55%,transparent_100%)] pointer-events-none z-0" />

            {/* The Inner Image Wrapper */}
            <div className="absolute inset-[2px] bg-[#1a140d] z-10 overflow-hidden rounded-[1px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                    <Image
                      src={slides[currentSlide].src}
                      alt={slides[currentSlide].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      priority={currentSlide === 0}
                      className="object-cover"
                      style={{
                        borderRadius: "1px",
                      }}
                    />
                </motion.div>
              </AnimatePresence>

              {/* Subtle overlay gradient to blend with the background & add luxury mood */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(18,14,9,0.5) 0%, transparent 40%), linear-gradient(to left, rgba(18,14,9,0.2) 0%, transparent 20%)",
                  borderRadius: "1px",
                }}
              />

              {/* Premium Gold Frame Inner Shadows Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.5), 0 25px 50px -12px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.06)",
                  borderRadius: "1px",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
