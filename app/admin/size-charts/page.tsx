import { SIZE_CHART_LABELS, SIZE_CHARTS } from "@/lib/size-charts";
import Image from "next/image";
import { Ruler } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Size Charts | Admin Dashboard",
};

export default function SizeChartsAdminPage() {
  const charts = Object.entries(SIZE_CHART_LABELS).map(([key, label]) => ({
    key,
    label,
    imagePath: SIZE_CHARTS[key],
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Size Charts</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6 text-gray-600">
          <Ruler size={20} />
          <p className="text-sm">
            These are the predefined size charts available for products. 
            You can assign a size chart to any product from the product edit page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {charts.map((chart) => (
            <div key={chart.key} className="flex flex-col bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:border-[#C9A84C] transition-colors">
              <div className="relative w-full aspect-[4/3] bg-white p-4">
                <Image
                  src={chart.imagePath}
                  alt={chart.label}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm truncate" title={chart.label}>
                  {chart.label}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1 truncate" title={chart.key}>
                  {chart.key}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
