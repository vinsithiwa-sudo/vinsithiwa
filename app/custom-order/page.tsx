import CustomOrderForm from "@/components/public/CustomOrderForm";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Custom Wall Art | Vinsith Interior Wall Art",
  description: "Request bespoke, custom-designed wall art tailored perfectly to your space and interior aesthetics.",
};

export default function CustomOrderPage() {
  return (
    <>
      <NavbarWrapper />
      <div className="bg-pearl min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <div className="bg-obsidian text-pearl py-20 px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="eyebrow inline-block">Bespoke Creations</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Art Tailored to <span className="text-[#C9A84C]">Your Vision</span>
          </h1>
          <p className="text-lg text-pearl/80 leading-relaxed max-w-2xl mx-auto">
            Can't find exactly what you're looking for in our catalog? Our design team works with you to source, curate, and produce custom wall art that perfectly matches your interior design requirements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-obsidian mb-6">How It Works</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-[#C9A84C] flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-obsidian text-lg mb-1">Request a Consultation</h3>
                    <p className="text-stone">Fill out the form with your ideas, space dimensions, and preferred aesthetics.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-[#C9A84C] flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-obsidian text-lg mb-1">Design Proposal</h3>
                    <p className="text-stone">We'll review your request and send you customized art mockups and a quotation via WhatsApp.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-[#C9A84C] flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-obsidian text-lg mb-1">Production & Delivery</h3>
                    <p className="text-stone">Upon approval, your bespoke piece is printed, framed, and delivered to your doorstep.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1208] text-pearl p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
              <h3 className="text-xl font-bold mb-3 text-[#C9A84C]">Need immediate assistance?</h3>
              <p className="text-pearl/80 mb-6 text-sm leading-relaxed">
                Skip the form and chat with our design team directly on WhatsApp. We usually reply within minutes during business hours.
              </p>
              <a 
                href="https://wa.me/94770697626" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-obsidian px-6 py-2 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <CustomOrderForm />
          </div>
          
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
