import Link from "next/link"

const Footer = () => {
  return (
    <div>
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">AstraFin</h3>
            <p className="text-sm">Empowering wealth, one step at a time.</p>
          </div>
          <div>
            <h4 className="text-md font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400">Features</Link></li>
              <li><Link href="#" className="hover:text-indigo-400">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400">About</Link></li>
              <li><Link href="#" className="hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400">Terms</Link></li>
              <li><Link href="#" className="hover:text-indigo-400">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2025 AstraFin. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer