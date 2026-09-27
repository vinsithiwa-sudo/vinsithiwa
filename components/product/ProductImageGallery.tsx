"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const GOLD = "#C9A84C";
const BORDER = "#E8E2D9";

interface ProductImageGalleryProps {
  images: { url: string; alt?: string }[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className="w-full aspect-square bg-transparent flex items-center justify-center border border-black/5 rounded-lg"
      >
        <span className="font-body text-sm" style={{ color: "#8C7B6A" }}>
          No image available
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="relative w-full aspect-square bg-transparent border border-black/5 rounded-lg overflow-hidden flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || `Product image ${currentIndex + 1}`}
            className="w-full h-full object-contain p-0 transition-transform duration-300 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-white/90 text-[#1a1208] px-4 py-2 rounded-sm font-body text-xs font-medium tracking-wide flex items-center gap-2 shadow-sm">
            <Expand size={14} />
            <span>Click to Enlarge</span>
          </div>
        </div>
      </button>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative w-20 h-20 flex-shrink-0 border transition-all bg-transparent flex items-center justify-center rounded-md"
              style={{
                borderColor: currentIndex === index ? GOLD : BORDER,
                opacity: currentIndex === index ? 1 : 0.7,
              }}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-contain p-0"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px] p-0 bg-white border-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="sr-only">Product Image Enlarge</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-square md:aspect-video bg-white flex items-center justify-center p-4">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `Product image ${currentIndex + 1}`}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
