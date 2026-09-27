import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ThemeShowcase from "@/components/home/ThemeShowcase";
import SpacesPreview from "@/components/home/SpacesPreview";
import CustomOrderBanner from "@/components/home/CustomOrderBanner";

export const metadata: Metadata = {
  title: "Vinsith Interior Wall Art — Premium Wall Art Sri Lanka",
  description:
    "Discover handpicked luxury wall art for homes, hotels and offices in Sri Lanka. 200+ curated designs across 17 themes and 5 panel styles. Order online, pay via bank transfer.",
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vinsith Interior Wall Art",
    description: "Premium handcrafted wall art, themes, and customized designs in Sri Lanka.",
    url: "https://vinsithiwa.com",
    telephone: "+94770697626",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavbarWrapper />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <ThemeShowcase />
        <SpacesPreview />
        <CustomOrderBanner />
      </main>
      <Footer />
    </>
  );
}
