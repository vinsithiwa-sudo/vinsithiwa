"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SIZE_CHARTS } from "@/lib/size-charts";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateKey: string;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  templateKey,
}: SizeChartModalProps) {
  const imagePath = SIZE_CHARTS[templateKey];

  if (!imagePath) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] p-0 bg-white border-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display text-xl text-center text-[#1A1814]">
            Size Chart
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-4">
          <Image
            src={imagePath}
            alt="Size Chart"
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        
        <div className="p-4 pt-0 text-center">
          <p className="text-xs font-body tracking-widest uppercase" style={{ color: "#8C7B6A" }}>
            Measurements shown in inches
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
