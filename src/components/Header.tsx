import Link from "next/link";

const NAV_ITEMS = [
  { label: "DRAM", href: "/dram" },
  { label: "DDR", href: "/dram/ddr" },
  { label: "DDR5", href: "/dram/ddr/ddr5" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600 tracking-tight">
              SAMSUNG
            </span>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Semiconductor
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
