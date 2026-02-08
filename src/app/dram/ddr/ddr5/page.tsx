"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import {
  fetchDdr5Page,
  fetchDdr5Products,
  type Ddr5PageData,
  type ProductItem,
} from "@/lib/api";

export default function Ddr5Page() {
  const [pageData, setPageData] = useState<Ddr5PageData | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchDdr5Page(), fetchDdr5Products()])
      .then(([page, list]) => {
        if (!cancelled) {
          setPageData(page ?? null);
          setProducts(list ?? []);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const title = pageData?.title || "DDR5";
  const subtitle = pageData?.subtitle || "DRAM / DDR";
  const description =
    pageData?.description ||
    "DDR5 delivers double the bandwidth of DDR4 with improved power efficiency.";
  const keyFeatures = pageData?.keyFeatures || [];

  return (
    <>
      <HeroBanner
        title={title}
        subtitle={subtitle}
        description={description}
        imageUrl={pageData?.heroImageUrl || undefined}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "DRAM", href: "/dram" },
            { label: "DDR", href: "/dram/ddr" },
            { label: "DDR5" },
          ]}
        />

        {keyFeatures.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {keyFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-blue-50 rounded-xl p-6 text-center"
                >
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                    {feat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {feat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          DDR5 Products ({products.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              basePath="/dram/ddr/ddr5/product"
              slugAsQuery
            />
          ))}
        </div>
      </div>
    </>
  );
}
