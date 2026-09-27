import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Us | Vinsith Interior Wall Art",
  description: "Discover the story behind Vinsith Interior Wall Art, Sri Lanka's premier destination for luxury wall art.",
};

export default function AboutPage() {
  return (
    <>
      <NavbarWrapper />
      <div className="bg-pearl min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="eyebrow inline-block mb-2">Our Story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-obsidian tracking-tight">
            Curating Spaces with <span className="text-[#C9A84C]">Elegance</span>
          </h1>
          <p className="text-lg text-stone leading-relaxed">
            Vinsith Interior Wall Art was founded on a simple principle: every wall is a blank canvas waiting for a masterpiece. We bring premium, carefully curated art pieces to homes and offices across Sri Lanka.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
          <div className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-obsidian/10 z-10" />
            {/* Placeholder until Supabase is set up */}
            <div className="absolute inset-0 bg-stone/20" />
            <Image 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
              alt="Luxury interior space with wall art" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-obsidian mb-4">Our Vision</h2>
              <div className="gold-line mb-6"></div>
              <p className="text-stone leading-relaxed">
                To transform everyday spaces into extraordinary environments. We believe that the right piece of art doesn't just fill an empty wall—it dictates the mood, energy, and personality of the entire room.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-obsidian mb-4">Craftsmanship</h2>
              <div className="gold-line mb-6"></div>
              <p className="text-stone leading-relaxed">
                Each piece in our collection is crafted with the highest attention to detail. From the vividness of the canvas print to the precision of the gallery-style framing, we ensure that every artwork that leaves our studio meets international luxury standards.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-obsidian rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-pearl">Ready to elevate your space?</h2>
            <p className="text-pearl/80 text-lg">
              Explore our curated collections and find the perfect piece that speaks to your aesthetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                href="/catalog" 
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-obsidian px-8 py-4 rounded-md font-medium hover:bg-white transition-colors"
              >
                Explore Catalog <ArrowRight size={18} />
              </Link>
              <Link 
                href="/custom-order" 
                className="inline-flex items-center justify-center gap-2 border border-pearl/30 text-pearl px-8 py-4 rounded-md font-medium hover:bg-pearl/10 transition-colors"
              >
                Request Custom Art
              </Link>
            </div>
          </div>
        </div>

      </div>
      </div>
      <Footer />
    </>
  );
}
