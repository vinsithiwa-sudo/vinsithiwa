import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vinsithiwa.vercel.app"
  ),
  title: "Vinsith Interior Wall Art",
  description: "Premium Wall Art Catalog & Manual Order Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-body", "antialiased", playfair.variable, dmSans.variable, cormorant.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-pearl text-obsidian">
        {children}
      </body>
    </html>
  );
}
