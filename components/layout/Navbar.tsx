"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, ShoppingCart,
  Leaf, Gamepad2, Swords, Car, BookOpen, Flower2, Palette, PawPrint,
  Gem, Monitor, Circle, Trophy, Film, Music, Rocket, Building2, Landmark,
} from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import CartDrawer from "@/components/cart/CartDrawer";

// ── Types ────────────────────────────────────────────────────────────────────
type DropdownType = "panels" | "themes" | "rooms" | null;

export type NavPanel = { id: string; name: string; count: number };

const popularThemes = [
  { name: "Nature",   slug: "nature",   icon: Leaf      },
  { name: "Gaming",   slug: "gaming",   icon: Gamepad2  },
  { name: "Anime",    slug: "anime",    icon: Swords    },
  { name: "Vehicles", slug: "vehicles", icon: Car       },
  { name: "Religion", slug: "religion", icon: BookOpen  },
  { name: "Flowers",  slug: "flowers",  icon: Flower2   },
  { name: "Abstract", slug: "abstract", icon: Palette   },
  { name: "Animals",  slug: "animals",  icon: PawPrint  },
];

const moreThemes = [
  { name: "Luxury",         slug: "luxury",         icon: Gem       },
  { name: "Modern",         slug: "modern",         icon: Monitor   },
  { name: "Minimal",        slug: "minimal",        icon: Circle    },
  { name: "Sports",         slug: "sports",         icon: Trophy    },
  { name: "Movies",         slug: "movies",         icon: Film      },
  { name: "Music",          slug: "music",          icon: Music     },
  { name: "Space / Galaxy", slug: "space-galaxy",   icon: Rocket    },
  { name: "Architecture",   slug: "architecture",   icon: Building2 },
  { name: "Sri Lankan Art", slug: "sri-lankan-art", icon: Landmark  },
];

const roomsCol1 = [
  { name: "Living Room", slug: "living-room" },
  { name: "Bedroom",     slug: "bedroom"     },
  { name: "Dining Room", slug: "dining-room" },
  { name: "Kitchen",     slug: "kitchen"     },
];

const roomsCol2 = [
  { name: "Office",      slug: "office"      },
  { name: "Kids Room",   slug: "kids-room"   },
  { name: "Hallway",     slug: "hallway"     },
  { name: "Hotel Lobby", slug: "hotel-lobby" },
];

// ── Design tokens ─────────────────────────────────────────────────────────────
const GOLD        = "#C9A84C";
const DARK_BG     = "#1a1208";
const DROPDOWN_BG = "#1e1610";
const TEXT_LIGHT  = "#FAF8F4";
const TEXT_DIM    = "rgba(250,248,244,0.60)";
const TEXT_DARK   = "#1A1814";

// ── Dropdown shared constants ─────────────────────────────────────────────────
// Removed DROPDOWN_ITEM_CLS as MenuItem handles it directly now.

