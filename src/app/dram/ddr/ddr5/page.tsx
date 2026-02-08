import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, filterProductsByCategory, ProductItem } from "@/lib/api";

async function getDdr5Products(): Promise<ProductItem[]> {
  const allProducts = await fetchProducts("", 100);
  const ddrProducts = filterProductsByCategory(allProducts, "ddr");

  const ddr5Products = ddrProducts.filter(
    (p) =>
      p.linkUrl.toLowerCase().includes("ddr5") ||
      p.title.toLowerCase().includes("ddr5") ||
      p.displayTitle?.toLowerCase().includes("ddr5")
  );

  if (ddr5Products.length > 0) return ddr5Products;

  return getSampleDdr5Products();
}

function getSampleDdr5Products(): ProductItem[] {
  return [
    {
      title: "DDR5 DRAM",
      description:
        "Samsung DDR5 offers industry-leading speed and capacity for next-generation servers and data centers.",
      linkUrl: "/dram/ddr/ddr5/",
      thumbnailUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      displayTitle: "DDR5 | DRAM",
      displaySubCategory: "DRAM",
      keyImageUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      iaid: "110",
      staticTag: ["DDR5", "DRAM"],
      specfeatureList: [
        { specName: "Speed", specMinValue: "4800 Mbps", specMaxValue: "8800 Mbps" },
        { specName: "Density", specMinValue: "8 Gb", specMaxValue: "32 Gb" },
      ],
      stateCd: "A",
      stateNm: "Active",
    },
    {
      title: "K4RAH086VE-BCWM",
      description:
        "16Gb DDR5 SDRAM component for high-performance computing applications.",
      linkUrl: "/dram/ddr/ddr5/k4rah086ve-bcwm/",
      thumbnailUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      displayTitle: "K4RAH086VE-BCWM | DDR5",
      displaySubCategory: "DRAM",
      keyImageUrl:
        "/content/dam/samsung/semiconductor/products/dram/ddr/ddr5/kv-ddr5-part-pd-ta.png",
      iaid: "111",
      staticTag: ["DDR5", "DRAM", "16Gb"],
      specfeatureList: [
        { specName: "Density", specMinValue: "16 Gb", specMaxValue: "16 Gb" },
        { specName: "Speed", specMinValue: "5600 Mbps", specMaxValue: "5600 Mbps" },
        { specName: "Voltage", specMinValue: "1.1 V", specMaxValue: "1.1 V" },
      ],
      stateCd: "A",
      stateNm: "Active",
    },
  ];
}

export default async function Ddr5Page() {
  const products = await getDdr5Products();

  return (
    <>
      <HeroBanner
        title="DDR5"
        subtitle="DRAM / DDR"
        description="DDR5 delivers double the bandwidth of DDR4 with improved power efficiency, setting a new standard for computing performance."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "DRAM", href: "/dram" },
            { label: "DDR", href: "/dram/ddr" },
            { label: "DDR5" },
          ]}
        />

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Speed",
                value: "Up to 8800 Mbps",
                desc: "Double the bandwidth of DDR4",
              },
              {
                title: "Density",
                value: "Up to 32 Gb",
                desc: "Higher capacity per die",
              },
              {
                title: "Power",
                value: "1.1V",
                desc: "Lower operating voltage for better efficiency",
              },
            ].map((feat) => (
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
                <p className="text-sm text-gray-500 mt-1">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          DDR5 Products ({products.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.iaid || product.linkUrl}
              product={product}
              basePath="/dram/ddr/ddr5"
            />
          ))}
        </div>
      </div>
    </>
  );
}
