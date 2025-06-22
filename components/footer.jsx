"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white p-2 rounded-xl">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-lg font-bold">C</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">CarHub</span>
                <p className="text-xs text-gray-400 -mt-1">Premium Motors</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Your trusted partner in finding the perfect luxury vehicle. Experience excellence in automotive retail.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-white text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-white text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-400 hover:text-white transition-colors">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="text-gray-400 hover:text-white transition-colors">
                  Trade-In
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-lg mb-6">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <p>123 Luxury Drive</p>
              <p>Premium City, PC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@carhub.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 CarHub Premium Motors. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