export default function Navbar({ panels = [] }: { panels?: NavPanel[] }) {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobilePanelsOpen, setMobilePanelsOpen] = useState(false);
  const [mobileThemesOpen, setMobileThemesOpen] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useOrderStore();
  const cartCount = itemCount();

  const pathname   = usePathname();
  const navRef     = useRef<HTMLElement>(null);
  const isHomePage = pathname === "/";

  // scroll detection
  useEffect(() => {
    const onScroll = () => {
      const threshold = isHomePage ? window.innerHeight * 0.8 : 60;
      setIsScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (dd: DropdownType) =>
    setActiveDropdown(activeDropdown === dd ? null : dd);

  const closeAll = () => {
    setActiveDropdown(null);
    setIsMobileOpen(false);
    setMobilePanelsOpen(false);
    setMobileThemesOpen(false);
    setMobileRoomsOpen(false);
  };

  // appearance
  const navBg = isHomePage
    ? isScrolled
      ? "bg-[#FAF8F4] shadow-sm border-b border-[#E8E2D9]"
      : "bg-transparent"
    : `bg-[${DARK_BG}] border-b border-white/5 shadow-sm`;

  const textColor = isHomePage
    ? isScrolled ? TEXT_DARK : TEXT_LIGHT
    : TEXT_LIGHT;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBg}`}
      style={{ color: textColor }}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between h-24">

        {/* ── Logo ── */}
        <Link href="/" onClick={closeAll} className="flex flex-col flex-shrink-0 z-50 justify-center h-full">
          <span
            className="font-display font-bold text-[1.75rem] tracking-[0.15em] leading-none transition-colors duration-500"
            style={{ color: textColor }}
          >
            VINSITH
          </span>
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase mt-1.5" style={{ color: GOLD }}>
            Interior Wall Art
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center space-x-1 font-body text-[12px] tracking-[0.15em] uppercase font-medium h-full">

          <NavLink href="/" label="HOME" isActive={pathname === "/"} textColor={textColor} />

          {/* ── Panels ── */}
          <div className="relative">
            <DesktopDropdownButton
              label="PANELS"
              isOpen={activeDropdown === "panels"}
              isActive={pathname.startsWith("/panels")}
              textColor={textColor}
              onToggle={() => toggle("panels")}
            />
            <AnimatePresence>
              {activeDropdown === "panels" && (
                <DropdownWrapper className="left-0 w-[300px]">
                  <div className="px-8 pt-6 pb-3 text-[10px] tracking-[0.2em] uppercase" style={{ color: `${GOLD}99` }}>
                    PANEL TYPES
                  </div>
                  <ul className="flex flex-col space-y-1 px-5 pb-5">
                    {panels.map((panel) => (
                      <li key={panel.id}>
                        <Link
                          href="/panels"
                          onClick={() => {
                            sessionStorage.setItem("activePanelCount", panel.count.toString());
                            closeAll();
                          }}
                          className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 group hover:bg-[rgba(201,168,76,0.08)] hover:text-[#FAF8F4]"
                          style={{ color: TEXT_DIM }}
                        >
                          <div className="flex items-center gap-4">
                            <PanelIcon count={panel.count} />
                            <span>{panel.name}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuFooter href="/panels" onClick={() => { sessionStorage.setItem("activePanelCount", "all"); closeAll(); }}>Browse All Panels →</MenuFooter>
                </DropdownWrapper>
              )}
            </AnimatePresence>
          </div>

          {/* ── Themes ── */}
          <DesktopDropdown
            label="THEMES"
            isOpen={activeDropdown === "themes"}
            isActive={pathname.startsWith("/themes")}
            textColor={textColor}
            onToggle={() => toggle("themes")}
            dropdownClassName="left-1/2 -translate-x-1/2 w-[760px]"
          >
            <div className="p-10 grid grid-cols-2 gap-x-16">
              <MenuSection label="Popular Themes">
                {popularThemes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <MenuItem key={t.slug} href={`/themes/${t.slug}`} onClick={closeAll}>
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "inherit" }} />
                      {t.name}
                    </MenuItem>
                  );
                })}
              </MenuSection>
              <MenuSection label="More Themes">
                {moreThemes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <MenuItem key={t.slug} href={`/themes/${t.slug}`} onClick={closeAll}>
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "inherit" }} />
                      {t.name}
                    </MenuItem>
                  );
                })}
              </MenuSection>
            </div>
            <MenuFooter href="/themes" onClick={closeAll}>Browse All Themes →</MenuFooter>
          </DesktopDropdown>

          {/* ── Rooms ── */}
          <DesktopDropdown
            label="ROOMS"
            isOpen={activeDropdown === "rooms"}
            isActive={pathname.startsWith("/spaces")}
            textColor={textColor}
            onToggle={() => toggle("rooms")}
            dropdownClassName="left-1/2 -translate-x-1/2 w-[420px]"
          >
            <div className="p-10 grid grid-cols-2 gap-x-16">
              <MenuSection label="Shop by Room">
                {roomsCol1.map((r) => (
                  <MenuItem key={r.slug} href={`/spaces/${r.slug}`} onClick={closeAll}>
                    {r.name}
                  </MenuItem>
                ))}
              </MenuSection>
              <MenuSection label="&nbsp;">
                {roomsCol2.map((r) => (
                  <MenuItem key={r.slug} href={`/spaces/${r.slug}`} onClick={closeAll}>
                    {r.name}
                  </MenuItem>
                ))}
              </MenuSection>
            </div>
            <MenuFooter href="/spaces" onClick={closeAll}>Browse All Rooms →</MenuFooter>
          </DesktopDropdown>

          <NavLink href="/catalog" label="CATALOG" isActive={pathname === "/catalog"} textColor={textColor} />
          <NavLink href="/contact" label="CONTACT" isActive={pathname === "/contact"} textColor={textColor} />

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 ml-2 transition-colors hover:text-[#C9A84C]"
            style={{ color: textColor }}
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold"
                style={{ backgroundColor: GOLD, color: "#fff" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Mobile cart + hamburger ── */}
        <div className="lg:hidden flex items-center gap-1 z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 transition-colors"
            style={{ color: textColor }}
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-body text-[9px] font-bold"
                style={{ backgroundColor: GOLD, color: "#fff" }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="p-2 transition-colors"
            style={{ color: textColor }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen overflow-y-auto pt-24 px-6 pb-16"
            style={{ backgroundColor: DARK_BG, color: TEXT_LIGHT }}
          >
            <div className="flex flex-col space-y-6 font-body">
              <Link href="/" onClick={closeAll} className="text-lg hover:opacity-70 transition-opacity">
                Home
              </Link>
              <hr className="border-white/10" />

              {/* Panels */}
              <MobileSection
                label="Panels"
                isOpen={mobilePanelsOpen}
                onToggle={() => setMobilePanelsOpen(!mobilePanelsOpen)}
              >
                {panels.map((p) => (
                  <Link
                    key={p.id}
                    href="/panels"
                    onClick={() => { sessionStorage.setItem("activePanelCount", p.count.toString()); closeAll(); }}
                    className="text-base transition-colors hover:text-white"
                    style={{ color: TEXT_DIM }}
                  >
                    {p.name}
                  </Link>
                ))}
                <Link href="/panels" onClick={() => { sessionStorage.setItem("activePanelCount", "all"); closeAll(); }} className="block mt-2 text-[13px] hover:text-white transition-colors" style={{ color: `${GOLD}aa` }}>
                  Browse All Panels →
                </Link>
              </MobileSection>
              <hr className="border-white/10" />

              {/* Themes */}
              <MobileSection
                label="Themes"
                isOpen={mobileThemesOpen}
                onToggle={() => setMobileThemesOpen(!mobileThemesOpen)}
              >
                {[...popularThemes, ...moreThemes].map((t) => (
                  <Link
                    key={t.slug}
                    href={`/themes/${t.slug}`}
                    onClick={closeAll}
                    className="text-base transition-colors hover:text-white"
                    style={{ color: TEXT_DIM }}
                  >
                    {t.name}
                  </Link>
                ))}
              </MobileSection>
              <hr className="border-white/10" />

              {/* Rooms */}
              <MobileSection
                label="Rooms"
                isOpen={mobileRoomsOpen}
                onToggle={() => setMobileRoomsOpen(!mobileRoomsOpen)}
              >
                <div className="grid grid-cols-2 gap-y-3">
                  {roomsCol1.concat(roomsCol2).map((r) => (
                    <Link
                      key={r.slug}
                      href={`/spaces/${r.slug}`}
                      onClick={closeAll}
                      className="text-[15px] hover:text-[#C9A84C] transition-colors"
                      style={{ color: TEXT_DIM }}
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
                <Link href="/spaces" onClick={closeAll} className="block mt-6 text-[13px] hover:text-white transition-colors" style={{ color: `${GOLD}aa` }}>
                  Browse All Rooms →
                </Link>
              </MobileSection>
              <hr className="border-white/10" />

              <Link href="/catalog" onClick={closeAll} className="text-lg hover:opacity-70 transition-opacity">Catalog</Link>
              <Link href="/contact" onClick={closeAll} className="text-lg hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════
// ── Shared primitive components ─────────────────────────
// ═══════════════════════════════════════════════════════

function NavLink({ href, label, isActive, textColor }: {
  href: string; label: string; isActive: boolean; textColor: string;
}) {
  return (
    <Link
      href={href}
      className="relative px-4 py-3 transition-colors hover:text-[#C9A84C]"
      style={{ color: isActive ? GOLD : textColor }}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px]" style={{ backgroundColor: GOLD }} />
      )}
    </Link>
  );
}

function DesktopDropdownButton({ label, isOpen, isActive, textColor, onToggle }: {
  label: string; isOpen: boolean; isActive: boolean; textColor: string; onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center px-4 py-3 transition-colors hover:text-[#C9A84C]"
      style={{ color: isOpen || isActive ? GOLD : textColor }}
    >
      {label}
      <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

function DropdownWrapper({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`absolute top-full ${className}`}
      style={{
        backgroundColor: DROPDOWN_BG,
        color: TEXT_LIGHT,
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${GOLD}`,
        boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </motion.div>
  );
}

