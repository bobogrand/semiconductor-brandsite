import { notFound } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchDdr5ProductBySlug, fetchDdr5ProductSlugs } from "@/lib/api";

export async function generateStaticParams() {
  const slugs = await fetchDdr5ProductSlugs();
  return slugs.map((slug) => ({ productId: slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await fetchDdr5ProductBySlug(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <HeroBanner
        title={product.displayTitle}
        subtitle={product.displaySubCategory}
        description={product.description}
        imageUrl={product.keyImageUrl || undefined}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "DRAM", href: "/dram" },
            { label: "DDR", href: "/dram/ddr" },
            { label: "DDR5", href: "/dram/ddr/ddr5" },
            { label: product.displayTitle },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
            {product.keyImageUrl ? (
              <img
                src={product.keyImageUrl}
                alt={product.displayTitle}
                className="max-w-full max-h-80 object-contain"
              />
            ) : (
              <div className="text-gray-300 text-6xl font-bold">DDR5</div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {product.displayTitle}
              </h2>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {product.specfeatureList && product.specfeatureList.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specfeatureList.map((spec, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-600 w-1/3">
                            {spec.specName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {spec.specMinValue === spec.specMaxValue
                              ? spec.specMinValue
                              : `${spec.specMinValue} ~ ${spec.specMaxValue}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
