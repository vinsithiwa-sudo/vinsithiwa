import Image from "next/image";
import { SIZE_CHARTS, SIZE_CHART_LABELS } from "@/lib/size-charts";

interface SizeChartViewerProps {
  templateKey: string | null | undefined;
}

export default function SizeChartViewer({ templateKey }: SizeChartViewerProps) {
  if (!templateKey || !SIZE_CHARTS[templateKey]) return null;

  const imagePath = SIZE_CHARTS[templateKey];
  const label = SIZE_CHART_LABELS[templateKey] || "Size Chart";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-body text-[10px] tracking-widest uppercase" style={{ color: "#1a1208" }}>
          Size Reference
        </h3>
      </div>
      
      <div className="relative w-full aspect-[16/9] bg-white border border-[#E8E2D9] p-4 flex items-center justify-center overflow-hidden">
        <Image
          src={imagePath}
          alt={`Size chart for ${label}`}
          fill
          className="object-contain p-4"
        />
      </div>
    </div>
  );
}