function DesktopDropdown({
  label, isOpen, isActive, textColor, onToggle, dropdownClassName, children,
}: {
  label: string; isOpen: boolean; isActive: boolean; textColor: string;
  onToggle: () => void; dropdownClassName: string; children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <DesktopDropdownButton
        label={label}
        isOpen={isOpen}
        isActive={isActive}
        textColor={textColor}
        onToggle={onToggle}
      />
      <AnimatePresence>
        {isOpen && (
          <DropdownWrapper className={dropdownClassName}>
            {children}
          </DropdownWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="text-[10px] tracking-[0.2em] uppercase mb-4 px-4"
        style={{ color: `${GOLD}99` }}
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <ul className="flex flex-col space-y-1">
        {children}
      </ul>
    </div>
  );
}

function MenuItem({ href, onClick, children }: {
  href: string; onClick?: () => void; children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 hover:bg-[rgba(201,168,76,0.08)] hover:text-[#FAF8F4] group"
        style={{ color: TEXT_DIM }}
      >
        {children}
      </Link>
    </li>
  );
}

function MenuFooter({ href, onClick, children }: {
  href: string; onClick?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="px-10 py-5 border-t border-white/5">
      <Link
        href={href}
        onClick={onClick}
        className="text-[11px] tracking-[0.25em] uppercase transition-colors hover:text-white"
        style={{ color: `${GOLD}B0` }}
      >
        {children}
      </Link>
    </div>
  );
}

function MobileSection({
  label, isOpen, onToggle, children,
}: {
  label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onToggle}
        className="flex items-center justify-between text-xs tracking-widest uppercase w-full"
        style={{ color: GOLD }}
      >
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 flex flex-col space-y-4 pb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PanelIcon({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[3px] opacity-60">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[5px] h-4 rounded-[1px]" style={{ backgroundColor: GOLD }} />
      ))}
    </div>
  );
}
