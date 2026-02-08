import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";

const DRAM_CATEGORIES = [
  {
    name: "DDR",
    description:
      "DDR SDRAM is a double data rate synchronous dynamic random-access memory. Samsung offers DDR4 and DDR5 for servers and PCs.",
    href: "/dram/ddr",
    count: "210+ products",
  },
  {
    name: "LPDDR",
    description:
      "Low Power DDR memory designed for mobile devices, offering superior power efficiency for smartphones and tablets.",
    href: "#",
    count: "299+ products",
  },
  {
    name: "GDDR",
    description:
      "Graphics DDR memory optimized for GPU applications, delivering ultra-high bandwidth for gaming and AI workloads.",
    href: "#",
    count: "27+ products",
  },
  {
    name: "HBM",
    description:
      "High Bandwidth Memory stacks multiple DRAM dies vertically, providing exceptional bandwidth for AI and HPC applications.",
    href: "#",
    count: "11+ products",
  },
  {
    name: "Module",
    description:
      "DRAM modules including RDIMM, UDIMM, and LPCAMM2 for various computing platforms and form factors.",
    href: "#",
    count: "819+ products",
  },
];

export default function DramPage() {
  return (
    <>
      <HeroBanner
        title="DRAM"
        subtitle="Products"
        description="Samsung's DRAM lineup delivers industry-leading performance, capacity, and power efficiency for every application."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: "DRAM" }]} />

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          DRAM Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DRAM_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {cat.count}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                View Products →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
