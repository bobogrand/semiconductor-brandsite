import Link from "next/link";
import { ProductItem } from "@/lib/api";

interface ProductCardProps {
  product: ProductItem;
  basePath?: string;
  /** true면 상세 링크를 basePath?slug=xxx 로 생성 (정적 호스팅용) */
  slugAsQuery?: boolean;
}

export default function ProductCard({
  product,
  basePath,
  slugAsQuery,
}: ProductCardProps) {
  const href = slugAsQuery
    ? `${basePath || "/dram/ddr/ddr5/product"}?slug=${encodeURIComponent(product.slug)}`
    : basePath
      ? `${basePath}/${product.slug}`
      : `/dram/ddr/ddr5/product?slug=${encodeURIComponent(product.slug)}`;

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
          {product.thumbnailUrl ? (
            <img
              src={product.thumbnailUrl}
              alt={product.displayTitle || product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
              loading="lazy"
            />
          ) : (
            <div className="text-gray-300 text-4xl font-bold">
              {product.displayTitle?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.displayTitle || product.title}
          </h3>
          {product.displaySubCategory && (
            <p className="text-xs text-blue-600 mt-1">
              {product.displaySubCategory}
            </p>
          )}
          {product.specfeatureList && product.specfeatureList.length > 0 && (
            <div className="mt-3 space-y-1">
              {product.specfeatureList.slice(0, 3).map((spec, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-500">
                  <span>{spec.specName}</span>
                  <span className="font-medium text-gray-700">
                    {spec.specMinValue === spec.specMaxValue
                      ? spec.specMinValue
                      : `${spec.specMinValue} ~ ${spec.specMaxValue}`}
                  </span>
                </div>
              ))}
            </div>
          )}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
