import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";

const PRODUCT_CATEGORIES = [
  {
    name: "DRAM",
    description:
      "Industry-leading DRAM solutions for servers, PCs, mobile devices, and more.",
    href: "/dram",
    subItems: ["DDR", "LPDDR", "GDDR", "HBM", "Module"],
  },
  {
    name: "SSD",
    description:
      "High-performance solid state drives for enterprise, data center, and consumer applications.",
    href: "#",
    subItems: ["PC SSD", "Enterprise SSD", "Datacenter SSD"],
  },
  {
    name: "eStorage",
    description:
      "Embedded storage solutions including UFS and eMMC for mobile and IoT devices.",
    href: "#",
    subItems: ["UFS", "eMMC"],
  },
  {
    name: "CXL Memory",
    description:
      "Next-generation CXL memory solutions for data center expansion.",
    href: "#",
    subItems: ["CMM-D"],
  },
];

export default function Home() {
  return (
    <>
      <HeroBanner
        title="Memory & Storage Solutions"
        subtitle="Samsung Semiconductor"
        description="Pushing the boundaries of what's possible with industry-leading semiconductor technology. From DRAM to SSD, we power the future."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Products</h2>
        <p className="text-gray-500 mb-10">
          Explore our comprehensive product lineup
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {cat.subItems.map((sub) => (
                  <span
                    key={sub}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Samsung Semiconductor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                desc: "Pioneering next-generation memory technologies including HBM3E, DDR5, and CXL.",
              },
              {
                title: "Performance",
                desc: "Delivering industry-leading speed, capacity, and power efficiency across all product lines.",
              },
              {
                title: "Reliability",
                desc: "Trusted by global enterprises for mission-critical applications and infrastructure.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
