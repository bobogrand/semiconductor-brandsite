import { notFound } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { getSamsungImageUrl, ProductItem } from "@/lib/api";

export function generateStaticParams() {
  return [{ productId: "k4rah086ve-bcwm" }];
}

function getProductData(productId: string): ProductItem | null {
  const products: Record<string, ProductItem> = {
    "k4rah086ve-bcwm": {
      title: "K4RAH086VE-BCWM",
      description:
        "Samsung 16Gb DDR5 SDRAM component offering high-speed data transfer for next-generation computing platforms. Designed for servers, workstations, and high-performance PCs requiring DDR5 memory technology.",
      linkUrl: "/dram/ddr/ddr5/k4rah086ve-bcwm/",
      thumbnailUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      displayTitle: "K4RAH086VE-BCWM",
      displaySubCategory: "DDR5 DRAM",
      keyImageUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      iaid: "111",
      staticTag: ["DDR5", "DRAM", "16Gb", "Server", "PC"],
      specfeatureList: [
        { specName: "Density", specMinValue: "16 Gb", specMaxValue: "16 Gb" },
        { specName: "Configuration", specMinValue: "2G x 8", specMaxValue: "2G x 8" },
        { specName: "Speed", specMinValue: "5600 Mbps", specMaxValue: "5600 Mbps" },
        { specName: "Voltage (VDD)", specMinValue: "1.1 V", specMaxValue: "1.1 V" },
        { specName: "Operating Temperature", specMinValue: "0°C", specMaxValue: "85°C" },
        { specName: "Package", specMinValue: "FBGA", specMaxValue: "FBGA" },
      ],
      stateCd: "A",
      stateNm: "Active",
    },
  };

  return products[productId.toLowerCase()] || null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductData(productId);

  if (!product) {
    notFound();
  }

  const imageUrl = getSamsungImageUrl(product.keyImageUrl);

  return (
    <>
      <HeroBanner
        title={product.displayTitle}
        subtitle={product.displaySubCategory}
        description={product.description}
        imageUrl={imageUrl}
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
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.displayTitle}
                className="max-w-full max-h-80 object-contain"
              />
            ) : (
              <div className="text-gray-300 text-6xl font-bold">DDR5</div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {product.displayTitle}
              </h2>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  product.stateCd === "A"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.stateNm}
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.staticTag && product.staticTag.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.staticTag.map((tag, i) => (
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
