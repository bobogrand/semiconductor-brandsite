import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumb from "@/components/Breadcrumb";

const DDR_GENERATIONS = [
  {
    name: "DDR5",
    description:
      "The latest generation DDR5 delivers doubled bandwidth and improved power efficiency compared to DDR4, ideal for next-gen computing.",
    href: "/dram/ddr/ddr5",
    specs: [
      { label: "Speed", value: "Up to 8800 Mbps" },
      { label: "Density", value: "Up to 32 Gb" },
    ],
  },
  {
    name: "DDR4",
    description:
      "Proven DDR4 technology for mainstream servers and PCs, offering reliable performance and broad compatibility.",
    href: "#",
    specs: [
      { label: "Speed", value: "Up to 3200 Mbps" },
      { label: "Density", value: "Up to 16 Gb" },
    ],
  },
];

export default function DdrPage() {
  return (
    <>
      <HeroBanner
        title="DDR"
        subtitle="DRAM"
        description="Samsung DDR memory solutions provide high-performance, high-density memory for servers, workstations, and PCs."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "DRAM", href: "/dram" },
            { label: "DDR" },
          ]}
        />

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          DDR Generations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DDR_GENERATIONS.map((gen) => (
            <Link
              key={gen.name}
              href={gen.href}
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-8">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {gen.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 leading-relaxed">
                  {gen.description}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {gen.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-gray-400">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  View Products →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
