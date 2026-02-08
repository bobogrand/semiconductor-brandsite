import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { fetchDdr5Page, fetchDdr5Products } from "@/lib/api";

export default async function Ddr5Page() {
  const [pageData, products] = await Promise.all([
    fetchDdr5Page(),
    fetchDdr5Products(),
  ]);

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
              basePath="/dram/ddr/ddr5"
            />
          ))}
        </div>
      </div>
    </>
  );
}
