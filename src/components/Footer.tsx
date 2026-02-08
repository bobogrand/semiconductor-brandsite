export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>DRAM</li>
              <li>SSD</li>
              <li>eStorage</li>
              <li>CXL Memory</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">DRAM</h3>
            <ul className="space-y-2 text-sm">
              <li>DDR</li>
              <li>LPDDR</li>
              <li>GDDR</li>
              <li>HBM</li>
              <li>Module</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-sm leading-relaxed">
              Samsung Semiconductor is a global leader in advanced memory
              technology, system LSI, and foundry solutions.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          <p>Samsung Semiconductor - PoC Brand Site</p>
        </div>
      </div>
    </footer>
  );
}
