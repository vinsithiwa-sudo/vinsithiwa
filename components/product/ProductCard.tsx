import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SizeChartButton from "@/components/shared/SizeChartButton";

export const metadata: Metadata = {
  title: "Wall Art Catalog | Vinsith Interior Wall Art",
  description: "Browse our full collection of 200+ luxury wall art pieces. Filter by panel type, theme, space, and price. Order online with bank transfer.",
};

const GOLD = "#C9A84C";
const BORDER = "#E8E2D9";
const STONE = "#8C7B6A";

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    theme?: string;
    panel?: string;
    price: number;
    slug: string;
    isFeatured?: boolean;
    mainImage?: string;
    sizeChartTemplate?: string | null;
    designNumber?: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/catalog/${product.slug}`} className="group block w-full">
      {/* Image / Panel Preview */}
      <div className="relative w-full aspect-square overflow-hidden mb-4 bg-transparent border border-black/5 flex items-center justify-center rounded-md">
        {product.mainImage ? (
          <Image
            src={product.mainImage}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Panel visual placeholder */
          <div className="absolute inset-6 flex gap-1.5 items-stretch">
            {Array.from({
              length:
                product.panel === "1 Piece" ? 1 :
                product.panel === "2 Pieces" ? 2 :
                product.panel === "3 Pieces" ? 3 :
                product.panel === "5 Pieces" ? 5 : 4,
            }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              />
            ))}
          </div>
        )}

        {/* Featured badge */}
        {product.isFeatured && (
          <div
            className="absolute top-3 left-3 font-body text-[9px] tracking-widest uppercase px-2 py-1"
            style={{ backgroundColor: GOLD, color: "#1A1814" }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        {product.designNumber && (
          <p
            className="font-body text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors"
            style={{ color: GOLD }}
          >
            DESIGN : {product.designNumber}
          </p>
        )}
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="font-display font-semibold text-[15px] leading-snug mb-2 group-hover:opacity-70 transition-opacity"
              style={{ color: "#1A1814" }}
            >
              {product.title}
            </h3>
            <span className="font-body font-medium text-sm" style={{ color: "#1A1814" }}>
              LKR {product.price.toLocaleString()}
            </span>
          </div>
          <div className="text-right flex flex-col justify-end">
            {product.sizeChartTemplate && (
              <div>
                <SizeChartButton templateKey={product.sizeChartTemplate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
